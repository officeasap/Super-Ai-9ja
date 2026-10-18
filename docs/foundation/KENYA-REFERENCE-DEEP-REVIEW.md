# SUPER-AI Kenya — Deep Reference Review

Read-only source inspection for Nigeria adaptation.

## 1. Application routes and page wiring

```tsx
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'

import { AuthPage } from './pages/learner/AuthPage'
import { DashboardPage } from './pages/learner/DashboardPage'
const TutorPage = lazy(() => import('./pages/tutor/TutorPage').then((m) => ({ default: m.TutorPage })))

const AboutPage = lazy(() => import('./pages/about/AboutPage').then((m) => ({ default: m.AboutPage })))
const OurStoryPage = lazy(() => import('./pages/about/OurStoryPage').then((m) => ({ default: m.OurStoryPage })))
const CoursesPage = lazy(() => import('./pages/CoursesPage').then((m) => ({ default: m.CoursesPage })))
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage').then((m) => ({ default: m.CourseDetailPage })))
const LessonPage = lazy(() => import('./pages/LessonPage').then((m) => ({ default: m.LessonPage })))
const ContactPage = lazy(() => import('./pages/contact/ContactPage').then((m) => ({ default: m.ContactPage })))
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })))
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage').then((m) => ({ default: m.HowItWorksPage })))
const MentorshipPage = lazy(() => import('./pages/MentorshipPage').then((m) => ({ default: m.MentorshipPage })))
const StudentOutcomesPage = lazy(() => import('./pages/StudentOutcomesPage').then((m) => ({ default: m.StudentOutcomesPage })))
const WhyChooseUsPage = lazy(() => import('./pages/why-choose-us/WhyChooseUsPage').then((m) => ({ default: m.WhyChooseUsPage })))
const WhatIsSiPage = lazy(() => import('./pages/WhatIsSiPage').then((m) => ({ default: m.WhatIsSiPage })))
const MessageCheckerPage = lazy(() => import('./pages/tools/MessageCheckerPage').then((m) => ({ default: m.MessageCheckerPage })))
const EverydayToolsPage = lazy(() => import('./pages/tools/EverydayToolsPage').then((m) => ({ default: m.EverydayToolsPage })))
const ImageEnhancerPage = lazy(() => import('./pages/tools/ImageEnhancerPage').then((m) => ({ default: m.ImageEnhancerPage })))


import { Footer } from './components/home/Footer'
import { Header } from './components/navigation/Header'


function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />

      <main>
        <Suspense fallback={<div role="status" className="page-loading">Loading page…</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPage />} />
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          <Route path="/tutor" element={<TutorPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/mentorship" element={<MentorshipPage />} />
          <Route
            path="/student-outcomes"
            element={<StudentOutcomesPage />}
          />
          <Route
            path="/why-choose-us"
            element={<WhyChooseUsPage />}
          />
          <Route
            path="/tools/message-checker"
            element={<MessageCheckerPage />}
          />
          <Route
            path="/tools/money-report"
            element={<EverydayToolsPage kind="money" />}
          />
          <Route
            path="/tools/business"
            element={<ImageEnhancerPage />}
          />
          <Route
            path="/tools/write"
            element={<EverydayToolsPage kind="writing" />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/what-is-si" element={<WhatIsSiPage />} />
        </Routes>
        </Suspense>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App

```

## 2. Language identifiers and provider wiring


### `src/i18n/languages.ts`

```tsx
export const SUPPORTED_LANGUAGES = ['en', 'sw'] as const

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]

export interface LanguageDefinition {
  readonly code: SupportedLanguage
  readonly name: string
  readonly nativeName: string
}

export const LANGUAGE_REGISTRY: readonly LanguageDefinition[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
  },
  {
    code: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
  },
]

```

### `src/i18n/LanguageContext.ts`

```tsx
import { createContext } from 'react'

import type { SupportedLanguage } from './languages'
import { getTranslations } from './index'

export interface LanguageContextValue {
  readonly language: SupportedLanguage
  readonly setLanguage: (language: SupportedLanguage) => void
  readonly t: ReturnType<typeof getTranslations>
}

export const LanguageContext =
  createContext<LanguageContextValue | undefined>(undefined)

```

### `src/i18n/LanguageProvider.tsx`

