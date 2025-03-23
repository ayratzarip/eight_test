import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET handler to fetch a quiz for a specific lesson
export async function GET(
  request: Request,
  { params }: { params: { lessonId: string } }
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
    
    const lessonId = params.lessonId;

    // First check if a quiz exists for this lesson
    const quiz = await prisma.quiz.findUnique({
      where: {
        lessonId: lessonId
      },
      include: {
        questions: {
          orderBy: {
            order: 'asc'
          },
          include: {
            options: true
          }
        }
      }
    });

    if (!quiz) {
      return NextResponse.json(
        { exists: false, message: 'No quiz found for this lesson' },
        { status: 404 }
      );
    }

    // Process the data to format it for the frontend
    const processedQuiz = {
      id: quiz.id,
      lessonId: quiz.lessonId,
      questions: quiz.questions.map(question => ({
        id: question.id,
        question: question.question,
        options: question.options.map(option => ({
          id: option.id,
          text: option.optionText,
          isCorrect: option.isCorrect,
          correctComment: option.correctComment,
          incorrectComment: option.incorrectComment
        }))
      }))
    };

    return NextResponse.json({ exists: true, quiz: processedQuiz });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quiz' },
      { status: 500 }
    );
  }
}