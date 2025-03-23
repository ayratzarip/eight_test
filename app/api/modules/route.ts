import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET handler to fetch all modules with their lessons
export async function GET() {
  try {
    // Fetch all modules and include their related lessons
    const modules = await prisma.module.findMany({
      include: {
        lessons: {
          orderBy: {
            order: 'asc'
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return NextResponse.json(modules);
  } catch (error) {
    console.error('Error fetching modules:', error);
    return NextResponse.json(
      { error: 'Failed to fetch modules' },
      { status: 500 }
    );
  }
}