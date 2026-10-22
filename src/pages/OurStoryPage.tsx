import "../styles/about-pages.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageProvider";
import { aboutCopy } from "../i18n/aboutPages";

export default function OurStoryPage() {
  const { language } = useLanguage();
  const c = aboutCopy[language];
  return (
    <main className="sa9-page sa9-about-page sa9-about-story">
      <section className="sa9-hero sa9-about-hero">
        <p className="sa9-eyebrow">{c.storyEyebrow}</p>
        <h1>{c.storyTitle}</h1>
        <p>{c.storyLead}</p>
      </section>
      <section className="sa9-grid sa9-about-grid sa9-about-story-grid">
        <article className="sa9-panel sa9-about-card"><h2>{c.access}</h2><p>{c.accessText}</p></article>
        <article className="sa9-panel sa9-about-card"><h2>{c.practicality}</h2><p>{c.practicalityText}</p></article>
        <article className="sa9-panel sa9-about-card"><h2>{c.local}</h2><p>{c.localText}</p></article>
      </section>
      <section className="sa9-panel sa9-about-card">
        <h2>{c.direction}</h2><p>{c.directionText}</p>
        <Link to="/learning">{c.explore}</Link>
      </section>
    </main>
  );
}
