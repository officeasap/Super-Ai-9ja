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

const copyByLanguage: Record<string, Record<string, string>> = {
  en: { kicker: 'THE SUPER-AI 9JA CURRICULUM', title: 'Learn skills. Build what matters.', description: 'Nine practical learning paths. Start with the foundations, then build towards real-world AI capability.', search: 'Search the curriculum', all: 'All courses', free: 'Free', paid: 'USD', loading: 'Loading the curriculum…', unavailable: 'The curriculum connection is not configured.', failed: 'We could not load course records. Showing the official course catalogue.', open: 'Explore course', duration: 'Beginner', empty: 'No matching courses. Try another search.' },
  pcm: { kicker: 'SUPER-AI 9JA CURRICULUM', title: 'Learn skills. Build wetin matter.', description: 'Nine practical learning paths. Start from the basics and build skills wey you fit use for real life.', search: 'Search courses', all: 'All courses', free: 'Free', paid: 'USD', loading: 'We dey load the courses…', unavailable: 'Curriculum connection never set up.', failed: 'We no fit load course records. The official course list still dey show.', open: 'Explore course', duration: 'Beginner', empty: 'No course match. Try another search.' },
  yo: { kicker: 'ÈTÒ Ẹ̀KỌ́ SUPER-AI 9JA', title: 'Kọ́ ọgbọ́n. Ṣẹ̀dá ohun tó ṣe pàtàkì.', description: 'Ọ̀nà ẹ̀kọ́ mẹ́sàn-án tó wúlò. Bẹ̀rẹ̀ pẹ̀lú ìpìlẹ̀, kí o sì kọ́ ọgbọ́n AI fún iṣẹ́ gidi.', search: 'Wá ẹ̀kọ́', all: 'Gbogbo ẹ̀kọ́', free: 'Ọ̀fẹ́', paid: 'USD', loading: 'A ń ṣí àwọn ẹ̀kọ́…', unavailable: 'A kò tíì ṣètò ìsopọ̀ ẹ̀kọ́.', failed: 'A kò lè gba gbogbo àkọsílẹ̀ ẹ̀kọ́. Àkójọ ẹ̀kọ́ pàtàkì ṣì wà.', open: 'Ṣí ẹ̀kọ́', duration: 'Ìbẹ̀rẹ̀', empty: 'Kò sí ẹ̀kọ́ tó bá ìwá yìí mu. Gbìyànjú ọ̀rọ̀ míì.' },
  ha: { kicker: 'TSARIN KOYON SUPER-AI 9JA', title: 'Koyi ƙwarewa. Gina abin da ya dace.', description: 'Hanyoyin koyo guda tara. Fara da tushe, sannan ka gina ƙwarewar AI don amfani a zahiri.', search: 'Nemo darussa', all: 'Duk darussa', free: 'Kyauta', paid: 'USD', loading: 'Ana loda darussa…', unavailable: 'Ba a saita haɗin tsarin koyon ba.', failed: 'Ba a iya loda bayanan darussa ba. Jerin darussan hukuma yana nan.', open: 'Bude darasi', duration: 'Matakin farko', empty: 'Ba a sami darasin da ya dace ba. Gwada wata kalma.' },
  ig: { kicker: 'USORO MMỤTA SUPER-AI 9JA', title: 'Mụta nka. Wuo ihe bara uru.', description: 'Ụzọ mmụta bara uru itoolu. Malite na ntọala, wuo nka AI ị nwere ike iji n’ọrụ n’ezie.', search: 'Chọọ ọmụmụ', all: 'Ọmụmụ niile', free: 'N’efu', paid: 'USD', loading: 'A na-ebunye ọmụmụ…', unavailable: 'Edebeghị njikọ usoro ọmụmụ.', failed: 'Anyị enweghị ike ibunye ndekọ ọmụmụ. Ndepụta ọmụmụ gọọmentị ka dị.', open: 'Mepee ọmụmụ', duration: 'Mmalite', empty: 'Enweghị ọmụmụ dabara. Gbalịa okwu ọzọ.' },
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

export function LearningPage() {
  const { language } = useLanguage()
  const copy = copyByLanguage[language] ?? copyByLanguage.en
  const [records, setRecords] = useState<CourseRecord[]>([])
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

      const { data, error } = await supabase
        .from('sai9ja_courses')
        .select('id,slug,title,description,content_language,level,estimated_minutes')
        .eq('is_published', true)
        .in('slug', OFFICIAL_COURSES.map((course) => course.slug))

      if (!active) return
      if (error) {
        console.error('Official course catalogue load failed:', error)
        setConnectionError(true)
      } else {
        setRecords((data ?? []) as CourseRecord[])
      }
      setLoading(false)
    }

    void load()
    return () => { active = false }
  }, [])

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase()
    return OFFICIAL_COURSES.filter((course) =>
      `${course.title} ${course.slug}`.toLocaleLowerCase().includes(query),
    )
  }, [search])

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
            {loading ? copy.loading : connectionError ? copy.failed : `${records.length} / 9 official courses connected`}
          </p>
        </header>

        <section className="sa9-course-grid" aria-label={copy.kicker}>
          {filtered.map((item, index) => {
            const record = records.find((course) => course.slug === item.slug)
            const courseUrl = `/learning/courses/${encodeURIComponent(record?.id ?? item.slug)}`
            return (
              <article className="sa9-course-card" key={item.slug}>
                <Link className="sa9-course-card__visual" to={courseUrl} aria-label={`${copy.open}: ${item.title}`}>
                  <img
                    src={`/images/courses/${item.image}.webp`}
                    alt=""
                    loading="lazy"
                    onError={(event) => { event.currentTarget.style.display = 'none' }}
                  />
                  <span className="sa9-course-card__visual-fallback" aria-hidden="true">SUPER-AI <strong>{String(index + 1).padStart(2, '0')}</strong></span>
                  <span className="sa9-course-card__index">{String(index + 1).padStart(2, '0')} / 09</span>
                </Link>
                <div className="sa9-course-card__body">
                  <div className="sa9-course-card__meta">
                    <span>{copy.duration}</span>
                    <span>{item.price == null ? copy.free : `$${item.price} ${copy.paid}`}</span>
                  </div>
                  <h2>{item.title}</h2>
                  <p>{record?.description || 'Build practical understanding through structured lessons and guided learning.'}</p>
                  {record && <p className="sa9-course-card__language">{record.content_language.toUpperCase()}{record.estimated_minutes ? ` · ${record.estimated_minutes} MIN` : ''}</p>}
                  <Link className="sa9-course-card__link" to={courseUrl}>{copy.open} <span aria-hidden="true">↗</span></Link>
                </div>
              </article>
            )
          })}
        </section>
        {filtered.length === 0 && <p className="sa9-catalog__empty">{copy.empty}</p>}
      </div>
    </main>
  )
}
