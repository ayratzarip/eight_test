'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/ui/header';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Types for our data
type Lesson = {
  id: string;
  title: string;
  order: number;
  isAccessible?: boolean;
  isCompleted?: boolean;
};

type Module = {
  id: string;
  title: string;
  description: string;
  image: string;
  lessons: Lesson[];
  isAccessible?: boolean;
};

export default function Lessons() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [modules, setModules] = useState<Module[]>([]);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  // Fetch modules and lessons from our API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/modules');
        if (!response.ok) {
          throw new Error('Failed to fetch modules');
        }
        const data = await response.json();
        setModules(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching modules:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to get the next lesson for the user
  const getNextLesson = (): {
    moduleTitle: string;
    moduleId: string;
    lesson: Lesson;
  } | null => {
    // First, look for the first incomplete but accessible lesson
    for (const module of modules) {
      if (module.isAccessible) {
        for (const lesson of module.lessons) {
          if (lesson.isAccessible && !lesson.isCompleted) {
            return {
              moduleTitle: module.title,
              moduleId: module.id,
              lesson: lesson
            };
          }
        }
      }
    }
    
    // If no incomplete lessons found, fallback to the first lesson that is accessible
    for (const module of modules) {
      if (module.isAccessible && module.lessons && module.lessons.length > 0) {
        const accessibleLesson = module.lessons.find(lesson => lesson.isAccessible);
        if (accessibleLesson) {
          return {
            moduleTitle: module.title,
            moduleId: module.id,
            lesson: accessibleLesson
          };
        }
      }
    }
    
    // Fallback to the first lesson of the first module if no accessible lessons found
    const firstModuleWithLessons = modules.find(module => module.lessons && module.lessons.length > 0);
    if (firstModuleWithLessons && firstModuleWithLessons.lessons) {
      return {
        moduleTitle: firstModuleWithLessons.title,
        moduleId: firstModuleWithLessons.id,
        lesson: firstModuleWithLessons.lessons[0]
      };
    }
    
    return null;
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId) 
        : [...prev, moduleId]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* User greeting */}
          {session?.user && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Привет, {session.user.name || 'User'}</h2>
                  {getNextLesson() ? (
                    <p className="text-gray-600">
                      Следующий урок: <span className="font-medium">{getNextLesson()?.lesson.title}</span> из модуля "{getNextLesson()?.moduleTitle}"
                    </p>
                  ) : (
                    <p className="text-gray-600">Выберите модуль, чтобы начать обучение</p>
                  )}
                </div>
                <div className="flex gap-4">
                  <Button 
                    className="px-4 py-2 border border-green-600 text-green-600 bg-white rounded-full hover:bg-green-50 transition-colors"
                    onClick={() => window.location.href = "/logbook"}
                  >
                    Дневник наблюдений
                  </Button>
                  {getNextLesson() && (
                    <Button 
                      className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                      onClick={() => window.location.href = `/lessons/module/${getNextLesson()?.moduleId}/lesson/${getNextLesson()?.lesson.id}`}
                    >
                      Продолжить обучение
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Modules list */}
          <h1 className="text-3xl font-bold mb-8">Модули</h1>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p>Загрузка модулей...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {modules.map((module) => (
                <div key={module.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div 
                    className="cursor-pointer flex flex-col md:flex-row"
                    onClick={() => toggleModule(module.id)}
                  >
                    <div className="md:w-64 h-60 md:h-48 flex-shrink-0 overflow-hidden">
                      <img 
                        src={module.image} 
                        alt={module.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-semibold">{module.title}</h3>
                        {expandedModules.includes(module.id) ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <p className="text-gray-600">{module.description}</p>
                    </div>
                  </div>
                  
                  {/* Expandable lessons list */}
                  {expandedModules.includes(module.id) && module.lessons && (
                    <div className="bg-gray-50 p-4 border-t">
                      <h4 className="font-medium text-sm mb-2">Уроки:</h4>
                      <ul className="space-y-2">
                        {module.lessons.map(lesson => (
                          <li key={lesson.id}>
                            {lesson.isAccessible ? (
                              <a 
                                href={`/lessons/module/${module.id}/lesson/${lesson.id}`}
                                className={`block p-2 rounded text-sm transition-colors flex justify-between items-center 
                                  ${lesson.isCompleted ? 'text-green-600' : 'hover:bg-gray-100 hover:text-green-600'}`}
                              >
                                <span>{lesson.title}</span>
                                {lesson.isCompleted && (
                                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                    Пройден
                                  </span>
                                )}
                              </a>
                            ) : (
                              <div 
                                className="block p-2 text-gray-400 rounded text-sm flex justify-between items-center cursor-not-allowed"
                              >
                                <span>{lesson.title}</span>
                                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                                  Заблокирован
                                </span>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}