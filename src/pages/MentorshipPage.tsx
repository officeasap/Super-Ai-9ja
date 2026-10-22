import "../styles/about-pages.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageProvider";
import { aboutCopy } from "../i18n/aboutPages";

export default function MentorshipPage() {
  const { language } = useLanguage();
  const c = aboutCopy[language];
  return (
    <main className="sa9-page sa9-about-page sa9-about-mentorship">
      <section className="sa9-hero sa9-about-hero">
        <p className="sa9-eyebrow">{c.mentorEyebrow}</p>
        <h1>{c.mentorTitle}</h1><p>{c.mentorLead}</p>
        <Link to="/learning">{c.chooseTrack}</Link>
      </section>
      <section className="sa9-grid sa9-about-grid">
        <article className="sa9-panel sa9-about-card"><h2>{c.goal}</h2><p>{c.goalText}</p></article>
        <article className="sa9-panel sa9-about-card"><h2>{c.practise}</h2><p>{c.practiseText}</p></article>
        <article className="sa9-panel sa9-about-card"><h2>{c.review}</h2><p>{c.reviewText}</p></article>
      </section>
      <section className="sa9-panel sa9-about-card">
        <h2>{c.startNeed}</h2><p>{c.mentorDisclaimer}</p>
        <p><Link to="/tutor">{c.askTutor}</Link></p>
      </section>
    </main>
  );
}
