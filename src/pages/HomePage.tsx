import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <main className="home-main">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">SUPER-AI 9JA · LEARN. BUILD. APPLY.</p>

          <h1>
            Understand AI.
            <br />
            Build what comes next.
          </h1>

          <p className="sa9-page-lead">
            Develop practical artificial intelligence skills through
            structured learning, hands-on exploration and guided support.
            Start with the fundamentals and grow towards real applications.
          </p>

          <div className="hero-actions">
            <Link className="button button-primary" to="/learning">
              Explore courses
            </Link>

            <Link className="button button-secondary" to="/register">
              Create free account
            </Link>
          </div>

          <p className="hero-supporting-copy">
            Start learning at your pace. Build understanding before chasing
            the next AI trend.
          </p>
        </div>

        <div className="visual-panel" aria-label="Your AI learning journey">
          <div className="home-orbit">
            <div className="home-core">
              <span>AI</span>
              <small>UNDERSTAND</small>
            </div>

            <span className="orbit-label orbit-label-one">LEARN</span>
            <span className="orbit-label orbit-label-two">PRACTISE</span>
            <span className="orbit-label orbit-label-three">BUILD</span>
          </div>
        </div>
      </section>

      <section className="home-manifesto sa9-page-section">
        <p className="eyebrow">THE PURPOSE</p>
        <h2>Knowledge should become capability.</h2>
        <p>
          AI education should help you understand how systems work, recognise
          their limitations, practise with purpose and make better decisions
          about when and how to use them.
        </p>
      </section>

      <section className="home-pathways sa9-page-section">
        <div className="section-heading">
          <p className="eyebrow">YOUR NEXT STEP</p>
          <h2>Choose how you want to grow.</h2>
        </div>

        <div className="pathway-grid">
          <article className="pathway-card">
            <p className="principle-number">01 / LEARN</p>
            <h3>Build your foundation</h3>
            <p>
              Explore AI concepts, generative AI, machine learning,
              cybersecurity and responsible AI practice.
            </p>
            <Link to="/learning">Explore learning →</Link>
          </article>

          <article className="pathway-card">
            <p className="principle-number">02 / PRACTISE</p>
            <h3>Turn ideas into skills</h3>
            <p>
              Work through lessons and learning activities that connect
              concepts with practical understanding.
            </p>
            <Link to="/learning">Find a course →</Link>
          </article>

          <article className="pathway-card">
            <p className="principle-number">03 / GET GUIDANCE</p>
            <h3>Keep moving forward</h3>
            <p>
              Use learning support to ask questions, clarify difficult ideas
              and identify what to study next.
            </p>
            <Link to="/tutor">Explore the AI tutor →</Link>
          </article>
        </div>
      </section>

      <section className="home-course-cta sa9-page-section">
        <div>
          <p className="eyebrow">YOUR LEARNING STARTS HERE</p>
          <h2>Find a course. Build a skill. Put it to work.</h2>
          <p>
            Discover the available courses and choose a starting point
            that matches your interests.
          </p>
        </div>

        <div className="hero-actions">
          <Link className="button button-primary" to="/learning">
            Browse courses
          </Link>
          <Link className="button button-secondary" to="/register">
            Join SUPER-AI 9ja
          </Link>
        </div>
      </section>
    </main>
  )
}
