'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Article4() {
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
                src="/assets/emotional.png" 
                alt="Социальный интеллект или эмоциональный интеллект" 
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-6" 
              />
              <h1 className="text-3xl font-bold mb-4">Социальный интеллект или эмоциональный интеллект</h1>
              <p className="text-gray-600 text-lg mb-6 border-b pb-6">
                This description for the fourth article summarizes the key themes and takeaways. It gives readers a reason to click and read the complete article for more detailed information.
              </p>
            </div>
            
            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p>
                Термины "социальный интеллект" и "эмоциональный интеллект" часто используются взаимозаменяемо, но на самом деле они описывают разные, хотя и связанные, аспекты человеческих способностей. В этой статье мы рассмотрим различия и сходства между этими двумя концепциями.
              </p>
              
              <h2 className="mt-8 mb-4 text-2xl font-bold">Что такое эмоциональный интеллект?</h2>
              
              <p>
                Эмоциональный интеллект (EQ) — это способность распознавать, понимать и управлять своими собственными эмоциями, а также распознавать и влиять на эмоции других. Концепция была популяризирована психологом Дэниелом Гоулманом в 1990-х годах.
              </p>
              
              <p>
                Эмоциональный интеллект включает в себя несколько ключевых компонентов:
              </p>
              
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Самосознание:</strong> Понимание своих эмоций, сильных и слабых сторон, ценностей и целей.</li>
                <li><strong>Саморегуляция:</strong> Способность контролировать или перенаправлять разрушительные эмоции и импульсы.</li>
                <li><strong>Мотивация:</strong> Стремление к достижению целей с энергией и настойчивостью.</li>
                <li><strong>Эмпатия:</strong> Способность понимать эмоциональный состав других людей.</li>
                <li><strong>Социальные навыки:</strong> Умение управлять отношениями и строить сети.</li>
              </ul>
              
              <h2 className="mt-8 mb-4 text-2xl font-bold">Что такое социальный интеллект?</h2>
              
              <p>
                Социальный интеллект (SQ) — это способность эффективно ориентироваться в социальных ситуациях, понимать социальные нормы и правила, а также адаптировать свое поведение к различным социальным контекстам. Концепция была впервые предложена психологом Эдвардом Торндайком в 1920 году.
              </p>
              
              <p>
                Социальный интеллект включает в себя:
              </p>
              
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Социальное восприятие:</strong> Способность точно воспринимать и интерпретировать социальные сигналы и поведение других.</li>
                <li><strong>Социальное знание:</strong> Понимание социальных норм, правил и ожиданий в различных контекстах.</li>
                <li><strong>Социальная адаптация:</strong> Способность адаптировать свое поведение к различным социальным ситуациям.</li>
                <li><strong>Социальное взаимодействие:</strong> Умение эффективно взаимодействовать с другими людьми.</li>
              </ul>
              
              <h2 className="mt-8 mb-4 text-2xl font-bold">Различия между эмоциональным и социальным интеллектом</h2>
              
              <p>
                Хотя эмоциональный и социальный интеллект тесно связаны, между ними есть важные различия:
              </p>
              
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Фокус:</strong> Эмоциональный интеллект фокусируется на эмоциях (своих и других), в то время как социальный интеллект фокусируется на социальных взаимодействиях и контекстах.</li>
                <li><strong>Область применения:</strong> Эмоциональный интеллект применим как к личным, так и к межличностным ситуациям, в то время как социальный интеллект в основном применим к межличностным и групповым ситуациям.</li>
                <li><strong>Навыки:</strong> Эмоциональный интеллект включает в себя навыки управления эмоциями, в то время как социальный интеллект включает в себя навыки навигации в социальных ситуациях.</li>
              </ul>
              
              <h2 className="mt-8 mb-4 text-2xl font-bold">Как они работают вместе</h2>
              
              <p>
                Эмоциональный и социальный интеллект часто работают вместе, дополняя друг друга. Например, эмпатия (компонент эмоционального интеллекта) может помочь вам лучше понять социальные сигналы (аспект социального интеллекта). Аналогично, понимание социальных норм (компонент социального интеллекта) может помочь вам лучше регулировать свои эмоции в социальных ситуациях (аспект эмоционального интеллекта).
              </p>
              
              <p>
                Развитие обоих типов интеллекта может значительно улучшить вашу способность эффективно взаимодействовать с другими людьми, строить здоровые отношения и достигать успеха в различных социальных и профессиональных контекстах.
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