import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import * as crypto from 'crypto';

// Helper function to get or create the user's encryption key (same as in logbook)
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
    const newKey = crypto.randomBytes(32).toString('base64');
    
    // Encrypt the key with the session token
    const salt = Buffer.from('logbook-encryption-salt');
    const derivedKey = crypto.pbkdf2Sync(sessionToken, salt, 100000, 32, 'sha256');
    
    // Encrypt the key
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', derivedKey, iv);
    
    let encrypted = cipher.update(newKey, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    const authTag = cipher.getAuthTag().toString('base64');
    
    // Return IV + authTag + encrypted data
    const encryptedKey = `${iv.toString('base64')}.${authTag}.${encrypted}`;
    
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

// GET all goals for a user
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

    // Get goals with ordering
    const goals = await prisma.goal.findMany({
      where: { userId: user.id },
      orderBy: { order: 'asc' },
    });
    
    // Include the encrypted key in the response for client-side decryption
    return NextResponse.json({
      goals,
      encryptedKey
    });
  } catch (error) {
    console.error('Error fetching goals:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST a new goal
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

    // Get the highest order value
    const highestOrderGoal = await prisma.goal.findFirst({
      where: { userId: user.id },
      orderBy: { order: 'desc' },
      select: { order: true }
    });

    const nextOrder = highestOrderGoal ? highestOrderGoal.order + 1 : 0;

    const newGoal = await prisma.goal.create({
      data: {
        userId: user.id,
        order: nextOrder, // Set the order to the next available value
        // Store the encrypted data
        encryptedData,
        iv
      },
    });

    revalidatePath('/goals');
    return NextResponse.json(newGoal, { status: 201 });
  } catch (error) {
    console.error('Error creating goal:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT update a goal
export async function PUT(request: Request) {
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

    const { id, order, encryptedData, iv } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Goal ID is required' }, { status: 400 });
    }

    // Verify the goal belongs to the user
    const existingGoal = await prisma.goal.findUnique({
      where: { id },
      select: { userId: true }
    });

    if (!existingGoal || existingGoal.userId !== user.id) {
      return NextResponse.json({ error: 'Goal not found or access denied' }, { status: 404 });
    }

    // Update the goal
    const updateData: any = {};
    if (order !== undefined) updateData.order = order;
    if (encryptedData) updateData.encryptedData = encryptedData;
    if (iv) updateData.iv = iv;

    const updatedGoal = await prisma.goal.update({
      where: { id },
      data: updateData
    });

    revalidatePath('/goals');
    return NextResponse.json(updatedGoal);
  } catch (error) {
    console.error('Error updating goal:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT update goal orders - for reordering multiple goals at once
export async function PATCH(request: Request) {
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

    const { goals } = await request.json();

    if (!goals || !Array.isArray(goals)) {
      return NextResponse.json({ error: 'Goals array is required' }, { status: 400 });
    }

    // Update orders in a transaction
    const updates = await prisma.$transaction(
      goals.map(({ id, order }) => 
        prisma.goal.update({
          where: { 
            id,
            userId: user.id // Ensure each goal belongs to the user
          },
          data: { order }
        })
      )
    );

    revalidatePath('/goals');
    return NextResponse.json({ success: true, count: updates.length });
  } catch (error) {
    console.error('Error updating goal orders:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE goal
export async function DELETE(request: Request) {
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

    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Goal ID is required' }, { status: 400 });
    }

    // Verify the goal belongs to the user
    const existingGoal = await prisma.goal.findUnique({
      where: { id },
      select: { userId: true }
    });

    if (!existingGoal || existingGoal.userId !== user.id) {
      return NextResponse.json({ error: 'Goal not found or access denied' }, { status: 404 });
    }

    // Delete the goal
    await prisma.goal.delete({
      where: { id }
    });

    revalidatePath('/goals');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting goal:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}