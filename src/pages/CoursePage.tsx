
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

type DetailCopy = {
  back: string
  lessons: string
  loading: string
  empty: string
  open: string
  free: string
  courseError: string
  lessonError: string
  retry: string
}

const detailCopy: Record<string, DetailCopy> = {
  en: {
    back: 'All courses',
    lessons: 'Your learning path',
    loading: 'Loading course details…',
    empty: 'No published lessons are available for this course yet.',
    open: 'Open lesson',
    free: 'Free course',
    courseError: 'Unable to load this course. Please try again.',
    lessonError: 'Unable to load lessons. Please try again.',
    retry: 'Retry',
  },
  pcm: {
    back: 'All courses',
    lessons: 'Your learning path',
    loading: 'We dey load course details…',
    empty: 'Dem never publish lesson for this course yet.',
    open: 'Open lesson',
    free: 'Free course',
    courseError: 'We no fit load this course. Abeg try again.',
    lessonError: 'We no fit load the lessons. Abeg try again.',
    retry: 'Try again',
  },
  yo: {
    back: 'Gbogbo ẹ̀kọ́',
    lessons: 'Ọ̀nà ẹ̀kọ́ rẹ',
    loading: 'A ń ṣí àlàyé ẹ̀kọ́…',
    empty: 'Kò sí ẹ̀kọ́ tí a ti tẹ̀ jáde fún ẹ̀kọ́ yìí.',
    open: 'Ṣí ẹ̀kọ́',
    free: 'Ẹ̀kọ́ ọ̀fẹ́',
    courseError: 'A kò lè ṣí ẹ̀kọ́ yìí. Jọ̀wọ́ tún gbìyànjú.',
    lessonError: 'A kò lè ṣí àwọn ẹ̀kọ́. Jọ̀wọ́ tún gbìyànjú.',
    retry: 'Tún gbìyànjú',
  },
  ha: {
    back: 'Duk darussa',
    lessons: 'Hanyar koyonka',
    loading: 'Ana loda bayanan darasi…',
    empty: 'Babu darussan da aka wallafa a wannan kwas tukuna.',
    open: 'Bude darasi',
    free: 'Darasi kyauta',
    courseError: 'An kasa loda wannan kwas. A sake gwadawa.',
    lessonError: 'An kasa loda darussa. A sake gwadawa.',
    retry: 'Sake gwadawa',
  },
  ig: {
    back: 'Ọmụmụ niile',
    lessons: 'Ụzọ mmụta gị',
    loading: 'A na-ebunye nkọwa ọmụmụ…',
    empty: 'E bipụtabeghị ọmụmụ maka usoro a.',
    open: 'Mepee ọmụmụ',
    free: 'Ọmụmụ n’efu',
    courseError: 'Enweghị ike ibunye usoro a. Biko nwaa ọzọ.',
    lessonError: 'Enweghị ike ibunye ọmụmụ. Biko nwaa ọzọ.',
    retry: 'Nwaa ọzọ',
  },
}

const COURSE_FIELDS =
  'id,slug,title,description,content_language,level,estimated_minutes'

const LESSON_FIELDS =
  'id,title,description,display_order'

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message

  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message
  }

  return 'An unexpected error occurred.'
}

function decodeCourseId(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  )
}

