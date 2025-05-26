"use client";

// import { Header } from '@/components/ui/header';
// import { Button } from '@/components/ui/button';
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from 'react';
import {
  Youtube,
  Send,
  ChevronRight,
  CheckCircle2,
  CircleX,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation"; // Add this import
import { Footer } from "@/components/ui/footer";

export default function Home() {
  const router = useRouter(); // Add this line
  const [isChecked, setIsChecked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  // Add Schema.org microdata for the HomePage
  const homepageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "EightFaces: Soft Skills Engine - Главная страница",
    description: "Платформа для развития социальных навыков",
    mainEntity: {
      "@type": "Course",
      name: "EightFaces: Soft Skills Engine",
      description:
        "Онлайн-программа по преодолению социальных страхов и развитию уверенности в общении",
      provider: {
        "@type": "Person",
        name: "А. Зарипов",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json">
        {JSON.stringify(homepageSchema)}
      </script>
      {/* Header */}
      <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
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
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-600 hover:text-green-600"
              >
                В начало
              </button>
              <button
                onClick={() => scrollToSection("videos")}
                className="text-gray-600 hover:text-green-600"
              >
                О проекте
              </button>
              <button
                onClick={() => scrollToSection("connect")}
                className="text-gray-600 hover:text-green-600"
              >
                Мы в соцсетях
              </button>
              <Link
                href="/articles"
                className="text-gray-600 hover:text-green-600"
              >
                Статьи
              </Link>
              <button
                onClick={() => scrollToSection("start")}
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
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-600 hover:text-green-600"
            >
              В начало
            </button>
            <button
              onClick={() => scrollToSection("videos")}
              className="text-gray-600 hover:text-green-600"
            >
              О проекте
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-600 hover:text-green-600"
            >
              Мы в соцсетях
            </button>
            <Link
              href="/articles"
              className="text-gray-600 hover:text-green-600 text-center"
            >
              Статьи
            </Link>
            <button
              onClick={() => scrollToSection("start")}
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
          className="relative min-h-[95vh] flex items-center pt-16"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(/assets/party.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                EightFaces:
              </h1>
              <p className="text-3xl text-gray-200 mb-8">
                Пошаговая онлайн-программа для тех, кто хочет развить
                уверенность в общении и преодолеть застенчивость
              </p>
              <p className="text-gray-200 mb-4">
                Социальные страхи мешают многим умным и способным людям
                достигать целей.
                <br />
                Этот проект создан, чтобы помочь выстроить новые навыки общения
                и добиться желаемого. Вы сможете сделать первые шаги в
                безопасной обстановке.
              </p>
            </div>
          </div>
        </section>

        {/* Pre-Video Introduction */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Что вы здесь найдёте
                </h2>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">
                      Структурированную программу, разделённую на восемь
                      ключевых направлений (внимание, мышление, эмоции, речь,
                      поведение и др.)
                    </h3>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">
                      Пошаговые инструкции и практики с видео, транскриптами и
                      мини-тестами
                    </h3>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">
                      Возможность работать в комфортном темпе и в уединении
                      &mdash; без групповых заданий и посторонних глаз
                    </h3>
                  </div>
                </div>
              </div>

              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Чего здесь не будет
                </h2>
                <div className="flex items-start gap-4">
                  <CircleX className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">
                      Принуждения к контактам или заданий вроде &laquo;заговори
                      с незнакомцем в метро&raquo;
                    </h3>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CircleX className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">
                      Поверхностных советов в духе &laquo;поверь в себя&raquo;
                    </h3>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CircleX className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">
                      Навязчивой мотивации и давления &mdash; вы сами решаете,
                      когда двигаться вперёд
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section
          id="videos"
          className="py-32"
          style={{
            backgroundImage:
              "linear-gradient(rgba(243, 244, 246, 0.8), rgba(243, 244, 246, 0.8)), url(/assets/speaking.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="rounded-xl overflow-hidden shadow-xl bg-white">
                <div className="aspect-video">
                  <div
                    style={{ padding: "57.63% 0 0 0", position: "relative" }}
                  >
                    <iframe
                      src="https://player.vimeo.com/video/1059455108?h=33d55d43f5&badge=0&autopause=0&player_id=0&app_id=58479"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      title="Professional_Mode_The_main_character_motionlessly_"
                    ></iframe>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Что мешает вам действовать
                  </h3>
                  <p className="text-gray-600">
                    Разбираемся, как социальные страхи мешают реализовывать
                    желания и почему «хорошие парни» часто застревают на старте.
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-xl bg-white">
                <div className="aspect-video">
                  <div
                    style={{ padding: "57.63% 0 0 0", position: "relative" }}
                  >
                    <iframe
                      src="https://player.vimeo.com/video/1059455108?h=33d55d43f5&badge=0&autopause=0&player_id=0&app_id=58479"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      title="Professional_Mode_The_main_character_motionlessly_"
                    ></iframe>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Подходит ли вам этот проект
                  </h3>
                  <p className="text-gray-600">
                    Что нужно, чтобы работать над собой: мотивация, ресурсы,
                    минимальное понимание своей проблемы — и немного времени
                    каждый день.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Post-Video Content */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Что включает проект</h2>
              <p
                className="text-gray-600 mb-12"
                style={{ textAlign: "center" }}
              >
                Основа курса — современная когнитивно-поведенческая терапия и
                реальные клинические и коучинговые кейсы, адаптированные для
                самостоятельной работы.
                <br />
                Программа разделена на восемь тематических модулей и
                предполагает работу в трёх форматах:
                <br />
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Теоретические уроки</h3>
                  <p className="text-gray-600 text-sm">
                    Объясняют суть возникающих трудностей
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Упражнения</h3>
                  <p className="text-gray-600 text-sm">
                    Помогают подготовиться к действиям
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Практические приёмы </h3>
                  <p className="text-gray-600 text-sm">
                    Отработка навыков для применения в реальных ситуациях
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section - 4 */}
        <section
          id="videos_2"
          className="py-16"
          style={{
            backgroundImage:
              "linear-gradient(rgba(243, 244, 246, 0.8), rgba(243, 244, 246, 0.8)), url(/assets/employees.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="rounded-xl overflow-hidden shadow-xl bg-white">
                <div className="aspect-video">
                  <div
                    style={{ padding: "57.63% 0 0 0", position: "relative" }}
                  >
                    <iframe
                      src="https://player.vimeo.com/video/1059455108?h=33d55d43f5&badge=0&autopause=0&player_id=0&app_id=58479"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      title="Professional_Mode_The_main_character_motionlessly_"
                    ></iframe>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Из чего состоит программа
                  </h3>
                  <p className="text-gray-600">
                    Обзор восьми ключевых направлений работы: внимание, мысли,
                    эмоции, речь, поведение и другие составляющие уверенного
                    общения.
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-xl bg-white">
                <div className="aspect-video">
                  <div
                    style={{ padding: "57.63% 0 0 0", position: "relative" }}
                  >
                    <iframe
                      src="https://player.vimeo.com/video/1059455108?h=33d55d43f5&badge=0&autopause=0&player_id=0&app_id=58479"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      title="Professional_Mode_The_main_character_motionlessly_"
                    ></iframe>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Как устроен процесс обучения
                  </h3>
                  <p className="text-gray-600">
                    Показываем, как проходят уроки: теория, упражнения и
                    отработка. Что понадобится для работы.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Кто сможет пройти этот курс
                </h2>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">
                      Те, кто уже осознают свою проблему и готовы работать над
                      ней
                    </h3>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">
                      Те, у кого есть базовое школьное образование и опыт
                      самостоятельного обучения
                    </h3>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">
                      Те, кто может выделить время и силы: от 30 минут до часа в
                      день в течение нескольких месяцев
                    </h3>
                  </div>
                </div>
              </div>

              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                  С чего начать
                </h2>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">
                      Пройдите авторизацию через Google или GitHub
                    </h3>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">
                      Ознакомьтесь с модулями, выберите удобный темп
                    </h3>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">
                      Начните с первого урока &mdash; он доступен сразу
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section id="connect" className="container mx-auto px-4 py-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8">
              Следите за обновлениями проекта
            </h2>
            <div className="flex justify-center gap-6">
              <a
                href="#"
                className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                <Send className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-gray-600 text-lg mt-8 mb-6 text-justify border-b"></p>
            <p className="text-gray-600 mt-8 mb-8">
              Если почувствуете, что нужна поддержка &mdash; можно будет
              подключить личную работу с психотерапевтом.
            </p>

            <div className="flex items-center gap-4 justify-center">
              <a
                href="https://prodoctorov.ru/spb/vrach/531477-zaripov/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/assets/doc_logo.png"
                  alt="Отзывы на ПроДокторов"
                  width={150}
                  height={50}
                  style={{ height: "auto" }}
                />
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="start"
          className="relative py-16"
          style={{
            backgroundImage:
              "linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url(/assets/gangs.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8 text-white">
                Начнем меняться к лучшему?
              </h2>
              <div className="flex items-center justify-center gap-2 mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  Я соглашаюсь с{" "}
                  <Link href="/terms" className="underline">
                    пользовательским соглашением
                  </Link>{" "}
                  и{" "}
                  <Link href="/privacy" className="underline">
                    политикой конфиденциальности
                  </Link>
                </label>
              </div>
              <button
                className={`flex items-center justify-center gap-2 mx-auto px-8 py-4 text-white rounded-full text-lg font-semibold transition-all
                  ${
                    isChecked
                      ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                      : "bg-gray-600 cursor-not-allowed"
                  }`}
                disabled={!isChecked}
                onClick={() => isChecked && router.push("/lessons")}
              >
                Подключиться к проекту
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-center gap-2 mt-4 text-gray-400 text-sm">
                <Shield className="w-4 h-4" />
                <span>
                  Мы используем сквозное шифрование. Ваши данные защищены
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
