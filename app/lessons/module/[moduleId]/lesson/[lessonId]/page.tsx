'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuizComponent from '@/components/quiz/quiz';
import { CheckCircle } from 'lucide-react';

type Lesson = {
  id: string;
  title: string;
  content: string | null;
  video_url: string | null;
  transcript: string | null;
  moduleId: string;
  order: number;
  module: {
    id: string;
    title: string;
  };
};

export default function LessonPage({ params }: { params: { moduleId: string; lessonId: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/auth/signin?callbackUrl=/lessons/module/${params.moduleId}/lesson/${params.lessonId}`);
    }
  }, [status, router, params.moduleId, params.lessonId]);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch(`/api/lessons/${params.lessonId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          
          if (response.status === 403) {
            // Unauthorized access to this lesson
            setError(errorData.error || 'Вы должны пройти предыдущие уроки, чтобы получить доступ к этому уроку.');
            setIsLoading(false);
            return;
          }
          
          throw new Error('Failed to fetch lesson data');
        }
        
        const data = await response.json();
        setLesson(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching lesson:', err);
        setError('Не удалось загрузить урок. Пожалуйста, попробуйте позже.');
        setIsLoading(false);
      }
    };

    fetchLesson();
  }, [params.lessonId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <p>Загрузка урока...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <p className="text-red-500">{error || 'Урок не найден'}</p>
              <a href="/lessons" className="text-blue-500 hover:underline mt-4 block">
                Вернуться к списку уроков
              </a>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4">
            <a 
              href="/lessons" 
              className="text-green-600 hover:underline"
            >
              ← Вернуться к модулям
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            {/* Title and Video Section - Flex container */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {/* Left side - Titles */}
              <div className="md:w-1/3 flex flex-col justify-center">
                <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
                <p className="text-gray-600">
                  Модуль: {lesson.module.title}
                </p>
              </div>
              
              {/* Right side - Video */}
              <div className="md:w-2/3">
                <h2 className="text-xl font-semibold mb-4 md:hidden">Видео урока</h2>
                {lesson.video_url ? (
                  <div className="rounded-lg overflow-hidden" style={{ position: 'relative', paddingTop: '56.25%' }}>
                    <iframe
                      src={lesson.video_url}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    ></iframe>
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <p className="text-gray-500">Видео для этого урока отсутствует</p>
                  </div>
                )}
              </div>
            </div>

            {/* Transcript Section */}
            <div className="mb-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="transcript">
                  <AccordionTrigger className="text-xl font-semibold">
                    Транскрипт видео
                  </AccordionTrigger>
                  <AccordionContent>
                    {lesson.transcript ? (
                      <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-line">
                        {lesson.transcript}
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Транскрипт для этого видео не доступен</p>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Content Section */}
            <div className="lesson-content mb-8">
              <h2 className="text-xl font-semibold mb-4">Краткий конспект урока</h2>
              <Card>
                <CardContent className="pt-6">
                  {lesson.content ? (
                    <div 
                      className="prose max-w-full w-full"
                      dangerouslySetInnerHTML={{ __html: lesson.content }}
                    />
                  ) : (
                    <p className="text-gray-500">Содержание для этого урока не доступно</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quiz Section */}
            {!showQuiz && !quizCompleted && (
              <div className="mt-8 flex justify-center">
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-full"
                  onClick={() => setShowQuiz(true)}
                >
                  Начать тест
                </Button>
              </div>
            )}

            {showQuiz && !quizCompleted && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Проверьте свои знания</h2>
                <QuizComponent 
                  lessonId={lesson.id} 
                  onComplete={(passed) => {
                    setQuizCompleted(true);
                    setQuizPassed(passed);
                    setShowQuiz(false);
                  }} 
                />
              </div>
            )}

            {/* Completion Button */}
            {quizCompleted && (
              <div className="mt-8">
                <div className={`rounded-lg p-4 mb-6 ${quizPassed ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <p className="font-medium">
                      {quizPassed 
                        ? 'Поздравляем! Вы успешно завершили тест.' 
                        : 'Тест завершен. Рекомендуем изучить материал еще раз.'}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button 
                    size="lg" 
                    className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-full"
                    onClick={async () => {
                      try {
                        // Mark the lesson as completed in the database
                        const response = await fetch('/api/user/progress', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ lessonId: lesson.id }),
                        });
                        
                        if (!response.ok) {
                          throw new Error('Failed to mark lesson as completed');
                        }
                        
                        // Redirect to lessons page
                        window.location.href = '/lessons';
                      } catch (error) {
                        console.error('Error completing lesson:', error);
                        alert('Не удалось отметить урок как завершенный. Пожалуйста, попробуйте снова.');
                      }
                    }}
                  >
                    Завершить урок
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}