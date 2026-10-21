
import { Link } from "react-router-dom";

export default function MentorshipPage() {
  return (
    <main className="sa9-page">
      <section className="sa9-hero">
        <p className="sa9-eyebrow">MENTORSHIP · LEARN WITH DIRECTION</p>
        <h1>Make your next learning step count.</h1>
        <p>
          A clear goal, consistent practice, and useful feedback can turn an
          overwhelming AI learning journey into manageable progress.
        </p>
        <Link to="/learning">Choose a learning track →</Link>
      </section>

      <section className="sa9-grid">
        <article className="sa9-panel">
          <h2>Set a goal</h2>
          <p>
            Choose the skill you want to build and identify a practical outcome
            you can work towards.
          </p>
        </article>
        <article className="sa9-panel">
          <h2>Practise consistently</h2>
          <p>
            Work through lessons, try the exercises, and keep notes about what
            you understand and what needs more attention.
          </p>
        </article>
        <article className="sa9-panel">
          <h2>Review your progress</h2>
          <p>
            Use completed work and project evidence to identify strengths and
            the next skills to practise.
          </p>
        </article>
      </section>

      <section className="sa9-panel">
        <h2>Start with what you need</h2>
        <p>
          Use the learning catalogue and AI tutor as self-guided starting
          points. This page does not currently offer confirmed mentor matching
          or scheduled mentor sessions.
        </p>
        <p>
          <Link to="/tutor">Ask the AI tutor →</Link>
        </p>
      </section>
    </main>
  );
}
