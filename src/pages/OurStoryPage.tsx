
import { Link } from "react-router-dom";

export default function OurStoryPage() {
  return (
    <main className="sa9-page">
      <section className="sa9-hero">
        <p className="sa9-eyebrow">OUR STORY · BUILT FOR NIGERIA</p>
        <h1>AI learning should open doors, not build barriers.</h1>
        <p>
          SUPER-AI 9ja exists to make practical AI education more approachable,
          relevant, and useful for learners, professionals, creators, and
          businesses.
        </p>
      </section>

      <section className="sa9-grid">
        <article className="sa9-panel">
          <h2>Access</h2>
          <p>
            Discover learning opportunities across AI literacy, programming,
            cybersecurity, deep learning, and modern AI applications.
          </p>
        </article>
        <article className="sa9-panel">
          <h2>Practicality</h2>
          <p>
            Connect concepts to exercises and real-world workflows instead of
            stopping at definitions.
          </p>
        </article>
        <article className="sa9-panel">
          <h2>Local relevance</h2>
          <p>
            Build for Nigerian learners, with English, Nigerian Pidgin, Yorùbá,
            Hausa, and Igbo as language priorities.
          </p>
        </article>
      </section>

      <section className="sa9-panel">
        <h2>Our direction</h2>
        <p>
          Help more people understand AI, use it responsibly, and build the
          confidence to apply it to meaningful work.
        </p>
        <Link to="/learning">Explore SUPER-AI 9ja →</Link>
      </section>
    </main>
  );
}