```tsx
import {
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import {
  getTranslations,
  type SupportedLanguage,
} from './index'

import { LanguageContext } from './LanguageContext'

function getInitialLanguage(): SupportedLanguage {
  const stored = window.localStorage.getItem(
    'super-ai-kenya-language',
  )

  if (stored === 'sw') {
    return 'sw'
  }

  return 'en'
}

interface LanguageProviderProps {
  readonly children: ReactNode
}

export function LanguageProvider({
  children,
}: LanguageProviderProps) {
  const [language, setLanguageState] =
    useState<SupportedLanguage>(getInitialLanguage)

  const setLanguage = (nextLanguage: SupportedLanguage) => {
    setLanguageState(nextLanguage)

    window.localStorage.setItem(
      'super-ai-kenya-language',
      nextLanguage,
    )
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: getTranslations(language),
    }),
    [language],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

```

### `src/i18n/index.ts`

```tsx
import type { SupportedLanguage } from './languages'
import { translations } from './translations'

export {
  LANGUAGE_REGISTRY,
  SUPPORTED_LANGUAGES,
} from './languages'

export type {
  SupportedLanguage,
} from './languages'

export {
  translations,
}

export function getTranslations(
  language: SupportedLanguage,
) {
  return translations[language]
}

```

## 3. Design tokens and global CSS


### `src/styles/design-system.css`

```css
@import url("https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap");

@import "tailwindcss";

@theme {
  --color-smoked-powder: #1c1b1a;
  --color-smoked-card: #2f2f2c;
  --color-smoked-shadow: #080503;
  --color-smoked-ember: #c43503;
  --color-smoked-success: #56cd64;
  --color-smoked-warning: #e4b34a;
  --color-smoked-information: #62a8c7;
  --color-smoked-error: #d85c55;

  --color-text-on-card-primary: #e5decc;
  --color-text-on-card-secondary: #e5decc;
  --color-text-on-substrate-primary: #e5decc;
  --color-text-on-substrate-muted: #e5decc;

  --font-family-editorial: "EB Garamond", Georgia, serif;
  --font-family-interface: Inter, ui-sans-serif, sans-serif;
  --font-family-mono: "JetBrains Mono", monospace;

  --radius-card: 16px;
  --radius-card-sm: 16px;
  --radius-control: 16px;
  --radius-checkbox: 16px;
  --radius-radio: 999px;

  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-12: 48px;
  --spacing-16: 64px;

  --ease-cathedral: cubic-bezier(0.4, 0, 0.2, 1);

  --breakpoint-xs: 520px;
  --breakpoint-sm: 600px;
  --breakpoint-md: 760px;
  --breakpoint-lg: 800px;
  --breakpoint-xl: 900px;
  --breakpoint-2xl: 1050px;
}

:root {
  --material-substrate: #1c1b1a;
  --material-card: #2f2f2c;
  --material-shadow: #080503;

  --operational-ember: #c43503;
  --operational-success: #56cd64;
  --operational-warning: #e4b34a;
  --operational-information: #62a8c7;
  --operational-error: #d85c55;

  --text-card-primary: #e5decc;
  --text-card-secondary: #e5decc;
  --text-substrate-primary: #e5decc;
  --text-substrate-muted: #e5decc;

  /*
   * ============================================================
   * CUCO PHYSICAL MATERIAL SYSTEM
   * ============================================================
   */

  --shadow-physical:
    8px 10px 14px rgba(8, 5, 3, 0.68),
    -3px -3px 7px rgba(8, 5, 3, 0.22);

  --shadow-float:
    11px 13px 18px rgba(8, 5, 3, 0.72),
    -4px -4px 9px rgba(8, 5, 3, 0.24);

  --shadow-raised:
    8px 10px 14px rgba(8, 5, 3, 0.68),
    -3px -3px 7px rgba(8, 5, 3, 0.22);

  --shadow-raised-hover:
    10px 13px 17px rgba(8, 5, 3, 0.76),
    -4px -4px 9px rgba(8, 5, 3, 0.28);

  --shadow-pressed:
    inset 4px 5px 8px rgba(8, 5, 3, 0.72),
    inset -3px -3px 7px rgba(8, 5, 3, 0.28);

  /*
   * ============================================================
   * TYPOGRAPHIC MATERIAL
   * ============================================================
   */

  --text-shadow-physical:
    1px 1px 1px rgba(8, 5, 3, 0.72);

  --text-shadow-editorial:
    1px 1px 1.5px rgba(8, 5, 3, 0.78);

  --text-shadow-interface:
    1px 1px 1px rgba(8, 5, 3, 0.68);

  --text-shadow-mono:
    1px 1px 1px rgba(8, 5, 3, 0.72);

  /*
   * Focus is an accessibility affordance only.
   */

  --shadow-contact:
    0 0 0 3px rgba(196, 53, 3, 0.22);

  --shell-width: 1200px;
  --motion-cathedral: cubic-bezier(0.4, 0, 0.2, 1);

  font-family: Inter, ui-sans-serif, sans-serif;
  color: var(--text-substrate-primary);
  background: var(--material-substrate);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  min-width: 320px;
  background: var(--material-substrate);
  scroll-behavior: smooth;
}

body {
  min-width: 320px;
  min-height: 100svh;
  margin: 0;
  background: var(--material-substrate);
  color: var(--text-substrate-primary);
  font-family: Inter, ui-sans-serif, sans-serif;
  text-shadow: var(--text-shadow-interface);
}

button,
input,
select,
textarea {
  font: inherit;
  text-shadow: inherit;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

button {
  cursor: pointer;
}

img,
svg {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

/* ============================================================
   GLOBAL PHYSICAL SURFACES
   ============================================================ */

:where(.bg-smoked-card) {
  background-color: var(--material-card);
  box-shadow: var(--shadow-physical);
}

:where(.rounded-card.bg-smoked-card),
:where(.rounded-control.bg-smoked-card) {
  background-color: var(--material-card);
  box-shadow: var(--shadow-physical);
}

/* ============================================================
   BUTTONS / LINKS / INTERACTIVE OBJECTS
   ============================================================ */

:where(button.bg-smoked-card),
:where(a.bg-smoked-card),
:where([role="button"].bg-smoked-card) {
  background-color: var(--material-card);
  box-shadow: var(--shadow-raised);
  transition:
    box-shadow 200ms var(--motion-cathedral),
    transform 200ms var(--motion-cathedral),
    color 200ms var(--motion-cathedral);
}

:where(button.bg-smoked-card:hover),
:where(a.bg-smoked-card:hover),
:where([role="button"].bg-smoked-card:hover) {
  box-shadow: var(--shadow-raised-hover);
  transform: translateY(-1px);
}

:where(button.bg-smoked-card:active),
:where(a.bg-smoked-card:active),
:where([role="button"].bg-smoked-card:active) {
  box-shadow: var(--shadow-pressed);
  transform: translateY(1px);
}

```

