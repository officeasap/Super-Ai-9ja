import "../styles/about-pages.css";
import { useLanguage } from "../i18n/LanguageProvider";
import { aboutCopy } from "../i18n/aboutPages";

export default function WhyChooseUsPage() {
  const { language } = useLanguage();
  const c = aboutCopy[language];
  const principles = [
    [c.clearPath, c.clearPathText],
    [c.learnDoing, c.learnDoingText],
    [c.guidance, c.guidanceText],
    [c.accessMatters, c.accessMattersText],
    [c.responsiblePractice, c.responsiblePracticeText],
    [c.purpose, c.purposeText],
  ];
  return (
    <main className="sa9-content-page sa9-about-page sa9-about-why">
      <p className="eyebrow">{c.whyEyebrow}</p>
      <h1>{c.whyTitle}</h1>
      <p className="sa9-page-lead">{c.whyLead}</p>
      <section className="sa9-page-section">
        <div className="sa9-principle-grid sa9-about-principles">
          {principles.map(([title, description]) => (
            <article className="sa9-principle-card sa9-about-card" key={title}>
              <h3>{title}</h3><p>{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
