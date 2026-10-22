import "../styles/about-pages.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageProvider";
import { aboutCopy } from "../i18n/aboutPages";

export default function HowItWorksPage() {
  const { language } = useLanguage();
  const c = aboutCopy[language];
  const steps = [
    { number: "01", title: c.chooseCourse, description: c.chooseCourseText },
    { number: "02", title: c.learnConcepts, description: c.learnConceptsText },
    { number: "03", title: c.askQuestions, description: c.askQuestionsText },
    { number: "04", title: c.apply, description: c.applyText },
  ];
  return (
    <main className="sa9-page sa9-about-page sa9-about-journey">
      <section className="sa9-hero sa9-about-hero">
        <p className="sa9-eyebrow">{c.journeyEyebrow}</p>
        <h1>{c.journeyTitle}</h1><p>{c.journeyLead}</p>
        <Link to="/learning">{c.findCourse}</Link>
      </section>
      <section className="sa9-steps sa9-about-steps">
        {steps.map((item) => (
          <article className="sa9-panel sa9-about-card" key={item.number}>
            <span className="sa9-eyebrow">{c.step} {item.number}</span>
            <h2>{item.title}</h2><p>{item.description}</p>
          </article>
        ))}
      </section>
      <section className="sa9-panel sa9-about-card">
        <h2>{c.preferredLanguage}</h2><p>{c.languageText}</p>
        <Link to="/tutor">{c.meetTutor}</Link>
      </section>
    </main>
  );
}
