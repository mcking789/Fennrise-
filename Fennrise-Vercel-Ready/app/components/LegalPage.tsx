import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./LegalPage.module.css";

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
  const isPrivacy = title.toLowerCase().includes("privacy");
  const primaryContact = isPrivacy ? "privacy@fennrise.com" : "legal@fennrise.com";

  return (
    <main className={styles.page} id="top">
      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="Fennrise home">
          <Image
            className={styles.logo}
            src="/fennrise-logo.png"
            width={34}
            height={34}
            alt=""
            priority
          />
          <span>Fennrise</span>
        </a>

        <nav className={styles.nav} aria-label="Legal navigation">
          <a className={isPrivacy ? styles.active : undefined} href="/privacy-policy">Privacy</a>
          <a className={!isPrivacy ? styles.active : undefined} href="/terms-of-service">Terms</a>
          <a href="mailto:connect@fennrise.com">Contact</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.kicker}>{eyebrow}</div>
        <div className={styles.heroGrid}>
          <div>
            <h1>{title}</h1>
            <p className={styles.heroCopy}>{description}</p>
          </div>

          <dl className={styles.meta}>
            <div className={styles.metaRow}>
              <dt>Last updated</dt>
              <dd>{updated}</dd>
            </div>
            <div className={styles.metaRow}>
              <dt>Region</dt>
              <dd>India</dd>
            </div>
            <div className={styles.metaRow}>
              <dt>Contact</dt>
              <dd><a href={`mailto:${primaryContact}`}>{primaryContact}</a></dd>
            </div>
          </dl>
        </div>
      </section>

      <div className={styles.shell}>
        <aside className={styles.toc} aria-label="On this page">
          <span className={styles.tocTitle}>On this page</span>
          <nav>
            {sections.map((section, index) => (
              <a href={`#${section.id}`} key={section.id}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className={styles.content}>
          {sections.map((section, index) => (
            <section className={styles.section} id={section.id} key={section.id}>
              <div className={styles.sectionHead}>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.title}</h2>
              </div>
              <div className={styles.sectionBody}>{section.content}</div>
            </section>
          ))}
        </article>
      </div>

      <section className={styles.contactBand} aria-label="Fennrise contacts">
        <div className={styles.contactInner}>
          <div className={styles.contactIntro}>
            <span>Need to reach us?</span>
            <h2>Contact the right team.</h2>
          </div>
          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <span>Privacy & data</span>
              <a href="mailto:privacy@fennrise.com">privacy@fennrise.com</a>
            </div>
            <div className={styles.contactCard}>
              <span>Legal notices</span>
              <a href="mailto:legal@fennrise.com">legal@fennrise.com</a>
            </div>
            <div className={styles.contactCard}>
              <span>Support</span>
              <a href="mailto:support@fennrise.com">support@fennrise.com</a>
            </div>
            <div className={styles.contactCard}>
              <span>General</span>
              <a href="mailto:connect@fennrise.com">connect@fennrise.com</a>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>© 2026 Fennrise. All rights reserved.</span>
        <div className={styles.footerLinks}>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
        <a className={styles.backTop} href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
