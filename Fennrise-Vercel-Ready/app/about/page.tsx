import type { Metadata } from "next";
import { ExperienceFooter, ExperienceHeader } from "../components/ExperienceChrome";
import styles from "../company-pages.module.css";

export const metadata: Metadata = {
  title: "About Fennrise — Independent Technology Company",
  description:
    "Learn what Fennrise is building, how we work, and the principles behind our products and services.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Solve real problems.",
    text: "We start with a genuine need, not a trend. Products and services should remove friction, save time, or make something meaningfully better.",
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

export default function AboutPage() {
  return (
    <main className={styles.page} id="page-top">
      <ExperienceHeader active="about" />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>About Fennrise</div>
          <h1>Technology should feel <em>useful.</em></h1>
          <p>
            Fennrise is an independent technology company in India building intelligent
            products of its own while applying the same product thinking to software and
            digital experiences for businesses.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.split}>
          <span className={styles.label}>What we are building</span>
          <div className={styles.copy}>
            <h2>Products first. Services with purpose.</h2>
            <p>
              Our long-term focus is a family of Fennrise products, including STAR,
              Fenn, and Relay. They explore better ways to work, focus, communicate,
              and use intelligent software in everyday life.
            </p>
            <p>
              Fennrise Studio and Forge currently help businesses with websites,
              digital experiences, custom software, portals, dashboards, and
              automation. That work also gives us practical experience solving real
              problems while our own products continue to develop.
            </p>

            <div className={styles.principles}>
              {principles.map((principle, index) => (
                <div className={styles.principle} key={principle.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.split}>
          <span className={styles.label}>Company</span>
          <div className={styles.copy}>
            <h2>Based in India. Built for a wider future.</h2>
            <p>
              Fennrise currently operates from India. We are building the company,
              products, processes, and legal foundations with the intention of being
              able to grow beyond one city or one market when the products are ready.
            </p>
            <p>
              For general enquiries, partnerships, press, or company questions, contact
              us at <a href="mailto:connect@fennrise.com">connect@fennrise.com</a>.
            </p>
          </div>
        </div>
      </section>

      <ExperienceFooter />
    </main>
  );
}