### `src/index.css`

```css
@import './styles/design-system.css';


/* =========================================================
   SUPER-AI KENYA — MESSAGE CHECKER
   Smoked-powder surfaces and accessible risk communication
   ========================================================= */

.mc-page {
  --mc-bg: #1c1b1a;
  --mc-card: #2f2f2c;
  --mc-text: #e5decc;
  --mc-muted: #b2ad9f;
  --mc-line: rgba(229, 222, 204, 0.15);
  --mc-green: #56cd64;
  --mc-green-dark: #26382b;
  --mc-warning: #e4b34a;
  --mc-danger: #d85c55;

  min-height: 75vh;
  padding: 32px 0 0;
  overflow-wrap: anywhere;
  background: var(--mc-bg);
  color: var(--mc-text);
}

.mc-container {
  width: min(1120px, calc(100% - 48px));
  margin-inline: auto;
}

.mc-back {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--mc-muted);
  font-size: 13px;
  text-decoration: none;
}

.mc-back:hover {
  color: var(--mc-text);
}

.mc-back span {
  font-size: 18px;
}

.mc-heading {
  max-width: 760px;
  padding-block: 46px 40px;
}

.mc-eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 14px;
  color: var(--mc-muted);
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.13em;
  line-height: 1.8;
  text-transform: uppercase;
}

.mc-eyebrow > span {
  width: 7px;
  height: 7px;
  flex: 0 0 7px;
  background: var(--mc-green);
}

.mc-heading h1 {
  max-width: 720px;
  margin: 0;
  font-family: "EB Garamond", Georgia, serif;
  font-size: clamp(44px, 6vw, 70px);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 1;
}

.mc-intro {
  max-width: 620px;
  margin: 20px 0 0;
  color: var(--mc-muted);
  font-size: 15px;
  line-height: 1.9;
}

.mc-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(260px, 0.75fr);
  align-items: start;
  gap: 20px;
}

.mc-panel {
  min-width: 0;
  padding: 26px;
  border: 1px solid var(--mc-line);
  border-radius: 14px;
  background: var(--mc-card);
  box-shadow:
    inset 1px 1px 2px rgba(229, 222, 204, 0.025),
    inset -2px -2px 5px rgba(8, 5, 3, 0.2),
    0 4px 8px rgba(8, 5, 3, 0.4),
    0 18px 36px rgba(8, 5, 3, 0.28);
}

.mc-panel-heading {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 22px;
}

.mc-step {
  display: grid;
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  place-items: center;
  border: 1px solid var(--mc-line);
  border-radius: 9px;
  color: var(--mc-green);
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
}

.mc-panel-heading h2 {
  margin: 0;
  font-family: "EB Garamond", Georgia, serif;
  font-size: 29px;
  font-weight: 500;
  line-height: 1.15;
}

.mc-panel-heading p {
  margin: 9px 0 0;
  color: var(--mc-muted);
  font-size: 12px;
  line-height: 1.8;
}

.mc-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.mc-input-panel textarea {
  display: block;
  width: 100%;
  min-height: 210px;
  resize: vertical;
  padding: 17px;
  border: 1px solid rgba(229, 222, 204, 0.2);
  border-radius: 10px;
  outline: none;
  background: #242421;
  box-shadow:
    inset 2px 3px 8px rgba(8, 5, 3, 0.42),
    0 1px 0 rgba(229, 222, 204, 0.025);
  color: var(--mc-text);
  font: inherit;
  font-size: 14px;
  line-height: 1.8;
  transition: border-color 160ms ease;
}

.mc-input-panel textarea::placeholder {
  color: #969184;
}

.mc-input-panel textarea:focus {
  border-color: rgba(86, 205, 100, 0.65);
}

.mc-input-meta {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-top: 10px;
  color: var(--mc-muted);
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
}

.mc-input-meta button {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--mc-muted);
  font: inherit;
  cursor: pointer;
}

.mc-input-meta button:hover {
  color: var(--mc-text);
}

.mc-error {
  margin: 12px 0 0;
  color: #f19c96;
  font-size: 13px;
  line-height: 1.7;
}

.mc-check-button {
  display: flex;
  width: 100%;
  align-items: center;

```

