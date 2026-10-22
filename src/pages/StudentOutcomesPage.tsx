import "../styles/about-pages.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageProvider";
import { aboutCopy } from "../i18n/aboutPages";

export default function StudentOutcomesPage() {
  const { language } = useLanguage();
  const c = aboutCopy[language];
  const outcomes = [
    { number: "01", title: c.understandAI, text: c.understandAIText },
    { number: "02", title: c.practicalSkills, text: c.practicalSkillsText },
    { number: "03", title: c.effectiveWork, text: c.effectiveWorkText },
    { number: "04", title: c.responsible, text: c.responsibleText },
  ];
  return (
    <main className="sa9-page sa9-about-page sa9-about-outcomes">
      <section className="sa9-hero sa9-about-hero">
        <p className="sa9-eyebrow">{c.outcomesEyebrow}</p>
        <h1>{c.outcomesTitle}</h1><p>{c.outcomesLead}</p>
        <Link to="/learning">{c.explore}</Link>
      </section>
      <section className="sa9-grid sa9-about-grid sa9-about-outcome-grid">
        {outcomes.map((item) => (
          <article className="sa9-panel sa9-about-card" key={item.number}>
            <span className="sa9-eyebrow">{item.number} / {c.outcome}</span>
            <h2>{item.title}</h2><p>{item.text}</p>
          </article>
        ))}
      </section>
      <section className="sa9-panel sa9-about-card">
        <h2>{c.evidence}</h2><p>{c.evidenceText}</p>
        <Link to="/learning">{c.startLearning}</Link>
      </section>
    </main>
  );
}
