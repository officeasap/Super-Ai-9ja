import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useLanguage } from '../i18n/LanguageProvider'
import { OFFICIAL_COURSES } from './LearningPage'

type CourseRecord = {
  id: string
  slug: string
  title: string
  description: string | null
  content_language: string
  level: string
  estimated_minutes: number | null
}

type LessonRecord = {
  id: string
  title: string
  slug: string
  description: string | null
  display_order: number
}

const detailCopy: Record<string, { back: string; lessons: string; loading: string; empty: string; open: string; free: string }> = {
  en: { back: 'All courses', lessons: 'Your learning path', loading: 'Loading course details…', empty: 'Lessons will appear here when they are published.', open: 'Open lesson', free: 'Free course' },
  pcm: { back: 'All courses', lessons: 'Your learning path', loading: 'We dey load course details…', empty: 'Lessons go show here when dem don publish am.', open: 'Open lesson', free: 'Free course' },
  yo: { back: 'Gbogbo ẹ̀kọ́', lessons: 'Ọ̀nà ẹ̀kọ́ rẹ', loading: 'A ń ṣí àlàyé ẹ̀kọ́…', empty: 'Àwọn ẹ̀kọ́ yóò hàn níbí nígbà tí a bá tẹ̀ wọ́n jáde.', open: 'Ṣí ẹ̀kọ́', free: 'Ẹ̀kọ́ ọ̀fẹ́' },
  ha: { back: 'Duk darussa', lessons: 'Hanyar koyonka', loading: 'Ana loda bayanan darasi…', empty: 'Darussa za su bayyana nan idan an wallafa su.', open: 'Bude darasi', free: 'Darasi kyauta' },
  ig: { back: 'Ọmụmụ niile', lessons: 'Ụzọ mmụta gị', loading: 'A na-ebunye nkọwa ọmụmụ…', empty: 'Ọmụmụ ga-apụta ebe a mgbe e bipụtara ha.', open: 'Mepee ọmụmụ', free: 'Ọmụmụ n’efu' },
}

export function CoursePage() {
  const { courseId = '' } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const copy = detailCopy[language] ?? detailCopy.en
  const [course, setCourse] = useState<CourseRecord | null>(null)
  const [lessons, setLessons] = useState<LessonRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [checkoutBusy, setCheckoutBusy] = useState(false)
  const [checkoutMessage, setCheckoutMessage] = useState('' )

  async function startCheckout() {
    if (!supabase || !course?.slug) {
      setCheckoutMessage('Course details are not ready. Please reload and try again.')
      return
    }
    setCheckoutBusy(true)
    setCheckoutMessage('' )
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        navigate('/login?next=' + encodeURIComponent(window.location.pathname))
        return
      }
      const { data, error } = await supabase.functions.invoke('create-course-checkout', {
        body: { courseSlug: course.slug },
      })
      if (error) throw error
      if (!data?.checkoutUrl || typeof data.checkoutUrl !== 'string') {
        throw new Error('Checkout did not return a valid payment link.')
      }
      window.location.assign(data.checkoutUrl)
    } catch (e) {
      setCheckoutMessage(e instanceof Error ? e.message : 'Unable to start checkout. Please try again.')
    } finally {
      setCheckoutBusy(false)
    }
  }

  useEffect(() => {
    let active = true

    async function load() {
      if (!supabase) {
        setLoading(false)
        return
      }

      const isSlug = courseId.startsWith('sai-')
      const courseQuery = supabase
        .from('sai9ja_courses')
        .select('id,slug,title,description,content_language,level,estimated_minutes')
        .eq(isSlug ? 'slug' : 'id', decodeURIComponent(courseId))
        .eq('is_published', true)
        .maybeSingle()

      const { data, error } = await courseQuery
      if (!active) return

      if (error || !data) {
        setCourse(null)
        setLoading(false)
        return
      }

      const found = data as CourseRecord
      setCourse(found)

      const lessonResult = await supabase
        .from('sai9ja_lessons')
        .select('id,title,slug,description,display_order')
        .eq('course_id', found.id)
        .eq('is_published', true)
        .order('display_order', { ascending: true })

      if (!active) return
      if (lessonResult.error) {
        console.error('Lesson catalogue load failed:', lessonResult.error)
      } else {
        setLessons((lessonResult.data ?? []) as LessonRecord[])
      }
      setLoading(false)
    }

    void load()
    return () => { active = false }
  }, [courseId])

  const fallback = OFFICIAL_COURSES.find((item) => item.slug === courseId)
  const title = course?.title ?? fallback?.title ?? 'Course details'
  const price = fallback?.price

  return (
    <main className="sa9-catalog">
      <div className="sa9-catalog__shell">
        <Link className="sa9-course-back" to="/learning">← {copy.back}</Link>
        <section className="sa9-course-detail">
          <div className="sa9-course-detail__visual">
            <img
              src={`/images/courses/${fallback?.image ?? course?.slug ?? courseId}.webp`}
              alt=""
              onError={(event) => { event.currentTarget.style.display = 'none' }}
            />
            <span className="sa9-course-card__visual-fallback" aria-hidden="true">SUPER-AI <strong>9JA</strong></span>
          </div>
          <div className="sa9-course-detail__copy">
            <p className="eyebrow">SUPER-AI 9JA · LEARNING PATH</p>
            <h1>{title}</h1>
            <p>{course?.description ?? 'A structured learning path to develop practical skills, strengthen understanding, and apply what you learn.'}</p>
            <p className="sa9-course-detail__price">{price == null ? copy.free : `$${price} USD`}</p>
            {price != null && <div className="sa9-course-purchase">
              <button type="button" className="sa9-button" onClick={() => void startCheckout()} disabled={checkoutBusy || loading || !course}>
                {checkoutBusy ? 'Preparing secure checkout…' : `Unlock full course · $${price} USD`}
              </button>
              {checkoutMessage && <p role="alert">{checkoutMessage}</p>}
              <p>Lesson one is free. Full course access activates after payment is verified.</p>
            </div>}
            {course && <p>{course.level} · {course.content_language.toUpperCase()}{course.estimated_minutes ? ` · ${course.estimated_minutes} min` : ''}</p>}
          </div>
        </section>

        <section className="sa9-lesson-list">
          <h2>{copy.lessons}</h2>
          {loading && <p role="status">{copy.loading}</p>}
          {!loading && lessons.length === 0 && <p>{copy.empty}</p>}
          {lessons.map((lesson, index) => (
            <Link className="sa9-lesson-row" key={lesson.id} to={`/learning/lessons/${encodeURIComponent(lesson.id)}`}>
              <span className="sa9-lesson-row__number">{String(index + 1).padStart(2, '0')}</span>
              <span className="sa9-lesson-row__title">{lesson.title}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  )
}