### `src/App.css`

```css
/*
 * SUPER-AI KENYA
 *
 * Component styling lives in the canonical CUCO physical
 * material system:
 *
 * src/styles/design-system.css
 */

```

## 4. Supabase client — source only, no environment values

```ts
import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabaseConfigured = Boolean(
  supabaseUrl && supabasePublishableKey,
)

export const supabase: SupabaseClient | null = supabaseConfigured
  ? createClient(supabaseUrl!, supabasePublishableKey!)
  : null

```

## 5. Edge functions and backend source paths

```text
supabase/functions/tutor-chat/index.ts
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql
supabase/migrations/20261013000100_replace_legacy_subjects_with_ai_tracks.sql
supabase/migrations/20261013000200_add_video_urls_to_lessons.sql
supabase/migrations/20261014000100_add_lesson_videos.sql
```

## 6. Database objects and security policy declarations

```text
```

## 7. Tutor and language implementation references

```text
src/components/home/Hero.tsx:9:  const siLabel = language === 'sw' ? 'SI (Super Intelligence) — Elewa zaidi' : 'SI (Super Intelligence) — Understand it'
src/components/navigation/Header.tsx:106:setLanguage(language === 'en' ? 'sw' : 'en')
src/components/navigation/Header.tsx:115:return language === 'en' ? item.labelEn : item.labelSw
src/components/navigation/Header.tsx:164:          language === 'en'
src/components/navigation/Header.tsx:170:        {language === 'en' ? 'SW' : 'EN'}
src/components/navigation/Header.tsx:221:          {language === 'en' ? item.labelEn : item.labelSw}
src/data/curriculum.ts:9:  display_order: number
src/data/curriculum.ts:21:  video_url: string | null
src/data/curriculum.ts:22:  display_order: number
src/i18n/translations.ts:67:            'Understand the neural architectures powering modern computer vision, language, and intelligent systems.',
src/i18n/translations.ts:73:            'Explore transformers, large language models, RAG, fine-tuning, and agentic AI workflows.',
src/i18n/translations.ts:230:            'Chunguza transformers, large language models, RAG, fine-tuning, na mtiririko wa kazi wa AI agents.',
src/pages/CourseDetailPage.tsx:36:          'id, slug, title, description, language, level, status, display_order',
src/pages/CourseDetailPage.tsx:54:          'id, course_id, slug, title, summary, video_url, display_order, status, estimated_minutes',
src/pages/CourseDetailPage.tsx:58:        .order('display_order', { ascending: true })
src/pages/CourseDetailPage.tsx:72:            .from('lesson_videos')
src/pages/CourseDetailPage.tsx:116:                Language: {course.language} · {lessons.length} lessons
src/pages/CourseDetailPage.tsx:143:                        {videoLessonIds.has(lesson.id) || lesson.video_url
src/pages/CoursesPage.tsx:65:          'id, slug, title, description, language, level, status, display_order, price_amount, price_currency',
src/pages/CoursesPage.tsx:68:        .order('display_order', { ascending: true })
src/pages/HomePage.tsx:172:  const currentLanguage: Language = language === 'en' ? 'en' : 'sw'
src/pages/LessonPage.tsx:93:            'id, slug, title, description, language, level, status, display_order',
src/pages/LessonPage.tsx:102:            'id, course_id, slug, title, summary, video_url, display_order, status, estimated_minutes',
src/pages/LessonPage.tsx:133:        .from('lesson_videos')
src/pages/LessonPage.tsx:292:                url={lesson.video_url}
src/pages/WhatIsSiPage.tsx:10:    realityText: 'Artificial intelligence (AI) describes computer systems that perform tasks such as recognizing patterns, generating text, translating languages, making predictions, or helping people solve problems. Today’s systems can be powerful, but they can still make mistakes, invent information, and misunderstand context.',
src/pages/learner/DashboardPage.tsx:13:  display_order: number
src/pages/learner/DashboardPage.tsx:65:            .select('id, slug, title, description, language, level, status, display_order')
src/pages/learner/DashboardPage.tsx:67:            .order('display_order', { ascending: true }),
src/pages/learner/DashboardPage.tsx:71:            .select('id, course_id, title, display_order, status')
src/pages/learner/DashboardPage.tsx:73:            .order('display_order', { ascending: true }),
src/pages/tools/EverydayToolsPage.tsx:221:  const sw = language !== 'en'
src/pages/tools/ImageEnhancerPage.tsx:185:  const sw = language !== 'en'
src/pages/tools/MessageCheckerPage.tsx:218:  const currentLanguage: Language = language === 'en' ? 'en' : 'sw'
src/pages/tutor/TutorPage.css:70:.tutor-chat {
src/pages/tutor/TutorPage.css:114:.tutor-chat {
src/pages/tutor/TutorPage.css:120:.tutor-chat-top {
src/pages/tutor/TutorPage.css:129:.tutor-chat-top > div {
src/pages/tutor/TutorPage.css:135:.tutor-chat-top strong {
src/pages/tutor/TutorPage.css:326:.tutor-chat,
src/pages/tutor/TutorPage.css:375:  .tutor-chat {
src/pages/tutor/TutorPage.css:379:  .tutor-chat-top {
src/pages/tutor/TutorPage.tsx:45:  const [language, setLanguage] = useState('en')
src/pages/tutor/TutorPage.tsx:72:    utterance.lang = language === 'sw' ? 'sw-KE' : 'en-KE'
src/pages/tutor/TutorPage.tsx:100:    recognition.lang = language === 'sw' ? 'sw-KE' : 'en-KE'
src/pages/tutor/TutorPage.tsx:148:          'The tutor connection is unavailable. Check the Supabase project configuration and the server-side AI-provider secret for the tutor-chat function.',
src/pages/tutor/TutorPage.tsx:152:      const { data, error } = await supabase.functions.invoke('tutor-chat', {
src/pages/tutor/TutorPage.tsx:182:          'The tutor service returned no answer. Check the deployed tutor-chat function and its model connection.',
src/pages/tutor/TutorPage.tsx:255:          <section className="tutor-chat" aria-label="Tutor conversation">
src/pages/tutor/TutorPage.tsx:256:            <div className="tutor-chat-top">
supabase/functions/tutor-chat/index.ts:1:const MODEL = "gemini-3.8-flash";
supabase/functions/tutor-chat/index.ts:132:  const languageInstruction = language === "sw"
supabase/functions/tutor-chat/index.ts:148:      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:55:  preferred_language text not null default 'en'
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:56:    check (preferred_language in ('en', 'sw')),
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:99:  display_order integer not null unique,
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:104:insert into public.subjects (slug, name, description, display_order)
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:120:  language text not null default 'en'
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:121:    check (language in ('en', 'sw')),
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:126:  display_order integer not null default 0,
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:133:  on public.courses(subject_id, status, display_order);
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:146:  display_order integer not null default 0,
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:154:  unique(course_id, display_order)
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:158:  on public.lessons(course_id, status, display_order);
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:164:-- Free educational entitlement; no payments or financial transactions.
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:183:-- A learner can study only while their free entitlement is active.
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:184:create or replace function public.has_active_entitlement()
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:252:-- Create profile and free entitlement when Auth creates a user.
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:335:  display_order integer not null default 0,
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:337:  unique(assessment_id, display_order)
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:562:    and (select public.has_active_entitlement())
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:584:    and (select public.has_active_entitlement())
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:613:  and (select public.has_active_entitlement())
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:620:  and (select public.has_active_entitlement())
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:624:  and (select public.has_active_entitlement())
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:644:    and (select public.has_active_entitlement())
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:664:      and (select public.has_active_entitlement())
supabase/migrations/20261010000100_super_ai_kenya_foundation.sql:688:  and (select public.has_active_entitlement())
supabase/migrations/20261013000100_replace_legacy_subjects_with_ai_tracks.sql:10:set display_order = -display_order
supabase/migrations/20261013000100_replace_legacy_subjects_with_ai_tracks.sql:20:insert into public.subjects (slug, name, description, display_order)
supabase/migrations/20261013000100_replace_legacy_subjects_with_ai_tracks.sql:25:  ('llms-generative-ai', 'LLMs & Generative AI', 'Large language models, generative systems, prompting, and evaluation.', 4),
supabase/migrations/20261013000100_replace_legacy_subjects_with_ai_tracks.sql:31:    display_order = excluded.display_order,
supabase/migrations/20261013000200_add_video_urls_to_lessons.sql:4:  add column if not exists video_url text;
supabase/migrations/20261013000200_add_video_urls_to_lessons.sql:12:      and conname = 'lessons_video_url_https_check'
supabase/migrations/20261013000200_add_video_urls_to_lessons.sql:15:      add constraint lessons_video_url_https_check
supabase/migrations/20261013000200_add_video_urls_to_lessons.sql:17:        video_url is null
supabase/migrations/20261013000200_add_video_urls_to_lessons.sql:18:        or video_url ~ '^https://[^[:space:]]+$'
supabase/migrations/20261013000200_add_video_urls_to_lessons.sql:24:comment on column public.lessons.video_url is
supabase/migrations/20261014000100_add_lesson_videos.sql:3:create table if not exists public.lesson_videos (
supabase/migrations/20261014000100_add_lesson_videos.sql:11:  constraint lesson_videos_identity_unique
supabase/migrations/20261014000100_add_lesson_videos.sql:15:create index if not exists lesson_videos_lesson_position_idx
supabase/migrations/20261014000100_add_lesson_videos.sql:16:  on public.lesson_videos (lesson_id, position);
supabase/migrations/20261014000100_add_lesson_videos.sql:18:alter table public.lesson_videos enable row level security;
supabase/migrations/20261014000100_add_lesson_videos.sql:20:comment on table public.lesson_videos is
```

## 8. Build and deployment configuration


### `vite.config.ts`

```text
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})

```

### `tsconfig.app.json`

```text
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}

```

### `vercel.json`

```text
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}

```

### `.env.example`

```text
VITE_SUPABASE_URL=<redacted>
VITE_SUPABASE_PUBLISHABLE_KEY=<redacted>

```

### `.gitignore`

```text
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Dependencies and build output
node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Local environment and secrets — never commit
.env
.env.*
!.env.example
!.env.*.example

# Private keys and service-role files
*.pem
*.key
*service-role*
```

## Review cautions

- Source presence does not prove runtime correctness.
- Do not copy environment values, credentials, or production data.
- Review each migration and authorization rule before adapting it.
- Confirm language coverage against actual translation keys, not only locale names.
- Confirm tutor implementation and deployment status independently.
