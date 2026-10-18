import { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { LANGUAGE_REGISTRY } from './i18n/languages'
import { useLanguage } from './i18n/LanguageProvider'
import { supabase, supabaseConfigured } from './lib/supabase'

type Subject = {
  id: string
  name: string
  slug: string
  description: string | null
}

type Course = {
  id: string
  subject_id: string
  slug: string
  title: string
  description: string | null
  content_language: string
  level: string
  estimated_minutes: number | null
}

type Lesson = {
  id: string
  course_id: string
  slug: string
  title: string
  summary: string | null
  content: string | null
  display_order: number
  estimated_minutes: number | null
}


const PAGE_COPY = {
  en: {
    courses: "Courses", signIn: "Sign In", dashboard: "Dashboard",
    about: "About", contact: "Contact", start: "Start Learning",
    aboutEyebrow: "ABOUT SUPER-AI 9JA",
    aboutTitle: "Practical AI learning, built for Nigeria.",
    aboutIntro: "SUPER-AI 9ja helps people build useful artificial intelligence skills through accessible learning, practical exploration, and clear pathways from understanding to application.",
    aboutMissionTitle: "Our mission",
    aboutMission: "Make AI learning easier to access and more relevant to the languages, ambitions, and everyday realities of learners in Nigeria.",
    aboutPrinciplesTitle: "What guides us",
    aboutPrinciple1Title: "Practical learning",
    aboutPrinciple1: "Focus on understanding concepts and applying them to real problems.",
    aboutPrinciple2Title: "Language inclusion",
    aboutPrinciple2: "Support English, Nigerian Pidgin, Yorùbá, Hausa, and Igbo as core language choices.",
    aboutPrinciple3Title: "Trust and transparency",
    aboutPrinciple3: "Present course availability honestly and respect account access controls.",
    aboutNext: "Explore the available courses to see what is currently published.",
    contactEyebrow: "CONTACT",
    contactTitle: "Connect with SUPER-AI 9ja.",
    contactIntro: "Have a question about learning, course access, your account, or a possible partnership? Start by identifying the kind of help you need.",
    contactLearningTitle: "Learning and courses",
    contactLearning: "For course questions, check the Courses page for the published catalogue and available lesson information.",
    contactAccountTitle: "Account and access",
    contactAccount: "For sign-in or account-access issues, use Sign In and check that you are using the correct account.",
    contactPartnershipTitle: "Partnerships and feedback",
    contactPartnership: "For partnership ideas or product feedback, use an official contact channel published by the SUPER-AI 9ja team.",
    contactHonest: "This page does not submit a message, and no unverified email address or contact channel is displayed here.",
    backHome: "Back to Home",
    loadingCourses: "Loading published courses…",
    coursesLoadFailed: "We couldn't load the course catalogue. Check your connection and try again.",
    retry: "Try Again",
    noCourses: "No published courses are available yet.",
    noCoursesDescription: "Please check back later. Only courses published in the learning platform appear here.",
    unavailable: "The course catalogue is temporarily unavailable. Please try again shortly."
  },
  pcm: {
    courses: "Courses", signIn: "Sign In", dashboard: "Dashboard",
    about: "About", contact: "Contact", start: "Start Learning",
    aboutEyebrow: "ABOUT SUPER-AI 9JA",
    aboutTitle: "Learn AI wey fit help you for Naija.",
    aboutIntro: "SUPER-AI 9ja dey help people learn useful artificial intelligence skills through accessible learning, practical exploration, and clear steps from understanding to real-life use.",
    aboutMissionTitle: "Our mission",
    aboutMission: "Make AI learning easier to reach and useful for the languages, goals, and everyday life of people for Nigeria.",
    aboutPrinciplesTitle: "Wetin guide us",
    aboutPrinciple1Title: "Practical learning",
    aboutPrinciple1: "Understand the ideas and learn how to use them solve real problems.",
    aboutPrinciple2Title: "Language inclusion",
    aboutPrinciple2: "Support English, Nigerian Pidgin, Yorùbá, Hausa, and Igbo.",
    aboutPrinciple3Title: "Trust and clear information",
    aboutPrinciple3: "Show course availability as e be and respect account access rules.",
    aboutNext: "Check Courses to see the lessons wey don publish now.",
    contactEyebrow: "CONTACT",
    contactTitle: "Connect with SUPER-AI 9ja.",
    contactIntro: "You get question about learning, courses, your account, or partnership? Start by checking the kind help wey you need.",
    contactLearningTitle: "Learning and courses",
    contactLearning: "For course questions, check Courses for the published catalogue and available lesson information.",
    contactAccountTitle: "Account and access",
    contactAccount: "For sign-in problems, use Sign In and confirm say na the correct account you dey use.",
    contactPartnershipTitle: "Partnership and feedback",
    contactPartnership: "For partnership ideas or feedback, use an official contact channel published by the SUPER-AI 9ja team.",
    contactHonest: "This page no dey send message, and e no show unverified email address or contact channel.",
    backHome: "Back to Home",
    loadingCourses: "We dey load published courses…",
    coursesLoadFailed: "We no fit load the course list. Check your connection and try again.",
    retry: "Try Again",
    noCourses: "No published course dey available yet.",
    noCoursesDescription: "Abeg check again later. Na courses wey the learning platform don publish go show here.",
    unavailable: "The course catalogue no dey available for now. Abeg try again shortly."
  },
  yo: {
    courses: "Àwọn Ẹ̀kọ́", signIn: "Wọlé", dashboard: "Pánẹ́ẹ̀lì",
    about: "Nípa Wa", contact: "Kàn Sí Wa", start: "Bẹ̀rẹ̀ Ẹ̀kọ́",
    aboutEyebrow: "NÍPA SUPER-AI 9JA",
    aboutTitle: "Ẹ̀kọ́ AI tó wúlò fún Nàìjíríà.",
    aboutIntro: "SUPER-AI 9ja ń ran àwọn ènìyàn lọ́wọ́ láti kọ́ ọgbọ́n ìmọ̀ ọgbọ́n àtọwọ́dá (AI) nípasẹ̀ ẹ̀kọ́ tó rọrùn láti rí, ìdánwò tó wúlò, àti ọ̀nà tó ṣe kedere láti inú ìmọ̀ sí lílò rẹ̀.",
    aboutMissionTitle: "Ète wa",
    aboutMission: "Láti mú kí ẹ̀kọ́ AI rọrùn láti rí, kí ó sì bá èdè, àfojúsùn àti ìgbésí ayé àwọn akẹ́kọ̀ọ́ Nàìjíríà mu.",
    aboutPrinciplesTitle: "Àwọn ìlànà wa",
    aboutPrinciple1Title: "Ẹ̀kọ́ tó wúlò",
    aboutPrinciple1: "Lóye àwọn èrò pàtàkì, kí o sì kọ́ bí a ṣe ń lò wọ́n láti yanjú ìṣòro gidi.",
    aboutPrinciple2Title: "Ìdàpọ̀ èdè",
    aboutPrinciple2: "Atilẹ́yìn fún English, Nigerian Pidgin, Yorùbá, Hausa àti Igbo.",
    aboutPrinciple3Title: "Ìgbẹ́kẹ̀lé àti òtítọ́",
    aboutPrinciple3: "A máa ń sọ òtítọ́ nípa àwọn ẹ̀kọ́ tó wà, a sì ń bọ̀wọ̀ fún ààbò àkọọ́lẹ̀.",
    aboutNext: "Wo àwọn ẹ̀kọ́ tó wà láti mọ ohun tí a ti tẹ̀ jáde.",
    contactEyebrow: "KÀN SÍ WA",
    contactTitle: "Bá SUPER-AI 9ja sọ̀rọ̀.",
    contactIntro: "Ṣé o ní ìbéèrè nípa ẹ̀kọ́, ìwọlé sí ẹ̀kọ́, àkọọ́lẹ̀ rẹ, tàbí ìfọwọ́sowọ́pọ̀? Bẹ̀rẹ̀ nípa yíyan irú ìrànlọ́wọ́ tí o nílò.",
    contactLearningTitle: "Ẹ̀kọ́ àti àwọn kíláàsì",
    contactLearning: "Fún ìbéèrè nípa ẹ̀kọ́, wo ojú-ewé Àwọn Ẹ̀kọ́ fún àkójọ ẹ̀kọ́ tó ti jáde.",
    contactAccountTitle: "Àkọọ́lẹ̀ àti ìwọlé",
    contactAccount: "Fún ìṣòro ìwọlé, lo Wọlé, kí o sì ṣàyẹ̀wò pé o ń lo àkọọ́lẹ̀ tó tọ́.",
    contactPartnershipTitle: "Ìfọwọ́sowọ́pọ̀ àti èrò",
    contactPartnership: "Fún èrò ìfọwọ́sowọ́pọ̀ tàbí àbá, lo ọ̀nà ìbánisọ̀rọ̀ òṣìṣẹ́ tí ẹgbẹ́ SUPER-AI 9ja ti tẹ̀ jáde.",
    contactHonest: "Ojú-ewé yìí kì í fi ránṣẹ́ sí ẹnikẹ́ni; a kò sì fi àdírẹ́sì í-meèlì tí a kò tíì jẹ́rìí hàn.",
    backHome: "Padà sí Ilé",
    loadingCourses: "A ń ṣí àwọn ẹ̀kọ́ tí a ti tẹ̀ jáde…",
    coursesLoadFailed: "A kò lè ṣí àkójọ ẹ̀kọ́. Ṣàyẹ̀wò ìsopọ̀ rẹ, kí o sì tún gbìyànjú.",
    retry: "Tún Gbìyànjú",
    noCourses: "Kò sí ẹ̀kọ́ tí a ti tẹ̀ jáde lọ́wọ́lọ́wọ́.",
    noCoursesDescription: "Jọ̀wọ́ tún wò ó lẹ́yìn náà. Àwọn ẹ̀kọ́ tí a tẹ̀ jáde nìkan ni yóò hàn níbí.",
    unavailable: "Àkójọ ẹ̀kọ́ kò sí fún ìgbà díẹ̀. Jọ̀wọ́ tún gbìyànjú láìpẹ́."
  },
  ha: {
    courses: "Darussa", signIn: "Shiga", dashboard: "Shafin Mai Amfani",
    about: "Game da Mu", contact: "Tuntuɓe Mu", start: "Fara Koyo",
    aboutEyebrow: "GAME DA SUPER-AI 9JA",
    aboutTitle: "Koyon AI mai amfani ga Najeriya.",
    aboutIntro: "SUPER-AI 9ja yana taimaka wa mutane su koyi ƙwarewar basirar wucin gadi ta hanyar koyarwa mai sauƙin samu, gwaji na aikace-aikace, da hanyoyi bayyanannu daga fahimta zuwa amfani.",
    aboutMissionTitle: "Manufarmu",
    aboutMission: "Sauƙaƙa samun ilimin AI tare da la'akari da harsuna, buri, da rayuwar yau da kullum ta masu koyo a Najeriya.",
    aboutPrinciplesTitle: "Abubuwan da suke jagorantar mu",
    aboutPrinciple1Title: "Koyo ta aikace-aikace",
    aboutPrinciple1: "Fahimci muhimman ra'ayoyi kuma ka koyi amfani da su wajen magance matsaloli na gaske.",
    aboutPrinciple2Title: "Haɗa harsuna",
    aboutPrinciple2: "Tallafa wa English, Nigerian Pidgin, Yorùbá, Hausa, da Igbo.",
    aboutPrinciple3Title: "Aminci da gaskiya",
    aboutPrinciple3: "Bayyana ainihin darussan da suke akwai da kuma kiyaye dokokin shiga asusu.",
    aboutNext: "Duba Darussa domin ganin abin da aka wallafa a yanzu.",
    contactEyebrow: "TUNTUƁE MU",
    contactTitle: "Haɗu da SUPER-AI 9ja.",
    contactIntro: "Kana da tambaya game da koyo, samun darasi, asusunka, ko haɗin gwiwa? Fara da gano irin taimakon da kake buƙata.",
    contactLearningTitle: "Koyo da darussa",
    contactLearning: "Don tambayoyin darasi, duba shafin Darussa domin ganin kundin da aka wallafa.",
    contactAccountTitle: "Asusu da shiga",
    contactAccount: "Idan kana fuskantar matsalar shiga, yi amfani da Shiga kuma ka tabbatar da asusun da kake amfani da shi.",
    contactPartnershipTitle: "Haɗin gwiwa da ra'ayoyi",
    contactPartnership: "Don shawarwarin haɗin gwiwa ko ra'ayi, yi amfani da hanyar tuntuɓa ta hukuma da ƙungiyar SUPER-AI 9ja ta wallafa.",
    contactHonest: "Wannan shafi ba ya aika saƙo, kuma ba ya nuna adireshin imel ko hanyar tuntuɓa da ba a tabbatar ba.",
    backHome: "Komawa Gida",
    loadingCourses: "Ana loda darussan da aka wallafa…",
    coursesLoadFailed: "Ba a iya loda kundin darussa ba. Duba haɗin intanet ka sake gwadawa.",
    retry: "Sake Gwadawa",
    noCourses: "Babu darussan da aka wallafa a yanzu.",
    noCoursesDescription: "A sake dubawa daga baya. Darussan da aka wallafa kawai za su bayyana a nan.",
    unavailable: "Ba a samun kundin darussa na ɗan lokaci. A sake gwadawa nan ba da jimawa ba."
  },
  ig: {
    courses: "Nkuzi", signIn: "Banye", dashboard: "Dashboard",
    about: "Maka Anyị", contact: "Kpọtụrụ Anyị", start: "Malite Ịmụ Ihe",
    aboutEyebrow: "MGBASARA SUPER-AI 9JA",
    aboutTitle: "Ịmụ AI bara uru maka Naịjirịa.",
    aboutIntro: "SUPER-AI 9ja na-enyere ndị mmadụ aka ịzụlite nkà ọgụgụ isi arụrụ arụ site n'ịmụ ihe dị mfe ịnweta, nnwale bara uru, na ụzọ doro anya site n'ịghọta ruo n'iji ya arụ ọrụ.",
    aboutMissionTitle: "Ebumnuche anyị",
    aboutMission: "Ime ka mmụta AI dị mfe inweta ma kwekọọ n'asụsụ, ebumnuche, na ndụ ndị na-amụ ihe na Naịjirịa.",
    aboutPrinciplesTitle: "Ihe na-eduzi anyị",
    aboutPrinciple1Title: "Ịmụ ihe bara uru",
    aboutPrinciple1: "Ghọta echiche ndị bụ isi ma mụta iji ha dozie nsogbu ndị dị adị.",
    aboutPrinciple2Title: "Ịnabata asụsụ",
    aboutPrinciple2: "Ịkwado English, Nigerian Pidgin, Yorùbá, Hausa, na Igbo.",
    aboutPrinciple3Title: "Ntụkwasị obi na eziokwu",
    aboutPrinciple3: "Igosipụta nkuzi ndị e bipụtara n'ezie na ịkwanyere iwu nchekwa akaụntụ ùgwù.",
    aboutNext: "Lelee Nkuzi ka ị hụ ihe e bipụtara ugbu a.",
    contactEyebrow: "KPỌTỤRỤ ANYỊ",
    contactTitle: "Soro SUPER-AI 9ja kparịta ụka.",
    contactIntro: "Ị nwere ajụjụ gbasara mmụta, ịnweta nkuzi, akaụntụ gị, ma ọ bụ mmekọrịta? Bido site n'ịmata ụdị enyemaka ị chọrọ.",
    contactLearningTitle: "Mmụta na nkuzi",
    contactLearning: "Maka ajụjụ gbasara nkuzi, lelee ibe Nkuzi maka ndepụta ihe e bipụtara.",
    contactAccountTitle: "Akaụntụ na nbanye",
    contactAccount: "Maka nsogbu nbanye, jiri Banye ma lelee na ị na-eji akaụntụ ziri ezi.",
    contactPartnershipTitle: "Mmekọrịta na echiche",
    contactPartnership: "Maka echiche mmekọrịta ma ọ bụ nzaghachi, jiri ụzọ kọntaktị gọọmentị nke ndị otu SUPER-AI 9ja bipụtara.",
    contactHonest: "Ibe a anaghị ezipu ozi, ọ naghị egosikwa adreesị email ma ọ bụ ụzọ kọntaktị a na-enyochabeghị.",
    backHome: "Laghachi n'ụlọ",
    loadingCourses: "A na-ebunye nkuzi ndị e bipụtara…",
    coursesLoadFailed: "Anyị enweghị ike ibunye ndepụta nkuzi. Lelee njikọ ịntanetị gị ma nwaa ọzọ.",
    retry: "Nwaa Ọzọ",
    noCourses: "Enweghị nkuzi e bipụtara ugbu a.",
    noCoursesDescription: "Biko lelee ọzọ ma emechaa. Naanị nkuzi e bipụtara ga-apụta ebe a.",
    unavailable: "Ndepụta nkuzi adịghị nwa oge. Biko nwaa ọzọ obere oge."
  }
} as const;

function getPageCopy(language: string) {
  return PAGE_COPY[language as keyof typeof PAGE_COPY] ?? PAGE_COPY.en;
}

function SiteHeader() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label={`${t.brand} ${t.home}`}>
        <span className="brand-mark" aria-hidden="true">S</span>
        <span className="brand-name">{t.brand}</span>
      </Link>

      <nav className="site-nav" aria-label="Main navigation">
        <Link className="nav-link" to="/">{t.home}</Link>
        <Link className="nav-link nav-link--courses" to="/learning">
          COURSES
        </Link>
        <Link className="nav-link" to="/about">About</Link>
        <Link className="nav-link" to="/contact">Contact</Link>
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
      </nav>

      <div className="header-actions">
        <label className="language-control">
          <span>{t.language}</span>
          <select
            aria-label={t.language}
            value={language}
            onChange={(event) =>
              setLanguage(event.target.value as typeof language)
            }
          >
            {LANGUAGE_REGISTRY.map((item) => (
              <option key={item.code} value={item.code}>
                {item.nativeName}
              </option>
            ))}
          </select>
        </label>
        <Link className="nav-link nav-link--signin" to="/login">
          Sign In <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  )
}


