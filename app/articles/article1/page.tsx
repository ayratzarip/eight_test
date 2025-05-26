"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { TriangleAlert } from "lucide-react";

export default function Article1() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add Schema.org microdata for Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Можно ли отличить застенчивость от расстройства личности, социальной тревоги или расстройства аутистического спектра",
    image: "https://eightfaces.ru/assets/autis.png",
    datePublished: "2025-04-01",
    author: {
      "@type": "Person",
      name: "А. Зарипов",
    },
    publisher: {
      "@type": "Organization",
      name: "EightFaces: Soft Skills Engine",
      logo: {
        "@type": "ImageObject",
        url: "https://eightfaces.ru/assets/diamond_logo_green.png",
      },
    },
    description:
      "В теории это разные состояния, но на практике это не так однозначно и просто. Когда проблемы в социальных ситуациях возникают у интеллектуальных и образованных взрослых людей, сложно выделить единственную причину.",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
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
                src="/assets/autis.png"
                alt="Застенчивость, расстройство личности, социальная тревога или расстройство аутистического спектра"
                width={1200}
                height={630}
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
                priority
              />
            </div>
            {/* Article Content */}
            <div className="prose prose-lg max-w-4xl">
              <h1 className="font-bold mb-6 text-center">
                Можно ли отличить застенчивость от расстройства личности,
                социальной тревоги или расстройства аутистического спектра
              </h1>
              <p className="text-gray-600 mb-6 text-justify ml-16">
                В теории это разные состояния, но на практике это не так
                однозначно и просто. Когда проблемы в социальных ситуациях
                возникают у интеллектуальных и образованных взрослых людей,
                сложно выделить единственную причину.
              </p>
              <div className="flex items-start gap-3 mb-4 border-b">
                <TriangleAlert className="w-10 h-10 flex-shrink-0 text-amber-500 mt-10" />
                <p className="text-gray-600 text-justify">
                  У автора нет опыта работы с детьми. Здесь описаны наблюдения
                  за взрослыми пациентами с достаточным уровнем интеллекта без
                  грубой социальной дезадаптации, которые ранее не наблюдались у
                  психиатра
                </p>
              </div>
              <p className="text-gray-600 text-lg mb-6 text-justify border-b">
                К психотерапевту приходит молодой человек. В детстве он был
                хорошим мальчиком. Он любил мечтать, всегда был спокойным. В
                школе он дружил с двумя одноклассниками, они играли в настольные
                игры. Когда он поступил институт, его друзья разъехались. Потом
                он устроился на удалённую работу. Пришло время выходить в офис,
                и он обнаружил, что «разучился общаться», перед заходом на
                работу он сильно тревожится, боится выступать на совещаниях. В
                кабинете психотерапевта он сильно смущается и не смотрит в
                глаза.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Давайте позволим ему самостоятельно поставить себе диагноз.
              </p>

              <h2 className="font-bold mb-4">
                <strong>Используем классификацию болезней</strong>
              </h2>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Плохие врачи и неспециалисты используют метод перебора.
                Обнаружили проблему, начинают листать справочник и смотреть:
                подходит описание под их случай или нет. Главный справочник
                врача – это международная классификация болезней. Определения
                застенчивости там нет{" "}
                <a href="#ref1" className="text-green-600 hover:underline">
                  [1]
                </a>
                , но есть три диагноза:
              </p>
              <p className="text-gray-600 mb-6 text-justify ml-16">
                <strong>Социальное тревожное расстройство</strong> &ndash;{" "}
                <em>
                  это выраженное и чрезмерное переживание страха и тревоги,
                  которые постоянно возникают в одной и той же или нескольких
                  публичных ситуациях. Из-за страха человек старается уклониться
                  от этих ситуаций. Симптомы сохраняются в течение по крайней
                  мере нескольких месяцев и являются достаточно тяжёлыми, чтобы
                  вызвать выраженный дистресс
                </em>{" "}
                <a href="#ref3" className="text-green-600 hover:underline">
                  [3]
                </a>
                .
              </p>
              <p className="text-gray-600 mb-6 text-justify ml-16">
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
                <a href="#ref3" className="text-green-600 hover:underline">
                  [3]
                </a>
              </p>

              <p className="text-gray-600 mb-6 text-justify ml-16">
                <strong>Шизоидное расстройство личности </strong> &ndash;{" "}
                <em>
                  характеризуется слабостью привязанностей, социальных и других
                  контактов, склонностью к фантазиям, отшельничеству и
                  самоанализу. Имеет место ограниченная способность выражать
                  чувства и испытывать удовольствия
                </em>{" "}
                <a href="#ref2" className="text-green-600 hover:underline">
                  [2]
                </a>
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Все три диагноза вроде бы подходят, но не полностью.
              </p>

              <h3 className="font-bold mb-4">
                <strong>Почему это не поможет</strong>
              </h3>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                <strong>Субъективная оценка</strong>
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Если наш пациент решит разобраться сам и начнёт читать
                международную классификацию болезней, то у него должен был бы
                возникнуть резонный вопрос. Что значит&nbsp;
                <em>
                  выраженное, чрезмерное, нескольких месяцев, достаточно
                  тяжёлыми
                </em>
                ? У каждого из нас есть знакомый, который с температурой 37,1
                вызывает врача на дом, а другой с 38 идёт на работу. Температура
                &ndash; это объективная оценка, мы можем её посмотреть на
                термометре, а страданиеметра или удовольствиемера ещё не
                придумали
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                <strong>Нечёткие границы</strong>
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Не только пациенты, но и врачи страдают субъективной оценкой. В
                психиатрии между &laquo;нормой&raquo; и патологией нет чёткой
                границы, между ними достаточно широкая пограничная зона.&nbsp;
                Когда мы встречаемся с выраженными проявлениями душевной
                болезни, то всем все понятно, но в приграничной полосе каждый
                специалист по-своему передвигает разграничитель здоров/болен.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Например, в советской психиатрии была такая линия:
              </p>
              <p className="my-4">
                <Image
                  src="/assets/psycho_line.png"
                  alt="Линия разграничения нормы и патологии в советской психиатрии"
                  width={800}
                  height={150}
                  className="w-full"
                />
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Сейчас психопатии называют <em>расстройствами личности</em>, а
                граница между нормой и патологией находится где-то между бывшей
                акцентуацией и краевой психопатией. Если вы проходите
                военно-врачебную комиссию при призыве на службу, психиатр
                сдвинет разграничитель вправо, чтобы вы были признаны годным к
                военной службе. Если придёте к психотерапевту в частную клинику,
                он сдвинет разграничитель влево, чтобы обосновать длительный
                курс лечения.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Название &laquo;расстройства аутистического спектра&raquo; уже
                содержит слово&nbsp;<em>спектр</em>. Спектр это и значит,
                нечёткие границы.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                <strong>Сочетание расстройств</strong>
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Один человека может болеть сразу несколькими болезнями, это
                всегда затрудняет диагностику. Страдающий аутизмом может
                тревожиться и испытывать панику в социальных ситуациях.
                Тревожный человек может &laquo;запереть&raquo; себя дома и
                ограничить общение. Исследователи находят значительное
                совпадение симптоматики между СТР и РАС, с частотой от 13% до 50{" "}
                <a href="#ref9" className="text-green-600 hover:underline">
                  [9]
                </a>
                ,{" "}
                <a href="#ref10" className="text-green-600 hover:underline">
                  [10]
                </a>
                . Это чаще, чем простое совпадение.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                У пациентов с социальным тревожным расстройством отмечают
                высокую коморбидность &ndash; это когда разные болезни
                закономерно появляются вместе у одного человека. Я бы
                сформулировал это по-другому, многие душевные проблемы приводят
                к проблемам в общении, а нарушения общения приводят к другим
                психологическим нарушениям.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                <strong>Маскировка симптомов</strong>
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Умные люди могут менять себя, приспосабливаться к окружающему
                миру, особенно когда им помогают хорошие наставники. Отдельные
                люди меняют себя так, что никто вокруг не догадывается о
                проблеме. Например, человек с дефектом глазницы делает причёску
                с чёлкой и носит стильные очки, человек с укороченной ногой
                подбирает специальную обувь. Точно так же некоторые аутичные
                люди меняют своё поведение, и никто из окружающих не может
                заподозрить что-то неладное. Это называется маскировкой или
                камуфляжем{" "}
                <a href="#ref8" className="text-green-600 hover:underline">
                  [8]
                </a>
                . Некоторые обучились делать это в детстве и перестали это
                замечать.
              </p>

              <h3 className="font-bold mb-4">
                <strong>Если наш пациент будет ставить себе диагноз </strong>
              </h3>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Если наш пациент попытается сам разобраться во всем, то про
                субъективность и нечёткие границы он не прочитает. Про это пишут
                только в самых продвинутых учебниках для продвинутых психиатров.
                Но он прочитает про коморбидность и маскировку симптомов и
                решит, что у него-то точно расстройство аутистического спектра.{" "}
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Но он не останавливается, у него останется последний шанс:
                пройти какое-нибудь хитрое исследование мозга, чтобы точно
                узнать все. Например, сделать магнитно-резонансную томографию.{" "}
              </p>
              <h2 className="font-bold mb-4">
                <strong>Попробуем сделать МРТ</strong>
              </h2>
              <h3 className="font-bold mb-4">
                <strong>Что в теории </strong>
              </h3>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                При социальном тревожном расстройстве активнее работают области
                мозга, которые участвуют в эмоциональном возбуждении, а при
                расстройствах аутистического спектра нарушается обработка
                сенсорной информации.
              </p>

              <p className="text-gray-600 mb-6 text-justify ml-16">
                Во время социальной тревоги повышается активность миндалевидного
                тела &ndash; зоны, которая отвечает за формирование эмоций, в
                частности страха. В то же время снижается активность в
                орбитофронтальной коре. При предъявлении
                &laquo;счастливых&raquo; или нейтральных стимулов миндалевидное
                тело уменьшает активность, хотя должно было бы возбуждаться{" "}
                <a href="#ref4" className="text-green-600 hover:underline">
                  [4]
                </a>
                ,
                <a href="#ref5" className="text-green-600 hover:underline">
                  [5]
                </a>
                . Изменяется не только функция, но и структура мозга:
                увеличивается миндалевидное тело, выявляется меньший объем
                серого вещества в правом чечевицеобразном ядре и медиальной
                лобной извилине{" "}
                <a href="#ref6" className="text-green-600 hover:underline">
                  [6]
                </a>
                .
              </p>
              <p className="text-gray-600 mb-6 text-justify ml-16">
                Люди с расстройством аутистического спектра неправильно
                реагируют на лица, которые демонстрируют эмоции. У обычных людей
                активируется миндалевидное тело и височная доля, а у людей с РАС
                &ndash; миндалевидное тело и вентромедиальная префронтальная
                кора.&nbsp;Иначе говоря, они осознают лица, но не подключают
                собственные эмоции{" "}
                <a href="#ref7" className="text-green-600 hover:underline">
                  [7]
                </a>
                .
              </p>
              <h3 className="font-bold mb-4">
                <strong>Что в реальности</strong>
              </h3>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Мы не умеем ставить психиатрические диагнозы с помощью МРТ. У
                нас нет инструментальных методов диагностики душевных
                расстройств. То, что находят в мозге у пациентов с социальной
                тревогой находят и у людей с другими видами тревоги. Эти явления
                неспецифичны{" "}
                <a href="#ref4" className="text-green-600 hover:underline">
                  [4]
                </a>
                .{" "}
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Изменения в мозге находят не у всех людей с тревогой или
                аутизмом. У людей с одинаковыми психическими проблемами могут
                быть разные результаты томографического исследования.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Не совсем понятно, что причина, а что &ndash; следствие. Как
                тело у бодибилдера: чем больше качается, тем больше мышцы.
                Возможно, что чем больше человек тревожится, тем больше
                становится миндалевидное тело, а не то, что изменения
                миндалевидного тела вызывают тревогу.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Невозможно поставить диагноз с помощью МРТ или функционального
                МРТ. Нельзя сказать: у этого увеличена миндалина, значит у него
                &ndash; социальная тревога, а у второго &ndash; мозг аутиста{" "}
                <a href="#ref11" className="text-green-600 hover:underline">
                  [11]
                </a>
                . Так что мы не найдём ничего особенного в мозге пациента из
                нашего примера.
              </p>
              <h2 className="font-bold mb-4">
                <strong>К чему пришёл наш пациент</strong>
              </h2>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Наш тревожный молодой человек запутался в трех диагнозах, ничего
                не понял после МРТ. В результате он:
              </p>
              <ul className="text-gray-600 text-lg mb-6 text-justify">
                <li>потерял много времени и сил;</li>
                <li>
                  решил, что у него расстройство личности и прочитал, что это{" "}
                  <em>стойкое состояние, не поддающееся коррекции</em>;
                </li>
                <li>
                  потом решил, что у него &ndash; аутизм, значит ничего не
                  изменить;
                </li>
                <li>у него опустились руки.</li>
              </ul>

              <h2 className="font-bold mb-4">
                <strong>Что будет делать опытный врач</strong>
              </h2>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Опытные врачи используют клиническое мышление, это что-то
                похожее на то, как размышлял Шерлок Холмс. Хороший врач знает,
                для чего нужен диагноз и как лечить.
              </p>

              <h3 className="font-bold mb-4">
                <strong>Для чего нужен диагноз</strong>
              </h3>

              <p className="text-gray-600 text-lg mb-6 text-justify">
                Диагноз нужен для отчётности, для статистики, чтобы обосновать
                назначение лекарств. Диагноз нужен для экспертизы: оценки
                годности к военной службе или получения академического отпуска.
                Диагноз нужен чтобы врач прикинул вероятность того, получится у
                него вылечить больного или нет, как долго нужно будет работать с
                пациентом.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Нашему молодому человеку из примера диагноз ничего не даст.
                Латинское название болезни &ndash; не волшебное заклинание,
                которое изгонит недуг.
              </p>
              <h3 className="font-bold mb-4">
                <strong>
                  Врачи выделяют симптомы и собирают их в синдромы
                </strong>
              </h3>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Врачи выделяют симптомы &ndash; отдельные признаки болезни. Эти
                признаки никогда не бывают самостоятельными, они всегда идут
                вместе. По-гречески идти вместе &ndash; синдром.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                У нашего молодого человека &ndash; патологическая тревога в
                социальных ситуациях. При тревоге всегда бывают иррациональные
                мысли и непереносимость телесных проявлений тревоги. Он не
                знает, что говорить в социальных ситуациях. Он не поддерживает
                зрительный контакт при разговоре.
              </p>
              <h3 className="font-bold mb-4">
                <strong>Как будет лечить врач</strong>
              </h3>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                <strong>Читаем клинические рекомендации</strong>
              </p>
              <p className="text-gray-600 mb-6 text-justify ml-16">
                Социальное тревожное расстройство лечат с помощью
                когнитивно-поведенческой терапии (КПТ). Когнитивно-поведенческие
                терапевты применяют экспозицию &ndash; погружение в тревожную
                ситуацию, работу с иррациональными мыслями, майндфуллнесс
                &ndash; тренировки присутствия в настоящем моменте{" "}
                <a href="#ref12" className="text-green-600 hover:underline">
                  [12]
                </a>
                ,{" "}
                <a href="#ref13" className="text-green-600 hover:underline">
                  [13]
                </a>
                . КПТ считается &laquo;золотым стандартом&raquo;, это
                подтверждают многие исследования{" "}
                <a href="#ref14" className="text-green-600 hover:underline">
                  [14]
                </a>
                .
              </p>
              <p className="text-gray-600 mb-6 text-justify ml-16">
                С пациентами с расстройствами аутистического спектра работают
                разные специалисты. Они применяют ситуационно-ориентированные
                техники. То есть, под каждый конкретный случай подбираются
                индивидуальные программы обучения. Людей с РАС направляют
                изучать социальные, коммуникативные и языковые навыки. Обучают
                контролировать собственное поведение{" "}
                <a href="#ref15" className="text-green-600 hover:underline">
                  [15]
                </a>
                ,{" "}
                <a href="#ref16" className="text-green-600 hover:underline">
                  [16]
                </a>
                .
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                <strong>
                  Внимательно перечитываем клинические рекомендации
                </strong>
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Ещё раз посмотрим рекомендации. Если Вы поищите в интернете про
                КПТ, экспозиции, майндфуллнесс, то увидите, что их применяют при
                разных болезнях. Дело в том, что психиатры умеют лечить только
                симптомы и синдромы. У нас нет лекарства от болезней: от
                шизофрении или от неврозов. Наши препараты изменяют внутренние
                процессы, но не действуют на причину болезни. Например,
                антидепрессанты помогают при депрессии независимо от того
                возникла она из-за травмы головы или из-за психологической
                травмы. Транквилизаторы успокаивают и жертв буллинга, и тех, кто
                организовывал травлю. Наше лечение симптоматическое и
                синдромологическое.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                <strong>Что будем делать с нашим пациентом</strong>
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                С его иррациональными мыслями будем работать с помощью методик
                для работы с иррациональными мыслями, например используем
                классическую КПТ или метакогнитивную терапию. Проведём
                экспозицию для проработки телесных проявлений тревоги.
                Организуем тренинг социальных навыков и обучим майндфуллнесс,
                чтобы он рассматривал лицо собеседника во время разговора. Эта
                схема не зависит от диагноза, в любом случае нужно делать все
                вышеперечисленное.
              </p>

              <h2 className="font-bold mb-4">
                <strong>Заключение</strong>
              </h2>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Многие пациенты требуют, чтобы им поставили диагноз. Когда
                проблему называют каки-либо заумным словом, у них возникает
                ложное ощущение &laquo;понятности&raquo;, и им как будто бы,
                становится немного легче. Но в реальной жизни редко встречаешься
                с &laquo;классическими&raquo; случаями, как в учебниках. Граница
                между душевными болезнями и нормой размыта, люди могут
                одновременно иметь несколько проблем, нельзя поставить диагноз с
                помощью объективных методов.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                Я привёл здесь всего три психиатрических диагноза, а психологи
                оперируют десятками терминов, которые каждый понимает по-своему.
                Это вызывает путаницу, из-за этого люди теряют время, силы и
                желание меняться. Лечение все-равно симптоматическое и
                синдромологическое. Как болезнь не называй, все равно мы будет
                использовать одни и те же лекарства, одни и те же
                психотерапевтические методики.
              </p>
              <p className="text-gray-600 text-lg mb-6 text-justify">
                В случаях, когда взрослый человек не справляется с социальными
                ситуациями, целесообразно выявлять и исправлять поломку. Вместо
                поиска &laquo;правильного&raquo; диагноза с помощью перебора,
                стоит применять клиническое мышление и задавать правильные
                вопросы. Какие это вопросы я расскажу в следующей статье.
              </p>

              <Link href="/author">
                <span className="text-sm text-gray-600 mb-4">
                  Автор: А. Зарипов
                </span>
              </Link>
              <p className="text-sm text-gray-600 mb-4 ">
                Дата публикации: апрель 2025
              </p>

              <div className="text-center py-8">
                <Link href="/#start">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                    Подключиться к проекту
                  </button>
                </Link>
              </div>
              <ol>
                <h3 className="font-bold mb-4">
                  <strong>Ссылки на использованные источники:</strong>
                </h3>
                <li id="ref1">
                  <a
                    href="https://www.litres.ru/book/filip-zimbardo/zastenchivost-kak-ee-poborot-i-priobresti-uverennost-v-sebe-69832063/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.litres.ru/book/filip-zimbardo/zastenchivost-kak-ee-poborot-i-priobresti-uverennost-v-sebe-69832063/
                  </a>
                </li>
                <li id="ref2">
                  <a
                    href="https://mkb-10.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://mkb-10.com
                  </a>
                </li>
                <li id="ref3">
                  <a
                    href="https://icd.who.int/browse/2025-01/mms/ru"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://icd.who.int/browse/2025-01/mms/ru
                  </a>
                </li>
                <li id="ref4">
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/21215728/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://pubmed.ncbi.nlm.nih.gov/21215728/
                  </a>
                </li>
                <li id="ref5">
                  <a
                    href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5063696/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC5063696/
                  </a>
                </li>
                <li id="ref6">
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/37725323/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://pubmed.ncbi.nlm.nih.gov/37725323/
                  </a>
                </li>
                <li id="ref7">
                  <a
                    href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2834792/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC2834792/
                  </a>
                </li>
                <li id="ref8">
                  <a
                    href="https://www.sciencedirect.com/science/article/pii/S0732118X22000629"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.sciencedirect.com/science/article/pii/S0732118X22000629
                  </a>
                </li>
                <li id="ref9">
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/38002519/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://pubmed.ncbi.nlm.nih.gov/38002519/
                  </a>
                </li>
                <li id="ref10">
                  <a
                    href="https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2023.1320558/full"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2023.1320558/full
                  </a>
                </li>
                <li id="ref11">
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/34420058/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://pubmed.ncbi.nlm.nih.gov/34420058/
                  </a>
                </li>
                <li id="ref12">
                  <a
                    href="https://psychiatr.ru/download/4239?view=1&amp;name=%D0%9A%D0%A0%D0%97_%D0%A2%D1%80%D0%B5%D0%B2%D0%BE%D0%B6%D0%BD%D0%BE-%D1%84%D0%BF%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5+%D1%80%D0%B0%D1%81%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://psychiatr.ru/download/4239?view=1&amp;name=КРЗ_Тревожно-фобические+расстройства.pdf
                  </a>
                </li>
                <li id="ref13">
                  <a
                    href="https://www.nimh.nih.gov/health/publications/social-anxiety-disorder-more-than-just-shyness"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.nimh.nih.gov/health/publications/social-anxiety-disorder-more-than-just-shyness
                  </a>
                </li>
                <li id="ref14">
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/33895444/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://pubmed.ncbi.nlm.nih.gov/33895444/
                  </a>
                </li>
                <li id="ref15">
                  <a
                    href="https://www.pediatr-russia.ru/information/klin-rek/proekty-klinicheskikh-rekomendatsiy/%D0%9A%D0%A0%20%D0%A0%D0%90%D0%A1_2022_%D0%BF%D0%B5%D1%80%D0%B5%D1%81%D0%BC%D0%BE%D1%82%D1%80.pdf?ysclid=m0gnb0tj41420780910"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.pediatr-russia.ru/information/klin-rek/proekty-klinicheskikh-rekomendatsiy/КР%20РАС_2022_пересмотр.pdf?ysclid=m0gnb0tj41420780910
                  </a>
                </li>
                <li id="ref16">
                  <a
                    href="https://www.nimh.nih.gov/health/publications/autism-spectrum-disorder"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
