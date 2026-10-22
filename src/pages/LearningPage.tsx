import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, supabaseConfigured } from '../lib/supabase'
import { useLanguage } from '../i18n/LanguageProvider'

export const OFFICIAL_COURSES = [
  { slug: 'sai-ai-literacy-enterprise-upskilling', title: 'AI Literacy & Enterprise Upskilling', price: null, image: 'ai-literacy-enterprise-upskilling' },
  { slug: 'sai-python-programming', title: 'Python Programming', price: 35, image: 'sai-python-programming' },
  { slug: 'sai-ai-video-editing-content-creation', title: 'AI Video Editing & Content Creation', price: 35, image: 'sai-ai-video-editing-content-creation' },
  { slug: 'sai-cybersecurity-ai-safety', title: 'Cybersecurity & AI Safety', price: 35, image: 'sai-cybersecurity-ai-safety' },
  { slug: 'sai-deep-learning', title: 'Deep Learning', price: null, image: 'sai-deep-learning' },
  { slug: 'sai-ai-agents-workflow-automation', title: 'AI Agents & Workflow Automation', price: 35, image: 'sai-ai-agents-workflow-automation' },
  { slug: 'sai-hugging-face-llms-generative-ai', title: 'Large Language Models & Generative AI', price: null, image: 'sai-hugging-face-llms-generative-ai' },
  { slug: 'sai-nvidia-generative-ai-llms', title: 'Generative AI & LLM Applications', price: null, image: 'sai-nvidia-generative-ai-llms' },
  { slug: 'sai-applied-machine-learning-mlops', title: 'Applied Machine Learning & MLOps', price: null, image: 'sai-applied-machine-learning-mlops' },
] as const

type LearningCopy = {
  kicker: string
  title: string
  description: string
  search: string
  free: string
  paid: string
  loading: string
  unavailable: string
  failed: string
  open: string
  course: string
  freeLabel: string
  beginner: string
  sections: string[]
  sectionNotes: string[]
  empty: string
}

