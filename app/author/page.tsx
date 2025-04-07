'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { ArrowLeft } from 'lucide-react';

export default function Author() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/assets/diamond_logo_green.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  style={{ width: "10%", height: "auto" }}
                />
                <span className="text-gray-600 font-bold">
                  EightFaces: Soft Skills Engine
                </span>
              </Link>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              <ArrowLeft className="w-5 h-5" />На главную страницу
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20 bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
            {/* Author Header */}
            <div className="mb-8 md:flex items-start gap-8">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <Image 
                  src="/assets/attention.png" 
                  alt="Зарипов Айрат Ахмадуллович" 
                  width={100}
                  height={100}
                  style={{ width: "100%", height: "auto" }} 
                />
              </div>
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold mb-4">Зарипов Айрат Ахмадуллович</h1>
                <div className="text-gray-600 mb-4">
                  <p className="mb-2"><strong>Специальность:</strong> Психотерапевт, психиатр</p>
                  <p className="mb-2"><strong>Стаж:</strong> 27 лет</p>
                  <p className="mb-2"><strong>Категория:</strong> Высшая квалификационная категория</p>
                  <p className="mb-2"><strong>Образование:</strong> Санкт-Петербургский государственный медицинский университет им. акад. И.П. Павлова</p>
                </div>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://prodoctorov.ru/spb/vrach/531477-zaripov/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                  >
                    Отзывы на ПроДокторов
                  </a>
                </div>
              </div>
            </div>
            
            {/* Author Content */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">О специалисте</h2>
              
              <p>
                Айрат Ахмадуллович Зарипов — опытный психотерапевт и психиатр с 27-летним стажем работы. Специализируется на когнитивно-поведенческой терапии и помощи людям с социальной тревожностью, застенчивостью и другими проблемами в сфере коммуникации.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Профессиональный опыт</h2>
              
              <p>
                За годы практики Айрат Ахмадуллович помог сотням клиентов преодолеть социальную тревогу и развить навыки эффективного общения. Его подход основан на научно доказанных методах когнитивно-поведенческой терапии, адаптированных для решения конкретных проблем в сфере социального взаимодействия.
              </p>
              
              <p>
                Особое внимание в своей работе уделяет проблемам технических специалистов, которые часто сталкиваются с трудностями в коммуникации на рабочем месте и в профессиональной среде.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Образование и квалификация</h2>
              
              <ul className="list-disc pl-6 mb-6">
                <li>Санкт-Петербургский государственный медицинский университет им. акад. И.П. Павлова</li>
                <li>Специализация по психиатрии и психотерапии</li>
                <li>Высшая квалификационная категория</li>
                <li>Регулярное повышение квалификации в области когнитивно-поведенческой терапии</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Подход к лечению</h2>
              
              <p>
                В своей работе Айрат Ахмадуллович использует комплексный подход, сочетающий методы когнитивно-поведенческой терапии с элементами других эффективных терапевтических направлений. Он помогает клиентам:
              </p>
              
              <ul className="list-disc pl-6 mb-6">
                <li>Выявить и изменить негативные мыслительные паттерны, вызывающие тревогу</li>
                <li>Развить практические навыки общения в различных социальных ситуациях</li>
                <li>Преодолеть страх оценки и критики со стороны окружающих</li>
                <li>Повысить уверенность в себе и своих коммуникативных способностях</li>
                <li>Научиться эффективно взаимодействовать в профессиональной среде</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Проект EightFaces</h2>
              
              <p>
                Проект EightFaces: Soft Skills Engine — это результат многолетнего опыта работы Айрата Ахмадулловича с клиентами, испытывающими трудности в социальном взаимодействии. В рамках проекта собраны и систематизированы наиболее эффективные методики и упражнения, помогающие преодолеть социальную тревогу и развить навыки уверенного общения.
              </p>
              
              <p>
                Особенность проекта заключается в его практической направленности и адаптации к потребностям технических специалистов, которые часто сталкиваются с уникальными коммуникативными вызовами в своей профессиональной деятельности.
              </p>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}