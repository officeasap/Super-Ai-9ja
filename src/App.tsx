import { useEffect, useRef, useState } from 'react'
import { Link, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'

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

function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(Boolean(supabase))
  useEffect(() => {
    if (!supabase) { setLoading(false); return }
    let active = true
    void supabase.auth.getSession().then(({ data }) => { if (active) { setSession(data.session); setLoading(false) } })
    const { data } = supabase.auth.onAuthStateChange((_event, next) => { if (active) { setSession(next); setLoading(false) } })
    return () => { active = false; data.subscription.unsubscribe() }
  }, [])
  return { session, loading }
}

function SiteHeader() {
  const { language, setLanguage, t } = useLanguage()
  const location = useLocation()
  const { session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [coursesOpen, setCoursesOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const active = (path: string) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path))
  useEffect(() => {
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); setCoursesOpen(false) } }
    const pointer = (event: PointerEvent) => { if (headerRef.current && !headerRef.current.contains(event.target as Node)) { setMenuOpen(false); setCoursesOpen(false) } }
    document.addEventListener('keydown', key)
    document.addEventListener('pointerdown', pointer)
    return () => { document.removeEventListener('keydown', key); document.removeEventListener('pointerdown', pointer) }
  }, [])
  useEffect(() => { setMenuOpen(false); setCoursesOpen(false) }, [location.pathname, location.search])
  const accountPath = session ? '/dashboard' : '/login?returnTo=' + encodeURIComponent(location.pathname + location.search)
  return (
    <header className="site-header" ref={headerRef}>
      <Link className="brand" to="/" aria-label={t.brand + ' — ' + t.home}><span className="brand-mark" aria-hidden="true">S</span><span>{t.brand}</span></Link>
      <nav className="desktop-nav" aria-label={t.primaryNavigation}>
        <Link className={'nav-link' + (active('/') ? ' is-active' : '')} to="/">{t.navHome}</Link>
        <div className="nav-dropdown"><button type="button" className={'nav-link nav-dropdown-trigger' + (active('/learning') ? ' is-active' : '')} aria-expanded={coursesOpen} aria-haspopup="true" onClick={() => setCoursesOpen(v => !v)}>{t.navCourses}<span aria-hidden="true">⌄</span></button>
          {coursesOpen && <div className="header-menu course-menu" role="menu"><Link role="menuitem" to="/learning">{t.catalogue}<span aria-hidden="true">↗</span></Link><Link role="menuitem" to="/tutor">{t.tutor}<span aria-hidden="true">↗</span></Link></div>}
        </div>
        <Link className={'nav-link' + (active('/dashboard') ? ' is-active' : '')} to={accountPath}>{t.navDashboard}</Link>
        <Link className={'nav-link' + (active('/subscribe') ? ' is-active' : '')} to="/subscribe">{t.navPlans}</Link>
      </nav>
      <div className="header-actions">
        <label className="language-control"><span>{t.language}</span><select aria-label={t.language} value={language} onChange={event => setLanguage(event.target.value as typeof language)}>{LANGUAGE_REGISTRY.map(item => <option key={item.code} value={item.code}>{item.nativeName}</option>)}</select></label>
        <Link className="button button-secondary header-account" to={accountPath}>{session ? t.navDashboard : t.navSignIn}</Link>
        <button className="header-menu-toggle" type="button" aria-label={menuOpen ? t.menuClose : t.menuOpen} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(value => !value)}><span className={'menu-icon' + (menuOpen ? ' is-open' : '')} aria-hidden="true"><span/><span/><span/></span><span className="menu-toggle-label">{menuOpen ? t.menuClose : t.menuOpen}</span></button>
      </div>
      {menuOpen && <nav id="mobile-navigation" className="mobile-drawer" aria-label={t.primaryNavigation}>
        <Link className={active('/') ? 'is-active' : ''} to="/">{t.navHome}</Link><Link className={active('/learning') ? 'is-active' : ''} to="/learning">{t.catalogue}</Link><Link className={active('/tutor') ? 'is-active' : ''} to="/tutor">{t.tutor}</Link><Link className={active('/dashboard') ? 'is-active' : ''} to={accountPath}>{t.navDashboard}</Link><Link className={active('/subscribe') ? 'is-active' : ''} to="/subscribe">{t.navPlans}</Link><Link to={accountPath}>{session ? t.navDashboard : t.navSignIn}</Link>
      </nav>}
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
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <PageShell>
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" aria-hidden="true" />
              {t.eyebrow}
            </p>
            <h1 id="hero-title">{t.headline}</h1>
            <p className="hero-description">{t.description}</p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/learning">
                {t.getStarted} <span aria-hidden="true">↗</span>
              </Link>
              <Link className="button button-secondary" to="/tutor">
                {t.tutor}
              </Link>
            </div>
            <p className="trust-note">
              <span aria-hidden="true">✳</span> {t.foundationNote}
            </p>
          </div>
          <aside className="visual-panel" aria-label={t.learningLoop}>
            <div className="visual-panel-top">
              <span className="panel-label">{t.learningLoop}</span>
              <span className="panel-index">NG / 001</span>
            </div>
            <div className="orbit orbit-outer" aria-hidden="true" />
            <div className="orbit orbit-inner" aria-hidden="true" />
            <div className="core-node">
              <span className="core-symbol" aria-hidden="true">✳</span>
              <strong>AI</strong>
              <span>{t.understand.toUpperCase()}</span>
            </div>
            <div className="orbit-tag tag-top">{t.learn}</div>
            <div className="orbit-tag tag-right">{t.build}</div>
            <div className="orbit-tag tag-bottom">{t.apply.toUpperCase()}</div>
            <div className="orbit-tag tag-left">{t.grow}</div>
            <div className="panel-footer">
              <span>{t.knowledgePractice}</span>
              <span className="panel-signal" aria-hidden="true">● ● ●</span>
            </div>
          </aside>
        </section>
        <section className="principles" aria-label={t.principles}>
          {[
            ['01', t.understand, t.understandDescription],
            ['02', t.practice, t.practiceDescription],
            ['03', t.apply, t.applyDescription],
          ].map(([number, title, description]) => (
            <article className="principle-card" key={number}>
              <span className="principle-number">{number}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </section>
        <section className="simple-page">
          <h2>{t.startLearning}</h2>
          <p>{t.startLearningDescription}</p>
          <Link className="button button-primary" to="/learning">
            {t.browseCourses} ↗
          </Link>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
          >
            {menuOpen ? t.hideQuickLinks : t.quickLinks}
          </button>
          {menuOpen && (
            <p>
              <Link to="/learning">{t.catalogue}</Link>
              {' · '}
              <Link to="/tutor">{t.tutor}</Link>
              {' · '}
              <Link to="/login">{t.learnerSignIn}</Link>
            </p>
          )}
        </section>
      </main>
    </PageShell>
  )
}

function LearningPage() {
  const { t } = useLanguage()
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadCourses() {
      if (!supabase) {
        setError(t.supabaseUnavailable)
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
        setError(
          subjectResult.error?.message ??
          courseResult.error?.message ??
          t.coursesLoadFailed,
        )
      } else {
        setSubjects(subjectResult.data ?? [])
        setCourses(courseResult.data ?? [])
      }
      setLoading(false)
    }

    void loadCourses()
    return () => { cancelled = true }
  }, [t])

  const activeSubjectIds = new Set(subjects.map((subject) => subject.id))
  const visibleCourses = courses.filter((course) =>
    activeSubjectIds.has(course.subject_id),
  )

  return (
    <PageShell>
      <main className="simple-page">
        <p className="eyebrow">{t.journey}</p>
        <h1>{t.exploreCourses}</h1>
        <p>{t.choosePath}</p>
        <p><Link to="/">{t.backHome}</Link></p>

        {!supabaseConfigured && !loading && (
          <p role="alert">{error}</p>
        )}
        {loading && <p role="status">{t.loadingCourses}</p>}
        {error && supabaseConfigured && <p role="alert">{error}</p>}

        {!loading && !error && visibleCourses.length === 0 && (
          <section>
            <h2>{t.noCourses}</h2>
            <p>{t.noCoursesDescription}</p>
          </section>
        )}

        <section className="principles" aria-label={t.catalogue}>
          {visibleCourses.map((course) => {
            const subject = subjects.find((item) => item.id === course.subject_id)
            return (
              <article className="principle-card" key={course.id}>
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

  return (
    <PageShell>
      <main className="simple-page">
        <p className="eyebrow">{t.account}</p>
        <h1>{t.signInUnavailable}</h1>
        <p>{t.signInDescription}</p>
        <Link className="button button-primary" to="/learning">{t.publishedCourses}</Link>
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
      <Route path="/tutor" element={<TutorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
