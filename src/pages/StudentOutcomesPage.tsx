
import { Link } from "react-router-dom";

const outcomes = [
  {
    number: "01",
    title: "Understand AI",
    text: "Explain core AI concepts, recognise realistic capabilities and limits, and evaluate AI outputs critically.",
  },
  {
    number: "02",
    title: "Build practical skills",
    text: "Progress through structured learning, guided practice, and projects connected to real tasks.",
  },
  {
    number: "03",
    title: "Work more effectively",
    text: "Apply AI tools and workflows to research, communication, problem-solving, and everyday work.",
  },
  {
    number: "04",
    title: "Learn responsibly",
    text: "Recognise privacy, bias, security, and accuracy risks before using AI in consequential situations.",
  },
];

export default function StudentOutcomesPage() {
  return (
    <main className="sa9-page">
      <section className="sa9-hero">
        <p className="sa9-eyebrow">LEARNING THAT GOES BEYOND THEORY</p>
        <h1>Skills you can put to work.</h1>
        <p>
          SUPER-AI 9ja is designed to turn curiosity into practical capability
          through structured courses, guided practice, and responsible AI use.
        </p>
        <Link to="/learning">Explore the courses →</Link>
      </section>

      <section className="sa9-grid">
        {outcomes.map((item) => (
          <article className="sa9-panel" key={item.number}>
            <span className="sa9-eyebrow">{item.number} / OUTCOME</span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="sa9-panel">
        <h2>Progress you can demonstrate</h2>
        <p>
          Build evidence through exercises, projects, and assessments as these
          become available within each course. Certificates should be presented
          only when the relevant assessment and certification requirements have
          actually been met.
        </p>
        <Link to="/learning">Start learning →</Link>
      </section>
    </main>
  );
}
