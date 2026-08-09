import Image from "next/image";
import type { ReactNode } from "react";

type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
};

export default function LegalPage({
  eyebrow,
  title,
  description,
  updated,
  sections,
}: LegalPageProps) {
  return (
    <main className="legal-page" id="top">
      <div className="legal-orb legal-orb-one" />
      <div className="legal-orb legal-orb-two" />

      <header className="legal-nav">
        <a className="brand" href="/" aria-label="Fennrise home">
          <Image
            className="brand-logo"
            src="/fennrise-logo.png"
            width={38}
            height={38}
            alt=""
            priority
          />
          <span>Fennrise</span>
        </a>
        <div className="legal-nav-actions">
          <a href="/">Home</a>
          <a className="nav-cta" href="/waitlist">
            Join waitlist <span>→</span>
          </a>
        </div>
      </header>

      <section className="legal-hero">
        <div className="legal-eyebrow"><span /> {eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="legal-updated">
          <span>Effective</span>
          <strong>{updated}</strong>
        </div>
      </section>

      <div className="legal-shell">
        <aside className="legal-toc" aria-label="On this page">
          <span>On this page</span>
          <nav>
            {sections.map((section, index) => (
              <a href={`#${section.id}`} key={section.id}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="legal-content">
          <div className="legal-note">
            <span>Clear by design</span>
            <p>
              We wrote this page in straightforward language so you can understand
              what applies when you use Fennrise.
            </p>
          </div>

          {sections.map((section, index) => (
            <section className="legal-section" id={section.id} key={section.id}>
              <div className="legal-section-number">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h2>{section.title}</h2>
                {section.content}
              </div>
            </section>
          ))}
        </article>
      </div>

      <footer className="legal-footer">
        <div>
          <a className="brand footer-brand" href="/">
            <Image
              className="brand-logo"
              src="/fennrise-logo.png"
              width={38}
              height={38}
              alt=""
            />
            <span>Fennrise</span>
          </a>
          <p>Intelligent products. Beautifully built.</p>
        </div>
        <div className="legal-footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="mailto:hello@fennrise.com">hello@fennrise.com</a>
        </div>
        <div className="legal-footer-bottom">
          <span>© 2026 Fennrise. All rights reserved.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
