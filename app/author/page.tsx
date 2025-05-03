"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

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
              <ArrowLeft className="w-5 h-5" />
              На главную страницу
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20 bg-gray-100">
        <div className="container mx-auto px-4 py-8 ">
          <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
            {/* Author Header */}
            <div className="mb-8 flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3 mb-6 md:mb-0 md:ml-36 flex justify-center md:justify-start">
                <Image
                  src="/assets/author.png"
                  alt="Зарипов Айрат Ахмадуллович"
                  width={1000}
                  height={1000}
                  style={{ width: "80%", height: "auto" }}
                  className="max-w-xs"
                />
              </div>
              <div className="w-full md:w-2/3 flex flex-col justify-center">
                <div>
                  <p className="text-gray-600 text-lg mb-6 text-center md:mr-36">
                    Привет! Меня зовут Айрат Зарипов.
                  </p>
                  <p className="text-gray-600 text-lg mb-6 text-justify md:mr-36">
                    Я помогаю справляться с внутренними барьерами: преодолевать
                    тревогу, страхи и панику. Но преодоление &ndash; не главная
                    цель, это средство, с помощью которого мои клиенты реализуют
                    свои мечты и желания.
                  </p>
                </div>
              </div>
            </div>

            {/* Author Content */}
            <div className="prose prose-lg max-w-4xl text-gray-600 text-lg mb-6 text-justify">
              <p>Я учился у признанных мастеров:</p>
              <ul>
                <li>
                  <strong>Стивена Хейса</strong> &mdash; создателя терапии
                  принятия и ответственности (ACT), одного из создателей
                  реляционной теории фреймов.
                </li>
                <li>
                  <strong>Альфрида Ленгле</strong> &mdash; основателя
                  экзистенциального анализа.
                </li>
                <li>
                  <strong>Сергея Горина</strong> &mdash; одного из первых
                  преподавателей Нейролингвистического программирования и
                  Эриксоновского гипноза в России.
                </li>
                <li>
                  <strong>Владимира Менделевича</strong> &mdash; спасибо ему,
                  что взял меня в студенческое научное общество психиатрии.
                </li>

                <li>
                  Не могу упомянуть фамилии моих преподавателей из Института
                  криминалистики и Академии ФСБ, но благодарен им за то, что они
                  вбили в наши головы практические знания. Жёстко, но
                  уважительно.
                </li>
              </ul>
              <p>
                Я получил диплом врача в Военно-медицинском институте ФПС РФ.
                Четыре года послужил войсковым врачом. Если Вы читали
                &laquo;Записки молодого врача&raquo; Булгакова, то можете
                представить, что это такое.
              </p>
              <p>
                В 2001 году перешёл в госпиталь психиатром-психотерапевтом и
                занялся любимым делом: помогал хорошим парням, которые
                пострадали от плохих парней.
              </p>
              <p>
                В 2016 году я снял погоны и с тех пор лечу людей в частной
                клинике.
              </p>
              <p>
                Много лет обучал молодых сотрудников и начинающих руководителей
                демонстрировать уверенное поведение, подмечать нюансы поведения
                других людей, с помощью этого выстраивать продуктивные
                отношения.
              </p>
              <p>
                Однажды меня пригласили помочь с большими медицинскими данными,
                и так провёл пятнадцать лет в компании с айтишниками. Последние
                годы мы пытаемся обучить искусственный интеллект тому, что сами
                умеем.
              </p>

              <p className="text-gray-600 text-lg mb-6 text-justify border-b"></p>
              <p>
                Прочитать подробную информацию и записаться на приём Вы можете
                на сайте ПроДокторов.
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
          </div>
        </div>
      </main>
    </div>
  );
}
