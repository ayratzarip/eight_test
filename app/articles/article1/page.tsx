"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TriangleAlert } from "lucide-react";

export default function Article1() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center space-x-2">
                <img
                  src="/assets/diamond_logo_green.png"
                  alt="Logo"
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
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            {/* Article Header */}
            <div className="mb-8">
              <img
                src="/assets/autis.png"
                alt="Застенчивость, расстройство личности, социальная тревога или расстройство аутистического спектра"
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
                style={{ objectPosition: '50% 30%' }}
              />
              
            </div>
            {/* Article Content */}
            <div className="prose prose-lg max-w-4xl">
            <h1 className="font-bold mb-6 text-center">
                Просто застенчивость, расстройство личности, социальная тревога
                или расстройство аутистического спектра
              </h1>
              <p className="text-gray-600 text-lg mb-6 pb-6 text-justify border-b">
                В теории это разные состояния, но на практике это не так
                однозначно и просто. Когда проблемы в социальных ситуациях
                возникают у интеллектуальных и образованных взрослых людей,
                сложно выделить единственную причину. В статье предлагается
                прагматичный подход к подобным ситуациям.
              </p>
              <div className="flex items-start gap-3 mb-4 border-b">
                <TriangleAlert className="w-10 h-10 flex-shrink-0 text-amber-500 mt-10" />
                <p className="text-gray-600 text-justify">
                  У автора нет опыта работы с детьми. Здесь описаны наблюдения
                  за взрослыми пациентами с достаточным уровнем интеллекта без
                  грубой социальной дезадаптации, которые ранее не наблюдались у
                  психиатра.
                </p>
              </div>

              <h2 className="font-bold mb-4">
                <strong>Что в теории</strong>
              </h2>
              <h3 className="font-bold mb-4">
                <strong>Определимся с определениями</strong>
              </h3>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Прежде чем о что-то обсуждать, нужно договориться о
                терминологии. Для расстройства личности, социального тревожного
                расстройства (СТР) и расстройства аутистического спектра (РАС)
                есть общепринятые определения в международной классификации
                болезней. Общепринятого определения застенчивости нет.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                <strong>Застенчивость &ndash; </strong>
                <em>понятие расплывчатое </em>[1]. Так начинает книгу Филипп
                Зимбардо, которого считают главным авторитетом по застенчивости.
                Дальше он приводит цитаты из толковых словарей и предлагает нам
                самим понять, что это значит. И если нет чёткого определения, то
                каждый будет понимать это по-своему.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                <strong>Расстройства личности</strong> &ndash;{" "}
                <em>
                  это выраженные отклонения в поведении, не являющиеся прямым
                  следствием заболевания, повреждения или другого острого
                  поражения головного мозга либо других психических нарушений.
                  Эти расстройства охватывают несколько сфер личности
                </em>{" "}
                [2]. В МКБ-10 выделяли несколько видов расстройств личности,
                например, шизоидное, тревожное.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                <strong>Социальное тревожное расстройство</strong> &ndash;{" "}
                <em>
                  это выраженное и чрезмерное переживание страха и тревоги,
                  которые постоянно возникают в одной и той же или нескольких
                  публичных ситуациях. Из-за страха человек старается уклониться
                  от этих ситуаций. Симптомы сохраняются в течение по крайней
                  мере нескольких месяцев и являются достаточно тяжёлыми, чтобы
                  вызвать выраженный дистресс
                </em>{" "}
                [3].
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                <strong>Расстройство аутистического спектра</strong> &ndash;{" "}
                <em>
                  это стойкое снижение способности инициировать и поддерживать
                  социальные взаимодействия. Снижение достаточно выражено, чтобы
                  вызвать нарушения социальной адаптации.
                </em>{" "}
                <em>
                  Плюс ограниченные и повторяющиеся негибкие паттерны поведения,
                  интересы или занятия{" "}
                </em>
                [3]. РАС &ndash; это спектр расстройств от лёгких до тяжёлых.
              </p>
              <h3 className="font-bold mb-4">
                <strong>Что происходит в мозге</strong>
              </h3>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                При социальном тревожном расстройстве активнее работают области
                мозга, которые участвуют в эмоциональном возбуждении, а при
                расстройствах аутистического спектра нарушается обработка
                сенсорной информации.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Во время социальной тревоги повышается активность миндалевидного
                тела &ndash; зоны, которая отвечает за формирование эмоций, в
                частности страха. В то же время снижается активность в
                орбитофронтальной коре. При предъявлении
                &laquo;счастливых&raquo; или нейтральных стимулов миндалевидное
                тело уменьшает активность, хотя должно было бы возбуждаться [4,
                5]. Изменяется не только функция, но и структура мозга:
                увеличивается миндалевидное тело, выявляется меньший объем
                серого вещества в правом чечевицеобразном ядре и медиальной
                лобной извилине [6].
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Люди с расстройством аутистического спектра неправильно
                реагируют на лица, которые демонстрируют эмоции. У обычных людей
                активируется миндалевидное тело и височная доля, а у людей с РАС
                &ndash; миндалевидное тело и вентромедиальная префронтальная
                кора.&nbsp;Иначе говоря, они осознают лица, но не подключают
                собственные эмоции [7].
              </p>
              <h2 className="font-bold mb-4">
                <strong>Что в реальности</strong>
              </h2>
              <h3 className="font-bold mb-4">
                <strong>Нечёткие границы</strong>
              </h3>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                В психиатрии нет чёткой границы между «нормой» и патологией,
                между ними достаточно широкая зона. Когда мы встречаемся с
                выраженными проявлениями душевной болезни, то всем все понятно,
                но в приграничной полосе каждый специалист по-своему передвигает
                разграничитель здоров/болен.
              </p>

              <p className="text-gray-600 text-lg mb-6 text-justify">
                В советской психиатрии была такая линия:
              </p>
              <p>
                <img src="../assets/psycho_line.png" alt="" />
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Сейчас это называют <em>расстройство личности</em>, а граница
                между нормой и патологией находится где-то между бывшей
                акцентуацией и краевой психопатией. Если вы проходите
                военно-врачебную комиссию при призыве на службу, психиатр
                сдвинет разграничитель вправо, чтобы вы были признаны годным к
                военной службе. Если придёте к психотерапевту в частную клинику,
                он сдвинет разграничитель влево, чтобы обосновать длительный
                курс лечения.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Авторы международной классификации болезней дали не совсем
                конкретное определение социального тревожного расстройства.
                Посмотрите на слова из текста МКБ:{" "}
                <em>
                  выраженное, чрезмерное, нескольких месяцев, достаточно
                  тяжёлыми
                </em>
                . Несколько месяцев это больше двух или больше двадцати?
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Название &laquo;расстройства аутистического спектра&raquo; уже
                содержит слово <em>спектр</em>. Психиатры подразумевают
                разнообразие расстройств разной степени тяжести, в том числе и
                очень лёгкие.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Некоторые аутичные люди обучились скрывать свои особенности: они
                создали набор действий, который называется маскировкой или
                камуфляжем [8]. Никто из окружающих не сможет заподозрить, что у
                них &laquo;нарушена обработка сенсорной информации&raquo;. Это
                ещё более размывает границу между &laquo;нормальными&raquo; и
                &laquo;ненормальными людьми&raquo;.
              </p>
              <h3 className="font-bold mb-4">
                <strong>Коморбидность, или сочетание расстройств</strong>
              </h3>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Страдающий аутизмом может тревожиться. Он может испытывать
                панику в социальных ситуациях. Одна проблема не исключает
                другую. Исследователи находят значительное совпадение
                симптоматики между СТР и РАС, с частотой от 13% до 50% [9, 10].
                Это чаще, чем простое совпадение.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                У пациентов с социальным тревожным расстройством отмечают
                высокую коморбидность с различными психическими расстройствами.
                Я бы сформулировал это по-другому, многие душевные проблемы
                приводят к проблемам в общении, а нарушения общения приводят к
                другим психологическим нарушениям.
              </p>
              <h3 className="font-bold mb-4">
                <strong>Что происходит в мозге</strong>
              </h3>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                На сегодняшний день нет инструментальных методов диагностики
                душевных расстройств.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                То, что находят в мозге у пациентов с социальной тревогой
                находят и у людей с другими видами тревоги. Эти явления
                неспецифичны [4]. Это похоже на то, как растут мышцы у
                бодибилдера: чем больше качается, тем больше мышцы. Так же чем
                больше человек тревожится, тем больше становится миндалевидное
                тело. Миндалевидное тело у разных людей изменяется по-разному.
                Поэтому, невозможно поставить диагноз с помощью МРТ или
                функционального МРТ. Нельзя сказать: у этого увеличена
                миндалина, значит у него &ndash; социальная тревога, а у второго
                &ndash; мозг аутиста [11].
              </p>

              <h2 className="font-bold mb-4">
                <strong>Что в итоге</strong>
              </h2>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Все однозначно и просто только на экзамене по психиатрии. В
                реальной жизни редко встречаешься с &laquo;классическими&raquo;
                случаями, как в учебниках. Все люди уникальны, каждый случай
                индивидуален. Перефразируя Льва Николаевича Толстого: все
                нормальные люди похожи друг на друга, каждый несчастный человек
                несчастлив по-своему.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Граница между здоровой социальной тревогой и социальным
                тревожным расстройством размыта. Между застенчивостью и
                расстройствами аутистического спектра существует множество
                переходных состояний. Люди могут одновременно иметь несколько
                проблем.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Люди могут компенсировать отдельные несовершенства, как,
                например, в случаях с маскировкой аутизма. В этом помогает
                интеллект. Если умный человек испытывает сложности в публичных
                ситуациях, значит проблем у него несколько, иначе он бы
                справился. Неопытные специалисты могут выявлять только то, что
                знают и не замечать другие расстройства, ставить всем диагнозы:
                &laquo;аутизм&raquo;, или &laquo;синдром дефицита
                внимания&raquo;, или &laquo;шизоидное расстройство
                личности&raquo;. При этом будут лечить один компонент проблемы и
                игнорировать другие.
              </p>

              <h2 className="font-bold mb-4">
                <strong>Как это лечат</strong>
              </h2>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Российские клинические рекомендации и рекомендации Национального
                института психического здоровья США во много схожи. Мы не будем
                рассматривать фармакологические методы, потому что при нетяжёлых
                формах применяют психотерапию.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Социальное тревожное расстройство лечат с помощью
                когнитивно-поведенческой терапии (КПТ). КПТ специалисты
                применяют экспозицию &ndash; погружение в тревожную ситуацию,
                работу с иррациональными мыслями, майндфуллнесс &ndash;
                тренировки присутствия в настоящем моменте [12, 13]. КПТ
                считается &laquo;золотым стандартом&raquo;, это подтверждают
                многие исследования [14].
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                С пациентами с расстройствами аутистического спектра работают
                разные специалисты. Они применяют ситуационно-ориентированные
                техники. То есть, под каждый конкретный случай подбираются
                индивидуальные программы обучения. Людей с РАС направляют
                изучать социальные, коммуникативные и языковые навыки. Обучают
                контролировать собственное поведение [15, 16].
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Не буду описывать, что предлагают людям с застенчивостью.
                Застенчивость &ndash; не болезнь, поэтому нет клинических
                рекомендаций. Если нет ясного определения застенчивости, то нет
                и научных методов с доказательной базой.
              </p>

              <h2 className="font-bold mb-4">
                <strong>Что я предлагаю</strong>
              </h2>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                В случаях, когда взрослый человек не справляется с социальными
                ситуациями, целесообразно выявлять и исправлять поломку, а не
                искать «правильный» диагноз. В медицине это называется{" "}
                <em>синдромологический подход</em>.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                В медицинском институте нас учили, что нужно лечить больного, а
                не болезнь. Сейчас другие времена, требуют выполнять клинические
                рекомендации, но на предболезненные пограничные состояния эти
                требования не распространяются. Поэтому, когда сложности в
                социальных ситуациях возникают у интеллектуальных и образованных
                взрослых людей, можно подобрать индивидуальный план: работать с
                эмоциями, с обработкой сенсорной информации или заняться
                контролем поведения. При этом использовать все немедикаментозные
                методы: работу с мыслями, экспозицию и майндфулнесс. Затем
                проработать социальные, коммуникативные и языковые навыки.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Не все люди имеют возможность постоянно длительно посещать
                психотерапевта. В таких случаях я предлагаю самостоятельно
                работать так, как будто бы имеется и тревожное расстройство, и
                расстройство аутистического спектра, и личностное расстройство.
                Все в лёгкой степени.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Мои клиенты просили сделать что-то вроде методички для
                самостоятельной работы, я решил сделать это в виде видео с
                пошаговым руководством. Хотя мы сделали этот проект для моих
                клиентов, он подойдёт и тем, кто со мной не знаком. Если у вас
                есть социальные проблемы, но пока не готовы идти на терапию, то
                начните с этого проекта. А если позже решите обратиться за
                поддержкой – у вас уже будет хорошая база, чтобы двигаться
                быстрее.
              </p>
              <Link href="/author">
                <span className="text-sm text-gray-600 mb-4">
                  Автор: А. Зарипов
                </span>
              </Link>
              <p className="text-sm text-gray-600 mb-4">
                Дата публикации: апрель 2025
              </p>

              <ol>
                <h3 className="font-bold mb-4">
                  <strong>Ссылки на использованные источники:</strong>
                </h3>
                <li>
                  <a href="https://www.litres.ru/book/filip-zimbardo/zastenchivost-kak-ee-poborot-i-priobresti-uverennost-v-sebe-69832063/">
                    https://www.litres.ru/book/filip-zimbardo/zastenchivost-kak-ee-poborot-i-priobresti-uverennost-v-sebe-69832063/
                  </a>
                </li>
                <li>
                  <a href="https://mkb-10.com">https://mkb-10.com</a>
                </li>
                <li>
                  <a href="https://icd.who.int/browse/2025-01/mms/ru">
                    https://icd.who.int/browse/2025-01/mms/ru
                  </a>
                </li>
                <li>
                  <a href="https://pubmed.ncbi.nlm.nih.gov/21215728/">
                    https://pubmed.ncbi.nlm.nih.gov/21215728/
                  </a>
                </li>
                <li>
                  <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5063696/">
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC5063696/
                  </a>
                </li>
                <li>
                  <a href="https://pubmed.ncbi.nlm.nih.gov/37725323/">
                    https://pubmed.ncbi.nlm.nih.gov/37725323/
                  </a>
                </li>
                <li>
                  <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2834792/">
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC2834792/
                  </a>
                </li>
                <li>
                  <a href="https://www.sciencedirect.com/science/article/pii/S0732118X22000629">
                    https://www.sciencedirect.com/science/article/pii/S0732118X22000629
                  </a>
                </li>
                <li>
                  <u>
                    <a href="https://pubmed.ncbi.nlm.nih.gov/38002519/">
                      https://pubmed.ncbi.nlm.nih.gov/38002519/
                    </a>
                    )(
                  </u>
                  <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10669824/">
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC10669824/
                  </a>
                </li>
                <li>
                  <u>
                    <a href="https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2023.1320558/full">
                      https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2023.1320558/full
                    </a>
                  </u>
                </li>
                <li>
                  <a href="https://pubmed.ncbi.nlm.nih.gov/34420058/">
                    https://pubmed.ncbi.nlm.nih.gov/34420058/
                  </a>
                </li>
                <li>
                  <a href="https://psychiatr.ru/download/4239?view=1&amp;name=%D0%9A%D0%A0%D0%97_%D0%A2%D1%80%D0%B5%D0%B2%D0%BE%D0%B6%D0%BD%D0%BE-%D1%84%D0%BF%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5+%D1%80%D0%B0%D1%81%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0.pdf">
                    https://psychiatr.ru/download/4239?view=1&amp;name=КРЗ_Тревожно-фобические+расстройства.pdf
                  </a>
                </li>
                <li>
                  <a href="https://www.nimh.nih.gov/health/publications/social-anxiety-disorder-more-than-just-shyness">
                    https://www.nimh.nih.gov/health/publications/social-anxiety-disorder-more-than-just-shyness
                  </a>
                </li>
                <li>
                  <a href="https://pubmed.ncbi.nlm.nih.gov/33895444/">
                    https://pubmed.ncbi.nlm.nih.gov/33895444/
                  </a>
                </li>
                <li>
                  <a href="https://www.pediatr-russia.ru/information/klin-rek/proekty-klinicheskikh-rekomendatsiy/%D0%9A%D0%A0%20%D0%A0%D0%90%D0%A1_2022_%D0%BF%D0%B5%D1%80%D0%B5%D1%81%D0%BC%D0%BE%D1%82%D1%80.pdf?ysclid=m0gnb0tj41420780910">
                    https://www.pediatr-russia.ru/information/klin-rek/proekty-klinicheskikh-rekomendatsiy/КР%20РАС_2022_пересмотр.pdf?ysclid=m0gnb0tj41420780910
                  </a>
                </li>
                <li>
                  <a href="https://www.nimh.nih.gov/health/publications/autism-spectrum-disorder">
                    https://www.nimh.nih.gov/health/publications/autism-spectrum-disorder
                  </a>
                </li>
              </ol>
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
