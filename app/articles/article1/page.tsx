'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Article1() {
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
                src="/assets/diagnose.png" 
                alt="Почему не стоит ставить себе диагнозы" 
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-6" 
              />
              <h1 className="text-3xl font-bold mb-4">Почему не стоит ставить себе диагнозы</h1>
              <p className="text-gray-600 text-lg mb-6 border-b pb-6">
                This is a short description of the first article. It provides a brief overview of what readers can expect when they read the full article. The content is engaging and informative.
              </p>
            </div>
            
            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p>
                В современном мире, где информация о психических расстройствах широко доступна, многие люди склонны самостоятельно диагностировать у себя различные состояния. Однако это может привести к серьезным проблемам.
              </p>
              
              <h2 className="mt-8 mb-4 text-2xl font-bold">Почему самодиагностика может быть опасной</h2>
              
              <p>
                Самодиагностика часто приводит к неправильным выводам. Симптомы многих психических расстройств пересекаются, и без профессиональной подготовки легко спутать одно состояние с другим. Кроме того, наличие некоторых симптомов не обязательно означает наличие расстройства.
              </p>
              
              <p>
                Когда человек ставит себе диагноз, он может начать вести себя в соответствии с этим диагнозом, что может усилить симптомы или создать новые. Это явление известно как "эффект ярлыка" или "самоисполняющееся пророчество".
              </p>
              
              <h2 className="mt-8 mb-4 text-2xl font-bold">Роль профессиональной диагностики</h2>
              
              <p>
                Профессиональные психологи и психиатры проходят многолетнее обучение и имеют опыт работы с различными психическими состояниями. Они используют стандартизированные методы оценки и могут учитывать множество факторов, которые человек может не заметить при самодиагностике.
              </p>
              
              <p>
                Кроме того, профессионалы могут предложить соответствующее лечение и поддержку, основанные на точном диагнозе. Самолечение на основе самодиагностики может быть неэффективным или даже вредным.
              </p>
              
              <h2 className="mt-8 mb-4 text-2xl font-bold">Что делать вместо самодиагностики</h2>
              
              <ul className="list-disc pl-6 mb-6">
                <li>Обратитесь к квалифицированному специалисту в области психического здоровья.</li>
                <li>Ведите дневник своих симптомов и состояний, чтобы предоставить специалисту более полную информацию.</li>
                <li>Используйте надежные источники информации для образования, но не для диагностики.</li>
                <li>Помните, что наличие некоторых трудностей не обязательно означает наличие расстройства.</li>
              </ul>
              
              <p>
                Забота о своем психическом здоровье важна, но она должна включать в себя профессиональную помощь. Если вы испытываете трудности, не стесняйтесь обращаться за поддержкой к квалифицированным специалистам.
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