const copyByLanguage: Record<string, LearningCopy> = {
  en: { kicker: 'THE SUPER-AI 9JA CURRICULUM', title: 'Learn skills. Build what matters.', description: 'Nine practical learning paths. Explore a lesson from each path, then continue into the full course.', search: 'Search lessons and courses', free: 'FREE COURSE', paid: 'USD', loading: 'Loading lesson previews…', unavailable: 'The curriculum connection is not configured.', failed: 'Lesson previews could not load. Course paths remain available.', open: 'Open lesson', course: 'View course', freeLabel: 'Free', beginner: 'START HERE', sections: ['FOUNDATIONS & CREATION', 'APPLIED AI & AUTOMATION', 'GENERATIVE AI & MACHINE LEARNING'], sectionNotes: ['Build core skills and create with AI.', 'Practice safe, practical AI and automation.', 'Explore language models and machine learning.'], empty: 'No matching lessons. Try another search.' },
  pcm: { kicker: 'SUPER-AI 9JA CURRICULUM', title: 'Learn skills. Build wetin matter.', description: 'Nine practical learning paths. Check one lesson from each path, then continue the full course.', search: 'Search lessons and courses', free: 'FREE COURSE', paid: 'USD', loading: 'We dey load lesson previews…', unavailable: 'Curriculum connection never set up.', failed: 'Lesson previews no load. Course paths still dey available.', open: 'Open lesson', course: 'View course', freeLabel: 'Free', beginner: 'START HERE', sections: ['FOUNDATIONS & CREATION', 'APPLIED AI & AUTOMATION', 'GENERATIVE AI & MACHINE LEARNING'], sectionNotes: ['Build your basic skills and create with AI.', 'Practice safe AI and automation.', 'Explore language models and machine learning.'], empty: 'No lesson match. Try another search.' },
  yo: { kicker: 'ÈTÒ Ẹ̀KỌ́ SUPER-AI 9JA', title: 'Kọ́ ọgbọ́n. Ṣẹ̀dá ohun tó ṣe pàtàkì.', description: 'Àwọn ọ̀nà ẹ̀kọ́ mẹ́sàn-án. Ṣàyẹ̀wò ẹ̀kọ́ kan láti ọ̀nà kọ̀ọ̀kan, kí o sì tẹ̀síwájú.', search: 'Wá ẹ̀kọ́ àti kíláàsì', free: 'Ọ̀FẸ́', paid: 'USD', loading: 'A ń ṣí àwọn ẹ̀kọ́…', unavailable: 'A kò tíì ṣètò ìsopọ̀ ẹ̀kọ́.', failed: 'A kò lè ṣí àwọn ẹ̀kọ́ àkọ́kọ́. Àwọn ọ̀nà ẹ̀kọ́ ṣì wà.', open: 'Ṣí ẹ̀kọ́', course: 'Wo kíláàsì', freeLabel: 'Ọ̀fẹ́', beginner: 'BẸ̀RẸ̀ NÍBÍ', sections: ['ÌPÌLẸ̀ ÀTI ṢÍṢẸ̀DÁ', 'LÍLÒ AI ÀTI ÌṢẸ́ ALAṢẸ́', 'GENERATIVE AI ÀTI Ẹ̀KỌ́ Ẹ̀RỌ̀'], sectionNotes: ['Kọ́ àwọn ọgbọ́n ìpìlẹ̀, kí o sì ṣẹ̀dá pẹ̀lú AI.', 'Lo AI àti automation lọ́nà tó bójú mu.', 'Ṣàwárí language models àti machine learning.'], empty: 'Kò sí ẹ̀kọ́ tó bá ìwá yìí mu.' },
  ha: { kicker: 'TSARIN KOYON SUPER-AI 9JA', title: 'Koyi ƙwarewa. Gina abin da ya dace.', description: 'Hanyoyin koyo guda tara. Duba darasi daga kowace hanya, sannan ka ci gaba.', search: 'Nemo darussa da kwasa-kwasai', free: 'KYAUTA', paid: 'USD', loading: 'Ana loda darussa…', unavailable: 'Ba a saita haɗin tsarin koyon ba.', failed: 'Ba a iya loda samfuran darussa ba. Hanyoyin kwas suna nan.', open: 'Buɗe darasi', course: 'Duba kwas', freeLabel: 'Kyauta', beginner: 'FARA NAN', sections: ['TUSHE DA ƘIRƘIRA', 'AI MAI AMFANI DA AIKI TA KAI', 'GENERATIVE AI DA MACHINE LEARNING'], sectionNotes: ['Koyi tushe kuma ƙirƙiri da AI.', 'Yi amfani da AI cikin aminci da automation.', 'Binciki language models da machine learning.'], empty: 'Ba a sami darasin da ya dace ba.' },
  ig: { kicker: 'USORO MMỤTA SUPER-AI 9JA', title: 'Mụta nka. Wuo ihe bara uru.', description: 'Ụzọ mmụta itoolu. Lelee otu nkuzi n’ụzọ ọ bụla, gaa n’ihu n’usoro mmụta zuru ezu.', search: 'Chọọ nkuzi na ọmụmụ', free: 'N’EFU', paid: 'USD', loading: 'A na-ebunye nkuzi…', unavailable: 'Edebeghị njikọ usoro ọmụmụ.', failed: 'Anyị enweghị ike ibunye nkuzi ndị a. Ụzọ ọmụmụ ka dị.', open: 'Mepee nkuzi', course: 'Lee ọmụmụ', freeLabel: 'N’efu', beginner: 'MALITE EBE A', sections: ['NTỌALA NA OKIKE', 'AI A NA-EJI ARỤ ỌRỤ NA AUTOMATION', 'GENERATIVE AI NA MACHINE LEARNING'], sectionNotes: ['Mụta ntọala ma jiri AI mepụta ihe.', 'Jiri AI na automation n’ụzọ dị nchebe.', 'Chọpụta language models na machine learning.'], empty: 'Enweghị nkuzi dabara na ọchụchọ a.' },
}