export function CoursePage() {
  const { courseId = '' } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const copy = detailCopy[language] ?? detailCopy.en

  const [course, setCourse] = useState<CourseRecord | null>(null)
  const [lessons, setLessons] = useState<LessonRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [courseError, setCourseError] = useState('')
  const [lessonError, setLessonError] = useState('')
  const [checkoutBusy, setCheckoutBusy] = useState(false)
  const [checkoutMessage, setCheckoutMessage] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  const requestedId = decodeCourseId(courseId)

  const fallback = OFFICIAL_COURSES.find(
    (item) => item.slug === requestedId,
  )

  useEffect(() => {
    let active = true

    async function load() {
      setLoading(true)
      setCourse(null)
      setLessons([])
      setCourseError('')
      setLessonError('')

      if (!supabase) {
        setCourseError(
          'Supabase is not configured. Check the application environment.',
        )
        setLoading(false)
        return
      }

      if (!requestedId) {
        setCourseError('No course ID or slug was provided.')
        setLoading(false)
        return
      }

      try {
        // UUID routes use the database ID. Other routes use the course slug.
        const lookupColumn = isUuid(requestedId) ? 'id' : 'slug'

        const { data, error } = await supabase
          .from('sai9ja_courses')
          .select(COURSE_FIELDS)
          .eq(lookupColumn, requestedId)
          .eq('is_published', true)
          .maybeSingle()

        if (!active) return

        if (error) {
          console.error('Course catalogue load failed:', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint,
          })

          setCourseError(
            `Unable to load course: ${error.message}`,
          )
          return
        }

        if (!data) {
          setCourseError(
            'This course was not found or has not been published.',
          )
          return
        }

        const found = data as CourseRecord
        setCourse(found)

        const { data: lessonData, error: lessonsQueryError } =
          await supabase
            .from('sai9ja_lessons')
            .select(LESSON_FIELDS)
            .eq('course_id', found.id)
            .eq('is_published', true)
            .order('display_order', { ascending: true })

        if (!active) return

        if (lessonsQueryError) {
          console.error('Lesson catalogue load failed:', {
            code: lessonsQueryError.code,
            message: lessonsQueryError.message,
            details: lessonsQueryError.details,
            hint: lessonsQueryError.hint,
            courseId: found.id,
          })

          setLessonError(
            `Unable to load lessons: ${lessonsQueryError.message}`,
          )
          return
        }

        setLessons((lessonData ?? []) as LessonRecord[])
      } catch (error) {
        if (!active) return

        console.error('Course page request failed:', error)
        setCourseError(getErrorMessage(error))
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [requestedId, reloadKey])

  async function startCheckout() {
    if (!supabase || !course?.slug) {
      setCheckoutMessage(
        'Course details are not ready. Please reload and try again.',
      )
      return
    }

    setCheckoutBusy(true)
    setCheckoutMessage('')

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError) throw authError

      if (!user) {
        navigate(
          '/login?next=' +
            encodeURIComponent(window.location.pathname),
        )
        return
      }

      const { data, error } = await supabase.functions.invoke(
        'create-course-checkout',
        {
          body: { courseSlug: course.slug },
        },
      )

      if (error) throw error

      if (
        typeof data?.checkoutUrl !== 'string' ||
        !data.checkoutUrl
      ) {
        throw new Error(
          'Checkout did not return a valid payment link.',
        )
      }

      // Only redirect to HTTPS payment URLs.
      const checkoutUrl = new URL(data.checkoutUrl)

      if (checkoutUrl.protocol !== 'https:') {
        throw new Error('The checkout URL is not secure.')
      }

      window.location.assign(checkoutUrl.toString())
    } catch (error) {
      console.error('Course checkout failed:', error)
      setCheckoutMessage(getErrorMessage(error))
    } finally {
      setCheckoutBusy(false)
    }
  }

  const title =
    course?.title ?? fallback?.title ?? 'Course details'

  const price = fallback?.price

  return (
    <main className="sa9-catalog">
      <div className="sa9-catalog__shell">
        <Link className="sa9-course-back" to="/learning">
          ← {copy.back}
        </Link>

        {courseError && !loading ? (
          <section className="sa9-course-detail" aria-live="polite">
            <div className="sa9-course-detail__copy">
              <p className="eyebrow">SUPER-AI 9JA</p>
              <h1>{fallback?.title ?? 'Course unavailable'}</h1>
              <p role="alert">{courseError}</p>
              <button
                type="button"
                className="sa9-button"
                onClick={() => setReloadKey((key) => key + 1)}
              >
                {copy.retry}
              </button>
            </div>
          </section>
        ) : (
          <>
            <section className="sa9-course-detail">
              <div className="sa9-course-detail__visual">
                <img
                  src={`/images/courses/${fallback?.image ?? course?.slug ?? requestedId}.webp`}
                  alt=""
                  onError={(event) => {
                    event.currentTarget.style.display = 'none'
                  }}
                />
                <span
                  className="sa9-course-card__visual-fallback"
                  aria-hidden="true"
                >
                  SUPER-AI <strong>9JA</strong>
                </span>
              </div>

              <div className="sa9-course-detail__copy">
                <p className="eyebrow">
                  SUPER-AI 9JA · LEARNING PATH
                </p>

                <h1>{title}</h1>

                <p>
                  {course?.description ??
                    'A structured learning path to develop practical skills, strengthen understanding, and apply what you learn.'}
                </p>

                <p className="sa9-course-detail__price">
                  {price == null ? copy.free : `$${price} USD`}
                </p>

                {price != null && (
                  <div className="sa9-course-purchase">
                    <button
                      type="button"
                      className="sa9-button"
                      onClick={() => void startCheckout()}
                      disabled={
                        checkoutBusy || loading || !course
                      }
                    >
                      {checkoutBusy
                        ? 'Preparing secure checkout…'
                        : `Unlock full course · $${price} USD`}
                    </button>

                    {checkoutMessage && (
                      <p role="alert">{checkoutMessage}</p>
                    )}

                    <p>
                      Lesson one is free. Full course access
                      activates after payment is verified.
                    </p>
                  </div>
                )}

                {course && (
                  <p>
                    {course.level} ·{' '}
                    {course.content_language.toUpperCase()}
                    {course.estimated_minutes
                      ? ` · ${course.estimated_minutes} min`
                      : ''}
                  </p>
                )}
              </div>
            </section>

            <section className="sa9-lesson-list">
              <h2>{copy.lessons}</h2>

              {loading && <p role="status">{copy.loading}</p>}

              {!loading && lessonError && (
                <div aria-live="polite">
                  <p role="alert">{lessonError}</p>
                  <button
                    type="button"
                    className="sa9-button"
                    onClick={() => setReloadKey((key) => key + 1)}
                  >
                    {copy.retry}
                  </button>
                </div>
              )}

              {!loading &&
                !lessonError &&
                lessons.length === 0 && <p>{copy.empty}</p>}

              {!loading &&
                !lessonError &&
                lessons.map((lesson, index) => (
                  <Link
                    className="sa9-lesson-row"
                    key={lesson.id}
                    to={`/learning/lessons/${encodeURIComponent(lesson.id)}`}
                    aria-label={`${copy.open}: ${lesson.title}`}
                  >
                    <span className="sa9-lesson-row__number">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="sa9-lesson-row__title">
                      {lesson.title}
                    </span>

                    <span aria-hidden="true">↗</span>
                  </Link>
                ))}
            </section>
          </>
        )}
      </div>
    </main>
  )
}
