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
    title: "Solve real problems.",
    text: "We start with a genuine need, not a trend. Technology should remove friction, save time, or make something meaningfully better.",
  },
  {
    title: "Keep powerful things clear.",
    text: "Good technology should not force people to understand the complexity behind it. We use design to make capable systems easier to use.",
  },
  {
    title: "Build, test, refine.",
    text: "We would rather improve a useful product continuously than pretend the first version is finished. Real feedback shapes what comes next.",
  },
];

const products = [
  {
    name: "STAR",
    text: "An intelligent assistant built around useful conversations, creation, research, and everyday action.",
  },
  {
    name: "Fenn",
    text: "A focused productivity experience designed to turn plans into clearer, more consistent progress.",
  },
  {
    name: "Relay",
    text: "A business calling assistant for customer conversations, lead capture, summaries, and routing.",
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
        <div className={styles.sectionHead}>
          <span className={styles.sectionLabel}>What we are building</span>
          <div className={styles.sectionCopy}>
            <h2>Products with a<br /><em>clear purpose.</em></h2>
            <p>
              We are building our own products around practical problems: helping people think, focus, communicate, and get useful things done with technology.
            </p>
          </div>
        </div>

        <div className={styles.productBand}>
          {products.map((product, index) => (
            <div className={styles.productRow} key={product.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{product.name}</strong>
              <p>{product.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.principles}>
        <div className={styles.principleIntro}>
          <span className={styles.sectionLabel}>How we think</span>
          <h2>Useful first.<br /><em>Everything else follows.</em></h2>
        </div>

        <div className={styles.principleList}>
          {principles.map((principle, index) => (
            <div className={styles.principleRow} key={principle.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
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
