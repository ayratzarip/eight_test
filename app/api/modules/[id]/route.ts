import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET handler to fetch a specific module with its lessons
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const moduleId = params.id;

    // Fetch the module and include its related lessons
    const module = await prisma.module.findUnique({
      where: {
        id: moduleId
      },
      include: {
        lessons: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    if (!module) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(module);
  } catch (error) {
    console.error('Error fetching module:', error);
    return NextResponse.json(
      { error: 'Failed to fetch module' },
      { status: 500 }
    );
  }
}