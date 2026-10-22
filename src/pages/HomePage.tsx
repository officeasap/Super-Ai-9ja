
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <main className="home-main">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">SUPER-AI 9JA · LEARN. BUILD. APPLY.</p>

          <h1>
            Build AI skills.
            <br />
            Put them to work.
          </h1>

          <p className="sa9-page-lead">
            What if the skill that changes your future is the one
            you have not discovered yet? Step inside. Discover what
            happens when you stop watching AI and start commanding it.
          </p>

          <div className="hero-actions">
            <Link className="button button-primary" to="/learning">
              Discover your potential
            </Link>

            <Link className="button button-secondary" to="/register">
              Start for free
            </Link>
          </div>

          <p className="hero-supporting-copy">
            No tech background required. Start where you are.
            Build towards what once seemed impossible.
          </p>
        </div>

        <div className="visual-panel" aria-label="Your AI learning journey">
          <div className="home-orbit">
            <div className="home-core">
              <span>AI</span>
              <small>YOUR NEXT MOVE</small>
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
          The real power of AI is not knowing the buzzwords.
          It is using your skills to solve problems, create
          opportunities and change what is possible around you.
        </p>
      </section>

      <section className="home-learning-loop sa9-page-section">
        <div className="section-heading">
          <p className="eyebrow">THE LEARNING LOOP</p>
          <h2>Build AI skills. Put them to work.</h2>
        </div>

        <article className="ada-story-card">
          <div className="ada-story-image">
            <img
              src="/images/courses/ada.png"
              alt="Ada joyfully learning to code with AI and developing practical solutions for her community"
              loading="lazy"
            />
          </div>

          <div className="ada-story-copy">
            <p className="eyebrow">MEET ADA · FROM BEGINNER TO BUILDER</p>

            <h3>She started from zero. Now, the village calls her.</h3>

            <p>
              Ada began with no IT skills. She learned to command AI
              prompts, write code and turn ideas into working solutions.
              Now she helps her community tackle serious problems—from
              crop troubles to small-business challenges.
            </p>

            <p className="ada-story-punchline">
              Yesterday, she needed someone to show her the way.
              Today, she is the one people turn to.
            </p>

            <Link className="button button-primary" to="/learning">
              Start your own journey
            </Link>
          </div>
        </article>
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
              Ask questions, clarify difficult ideas and identify
              what to study next with learning support.
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
            Your first step does not require technical experience.
            It requires the decision to begin.
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
