import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET handler to fetch a specific lesson
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to access this content.' },
        { status: 401 }
      );
    }
    
    const lessonId = params.id;

    // Fetch the lesson and include its related module
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId
      },
      include: {
        module: true
      }
    });

    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(lesson);
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lesson' },
      { status: 500 }
    );
  }
}