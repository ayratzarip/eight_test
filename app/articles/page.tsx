"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Articles() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img
                src="/assets/diamond_logo_green.png"
                alt="Logo"
                style={{ width: "10%", height: "auto" }}
              />
              <span className="text-gray-600 font-bold">
                EightFaces: Soft Skills Engine
              </span>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              <ArrowLeft className="w-5 h-5" />
              На главную страницу
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16 bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
            {/* Article 4 (now first) */}
            <div className="border-b pb-8 mb-8 last:border-0 last:mb-0 last:pb-0">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src="/assets/emotional.png"
                    alt="Article 4"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="text-2xl font-bold mb-3">
                    Социальный интеллект или эмоциональный интеллект
                  </h3>
                  <p className="text-gray-600 mb-4">
                    This description for the fourth article summarizes the key
                    themes and takeaways. It gives readers a reason to click and
                    read the complete article for more detailed information.
                  </p>
                  <Link href="/articles/article4">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                      Читать
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Article 3 (now second) */}
            <div className="border-b pb-8 mb-8 last:border-0 last:mb-0 last:pb-0">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src="/assets/chutzpah.png"
                    alt="Article 3"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="text-2xl font-bold mb-3">
                    Уверенность в себе и хуцпа
                  </h3>
                  <p className="text-gray-600 mb-4">
                    The third article description provides a glimpse into the
                    content and insights that readers will gain. It's designed
                    to pique interest and encourage further reading.
                  </p>
                  <Link href="/articles/article3">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                      Читать
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Article 2 (now third) */}
            <div className="border-b pb-8 mb-8 last:border-0 last:mb-0 last:pb-0">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src="/assets/diagnose.png"
                    alt="Article 2"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="text-2xl font-bold mb-3">
                    Почему не стоит ставить себе диагнозы
                  </h3>
                  <p className="text-gray-600 mb-4">
                    This is a short description of the first article. It
                    provides a brief overview of what readers can expect when
                    they read the full article. The content is engaging and
                    informative.
                  </p>
                  <Link href="/articles/article2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                      Читать
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Article 1 (now last) */}
            <div className="border-b pb-8 mb-8 last:border-0 last:mb-0 last:pb-0">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src="/assets/autis.png"
                    alt="Article 1"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="text-2xl font-bold mb-3">
                    Просто застенчивость или социальная тревога, или
                    расстройство аутистического спектра
                  </h3>
                  <p className="text-gray-600 mb-4">
                    В теории это разные состояния, но на практике это не так
                    однозначно и просто. Когда проблемы в социальных ситуациях
                    возникают у интеллектуальных и образованных взрослых людей,
                    сложно выделить единственную причину. В статье предлагается
                    прагматичный подход к подобным ситуациям.
                  </p>
                  <Link href="/articles/article1">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                      Читать
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} EightFaces: Soft Skills Engine
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <Link href="/sitemap" className="text-gray-400 hover:text-white">
              Карта сайта
            </Link>
            <Link href="/author" className="text-gray-400 hover:text-white">
              Об авторе
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white">
              Пользовательское соглашение
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
