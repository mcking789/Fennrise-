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
            Fennrise is an independent technology team in India developing intelligent products and thoughtful digital experiences. We believe technology should help people work, learn, and create with greater clarity.
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

      <section className={styles.identity} aria-labelledby="identity-heading">
        <div className={styles.identityInner}>
          <span className={styles.sectionLabel}>Our identity</span>
          <h2 id="identity-heading">Why <em>Fennrise?</em></h2>
          <p>Fennrise represents new beginnings, purposeful innovation and the ambition to keep moving forward. “Fenn” is our distinct identity; “Rise” reflects progress, growth and the belief that meaningful ideas can become useful technology.</p>
          <div className={styles.identityValues}>
            <article><span>01 / Mission</span><h3>Make technology useful.</h3><p>Develop intelligent, practical digital products that simplify everyday challenges and turn ideas into meaningful progress.</p></article>
            <article><span>02 / Vision</span><h3>Build for what matters.</h3><p>Grow into an independent, trusted technology company whose products make work, learning and communication simpler and more accessible.</p></article>
          </div>
        </div>
      </section>
      <section className={styles.team} aria-labelledby="team-heading">
        <div className={styles.teamInner}>
          <span className={styles.sectionLabel}>The people behind Fennrise</span>
          <h2 id="team-heading">Meet the <em>team.</em></h2>
          <p className={styles.teamLead}>A small independent team bringing different perspectives together to build useful technology and turn ideas into progress.</p>
          <div className={styles.teamGrid}>
            {[
              { initials: "SS", name: "Siddhesh Sonwane", role: "Chief Executive Officer", description: "Guiding Fennrise's vision, direction and long-term development." },
              { initials: "AO", name: "Ansh Ovhal", role: "Co-founder", description: "Contributing to strategy, innovation and company development." },
              { initials: "RN", name: "Ratnesh Naik", role: "Co-founder & COO", description: "Supporting operations, coordination and company execution." },
              { initials: "SJ", name: "Sanaa Juneja", role: "Head of Marketing", description: "Shaping the company's brand communication and public presence." },
            ].map((member) => (
              <article className={styles.teamCard} key={member.name}>
                <div className={styles.teamAvatar} aria-hidden="true">{member.initials}</div>
                <h3>{member.name}</h3><span className={styles.teamRole}>{member.role}</span>
                <p>{member.description}</p>
              </article>
            ))}
            <article className={`${styles.teamCard} ${styles.futureCard}`}>
              <div className={styles.teamAvatar} aria-hidden="true">+</div>
              <h3>The Next Chapter</h3><span className={styles.teamRole}>Future team member</span>
              <p>A space reserved for a future addition to the team. This position is not yet filled.</p>
            </article>
          </div>
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
