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
};

type Module = {
  id: string;
  title: string;
  description: string;
  image: string;
  lessons: Lesson[];
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
    // This is a simplified example - in a real app, you'd track user progress
    // and determine their actual next lesson
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
                            <a 
                              href={`/lessons/module/${module.id}/lesson/${lesson.id}`}
                              className="block p-2 hover:bg-gray-100 hover:text-green-600 rounded text-sm transition-colors"
                            >
                              {lesson.title}
                            </a>
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