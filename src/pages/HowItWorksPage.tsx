
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Choose your course",
    description:
      "Explore the catalogue and select a subject that matches your goals and current experience.",
  },
  {
    number: "02",
    title: "Learn the concepts",
    description:
      "Work through the available course lessons and use the supporting material to build understanding.",
  },
  {
    number: "03",
    title: "Ask questions",
    description:
      "Use the AI tutor to request explanations, examples, practice questions, and help understanding difficult ideas.",
  },
  {
    number: "04",
    title: "Apply what you learn",
    description:
      "Practise the concepts and build projects that demonstrate your growing skills.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="sa9-page">
      <section className="sa9-hero">
        <p className="sa9-eyebrow">YOUR JOURNEY · ONE STEP AT A TIME</p>
        <h1>From curious to capable.</h1>
        <p>
          A straightforward way to explore AI, learn the foundations, ask
          questions, and apply new skills.
        </p>
        <Link to="/learning">Find your first course →</Link>
      </section>

      <section className="sa9-steps">
        {steps.map((step) => (
          <article className="sa9-panel" key={step.number}>
            <span className="sa9-eyebrow">STEP {step.number}</span>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </article>
        ))}
      </section>

      <section className="sa9-panel">
        <h2>Learn in your preferred language</h2>
        <p>
          SUPER-AI 9ja prioritises English, Nigerian Pidgin, Yorùbá, Hausa, and
          Igbo. Available translations depend on the specific interface and
          learning content.
        </p>
        <Link to="/tutor">Meet your AI tutor →</Link>
      </section>
    </main>
  );
}