type CourseRecord = {
  id: string
  slug: string
  title: string
  description: string | null
  content_language: string
  level: string
  estimated_minutes: number | null
}

type LessonPreview = {
  id: string
  course_id: string
  title: string
  description: string | null
  display_order: number
  video_url: string | null
}

const sectionSlugs = [
  ['sai-ai-literacy-enterprise-upskilling', 'sai-python-programming', 'sai-ai-video-editing-content-creation'],
  ['sai-cybersecurity-ai-safety', 'sai-deep-learning', 'sai-ai-agents-workflow-automation'],
  ['sai-hugging-face-llms-generative-ai', 'sai-nvidia-generative-ai-llms', 'sai-applied-machine-learning-mlops'],
]

function youtubeId(url: string | null | undefined) {
  if (!url) return ''
  return url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/)?.[1] ?? ''
}

export function LearningPage() {
  const { language } = useLanguage()
  const copy = copyByLanguage[language] ?? copyByLanguage.en
  const [records, setRecords] = useState<CourseRecord[]>([])
  const [lessons, setLessons] = useState<LessonPreview[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [connectionError, setConnectionError] = useState(false)

  useEffect(() => {
    let active = true

    async function load() {
      if (!supabaseConfigured || !supabase) {
        if (active) {
          setConnectionError(true)
          setLoading(false)
        }
        return
      }

      const { data: courses, error: courseError } = await supabase
        .from('sai9ja_courses')
        .select('id,slug,title,description,content_language,level,estimated_minutes')
        .eq('is_published', true)
        .in('slug', OFFICIAL_COURSES.map((course) => course.slug))

      if (!active) return
      if (courseError || !courses) {
        console.error('Official course catalogue load failed:', courseError)
        setConnectionError(true)
        setLoading(false)
        return
      }

      setRecords(courses as CourseRecord[])
      const courseIds = courses.map((course) => course.id)
      if (!courseIds.length) {
        setLessons([])
        setLoading(false)
        return
      }

      const { data: lessonRows, error: lessonError } = await supabase
        .from('sai9ja_lessons')
        .select('id,course_id,title,description,display_order')
        .eq('is_published', true)
        .in('course_id', courseIds)
        .order('display_order', { ascending: true })

      if (!active) return
      if (lessonError || !lessonRows) {
        console.error('Lesson preview metadata load failed:', lessonError)
        setConnectionError(true)
        setLoading(false)
        return
      }

      const firstLessons = courses.flatMap((course) => {
        const first = lessonRows.find((lesson) => lesson.course_id === course.id)
        return first ? [{ ...first, course_id: course.id }] : []
      })

      if (!firstLessons.length) {
        setLessons([])
        setLoading(false)
        return
      }

      const { data: contentRows, error: contentError } = await supabase
        .from('sai9ja_lesson_content')
        .select('lesson_id,video_url')
        .in('lesson_id', firstLessons.map((lesson) => lesson.id))

      if (!active) return
      if (contentError) {
        console.warn('Some lesson previews have no accessible video metadata:', contentError)
      }

      const videoByLesson = new Map((contentRows ?? []).map((row) => [row.lesson_id, row.video_url]))
      setLessons(firstLessons.map((lesson) => ({
        id: lesson.id,
        course_id: lesson.course_id,
        title: lesson.title,
        description: lesson.description ?? null,
        display_order: lesson.display_order,
        video_url: videoByLesson.get(lesson.id) ?? null,
      })))
      setLoading(false)
    }

    void load()
    return () => { active = false }
  }, [])

  const query = search.trim().toLocaleLowerCase()
  const sections = useMemo(() => sectionSlugs.map((slugs, sectionIndex) => ({
    title: copy.sections[sectionIndex],
    note: copy.sectionNotes[sectionIndex],
    cards: slugs.flatMap((slug) => {
      const course = OFFICIAL_COURSES.find((item) => item.slug === slug)
      if (!course || (query && !(course.title + ' ' + slug).toLocaleLowerCase().includes(query))) return []
      const record = records.find((item) => item.slug === slug)
      const lesson = lessons.find((item) => item.course_id === record?.id)
      return [{ course, record, lesson }]
    }),
  })), [copy, query, records, lessons])

  return (
    <main className="sa9-catalog">
      <div className="sa9-catalog__shell">
        <header className="sa9-catalog__heading">
          <p className="eyebrow">{copy.kicker}</p>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
          <div className="sa9-catalog__search">
            <span aria-hidden="true">⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder={copy.search} aria-label={copy.search} />
            {search && <button type="button" onClick={() => setSearch('')} aria-label="Clear search">×</button>}
          </div>
          <p className="sa9-catalog__status" aria-live="polite">
            {loading ? copy.loading : connectionError ? copy.failed : lessons.length + ' / 9 lesson previews connected'}
          </p>
        </header>

        {sections.map((section, sectionIndex) => (
          <section className="sa9-learning-section" aria-labelledby={'sa9-section-' + sectionIndex} key={section.title}>
            <header className="sa9-learning-section__heading">
              <div>
                <p className="eyebrow">SECTION 0{sectionIndex + 1} · 03 LESSON CARDS</p>
                <h2 id={'sa9-section-' + sectionIndex}>{section.title}</h2>
                <p>{section.note}</p>
              </div>
              <span className="sa9-learning-section__count">0{sectionIndex + 1} / 03</span>
            </header>

            <div className="sa9-video-grid">
              {section.cards.map(({ course, record, lesson }, cardIndex) => {
                const id = youtubeId(lesson?.video_url)
                const destination = lesson?.id
                  ? '/learning/lessons/' + encodeURIComponent(lesson.id)
                  : '/learning/courses/' + encodeURIComponent(record?.id ?? course.slug)
                const image = id
                  ? 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg'
                  : '/images/courses/' + course.image + '.webp'

                return (
                  <article className="sa9-video-card" key={course.slug}>
                    <Link className="sa9-video-card__visual" to={destination} aria-label={copy.open + ': ' + (lesson?.title ?? course.title)}>
                      <img src={image} alt="" loading="lazy" onError={(event) => {
                        if (event.currentTarget.dataset.fallback !== 'course') {
                          event.currentTarget.dataset.fallback = 'course'
                          event.currentTarget.src = '/images/courses/' + course.image + '.webp'
                        } else {
                          event.currentTarget.style.display = 'none'
                        }
                      }} />
                      <span className="sa9-video-card__play" aria-hidden="true">▶</span>
                      <span className="sa9-video-card__index">0{cardIndex + 1} / 03</span>
                      <span className="sa9-video-card__tag">{id ? 'VIDEO LESSON' : 'LEARNING PATH'}</span>
                    </Link>
                    <div className="sa9-video-card__body">
                      <div className="sa9-video-card__meta">
                        <span>{record?.level ?? 'BEGINNER'}</span>
                        <span>{course.price == null ? copy.freeLabel : '$' + course.price + ' ' + copy.paid}</span>
                      </div>
                      <h3>{lesson?.title ?? course.title}</h3>
                      <p>{lesson?.description || record?.description || 'Start with a structured lesson, then continue through the complete learning path.'}</p>
                      <p className="sa9-video-card__course">{course.title}</p>
                      <Link className="sa9-video-card__link" to={destination}>{lesson ? copy.open : copy.course} <span aria-hidden="true">↗</span></Link>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        ))}
        {sections.every((section) => section.cards.length === 0) && <p className="sa9-catalog__empty">{copy.empty}</p>}
        <p className="sa9-learning-note">Course payments unlock course access. A video host may apply its own privacy, age, or sign-in restrictions; restricted videos must be replaced with accessible, authorized lesson sources.</p>
      </div>
    </main>
  )
}
