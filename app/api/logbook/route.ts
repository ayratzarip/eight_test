import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import * as crypto from 'crypto';

// Helper function to generate a random encryption key for a new user
function generateEncryptionKey(): string {
  return crypto.randomBytes(32).toString('base64');
}

// Helper function to encrypt a key with the user's session token
function encryptKey(key: string, token: string): string {
  // Create a deterministic key from the token (never stored)
  const salt = Buffer.from('logbook-encryption-salt');
  const derivedKey = crypto.pbkdf2Sync(token, salt, 100000, 32, 'sha256');
  
  // Encrypt the key
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', derivedKey, iv);
  
  let encrypted = cipher.update(key, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  
  const authTag = cipher.getAuthTag().toString('base64');
  
  // Return IV + authTag + encrypted data
  return `${iv.toString('base64')}.${authTag}.${encrypted}`;
}

// Helper function to get or create the user's encryption key
async function getUserEncryptionKey(userId: string, sessionToken: string): Promise<string> {
  try {
    // Get the user with their encryption key
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { encryptionKey: true }
    });
    
    if (user?.encryptionKey) {
      return user.encryptionKey;
    }
    
    // Generate a new key if one doesn't exist
    const newKey = generateEncryptionKey();
    
    // Encrypt the key with the session token and store it
    const encryptedKey = encryptKey(newKey, sessionToken);
    
    // Save the encrypted key to the user
    await prisma.user.update({
      where: { id: userId },
      data: { encryptionKey: encryptedKey }
    });
    
    return encryptedKey;
  } catch (error) {
    console.error('Error getting/creating encryption key:', error);
    throw error;
  }
}

// GET user's logbook entries
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Get the user's encryption key (already encrypted)
    // Check if session.user.id exists and use it, otherwise use a fallback
    const sessionToken = typeof session.user.id === 'string' ? session.user.id : user.id;
    const encryptedKey = await getUserEncryptionKey(user.id, sessionToken);

    const logEntries = await prisma.logbook.findMany({
      where: { userId: user.id },
      orderBy: { dateTime: 'desc' },
    });
    
    // Include the encrypted key in the response for client-side decryption
    return NextResponse.json({
      entries: logEntries,
      encryptedKey
    });
  } catch (error) {
    console.error('Error fetching logbook entries:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST a new logbook entry
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { encryptedData, iv } = await request.json();

    // Validate required fields
    if (!encryptedData || !iv) {
      return NextResponse.json({ error: 'Encrypted data is required' }, { status: 400 });
    }
    
    // Make sure the user has an encryption key
    try {
      // Check if session.user.id exists and use it, otherwise use a fallback
      const sessionToken = typeof session.user.id === 'string' ? session.user.id : user.id;
      await getUserEncryptionKey(user.id, sessionToken);
    } catch (error) {
      console.error('Error getting encryption key:', error);
      // Continue without encryption if key retrieval fails
    }

    const newEntry = await prisma.logbook.create({
      data: {
        userId: user.id,
        encryptedData,
        iv
      },
    });

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error('Error creating logbook entry:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE logbook entries
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { entryIds } = await request.json();
    
    if (!entryIds || !Array.isArray(entryIds) || entryIds.length === 0) {
      return NextResponse.json({ error: 'No entry IDs provided' }, { status: 400 });
    }

    // Verify that all entries belong to the current user before deleting
    const entries = await prisma.logbook.findMany({
      where: {
        id: { in: entryIds },
        userId: user.id,
      },
    });

    const validEntryIds = entries.map(entry => entry.id);

    if (validEntryIds.length === 0) {
      return NextResponse.json({ error: 'No valid entries found' }, { status: 404 });
    }

    // Delete entries
    await prisma.logbook.deleteMany({
      where: {
        id: { in: validEntryIds },
        userId: user.id,
      },
    });

    revalidatePath('/logbook');
    return NextResponse.json({ message: 'Entries deleted successfully', count: validEntryIds.length }, { status: 200 });
  } catch (error) {
    console.error('Error deleting logbook entries:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}