'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Article3() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            
            <Link href="/articles" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700">
              <ArrowLeft className="w-5 h-5" />
              К списку статей
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20 bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            {/* Article Header */}
            <div className="mb-8">
              <img 
                src="/assets/chutzpah.png" 
                alt="Уверенность в себе и хуцпа" 
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-6" 
              />
              <h1 className="text-3xl font-bold mb-4">Уверенность в себе и хуцпа</h1>
              <p className="text-gray-600 text-lg mb-6 border-b pb-6">
                The third article description provides a glimpse into the content and insights that readers will gain. It's designed to pique interest and encourage further reading.
              </p>
            </div>
            
            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p>
                Уверенность в себе — это качество, которое многие стремятся развить. Однако существует тонкая грань между здоровой уверенностью и чрезмерной самоуверенностью. В этой статье мы рассмотрим концепцию "хуцпы" и ее отношение к уверенности в себе.
              </p>
              
              <h2 className="mt-8 mb-4 text-2xl font-bold">Что такое хуцпа?</h2>
              
              <p>
                Хуцпа (от идиш חוצפה) — это термин, который описывает крайнюю самоуверенность, граничащую с дерзостью или наглостью. Это качество, которое включает в себя смелость, уверенность и готовность нарушать общепринятые нормы для достижения своих целей.
              </p>
              
              <p>
                В некоторых контекстах хуцпа может рассматриваться как положительное качество, особенно когда она проявляется в форме смелости противостоять несправедливости или преодолевать значительные препятствия. В других контекстах она может восприниматься как негативное качество, связанное с бесцеремонностью и неуважением к другим.
              </p>
              
              <h2 className="mt-8 mb-4 text-2xl font-bold">Здоровая уверенность в себе</h2>
              
              <p>
                Здоровая уверенность в себе основана на реалистичной оценке своих способностей и ценности. Она включает в себя:
              </p>
              
              <ul className="list-disc pl-6 mb-6">
                <li>Принятие своих сильных и слабых сторон</li>
                <li>Готовность пробовать новое и рисковать</li>
                <li>Способность отстаивать свои границы и потребности</li>
                <li>Уважение к себе и другим</li>
              </ul>
              
              <p>
                Люди со здоровой уверенностью в себе могут признавать свои ошибки, учиться на них и продолжать двигаться вперед. Они не нуждаются в постоянном внешнем подтверждении своей ценности.
              </p>
              
              <h2 className="mt-8 mb-4 text-2xl font-bold">Когда хуцпа может быть полезной</h2>
              
              <p>
                В некоторых ситуациях элементы хуцпы могут быть полезными:
              </p>
              
              <ul className="list-disc pl-6 mb-6">
                <li>При преодолении значительных препятствий или предубеждений</li>
                <li>В ситуациях, требующих инновационного мышления и нарушения статус-кво</li>
                <li>Когда необходимо отстаивать свои права или права других</li>
                <li>В конкурентной среде, где агрессивный подход может быть необходим</li>
              </ul>
              
              <h2 className="mt-8 mb-4 text-2xl font-bold">Баланс между уверенностью и уважением</h2>
              
              <p>
                Ключ к эффективному использованию уверенности в себе — это баланс между отстаиванием своих интересов и уважением к другим. Здоровая уверенность позволяет достигать своих целей, не причиняя вреда окружающим.
              </p>
              
              <p>
                Развитие этого баланса требует самосознания, эмпатии и постоянной практики. Это включает в себя умение слушать других, признавать различные точки зрения и находить решения, которые учитывают потребности всех сторон.
              </p>
              
              <p>
                В конечном счете, наиболее эффективная форма уверенности в себе — это та, которая позволяет вам достигать своих целей, сохраняя при этом здоровые отношения с окружающими и оставаясь верным своим ценностям.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">

          </div>
          <p>&copy; {new Date().getFullYear()} EightFaces: Soft Skills Engine</p>
        </div>
      </footer>
    </div>
  );
}