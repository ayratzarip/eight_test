'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Sitemap() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src="/assets/diamond_logo_green.png" alt="Logo" style={{ width: '10%', height: 'auto' }} />
              <span className="text-gray-600 font-bold">EightFaces: Soft Skills Engine</span>
            </div>
            
            <Link href="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700">
              <ArrowLeft className="w-5 h-5" />
              На главную страницу
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20 bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Карта сайта</h1>
            
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">Основные страницы</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>
                  <Link href="/" className="text-green-600 hover:text-green-700">
                    Главная страница
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">Основная информация о проекте, видео и возможность подключения</p>
                </li>
                <li>
                  <Link href="/author" className="text-green-600 hover:text-green-700">
                    Об авторе
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">Информация об авторе проекта и его профессиональном опыте</p>
                </li>
              </ul>
              
              <h2 className="text-xl font-semibold mb-4">Статьи</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>
                  <Link href="/articles" className="text-green-600 hover:text-green-700">
                    Все статьи
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">Список всех доступных статей</p>
                </li>
                <li>
                  <Link href="/articles/article1" className="text-green-600 hover:text-green-700">
                    Почему не стоит ставить себе диагнозы
                  </Link>
                </li>
                <li>
                  <Link href="/articles/article2" className="text-green-600 hover:text-green-700">
                    Социальная тревога, застенчивость или расстройство аутистического спектра
                  </Link>
                </li>
                <li>
                  <Link href="/articles/article3" className="text-green-600 hover:text-green-700">
                    Уверенность в себе и хуцпа
                  </Link>
                </li>
                <li>
                  <Link href="/articles/article4" className="text-green-600 hover:text-green-700">
                    Социальный интеллект или эмоциональный интеллект
                  </Link>
                </li>
              </ul>
              
              <h2 className="text-xl font-semibold mb-4">Юридическая информация</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>
                  <Link href="/terms" className="text-green-600 hover:text-green-700">
                    Пользовательское соглашение
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-green-600 hover:text-green-700">
                    Политика в отношении обработки персональных данных
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/assets/diamond_logo_green.png" alt="Logo" style={{ width: '3%', height: 'auto' }} />
            <span className="text-l font-bold text-white">EightFaces: Soft Skills Engine</span>
          </div>
          <p>&copy; {new Date().getFullYear()} EightFaces: Soft Skills Engine</p>
        </div>
      </footer>
    </div>
  );
}