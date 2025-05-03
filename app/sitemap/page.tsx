"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Sitemap() {
  return (
    <div className="flex-grow pt-20 bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl sshadow-2xl p-8 mb-8">
          <div className="flex items-start mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              <ArrowLeft className="w-5 h-5" />
              На главную страницу
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-8 text-center">Карта сайта</h1>

          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Основные страницы</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>
                <Link href="/" className="text-green-600 hover:text-green-700">
                  Главная страница
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Основная информация о проекте, видео и возможность подключения
                </p>
              </li>
              <li>
                <Link
                  href="/author"
                  className="text-green-600 hover:text-green-700"
                >
                  Об авторе
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Информация об авторе проекта и его профессиональном опыте
                </p>
              </li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">Статьи</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>
                <Link
                  href="/articles"
                  className="text-green-600 hover:text-green-700"
                >
                  Все статьи
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Список всех доступных статей
                </p>
              </li>
              <li>
                <Link
                  href="/articles/article1"
                  className="text-green-600 hover:text-green-700"
                >
                  Можно ли отличить застенчивость от расстройства личности,
                  социальной тревоги или расстройства аутистического спектра
                </Link>
              </li>
              <li>
                <Link
                  href="/articles/article2"
                  className="text-green-600 hover:text-green-700"
                >
                  Не ищите причину неуверенности и застенчивости
                </Link>
              </li>
              <li>
                <Link
                  href="/articles/article3"
                  className="text-green-600 hover:text-green-700"
                >
                  Уверенности и харизмы не существует
                </Link>
              </li>
              <li>
                <Link
                  href="/articles/article4"
                  className="text-green-600 hover:text-green-700"
                >
                  Что сделать, чтобы добиться успеха
                </Link>
              </li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">
              Юридическая информация
            </h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-green-600 hover:text-green-700"
                >
                  Пользовательское соглашение
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-green-600 hover:text-green-700"
                >
                  Политика в отношении обработки персональных данных
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