function PageShell({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage()

  return (
    <div className="app-shell">
      <SiteHeader />
      {children}
      <footer className="site-footer">
        <span>SUPER-AI 9ja</span>
        <span>{t.footer}</span>
      </footer>
    </div>
  )
}

function HomePage() {
  const { t } = useLanguage()

  const pathways = [
    {
      number: '01',
      symbol: '◎',
      title: t.understand,
      description: t.understandDescription,
      action: t.browseCourses,
      href: '/learning',
      className: 'pathway-card--understand',
    },
    {
      number: '02',
      symbol: '⌘',
      title: t.practice,
      description: t.practiceDescription,
      action: t.viewLessons,
      href: '/learning',
      className: 'pathway-card--practice',
    },
    {
      number: '03',
      symbol: '↗',
      title: t.apply,
      description: t.applyDescription,
      action: t.browseCourses,
      href: '/learning',
      className: 'pathway-card--apply',
    },
  ]

  return (
    <PageShell>
      <main className="home-main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" aria-hidden="true" />
              {t.eyebrow}
            </p>

            <h1 id="hero-title">
              {t.headline}
              <span className="hero-title-accent" aria-hidden="true"> ✳</span>
            </h1>

            <p className="hero-description">{t.description}</p>

            <div className="hero-actions">
              <Link className="button button-primary" to="/learning">
                {t.getStarted} <span aria-hidden="true">↗</span>
              </Link>
              <Link className="button button-secondary" to="/tutor">
                {t.tutor}
              </Link>
            </div>

            <div className="hero-proof">
              <span className="hero-proof__symbol" aria-hidden="true">✳</span>
              <p>{t.knowledgePractice}</p>
              <span className="hero-proof__line" aria-hidden="true" />
              <span className="hero-proof__index">NG / 001</span>
            </div>
          </div>

          <aside className="visual-panel visual-panel--home"
            aria-label={t.learningLoop}>
            <div className="visual-panel-top">
              <span className="panel-label">{t.learningLoop}</span>
              <span className="panel-index">SUPER-AI / 9JA</span>
            </div>

            <div className="home-orbit home-orbit--outer" aria-hidden="true" />
            <div className="home-orbit home-orbit--middle" aria-hidden="true" />
            <div className="home-orbit home-orbit--inner" aria-hidden="true" />

            <div className="home-core">
              <span className="home-core__spark" aria-hidden="true">✳</span>
              <strong>AI</strong>
              <span>LEARN · BUILD · APPLY</span>
            </div>

            <span className="home-orbit-label home-orbit-label--top">
              {t.learn}
            </span>
            <span className="home-orbit-label home-orbit-label--right">
              {t.build}
            </span>
            <span className="home-orbit-label home-orbit-label--bottom">
              {t.apply}
            </span>
            <span className="home-orbit-label home-orbit-label--left">
              {t.grow}
            </span>

            <div className="panel-footer">
              <span>IDEAS INTO CAPABILITY</span>
              <span className="panel-signal" aria-hidden="true">● ● ●</span>
            </div>
          </aside>
        </section>

        <section className="home-manifesto" aria-label="Our approach">
          <div className="home-manifesto__lead">
            <span className="manifesto-index">THE SUPER-AI METHOD</span>
            <h2>Understand the technology. Build the skill. Use it in real life.</h2>
          </div>
          <div className="home-manifesto__note">
            <span className="manifesto-cross" aria-hidden="true">✳</span>
            <p>
              Learning should move beyond watching and reading. Explore
              structured lessons, strengthen your understanding, and keep
              moving towards practical capability.
            </p>
          </div>
        </section>

        <section className="home-pathways" aria-labelledby="pathways-title">
          <div className="home-section-heading">
            <div>
              <p className="eyebrow">YOUR NEXT MOVE</p>
              <h2 id="pathways-title">Turn curiosity into capability.</h2>
              <p className="home-section-lead">
                A clear path from understanding AI to putting your knowledge
                into practice.
              </p>
            </div>
            <span className="home-section-count">03 / PRINCIPLES</span>
          </div>

          <div className="pathway-grid">
            {pathways.map((pathway) => (
              <article
                className={`pathway-card ${pathway.className}`}
                key={pathway.number}
              >
                <div className="pathway-card__top">
                  <span className="pathway-card__number">{pathway.number}</span>
                  <span className="pathway-card__symbol" aria-hidden="true">
                    {pathway.symbol}
                  </span>
                </div>
                <h3>{pathway.title}</h3>
                <p>{pathway.description}</p>
                <Link className="pathway-card__link" to={pathway.href}>
                  {pathway.action} <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="home-course-cta" aria-labelledby="course-cta-title">
          <div className="home-course-cta__index" aria-hidden="true">
            <span>SAI</span>
            <span>LEARNING SYSTEM</span>
          </div>
          <div className="home-course-cta__content">
            <p className="eyebrow">THE COURSE CATALOGUE</p>
            <h2 id="course-cta-title">Your next skill starts here.</h2>
            <p>
              Explore available AI courses, choose a learning path, and open
              published lessons at your own pace.
            </p>
            <Link className="button button-primary" to="/learning">
              Explore COURSES <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="home-course-cta__stamp" aria-hidden="true">
            <span>LEARN</span>
            <strong>∞</strong>
            <span>GROW</span>
          </div>
        </section>

        <section className="home-tutor-strip">
          <div>
            <p className="eyebrow">LEARNING SUPPORT</p>
            <h2>Want guidance as you learn?</h2>
            <p>
              Visit the AI tutor page to see the current learning-support
              experience and its available capabilities.
            </p>
          </div>
          <Link className="button button-secondary" to="/tutor">
            Meet the AI tutor <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
    </PageShell>
  )
}


function LearningPage() {
  const { language, t } = useLanguage()

  const copy = getPageCopy(language);const [subjects, setSubjects] = useState<Subject[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [courseSearch, setCourseSearch] = useState('')
  const [selectedSubjectId, setSelectedSubjectId] = useState('all')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadCourses() {
      if (!supabase) {
        setError(copy.unavailable)
        setLoading(false)
        return
      }

      const [subjectResult, courseResult] = await Promise.all([
        supabase
          .from('curriculum_subjects')
          .select('id,name,slug,description')
          .eq('is_active', true)
          .order('display_order'),
        supabase
          .from('courses')
          .select('id,subject_id,slug,title,description,content_language,level,estimated_minutes')
          .eq('status', 'published')
          .not('published_at', 'is', null)
          .order('display_order'),
      ])

      if (cancelled) return

      if (subjectResult.error || courseResult.error) {
        setError(t.coursesLoadFailed)
      } else {
        setSubjects(subjectResult.data ?? [])
        setCourses(courseResult.data ?? [])
      }
      setLoading(false)
    }

    void loadCourses()
    return () => { cancelled = true }
  }, [t, attempt])

  const activeSubjectIds = new Set(subjects.map((subject) => subject.id))


  const visibleCourses = courses.filter((course) => activeSubjectIds.has(course.subject_id))


  const normalizedSearch = courseSearch.trim().toLocaleLowerCase()


  const filteredCourses = visibleCourses.filter((course) => {


    const matchesSubject = selectedSubjectId === 'all' || course.subject_id === selectedSubjectId


    const searchableText = [course.title, course.description, course.level, course.content_language, course.slug].filter(Boolean).join(' ').toLocaleLowerCase()


    return matchesSubject && (!normalizedSearch || searchableText.includes(normalizedSearch))


  })

  return (
    <PageShell>
      <main className="simple-page">
        <p className="eyebrow">{t.journey}</p>
        <h1>{copy.courses}</h1>
          <div className="course-discovery" role="search" aria-label="Find courses">
            <label className="course-discovery__search">
              <span>Search courses</span>
              <input
                type="search"
                value={courseSearch}
                onChange={(event) => setCourseSearch(event.target.value)}
                placeholder="Try AI, safety, deep learning…"
                autoComplete="off"
              />
            </label>
            <div className="course-discovery__filters" aria-label="Filter by learning track">
              <button
                type="button"
                className={selectedSubjectId === 'all' ? 'is-active' : ''}
                aria-pressed={selectedSubjectId === 'all'}
                onClick={() => setSelectedSubjectId('all')}
              >
                All tracks
              </button>
              {subjects.map((subject) => {
                const details = subject as unknown as {
                  title?: string
                  name?: string
                  slug?: string
                }
                const label = details.title || details.name || details.slug || 'Learning track'
                return (
                  <button
                    type="button"
                    key={subject.id}
                    className={selectedSubjectId === subject.id ? 'is-active' : ''}
                    aria-pressed={selectedSubjectId === subject.id}
                    onClick={() => setSelectedSubjectId(subject.id)}
                  >
                    {label.replace(/-/g, ' ')}
                  </button>
                )
              })}
            </div>
            <p className="course-discovery__count" aria-live="polite">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
            </p>
            {(courseSearch || selectedSubjectId !== 'all') && (
              <button
                type="button"
                className="course-discovery__clear"
                onClick={() => {
                  setCourseSearch('')
                  setSelectedSubjectId('all')
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        <p>{t.choosePath}</p>
        <p><Link to="/">{t.backHome}</Link></p>

        {!supabaseConfigured && !loading && (
          <section className="principle-card" role="alert">
            <h2>{copy.unavailable}</h2>
            <p>{t.coursesLoadFailed}</p>
            <button className="button button-secondary" type="button" onClick={() => { setError(''); setLoading(true); setAttempt((value) => value + 1) }}>{copy.retry}</button>
          </section>
        )}
        {loading && <p role="status">{t.loadingCourses}</p>}
        {error && supabaseConfigured && (
          <section className="principle-card" role="alert">
            <h2>{copy.unavailable}</h2>
            <p>{error}</p>
            <button className="button button-secondary" type="button" onClick={() => { setError(''); setLoading(true); setAttempt((value) => value + 1) }}>{copy.retry}</button>
          </section>
        )}

        {!loading && !error && filteredCourses.length === 0 && (
          <section>
            <h2>{t.noCourses}</h2>
            <p>{t.noCoursesDescription}</p>
          </section>
        )}

        <section className="course-grid" aria-label={t.catalogue}>
          {filteredCourses.map((course) => {
            const subject = subjects.find((item) => item.id === course.subject_id)
            return (
              <article className="course-card" key={course.id}>
                <div
                  className="course-art-placeholder"
                  role="img"
                  aria-label={`${course.title} ${t.courseArtwork.toLowerCase()}`}
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(4,25,17,.02), rgba(4,25,17,.82)), url("/images/courses/${course.slug}.webp")`,
                  }}
                >
                  <span>{t.courseArtwork} · {course.slug}</span>
                </div>
                <span className="principle-number">{subject?.name ?? t.aiCourse}</span>
                <h2>{course.title}</h2>
                <p>{course.description ?? t.startLearningDescription}</p>
                <p>
                  {course.level} · {course.content_language.toUpperCase()}
                  {course.estimated_minutes ? ` · ${course.estimated_minutes} min` : ''}
                </p>
                <Link
                  className="button button-primary"
                  to={`/learning/courses/${encodeURIComponent(course.id)}`}
                >
                  {t.viewLessons} ↗
                </Link>
              </article>
            )
          })}
        </section>
      </main>
    </PageShell>
  )
}

function CoursePage() {
  const { t } = useLanguage()
  const { courseId } = useParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadCourse() {
      if (!supabase || !courseId) {
        setError(t.courseServiceUnavailable)
        setLoading(false)
        return
      }

      const courseResult = await supabase
        .from('courses')
        .select('id,subject_id,slug,title,description,content_language,level,estimated_minutes')
        .eq('id', courseId)
        .eq('status', 'published')
        .not('published_at', 'is', null)
        .maybeSingle()

      if (courseResult.error || !courseResult.data) {
        if (!cancelled) {
          setError(t.courseUnavailable)
          setLoading(false)
        }
        return
      }

      const lessonResult = await supabase
        .from('lessons')
        .select('id,course_id,slug,title,summary,content,display_order,estimated_minutes')
        .eq('course_id', courseId)
        .eq('status', 'published')
        .not('published_at', 'is', null)
        .order('display_order')

      if (cancelled) return

      if (lessonResult.error) {
        setError(t.lessonServiceUnavailable)
      } else {
        setCourse(courseResult.data)
        setLessons(lessonResult.data ?? [])
      }
      setLoading(false)
    }

    void loadCourse()
    return () => { cancelled = true }
  }, [courseId, t])

  return (
    <PageShell>
      <main className="simple-page">
        <p className="eyebrow">{t.courseOverview}</p>
        <p><Link to="/learning">{t.allCourses}</Link></p>
        {loading && <p role="status">{t.loadingCourse}</p>}
        {error && <p role="alert">{error}</p>}
        {course && (
          <>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <p>{course.level} · {course.content_language.toUpperCase()}</p>
            <h2>{t.lessons}</h2>
            {lessons.length === 0 && <p>{t.noLessons}</p>}
            <ol>
              {lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link to={`/learning/lessons/${encodeURIComponent(lesson.id)}`}>
                    {lesson.title}
                  </Link>
                  {lesson.estimated_minutes ? ` — ${lesson.estimated_minutes} ${t.minutes}` : ''}
                  {lesson.summary && <p>{lesson.summary}</p>}
                </li>
              ))}
            </ol>
          </>
        )}
      </main>
    </PageShell>
  )
}

function LessonPage() {
  const { t } = useLanguage()
  const { lessonId } = useParams()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [courseId, setCourseId] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadLesson() {
      if (!supabase || !lessonId) {
        setError(t.lessonServiceUnavailable)
        setLoading(false)
        return
      }

      const result = await supabase
        .from('lessons')
        .select('id,course_id,slug,title,summary,content,display_order,estimated_minutes')
        .eq('id', lessonId)
        .eq('status', 'published')
        .not('published_at', 'is', null)
        .maybeSingle()

      if (cancelled) return

      if (result.error || !result.data) {
        setError(t.lessonUnavailable)
      } else {
        setLesson(result.data)
        setCourseId(result.data.course_id)
      }
      setLoading(false)
    }

    void loadLesson()
    return () => { cancelled = true }
  }, [lessonId, t])

  return (
    <PageShell>
      <main className="simple-page">
        <p className="eyebrow">{t.lesson}</p>
        {courseId && <p><Link to={`/learning/courses/${encodeURIComponent(courseId)}`}>{t.backToCourse}</Link></p>}
        {loading && <p role="status">{t.loadingLesson}</p>}
        {error && <p role="alert">{error}</p>}
        {lesson && (
          <article>
            <h1>{lesson.title}</h1>
            {lesson.summary && <p>{lesson.summary}</p>}
            {lesson.estimated_minutes && <p>{lesson.estimated_minutes} {t.minutes}</p>}
            {lesson.content ? (
              <div className="lesson-content">
                {lesson.content.split('\n').map((line, index) => (
                  <p key={`${index}-${line.slice(0, 24)}`}>{line || '\u00a0'}</p>
                ))}
              </div>
            ) : (
              <p>{t.lessonContentMissing}</p>
            )}
          </article>
        )}
      </main>
    </PageShell>
  )
}

function SignInPage() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [mode, setMode] = useState<"login" | "register">(
    searchParams.get("mode") === "register" ? "register" : "login",
  )
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const requestedNext = searchParams.get("next") ?? "/dashboard"
  const nextPath = requestedNext.startsWith("/") && !requestedNext.startsWith("//")
    ? requestedNext
    : "/dashboard"

  useEffect(() => {
    let cancelled = false
    if (!supabase) return
    void supabase.auth.getSession().then(({ data }) => {
      if (!cancelled && data.session) navigate(nextPath, { replace: true })
    })
    return () => { cancelled = true }
  }, [navigate, nextPath])

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError("")
    setMessage("")

    if (!supabase) {
      setError(t.supabaseUnavailable)
      setBusy(false)
      return
    }

    try {
      if (mode === "register") {
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        })
        if (authError) throw authError

        if (data.session) {
          navigate(nextPath, { replace: true })
        } else {
          setMessage(
            "Your account request was accepted. Check your email if confirmation is required, then sign in.",
          )
        }
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })
        if (authError) throw authError
        navigate(nextPath, { replace: true })
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Authentication failed. Please try again.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <PageShell>
      <main className="simple-page account-page">
        <section className="account-card">
          <p className="eyebrow">{t.account}</p>
          <h1>{mode === "register" ? "Create your learner account" : "Welcome back"}</h1>
          <p>
            {mode === "register"
              ? "Create an account to continue your learning journey."
              : "Sign in to access your learner dashboard."}
          </p>

          {!supabaseConfigured && (
            <p role="alert">{t.supabaseUnavailable} Check the local Vite environment configuration.</p>
          )}

          <form className="account-form" onSubmit={submit}>
            <label htmlFor="account-email">Email address</label>
            <input
              id="account-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label htmlFor="account-password">Password</label>
            <input
              id="account-password"
              type="password"
              autoComplete={mode === "register" ? "new-password" : "current-password"}
              minLength={6}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            {error && <p className="form-message form-error" role="alert">{error}</p>}
            {message && <p className="form-message form-success" role="status">{message}</p>}

            <button
              className="button button-primary account-submit"
              type="submit"
              disabled={busy || !supabaseConfigured}
            >
              {busy ? "Please wait…" : mode === "register" ? "Create account" : "Sign in"}
            </button>
          </form>

          <p className="account-switch">
            {mode === "register" ? "Already have an account?" : "New to SUPER-AI 9ja?"}{" "}
            <button
              className="text-button"
              type="button"
              onClick={() => {
                setMode((current) => current === "register" ? "login" : "register")
                setError("")
                setMessage("")
              }}
            >
              {mode === "register" ? "Sign in" : "Create an account"}
            </button>
          </p>
          <p><Link to="/learning">{t.publishedCourses}</Link></p>
        </section>
      </main>
    </PageShell>
  )
}

function TutorPage() {
  const { t } = useLanguage()

  return (
    <PageShell>
      <main className="simple-page">
        <p className="eyebrow">{t.companion}</p>
        <h1>{t.tutorTitle}</h1>
        <p>{t.tutorDescription}</p>
        <Link className="button button-primary" to="/learning">{t.publishedCourses}</Link>
      </main>
    </PageShell>
  )
}

function DashboardPage() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState("")

  useEffect(() => {
    let cancelled = false
    if (!supabase) {
      setLoading(false)
      setAuthError(t.supabaseUnavailable)
      return
    }

    void supabase.auth.getSession().then(({ data, error }) => {
      if (cancelled) return
      if (error) setAuthError(error.message)
      if (data.session?.user) {
        setEmail(data.session.user.email ?? "")
        setLoading(false)
      } else {
        navigate("/login?next=%2Fdashboard", { replace: true })
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return
      if (session?.user) {
        setEmail(session.user.email ?? "")
        setLoading(false)
      } else {
        setEmail("")
      }
    })

    return () => {
      cancelled = true
      listener.subscription.unsubscribe()
    }
  }, [navigate, t.supabaseUnavailable])

  async function signOut() {
    if (!supabase) return
    const { error } = await supabase.auth.signOut()
    if (error) setAuthError(error.message)
    else navigate("/", { replace: true })
  }

  return (
    <PageShell>
      <main className="simple-page dashboard-page">
        <p className="eyebrow">LEARNER SPACE</p>
        <h1>Your learning dashboard</h1>
        {loading && <p role="status">Checking your session…</p>}
        {authError && <p role="alert">{authError}</p>}
        {!loading && email && (
          <>
            <p>Signed in as <strong>{email}</strong>.</p>
            <section className="dashboard-grid">
              <article className="principle-card">
                <span className="principle-number">01 / LEARN</span>
                <h2>Explore courses</h2>
                <p>Choose a published course and continue through its available lessons.</p>
                <Link className="button button-primary" to="/learning">Browse courses ↗</Link>
              </article>
              <article className="principle-card">
                <span className="principle-number">02 / SUPPORT</span>
                <h2>Learning companion</h2>
                <p>The tutor service is not yet connected. We will identify it clearly until it is ready.</p>
                <Link className="button button-secondary" to="/tutor">View tutor status</Link>
              </article>
            </section>
            <p className="access-note">
              Course and lesson access is checked by the platform's database policies.
              Signing in does not itself grant paid-course access.
            </p>
            <button className="button button-secondary" type="button" onClick={() => void signOut()}>
              Sign out
            </button>
          </>
        )}
      </main>
    </PageShell>
  )
}


function AboutPage() {
  const { language } = useLanguage();
  const copy = getPageCopy(language);
  return (
    <PageShell>
      <main className="sa9-content-page">
        <p className="eyebrow">{copy.aboutEyebrow}</p>
        <h1>{copy.aboutTitle}</h1>
        <p className="sa9-page-lead">{copy.aboutIntro}</p>
        <section className="sa9-page-section">
          <h2>{copy.aboutMissionTitle}</h2>
          <p>{copy.aboutMission}</p>
        </section>
        <section className="sa9-page-section">
          <h2>{copy.aboutPrinciplesTitle}</h2>
          <div className="sa9-principle-grid">
            <article className="sa9-principle-card">
              <h3>{copy.aboutPrinciple1Title}</h3><p>{copy.aboutPrinciple1}</p>
            </article>
            <article className="sa9-principle-card">
              <h3>{copy.aboutPrinciple2Title}</h3><p>{copy.aboutPrinciple2}</p>
            </article>
            <article className="sa9-principle-card">
              <h3>{copy.aboutPrinciple3Title}</h3><p>{copy.aboutPrinciple3}</p>
            </article>
          </div>
        </section>
        <p>{copy.aboutNext}</p>
        <Link className="sa9-text-link" to="/learning">{copy.courses}</Link>
      </main>
    </PageShell>
  );
}


function ContactPage() {
  const { language } = useLanguage();
  const copy = getPageCopy(language);
  return (
    <PageShell>
      <main className="sa9-content-page">
        <p className="eyebrow">{copy.contactEyebrow}</p>
        <h1>{copy.contactTitle}</h1>
        <p className="sa9-page-lead">{copy.contactIntro}</p>
        <div className="sa9-principle-grid">
          <article className="sa9-principle-card">
            <h2>{copy.contactLearningTitle}</h2><p>{copy.contactLearning}</p>
            <Link className="sa9-text-link" to="/learning">{copy.courses}</Link>
          </article>
          <article className="sa9-principle-card">
            <h2>{copy.contactAccountTitle}</h2><p>{copy.contactAccount}</p>
            <Link className="sa9-text-link" to="/login">{copy.signIn}</Link>
          </article>
          <article className="sa9-principle-card">
            <h2>{copy.contactPartnershipTitle}</h2><p>{copy.contactPartnership}</p>
          </article>
        </div>
        <p className="sa9-contact-note">{copy.contactHonest}</p>
        <Link className="sa9-text-link" to="/">{copy.backHome}</Link>
      </main>
    </PageShell>
  );
}


function NotFoundPage() {
  const { t } = useLanguage()

  return (
    <PageShell>
      <main className="simple-page">
        <h1>{t.notFound}</h1>
        <Link className="button button-primary" to="/">{t.returnHome}</Link>
      </main>
    </PageShell>
  )
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/learning" element={<LearningPage />} />
      <Route path="/learning/courses/:courseId" element={<CoursePage />} />
      <Route path="/learning/lessons/:lessonId" element={<LessonPage />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/tutor" element={<TutorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
