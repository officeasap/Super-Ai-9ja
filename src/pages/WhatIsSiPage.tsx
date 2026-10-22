import "../styles/about-pages.css";
import { useLanguage } from "../i18n/LanguageProvider";
import { aboutCopy } from "../i18n/aboutPages";

export default function WhatIsSiPage() {
  const { language } = useLanguage();
  const c = aboutCopy[language];
  return (
    <main className="sa9-content-page sa9-about-page sa9-about-what">
      <p className="eyebrow">{c.understanding}</p>
      <h1>{c.whatTitle}</h1>
      <p className="sa9-page-lead">{c.whatLead}</p>
      <section className="sa9-page-section sa9-about-section"><h2>{c.beyondTools}</h2><p>{c.beyondToolsText}</p></section>
      <section className="sa9-page-section sa9-about-section"><h2>{c.application}</h2><p>{c.applicationText}</p></section>
      <section className="sa9-page-section sa9-about-section"><h2>{c.nigeria}</h2><p>{c.nigeriaText}</p></section>
      <section className="sa9-page-section sa9-about-section"><h2>{c.principle}</h2><p>{c.principleText}</p></section>
    </main>
  );
}
