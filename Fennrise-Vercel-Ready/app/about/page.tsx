import type { Metadata } from "next";
import { ExperienceFooter, ExperienceHeader } from "../components/ExperienceChrome";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Fennrise — Independent Technology Company",
  description:
    "Learn what Fennrise is building, how we work, and the principles behind our products.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    word: "REAL.",
    title: "Solve real problems.",
    text: "We start with a genuine need, not a trend. Technology should remove friction, save time, or make something meaningfully better.",
  },
  {
    word: "CLEAR.",
    title: "Keep powerful things clear.",
    text: "Good technology should not force people to understand the complexity behind it. We use design to make capable systems easier to use.",
  },
  {
    word: "BETTER.",
    title: "Build, test, refine.",
    text: "We would rather improve a useful product continuously than pretend the first version is finished. Real feedback shapes what comes next.",
  },
];

const products = [
  {
    name: "STAR",
    type: "Intelligent assistant",
    text: "Useful conversations, creation, research, and everyday action in one focused assistant.",
    href: "/products#star",
  },
  {
    name: "Fenn",
    type: "Focus & planning",
    text: "A productivity experience designed to turn plans into clearer, more consistent progress.",
    href: "/products#fenn",
  },
  {
    name: "Relay",
    type: "Business calling",
    text: "A calling assistant for customer conversations, lead capture, summaries, follow-ups, and routing.",
    href: "/products#relay",
  },
];

export default function AboutPage() {
  return (
    <main className={styles.page} id="page-top">
      <ExperienceHeader active="about" />

      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>About Fennrise</div>
          <h1><span>Technology should feel</span><br /><em>useful.</em></h1>
          <p>
            Fennrise is an independent technology company in India building intelligent products and digital experiences designed to make work, focus, communication, and everyday technology more useful.
          </p>
        </div>
      </section>

      <section className={styles.building}>
        <div className={styles.buildingLayout}>
          <div className={styles.buildingIntro}>
            <span className={styles.sectionLabel}>What we are building</span>
            <h2>Built for real use.<br /><em>Not for demos.</em></h2>
            <p>
              Each Fennrise product begins with one practical job. The product earns complexity only when that complexity makes the experience more useful.
            </p>
          </div>

          <div className={styles.productStack}>
            {products.map((product, index) => (
              <a className={styles.productStage} href={product.href} key={product.name}>
                <div className={styles.productMeta}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{product.type}</small>
                </div>
                <div className={styles.productName}>
                  <strong>{product.name}</strong>
                  <b aria-hidden="true">↗</b>
                </div>
                <p>{product.text}</p>
                <i aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.principles}>
        <div className={styles.principleHeader}>
          <span className={styles.sectionLabel}>How we think</span>
          <h2>Three things<br />we refuse to <em>compromise.</em></h2>
        </div>

        <div className={styles.principleCanvas}>
          {principles.map((principle, index) => (
            <div className={styles.principleScene} key={principle.title}>
              <div className={styles.principleWord} aria-hidden="true">{principle.word}</div>
              <div className={styles.principleCopy}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.company}>
        <div className={styles.companyInner}>
          <span>Company</span>
          <h2>Built in India.<br /><em>Made to go further.</em></h2>
          <p>
            Fennrise currently operates from India while building products, processes, and foundations designed to grow beyond one market when the company and products are ready.
          </p>
          <a href="mailto:connect@fennrise.com">Company enquiries <b>↗</b></a>
        </div>
      </section>

      <ExperienceFooter />
    </main>
  );
}
