'use client';

// import { Header } from '@/components/ui/header';
// import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Youtube, Send, ChevronRight, CheckCircle2, Shield, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Add this import

export default function Home() {
  const router = useRouter(); // Add this line
  const [isChecked, setIsChecked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

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
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-green-600">В начало</button>
              <button onClick={() => scrollToSection('videos')} className="text-gray-600 hover:text-green-600">О проекте</button>
              <button onClick={() => scrollToSection('connect')} className="text-gray-600 hover:text-green-600">Мы в соцсетях</button>
              <Link href="/articles" className="text-gray-600 hover:text-green-600">Статьи</Link>
              <button 
                onClick={() => scrollToSection('start')}
                className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                Подключиться к проекту
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden py-4 border-t">
          <div className="flex flex-col gap-4">
            <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-green-600">В начало</button>
            <button onClick={() => scrollToSection('videos')} className="text-gray-600 hover:text-green-600">О проекте</button>
            <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-green-600">Мы в соцсетях</button>
            <Link href="/articles" className="text-gray-600 hover:text-green-600 text-center">Статьи</Link>
            <button 
              onClick={() => scrollToSection('start')}
              className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              Подключиться
            </button>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section 
          id="about"
          className="relative min-h-[90vh] flex items-center pt-16"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(/assets/party.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Превратить застенчивость в уверенность
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Чтобы победить застенчивость нужно пойти к психотерапевту.
                Чтобы пойти к психотерапевту нужно победить застенчивость.
              </p>
              <div className="flex flex-wrap gap-4 justify-center text-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Expert-led Training</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Practical Exercises</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Lifetime Access</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pre-Video Introduction */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Your Journey to Social Mastery</h2>
              <p className="text-gray-600 mb-8">
                Social anxiety and shyness can hold back even the most talented professionals. Our program, developed by leading psychotherapists, combines cognitive behavioral techniques with real-world scenarios tailored for the tech industry. Watch our introduction videos to learn how we can help you overcome these challenges and unlock your full potential.
              </p>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section 
          id="videos"
          className="py-16"
          style={{
            backgroundImage: 'linear-gradient(rgba(243, 244, 246, 0.8), rgba(243, 244, 246, 0.8)), url(/assets/speaking.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="rounded-xl overflow-hidden shadow-xl bg-white">
                <div className="aspect-video">
                  <div style={{ padding: '57.63% 0 0 0', position: 'relative' }}>
                    <iframe
                      src="https://player.vimeo.com/video/1059455108?h=33d55d43f5&badge=0&autopause=0&player_id=0&app_id=58479"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      title="Professional_Mode_The_main_character_motionlessly_"
                    ></iframe>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Understanding Social Anxiety</h3>
                  <p className="text-gray-600">Learn about the science behind social anxiety and how it affects tech professionals. Our expert psychotherapists break down the cognitive patterns that hold you back.</p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-xl bg-white">
                <div className="aspect-video">
                  <div style={{ padding: '57.63% 0 0 0', position: 'relative' }}>
                    <iframe
                      src="https://player.vimeo.com/video/1059455108?h=33d55d43f5&badge=0&autopause=0&player_id=0&app_id=58479"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      title="Professional_Mode_The_main_character_motionlessly_"
                    ></iframe>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Success Stories</h3>
                  <p className="text-gray-600">Hear from tech professionals who transformed their social confidence through our program. Real stories, real results, and actionable insights you can apply today.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Post-Video Content */}
        <section className="bg-white py-16" 
                  style={{
                    backgroundImage: 'linear-gradient(rgba(243, 244, 246, 0.8), rgba(243, 244, 246, 0.8)), url(/assets/speaking.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                  }}>
          
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Что Вы здесь найдёте?</h2>
              <p className="text-gray-600 mb-12" style={{ textAlign: 'center' }}>
              Здесь последовательно изложены методы, которые помогли сотням моих клиентов. В проекте три типа видеоуроков: разборы теории, демонстрации упражнений и интерактивные тренажёры. Эти уроки дублируют и дополняют занятия, которые мы проводим на сеансах психотерапии.<br />
                Этот проект не подходит тем, кто верит в чудеса. Вы не найдёте на этом сайте волшебные тайные техники.<br />
                Два секрета: я сгруппировал материал так, чтобы Вы смогли разобраться в многообразии подходов; мы исправляем типичные ошибки.<br />
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Workplace Communication</h3>
                  <p className="text-gray-600 text-sm">Master team interactions and professional relationships</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Networking Skills</h3>
                  <p className="text-gray-600 text-sm">Build genuine connections at tech events and conferences</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Leadership Presence</h3>
                  <p className="text-gray-600 text-sm">Develop executive presence and management skills</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section - 2 */}
        <section 
          id="videos_2"
          className="py-16"
          style={{
            backgroundImage: 'linear-gradient(rgba(243, 244, 246, 0.8), rgba(243, 244, 246, 0.8)), url(/assets/employees.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="rounded-xl overflow-hidden shadow-xl bg-white">
                <div className="aspect-video">
                  <div style={{ padding: '57.63% 0 0 0', position: 'relative' }}>
                    <iframe
                      src="https://player.vimeo.com/video/1059455108?h=33d55d43f5&badge=0&autopause=0&player_id=0&app_id=58479"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      title="Professional_Mode_The_main_character_motionlessly_"
                    ></iframe>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Understanding Social Anxiety</h3>
                  <p className="text-gray-600">Learn about the science behind social anxiety and how it affects tech professionals. Our expert psychotherapists break down the cognitive patterns that hold you back.</p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-xl bg-white">
                <div className="aspect-video">
                  <div style={{ padding: '57.63% 0 0 0', position: 'relative' }}>
                    <iframe
                      src="https://player.vimeo.com/video/1059455108?h=33d55d43f5&badge=0&autopause=0&player_id=0&app_id=58479"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      title="Professional_Mode_The_main_character_motionlessly_"
                    ></iframe>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Success Stories</h3>
                  <p className="text-gray-600">Hear from tech professionals who transformed their social confidence through our program. Real stories, real results, and actionable insights you can apply today.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section 
          id="features"
          className="py-16"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(/assets/employees.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Program?</h2>
              <div className="grid gap-8">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Expert-Led Training</h3>
                    <p className="text-gray-600">Developed by experienced psychotherapists who understand the unique challenges faced by tech professionals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Practical Approach</h3>
                    <p className="text-gray-600">Real-world scenarios and exercises designed specifically for workplace and professional networking situations.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
                    <p className="text-gray-600">Self-paced modules that fit into your busy schedule, with lifetime access to all materials.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section id="connect" className="container mx-auto px-4 py-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8">Следите за обновлениями проекта</h2>
            <div className="flex justify-center gap-6">
              <a href="#" className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                <Send className="w-6 h-6" />
              </a>
            </div>
          </div>
          </section>
        


        {/* CTA Section */}
        <section 
          id="start"
          className="relative py-16"
          style={{
            backgroundImage: 'linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url(/assets/gangs.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8 text-white">Начнем меняться к лучшему?</h2>
              <div className="flex items-center justify-center gap-2 mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  Я соглашаюсь с <Link href="/terms" className="underline">пользовательским соглашеним</Link> и{' '}
                  <Link href="/privacy" className="underline">политикой конфиденциальности</Link>
                </label>
              </div>
              <button
                className={`flex items-center justify-center gap-2 mx-auto px-8 py-4 text-white rounded-full text-lg font-semibold transition-all
                  ${isChecked 
                    ? 'bg-green-600 hover:bg-green-700 cursor-pointer' 
                    : 'bg-gray-600 cursor-not-allowed'}`}
                disabled={!isChecked}
                onClick={() => isChecked && router.push('/lessons')}
              >
                Подключиться к проекту
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-center gap-2 mt-4 text-gray-400 text-sm">
                <Shield className="w-4 h-4" />
                <span>Ваши данные защищены</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">

          <p className="mb-2">&copy; {new Date().getFullYear()} EightFaces: Soft Skills Engine</p>
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