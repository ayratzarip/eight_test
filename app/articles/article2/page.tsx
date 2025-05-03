"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { TriangleAlert } from "lucide-react";

export default function Article2() {
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
              href="/articles"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              <ArrowLeft className="w-5 h-5" />К списку статей
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20 bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
            {/* Article Header */}
            <div className="mb-8">
              <Image
                src="/assets/diagnose.png"
                alt="Не ищите причину неуверенности и застенчивости"
                width={1200}
                height={630}
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
                priority
              />
            </div>
            {/* Article Content */}
            <div className="prose prose-lg max-w-4xl">
              <h1 className="font-bold mb-6 text-center">
                <strong>Не ищите причину неуверенности и застенчивости </strong>
              </h1>
              <p className="text-gray-600 text-sm mb-6 text-justify ml-16">
                <em>
                  Когда созрело яблоко и падает, &mdash; отчего оно падает?
                  Оттого ли, что тяготеет к земле, оттого ли, что засыхает
                  стержень, оттого ли, что сушится солнцем, что тяжелеет, что
                  ветер трясёт его, оттого ли, что стоящему внизу мальчику
                  хочется съесть его? Ничто не причина. Все это только
                  совпадение тех условий, при которых совершается всякое
                  жизненное, органическое, стихийное событие.{" "}
                </em>{" "}
                <br />
                <strong>
                  <em>Л. Н. Толстой. Война и мир. Том третий. Часть первая.</em>
                </strong>
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify border-b"></p>
              <p className="text-gray-600 text-lg mb-6 text-justify ">
                Вы пришили к психологу, чтобы устранить застенчивость, побороть
                неуверенность в себе, или решить другую психологическую
                проблему. Психолог говорит, что главное найти причину. Уточните
                у него, что он имеет в виду. Мы, врачи, вместо слова{" "}
                <em>причина </em> используем три разных греческих термина:{" "}
                <em>детерминация, этиология и патогенез.</em>
              </p>
              <h2 className="font-bold mb-4">
                <strong>Три разных ответа на один вопрос</strong>
              </h2>
              <p className="text-gray-600 text-lg mb-6 text-justify ">
                Я заболел коронавирусной инфекцией. Давайте три раза ответим на
                вопрос: почему ?
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify ">
                <strong>Детерминация или причинно-следственные связи</strong>{" "}
              </p>
              <p className="text-gray-600 mb-6 text-justify ml-16">
                Я заболел, потому что в метро взялся рукой за поручень и потёр
                глаза. Передо мной на эскалатор встал гражданин Иванов, который
                болел коронавирусом. Он ехал без маски и кашлянул прямо на
                поручень. Он не соблюдал правила, потому что его плохо
                воспитывали: его папа пил и бросил семью, мама все время
                проводила в поисках нового мужа. Мама стала такой, потому что её
                мама её баловала&hellip; Дальнейшие размышления: <br />
                &nbsp; - Дадут бесконечные разветвления.
                <br />
                &nbsp; - Дойдут до динозавров.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify ">
                Детерминизм &ndash; основа современной науки, так должны думать
                учёные и философы. Причинность необходима в суде, например, если
                я захотел бы потребовать с гражданина Иванова компенсацию. Но
                больному от таких рассуждений не легче.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify ">
                <strong>Этиология</strong>
              </p>
              <p className="text-gray-600 mb-6 text-justify ml-16">
                COVID-19 вызывается коронавирусом SARS-CoV-2.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify ">
                Поиск этиологии &ndash; важный научный процесс. Это нужно для
                правильной классификации болезней. Это нужно, чтобы власти
                подсчитывали сколько человек чем болеют, какие меры принимать,
                сколько денег на что тратить. Иногда если знаешь этиологию, то
                можешь спрогнозировать, когда поправится больной, станет ли ему
                хуже. К сожалению, этиотропное лечение болезней &ndash;
                редкость. Мы умеем останавливать рост многих бактерий, но мы не
                умеем убивать вирусы.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify ">
                <strong>Патогенез</strong>
              </p>
              <p className="text-gray-600 mb-6 text-justify ml-16">
                Мне стало плохо, потому что вирус попал в клетки, убил их, при
                распаде высвободились биополимерные молекулы, на них
                отреагировали соседние клетки и клетки крови, последние
                выбросили цитокины и хемокины, которые начали поражать здоровые
                клетки по всему организму.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify ">
                Если знаешь патогенез, то понимаешь, что происходит с больным
                прямо сейчас. Если я знаю, какие органические молекулы делают
                мне плохо прямо сейчас, я могу выпить таблетки, которые
                блокируют эти молекулы. Так я разрушу схему, по которой
                развивается болезнь. Такое знание поможет вылечиться.
              </p>
              <h2 className="font-bold mb-4">
                <strong>Почему не стоит искать причину </strong>
              </h2>
              <p className="text-gray-600 text-lg mb-6 text-justify ">
                Люди без медицинского образования под причиной понимают либо
                детерминацию, либо этиологию. Врачи &ndash; этиологию и
                патогенез.
              </p>
              <h3 className="font-bold mb-4">
                <strong>Детерминация</strong>
              </h3>
              <p className="text-gray-600 text-lg mb-6 text-justify ">
                Вы можете прийти к психологу с конкретной проблемой, а будете
                бесконечно искать причинно-следственную связь. Вам предложат
                какую-нибудь теорию или интерпретацию прошлых событий. Например,
                расскажут, что Вы стали застенчивым из-за отвержения
                эмоционально холодной матери или, наоборот, из-за чрезмерной
                опеки эмотивной мамы. Но Вам не предложат машину времени, чтобы
                слетать в прошлое и исправить ошибки воспитания. Лучше Вам не
                станет.
              </p>
              <h3 className="font-bold mb-4">
                <strong>Этиология</strong>
              </h3>
              <p className="text-gray-600 text-lg mb-6 text-justify ">
                Этиология душевных заболеваний загадочна, мы обходимся шаткими
                теориями об их происхождении. Исследователи считают, что
                большинство психических заболеваний возникают при совпадении
                нескольких факторов. Этиологию застенчивости или неуверенности в
                себе никто серьёзно не изучает, так как это не болезни, и каждый
                понимает слова застенчивость и неуверенность в себе по-своему.
              </p>
              <h3 className="font-bold mb-4">
                <strong>Патогенез</strong>
              </h3>
              <p className="text-gray-600 text-lg mb-6 text-justify ">
                &laquo;Голова &ndash; предмет тёмный и исследованию не
                подлежит&raquo;, - сказал один киноперсонаж. Он не прав, учёные
                активно изучают патогенез психических заболеваний. На
                молекулярном уровне всё очень сложно, пока не совсем ясно. Но мы
                уже хорошо понимаем, как у людей происходят сбои в обработке и
                анализе информации, как субъективные убеждения влияют на эмоции
                и поведение, как формируются и исчезают условные рефлексы, как
                мы передаём информацию невербально. Мы можем применить эти
                знания в каждом конкретном случае и понять, как именно человек
                делается неуверенным и застенчивым.
              </p>
              <h2 className="font-bold mb-4">
                <strong>Что в итоге</strong>
              </h2>
              <p className="text-gray-600 text-lg mb-6 text-justify ">
                Если Вы застенчивый или неуверенный в себе человек, то вместо
                поиска причинно-следственных связей и источника проблемы,
                сосредоточьтесь на том, что происходит во время общения с
                людьми. Вместо вопроса &laquo;почему?&raquo; спросите себя
                &laquo;как я делаю себя застенчивым и неуверенным?&raquo;
              </p>
              <h2 className="font-bold mb-4">
                <strong>Какие вопросы задать себе вместо поиска причины</strong>
              </h2>
              <p className="my-4">
                <Image
                  src="/assets/diagnosis_diagram.jpg"
                  alt="Алгоритм действий при социальных проблемах"
                  width={800}
                  height={150}
                  className="w-full"
                />
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify border-b">
                Вместо того, чтобы искать причины и пытаться поставить себе
                диагноз ответьте на несколько простых вопросов:
              </p>
              <ol>
                <li className="text-gray-600 text-lg mb-6 text-justify ">
                  <strong>Все ли меня устраивает в моей жизни?</strong>
                  <br />
                  <em>- Да.</em> Дружно Вам завидуем. Для чего Вы читаете эту
                  статью?
                  <br />
                  <em>- Нет.</em> Двигаемся дальше.
                  <br />
                </li>
              </ol>
              <p className="text-gray-600 text-lg mb-6 text-justify border-b">
                Современные психотерапевты используют понятия
                адаптация-дезадаптация, вместо нормальный-сумасшедший. Адаптация
                &ndash; это когда Вас Ваша жизнь устраивает, и Вы никому не
                мешаете.
              </p>
              <ol start={2}>
                <li className="text-gray-600 text-lg mb-6 text-justify ">
                  <strong>Проблемы в моей душевной организации?</strong>
                  <br />
                  <em>- Нет.</em> Вам не сюда. Обратитесь к другому специалисту.
                  <br />
                  <em>- Да.</em> Двигаемся дальше.
                  <br />
                </li>
              </ol>
              <p className="text-gray-600 text-lg mb-6 text-justify border-b">
                Иногда обстоятельства сильнее нас: неизлечимые болезни тела,
                стихийные бедствия, злые люди. Не из любой ситуации есть выход.
              </p>

              <ol start={3}>
                <li className="text-gray-600 text-lg mb-6 text-justify">
                  <strong>
                    Исчезнут ли проблемы, если я окажусь на необитаемом острове?
                  </strong>
                  <br />
                  <em>- Нет.</em> Вам не сюда. Обратитесь к другому специалисту.
                  <br />
                  <em>- Да.</em> Двигаемся дальше.
                  <br />
                </li>
              </ol>
              <p className="text-gray-600 text-lg mb-6 text-justify border-b">
                Застенчивость и неуверенность в себе возникают в публичных
                ситуациях либо в ожидании социальных взаимодействий. Проще
                говоря, Вы не будете бояться попросить повышения зарплаты у
                начальника если его не существует. Вы не будете стесняться
                показать свои рисунки, если не будет тех, кто сможет их
                посмотреть. Депрессия, страхи, галлюцинации останутся и на
                необитаемом острове.
              </p>

              <ol start={4}>
                <li className="text-gray-600 text-lg mb-6 text-justify">
                  <strong>В каком из элементов поломка?</strong>
                </li>
              </ol>
              <p className="text-gray-600 text-lg mb-6 text-justify border-b">
                <em>- Фокусирую внимание на чем угодно, кроме собеседника –</em>
                нарушен фокус внимания.
                <br />
                <em>- Думаю не о том – </em>проблемы с мыслями.
                <br />
                <em>- Сильно тревожусь – </em>проблемы с эмоциями.
                <br />
                <em>- Не так выгляжу – </em>проблемы с внешним видом.
                <br />
                <em>- Не знаю когда и что сказать –</em> проблемы с содержанием
                речи.
                <br />
                <em>- Занимаю неуверенную позу, плохо двигаюсь – </em>проблемы с
                пантомимикой.
                <br />
                <em>- У меня что-то не так с выражением лица – </em>проблемы с
                мимикой.
                <br />
                <em>- Что-то не так с голосом – </em>проблемы с голосом.
              </p>

              <p className="text-gray-600 text-lg mb-6 text-justify">
                <strong>Пятый и шестой </strong>вопросы &ndash; это &laquo;что
                сломано?&raquo; и &laquo;как это исправить?&raquo;. Их можно
                сформулировать по-другому:
              </p>
              <ul className="text-gray-600 text-lg mb-6 text-justify border-b">
                <li>
                  <em>
                    как я делаю себя неуверенным и застенчивым? Какие процессы
                    внутри мешают мне общаться? Как я проявляю это вовне?
                  </em>
                </li>
                <li>
                  <em>
                    на что я буду это менять? Какие процессы должны проходить
                    внутри? Как я буду себя вести?
                  </em>
                </li>
              </ul>

              <p className="text-gray-600 text-lg mb-6 text-justify">
                Замена &laquo;почему&raquo; на &laquo;как&raquo; сменяет вектор
                с поиска причинно-следственных связей на поиск того, как
                исправить ситуацию. Так размышляют современные психотерапевты,
                которые нацелены на решение проблемы.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                К сожалению, застенчивым и неуверенным людям сложно сделать
                первый шаг: прийти на приём к психотерапевту. Для таких случаев
                мы создали что-то вроде видео-методички для самостоятельной
                работы. Этот проект сделан на принципах, которые описали в этой
                статье. Внутри нашего <Link href="/">проекта</Link> есть
                инструмент, чтобы Вам было проще найти ответы на наши вопросы, а
                потом описаны шаги как это исправить. Если позже решите
                обратиться за поддержкой к специалисту &ndash; у Вас уже будет
                хорошая база, чтобы двигаться быстрее.
              </p>

              <Link href="/author">
                <span className="text-sm text-gray-600 mb-4">
                  Автор: А. Зарипов
                </span>
              </Link>
              <p className="text-sm text-gray-600 mb-4">
                Дата публикации: апрель 2025
              </p>
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
