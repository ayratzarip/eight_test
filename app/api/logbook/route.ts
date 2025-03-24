import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/db';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';

// GET user's logbook entries
export async function GET(request: Request) {
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

    const logEntries = await prisma.logbook.findMany({
      where: { userId: user.id },
      orderBy: { dateTime: 'desc' },
    });

    return NextResponse.json(logEntries);
  } catch (error) {
    console.error('Error fetching logbook entries:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST a new logbook entry
export async function POST(request: Request) {
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

    const { attentionFocus, thoughts, bodySensations, actions, howToAct } = await request.json();

    // Validate required fields
    if (!attentionFocus || !thoughts || !bodySensations || !actions || !howToAct) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newEntry = await prisma.logbook.create({
      data: {
        userId: user.id,
        attentionFocus,
        thoughts,
        bodySensations,
        actions,
        howToAct,
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