import { LearningPage } from './pages/LearningPage'
import { CoursePage } from './pages/CoursePage'
import PaymentReturnPage from './pages/PaymentReturnPage'
import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Link, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { LANGUAGE_REGISTRY } from './i18n/languages'
import { useLanguage } from './i18n/LanguageProvider'
import { supabase, supabaseConfigured } from './lib/supabase'
import LessonVideo from './components/curriculum/LessonVideo'

const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'))
const MentorshipPage = lazy(() => import('./pages/MentorshipPage'))
const StudentOutcomesPage = lazy(() => import('./pages/StudentOutcomesPage'))
const WhyChooseUsPage = lazy(() => import('./pages/WhyChooseUsPage'))
const WhatIsSiPage = lazy(() => import('./pages/WhatIsSiPage'))
const OurStoryPage = lazy(() => import('./pages/OurStoryPage'))

const ABOUT_LINKS: { to: string; label: string }[] = [
  { to: '/about', label: 'About us' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/mentorship', label: 'Mentorship' },
  { to: '/student-outcomes', label: 'Student Outcomes' },
  { to: '/why-choose-us', label: 'Why Choose Us' },
  { to: '/what-is-si', label: 'What Is SI' },
  { to: '/our-story', label: 'Our Story' },
]

function SubPage({ children }: { children: React.ReactNode }) {
  return (
    <PageShell>
      <Suspense fallback={<main className="sa9-content-page"><p role="status">Loading…</p></main>}>
        {children}
      </Suspense>
    </PageShell>
  )
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
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const { pathname } = useLocation()
  const [aboutOpen, setAboutOpen] = useState(false)
  const aboutRef = useRef<HTMLDivElement>(null)
  const aboutActive = ABOUT_LINKS.some((item) => item.to === pathname)
  const closeAll = () => {
    setMenuOpen(false)
    setAboutOpen(false)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  useEffect(() => {
    if (!aboutOpen) return undefined
    const onDown = (event: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) setAboutOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setAboutOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [aboutOpen])

  useEffect(() => {
    if (!menuOpen) return undefined

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  return (
    <header className="site-header">
      <Link
        className="brand"
        to="/"
        aria-label={`${t.brand} ${t.home}`}
        onClick={closeMenu}
      >
        <img className="brand-logo" src="/super-ai-9ja-logo.png" alt="" />
      </Link>

      <nav
        id="site-nav"
        className={`site-nav${menuOpen ? ' is-open' : ''}`}
        aria-label="Main navigation"
      >
        <Link className="nav-link nav-link--menu-signin" to="/login" onClick={() => { closeMenu(); window.scrollTo({ top: 0, left: 0, behavior: 'auto' }) }}>
          Sign In <span aria-hidden="true">↗</span>
        </Link>
        <Link className="nav-link" to="/" onClick={() => { closeMenu(); window.scrollTo({ top: 0, left: 0, behavior: 'auto' }) }}>{t.home}</Link>
        <Link className="nav-link nav-link--courses" to="/learning" onClick={() => { closeMenu(); window.scrollTo({ top: 0, left: 0, behavior: 'auto' }) }}>
          COURSES
        </Link>
        <div className={`nav-dropdown${aboutOpen ? ' is-open' : ''}`} ref={aboutRef}>
          <button
            type="button"
            className={`nav-link nav-dropdown__button${aboutActive ? ' is-active' : ''}`}
            aria-expanded={aboutOpen}
            aria-controls="about-menu"
            onClick={() => setAboutOpen((open) => !open)}
          >
            About <span aria-hidden="true">{aboutOpen ? '▴' : '▾'}</span>
          </button>
          <div id="about-menu" className="nav-dropdown__panel">
            {ABOUT_LINKS.map((item) => (
              <Link key={item.to} className="nav-link" to={item.to} onClick={closeAll}>{item.label}</Link>
            ))}
          </div>
        </div>
        <Link className="nav-link" to="/contact" onClick={() => { closeMenu(); window.scrollTo({ top: 0, left: 0, behavior: 'auto' }) }}>Contact</Link>
      </nav>

      <div className="header-actions">
        <Link className="nav-link nav-link--signin" to="/login">
          Sign In <span aria-hidden="true">↗</span>
        </Link>
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
        <button
          type="button"
          className="site-burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="site-burger__bar" aria-hidden="true" />
          <span className="site-burger__bar" aria-hidden="true" />
          <span className="site-burger__bar" aria-hidden="true" />
        </button>
      </div>

      {menuOpen && (
        <div className="site-backdrop" aria-hidden="true" onClick={closeMenu} />
      )}
    </header>
  )
}


function PageShell({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage()

  return (
    <div className="app-shell">
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

          <aside
            className="visual-panel visual-panel--home"
            aria-label={t.learningLoop}
          >
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
              <span>{t.knowledgePractice}</span>
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
              <span>{t.learningLoop}</span>
              <span className="panel-signal" aria-hidden="true">● ● ●</span>
            </div>
          </aside>
        </section>

        <section className="home-manifesto" aria-label={t.principles}>
          <div className="home-manifesto__lead">
            <span className="manifesto-index">{t.learningLoop}</span>
            <h2>{t.headline}</h2>
          </div>
          <div className="home-manifesto__note">
            <span className="manifesto-cross" aria-hidden="true">✳</span>
            <p>{t.description}</p>
          </div>
        </section>

        <section className="home-learning-loop" aria-labelledby="ada-story-title">
          <div className="section-heading">
            <p className="eyebrow">{t.learningLoop}</p>
            <h2 id="ada-story-title">{t.headline}</h2>
          </div>

          <article className="ada-story-card">
            <div className="ada-story-image">
              <img
                src="/images/courses/ada.png"
                alt={t.adaImageAlt}
                loading="lazy"
              />
            </div>

            <div className="ada-story-copy">
              <p className="eyebrow">{t.adaEyebrow}</p>
              <h3>{t.adaHeadline}</h3>
              <p>{t.adaBody}</p>
              <p className="ada-story-punchline">{t.adaPunchline}</p>
              <Link className="button button-primary" to="/learning">
                {t.adaCta} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        </section>

        <section className="home-pathways" aria-labelledby="pathways-title">
          <div className="home-section-heading">
            <div>
              <p className="eyebrow">{t.journey}</p>
              <h2 id="pathways-title">{t.principles}</h2>
              <p className="home-section-lead">{t.choosePath}</p>
            </div>
            <span className="home-section-count">03 / {t.learningLoop}</span>
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
            <span>{t.catalogue}</span>
          </div>
          <div className="home-course-cta__content">
            <p className="eyebrow">{t.catalogue}</p>
            <h2 id="course-cta-title">{t.exploreCourses}</h2>
            <p>{t.startLearningDescription}</p>
            <Link className="button button-primary" to="/learning">
              {t.browseCourses} <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="home-course-cta__stamp" aria-hidden="true">
            <span>{t.learn}</span>
            <strong>∞</strong>
            <span>{t.grow}</span>
          </div>
        </section>

        <section className="home-tutor-strip" aria-labelledby="tutor-strip-title">
          <div>
            <p className="eyebrow">{t.companion}</p>
            <h2 id="tutor-strip-title">{t.tutorTitle}</h2>
            <p>{t.tutorDescription}</p>
          </div>
          <Link className="button button-secondary" to="/tutor">
            {t.tutor} <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
    </PageShell>
  )
}

function LessonPage() {
  const { t } = useLanguage()
  const { lessonId } = useParams()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [videoLoading, setVideoLoading] = useState(false)
  const [videoError, setVideoError] = useState('')
  const [courseId, setCourseId] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadLesson() {
      if (!supabase || !lessonId) {
        setError(t.lessonServiceUnavailable)
        setLoading(false)
        return
      }

      const result = await supabase
        .from('sai9ja_lessons')
        .select('id,course_id,title,description,display_order')
        .eq('id', lessonId)
        .eq('is_published', true)
        .maybeSingle()

      if (cancelled) return

      if (result.error || !result.data) {
        setError(t.lessonUnavailable)
      } else {
        setCourseId(result.data.course_id)
        setLocked(false)
        setVideoUrl('')
        setVideoError('')
        setVideoLoading(true)

        const contentResult = await supabase
          .from('sai9ja_lesson_content')
          .select('content,video_url')
          .eq('lesson_id', result.data.id)
          .maybeSingle()

        if (cancelled) return

        if (contentResult.error) {
          setVideoError(t.lessonContentLoadFailed)
        } else if (!contentResult.data) {
          setLocked(true)
        }

        setLesson({
          ...result.data,
          slug: result.data.id,
          summary: result.data.description,
          content: contentResult.data?.content ?? '',
          estimated_minutes: null,
        })

        if (contentResult.data?.video_url) setVideoUrl(contentResult.data.video_url)
        setVideoLoading(false)
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
            <section className="lesson-video-section" aria-labelledby="lesson-video-heading">
              <h2 id="lesson-video-heading">{t.lessonVideo}</h2>
              {videoLoading && <p role="status">{t.loadingVideo}</p>}
              {!videoLoading && videoError && <p role="alert">{videoError}</p>}
              {!videoLoading && !videoError && videoUrl && (
                <LessonVideo
                  url={videoUrl}
                  title={lesson.title}
                  onError={() => setVideoError(t.videoUnavailable)}
                />
              )}
              {!videoLoading && !videoError && !videoUrl && !locked && (
                <p>{t.lessonVideoMissing}</p>
              )}
            </section>
            {lesson.content ? (
              <div className="lesson-content">
                {lesson.content.split('\n').map((line, index) => (
                  <p key={`${index}-${line.slice(0, 24)}`}>{line || '\u00a0'}</p>
                ))}
              </div>
            ) : (
              <p>{locked ? t.lessonLockedNotice : t.lessonContentMissing}</p>
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
  const { pathname } = useLocation()
  const mode: "login" | "register" =
    pathname === "/register" || searchParams.get("mode") === "register" ? "register" : "login"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
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
        if (password.length < 8) throw new Error("Use a password of at least 8 characters.")
        if (password !== confirmPassword) throw new Error("The two passwords do not match.")
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
        <section className={`account-card${mode === "register" ? " account-card--register" : ""}`}>
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
              minLength={mode === "register" ? 8 : 6}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            {mode === "register" && (
              <>
                <label htmlFor="account-confirm">Confirm password</label>
                <input
                  id="account-confirm"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <p className="account-hint">Use at least 8 characters.</p>
              </>
            )}

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
                navigate(
                  (mode === "register" ? "/login" : "/register") +
                    (searchParams.get("next") ? "?next=" + encodeURIComponent(searchParams.get("next") as string) : ""),
                  { replace: true },
                )
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
  const { t, language } = useLanguage()
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "model"; content: string }[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  async function askTutor(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const message = question.trim()
    if (!message || busy) return
    if (!supabase) {
      setError(t.supabaseUnavailable)
      return
    }

    setError("")
    setQuestion("")
    const previous = messages
    setMessages([...previous, { role: "user", content: message }])
    setBusy(true)

    try {
      const { data, error: invokeError } = await supabase.functions.invoke("tutor-chat", {
        body: { message, history: previous.slice(-8), language },
      })
      if (invokeError) throw invokeError
      if (!data || typeof data.answer !== "string") {
        throw new Error(data?.error || "The tutor did not return an answer.")
      }
      setMessages((current) => [...current, { role: "model", content: data.answer }])
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The tutor is temporarily unavailable.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <PageShell>
      <main className="simple-page tutor-page">
        <p className="eyebrow">{t.companion}</p>
        <h1>{t.tutorTitle}</h1>
        <p>{t.tutorDescription}</p>
        {!supabaseConfigured && (
          <p role="alert">{t.supabaseUnavailable}</p>
        )}
        <section aria-label="AI learning tutor" className="tutor-conversation">
          {messages.length === 0 && (
            <p>Ask about AI concepts, practical examples, responsible use, or how to begin a learning track.</p>
          )}
          {messages.map((item, index) => (
            <article className="principle-card" key={`${index}-${item.role}`}>
              <p><strong>{item.role === "user" ? "You" : "SUPER-AI Tutor"}</strong></p>
              <p style={{ whiteSpace: "pre-wrap" }}>{item.content}</p>
            </article>
          ))}
          {busy && <p role="status">Your tutor is preparing a response…</p>}
          {error && <p role="alert">{error}</p>}
          <form onSubmit={askTutor}>
            <label htmlFor="tutor-question">Your question</label>
            <textarea
              id="tutor-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              maxLength={4000}
              rows={4}
              required
              placeholder="What would you like to understand about AI?"
              disabled={busy || !supabaseConfigured}
            />
            <button className="button button-primary" type="submit" disabled={busy || !question.trim() || !supabaseConfigured}>
              {busy ? "Thinking…" : "Ask tutor"}
            </button>
          </form>
        </section>
        <p><Link className="button button-secondary" to="/learning">{t.publishedCourses}</Link></p>
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
  const [submitNotice, setSubmitNotice] = useState('');

  const formCopy: Record<string, {
    eyebrow: string; title: string; intro: string; name: string;
    email: string; topic: string; topics: string[]; subject: string;
    message: string; placeholder: string; submit: string;
    privacy: string; notConnected: string;
  }> = {
    en: {
      eyebrow: 'DIRECT LINE · SUPER-AI 9JA',
      title: 'Let’s start a conversation.',
      intro: 'Tell us what you need help with. Complete the form below so your enquiry is ready to send.',
      name: 'Your name', email: 'Email address', topic: 'What can we help with?',
      topics: ['Learning and courses', 'Account and access', 'Partnerships', 'Feedback and suggestions', 'Something else'],
      subject: 'Subject', message: 'Your message',
      placeholder: 'Tell the SUPER-AI 9ja team a little more…',
      submit: 'Prepare message', privacy: 'Please do not include passwords or sensitive account information.',
      notConnected: 'Your message has not been sent. Message delivery is not connected yet; please do not treat this form as a submitted enquiry.'
    },
    pcm: {
      eyebrow: 'DIRECT LINE · SUPER-AI 9JA',
      title: 'Make we start the conversation.',
      intro: 'Tell us the help wey you need. Fill this form make your message ready to send.',
      name: 'Your name', email: 'Email address', topic: 'Wetin we fit help you with?',
      topics: ['Learning and courses', 'Account and access', 'Partnership', 'Feedback and suggestions', 'Other matter'],
      subject: 'Message topic', message: 'Your message',
      placeholder: 'Tell SUPER-AI 9ja team small more…',
      submit: 'Prepare message', privacy: 'No put password or sensitive account information here.',
      notConnected: 'Your message never send. Message delivery never connect yet, so no treat this form as submitted.'
    },
    yo: {
      eyebrow: 'Ọ̀NÀ ÌBÁNISỌ̀RỌ̀ · SUPER-AI 9JA',
      title: 'Ẹ jẹ́ ká bẹ̀rẹ̀ ìjíròrò.',
      intro: 'Sọ irú ìrànlọ́wọ́ tí o nílò fún wa. Kún fọ́ọ̀mù yìí kí ìbéèrè rẹ lè múra sílẹ̀.',
      name: 'Orúkọ rẹ', email: 'Àdírẹ́sì í-meèlì', topic: 'Kí ni a lè ràn ọ́ lọ́wọ́?',
      topics: ['Ẹ̀kọ́ àti àwọn kíláàsì', 'Àkọọ́lẹ̀ àti ìwọlé', 'Ìfọwọ́sowọ́pọ̀', 'Àbá àti ìmọ̀ràn', 'Ohun mìíràn'],
      subject: 'Kókó ọ̀rọ̀', message: 'Ìránṣẹ́ rẹ',
      placeholder: 'Ṣàlàyé ohun tí o fẹ́ kí ẹgbẹ́ SUPER-AI 9ja mọ̀…',
      submit: 'Mú ìránṣẹ́ sílẹ̀', privacy: 'Má ṣe fi ọ̀rọ̀ aṣínà tàbí ìsọfúnni àkọọ́lẹ̀ tó ní ìkọ̀kọ̀ síbí.',
      notConnected: 'A kò tíì fi ìránṣẹ́ rẹ ránṣẹ́. A kò tíì so ọ̀nà fífi ìránṣẹ́ ránṣẹ́ pọ̀ mọ́ fọ́ọ̀mù yìí.'
    },
    ha: {
      eyebrow: 'HANYAR TUNTUƁA · SUPER-AI 9JA',
      title: 'Mu fara fara tattaunawa.',
      intro: 'Faɗi irin taimakon da kake buƙata. Cika fom ɗin don shirya saƙonka.',
      name: 'Sunanka', email: 'Adireshin imel', topic: 'Me za mu taimaka maka da shi?',
      topics: ['Koyo da darussa', 'Asusu da shiga', 'Haɗin gwiwa', 'Ra’ayoyi da shawarwari', 'Wani abu daban'],
      subject: 'Taken saƙo', message: 'Saƙonka',
      placeholder: 'Ƙara bayani ga ƙungiyar SUPER-AI 9ja…',
      submit: 'Shirya saƙo', privacy: 'Kada ka saka kalmar sirri ko bayanan asusu masu sirri.',
      notConnected: 'Ba a aika saƙonka ba. Ba a haɗa hanyar aika saƙo da wannan fom ba tukuna.'
    },
    ig: {
      eyebrow: 'ỤZỌ MKPARỊTA · SUPER-AI 9JA',
      title: 'Ka anyị malite mkparịta ụka.',
      intro: 'Gwa anyị ụdị enyemaka ị chọrọ. Dejupụta fọm a ka ozi gị dịrị njikere.',
      name: 'Aha gị', email: 'Adreesị email', topic: 'Kedu ihe anyị ga-enyere gị aka?',
      topics: ['Mmụta na nkuzi', 'Akaụntụ na nbanye', 'Mmekọrịta', 'Echiche na aro', 'Ihe ọzọ'],
      subject: 'Isiokwu ozi', message: 'Ozi gị',
      placeholder: 'Kọwaara ndị otu SUPER-AI 9ja ihe ọzọ…',
      submit: 'Kwadebe ozi', privacy: 'Etinyela paswọọdụ ma ọ bụ ozi akaụntụ nzuzo ebe a.',
      notConnected: 'Ezigaghị ozi gị. Ejikọbeghị ụzọ izipu ozi na fọm a.'
    }
  };

  const form = formCopy[language] ?? formCopy.en;

  return (
    <PageShell>
      <main className="sa9-content-page sa9-contact-page">
        <p className="eyebrow">{copy.contactEyebrow}</p>
        <h1>{copy.contactTitle}</h1>
        <p className="sa9-page-lead">{copy.contactIntro}</p>

        <section className="sa9-contact-team" aria-labelledby="sa9-contact-team-title">
          <div className="sa9-contact-team__mark" aria-hidden="true">✳</div>
          <div className="sa9-contact-team__content">
            <p className="sa9-contact-team__eyebrow">OFFICIAL TEAM CONTACT</p>
            <h2 id="sa9-contact-team-title">Contact</h2>
            <p className="sa9-contact-team__name">SuperAi 9ja | APFA Team</p>
            <p className="sa9-contact-team__location">
              <span aria-hidden="true">⌖</span>
              Benin City, Edo State, Nigeria
            </p>
          </div>
          <span className="sa9-contact-team__stamp">9JA · APFA</span>
        </section>

        <section className="sa9-contact-workspace" aria-labelledby="contact-form-title">
          <div className="sa9-contact-form-intro">
            <span className="sa9-contact-form-index">{form.eyebrow}</span>
            <h2 id="contact-form-title">{form.title}</h2>
            <p>{form.intro}</p>
            <div className="sa9-contact-signal" aria-hidden="true">
              <span></span><span></span><span></span>
              <span className="sa9-contact-signal-label">NAIJA · CONNECT</span>
            </div>
          </div>

          <form
            className="sa9-contact-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitNotice(form.notConnected);
            }}
          >
            <div className="sa9-contact-fields">
              <label className="sa9-contact-field">
                <span>{form.name}</span>
                <input name="name" type="text" autoComplete="name" required placeholder={form.name} />
              </label>

              <label className="sa9-contact-field">
                <span>{form.email}</span>
                <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
              </label>

              <label className="sa9-contact-field sa9-contact-field--wide">
                <span>{form.topic}</span>
                <select name="topic" required defaultValue="">
                  <option value="" disabled>{form.topic}</option>
                  {form.topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
                </select>
              </label>

              <label className="sa9-contact-field sa9-contact-field--wide">
                <span>{form.subject}</span>
                <input name="subject" type="text" required maxLength={120} placeholder={form.subject} />
              </label>

              <label className="sa9-contact-field sa9-contact-field--wide">
                <span>{form.message}</span>
                <textarea name="message" required minLength={10} maxLength={5000} rows={6} placeholder={form.placeholder} />
              </label>
            </div>

            <p className="sa9-contact-privacy">{form.privacy}</p>
            <button className="sa9-contact-submit" type="submit">
              <span>{form.submit}</span><span aria-hidden="true">↗</span>
            </button>

            {submitNotice && (
              <p className="sa9-contact-status" role="status" aria-live="polite">
                {submitNotice}
              </p>
            )}
          </form>
        </section>

        <div className="sa9-principle-grid sa9-contact-guides">
          <article className="sa9-principle-card">
            <h2>{copy.contactLearningTitle}</h2>
            <p>{copy.contactLearning}</p>
            <Link className="sa9-text-link" to="/learning">{copy.courses} ↗</Link>
          </article>
          <article className="sa9-principle-card">
            <h2>{copy.contactAccountTitle}</h2>
            <p>{copy.contactAccount}</p>
            <Link className="sa9-text-link" to="/login">{copy.signIn} ↗</Link>
          </article>
          <article className="sa9-principle-card">
            <h2>{copy.contactPartnershipTitle}</h2>
            <p>{copy.contactPartnership}</p>
          </article>
        </div>

        <p className="sa9-contact-note">{copy.contactHonest}</p>
        <Link className="sa9-text-link" to="/">{copy.backHome} ↗</Link>
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
    <>
      <SiteHeader />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/learning" element={<LearningPage />} />
      <Route path="/payment/return" element={<PaymentReturnPage />} />
      <Route path="/learning/courses/:courseId" element={<CoursePage />} />
      <Route path="/learning/lessons/:lessonId" element={<LessonPage />} />
      <Route path="/login" element={<SignInPage key="login" />} />
      <Route path="/register" element={<SignInPage key="register" />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/how-it-works" element={<SubPage><HowItWorksPage /></SubPage>} />
      <Route path="/mentorship" element={<SubPage><MentorshipPage /></SubPage>} />
      <Route path="/student-outcomes" element={<SubPage><StudentOutcomesPage /></SubPage>} />
      <Route path="/why-choose-us" element={<SubPage><WhyChooseUsPage /></SubPage>} />
      <Route path="/what-is-si" element={<SubPage><WhatIsSiPage /></SubPage>} />
      <Route path="/our-story" element={<SubPage><OurStoryPage /></SubPage>} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/tutor" element={<TutorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  )
}
