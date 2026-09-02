import type { Metadata } from "next";
import { ExperienceFooter, ExperienceHeader } from "../components/ExperienceChrome";
import styles from "../company-pages.module.css";

export const metadata: Metadata = {
  title: "Contact Fennrise",
  description:
    "Contact Fennrise for general enquiries, support, privacy requests, legal notices, Studio, or Forge projects.",
  alternates: { canonical: "/contact" },
};

const contacts = [
  {
    label: "General enquiries",
    title: "Company, partnerships and general questions",
    email: "connect@fennrise.com",
  },
  {
    label: "Support",
    title: "Existing customer and service support",
    email: "support@fennrise.com",
  },
  {
    label: "Privacy",
    title: "Data rights, deletion and privacy requests",
    email: "privacy@fennrise.com",
  },
  {
    label: "Legal",
    title: "Legal notices, disputes and IP complaints",
    email: "legal@fennrise.com",
  },
];

export default function ContactPage() {
  return (
    <main className={styles.page} id="page-top">
      <ExperienceHeader active="contact" />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>Contact Fennrise</div>
          <h1>Reach the <em>right team.</em></h1>
          <p>
            Use the address that matches what you need. This keeps support, privacy,
            legal requests, and general company conversations separate and easier to
            handle properly.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.split}>
          <span className={styles.label}>Contact directory</span>
          <div className={styles.copy}>
            <h2>Four clear ways to contact Fennrise.</h2>
            <div className={styles.contactGrid}>
              {contacts.map((contact) => (
                <article className={styles.contactCard} key={contact.email}>
                  <span>{contact.label}</span>
                  <strong>{contact.title}</strong>
                  <a href={`mailto:${contact.email}`}>{contact.email} ↗</a>
                </article>
              ))}
            </div>
            <p className={styles.note}>
              Fennrise is based in India. Please do not send passwords, payment-card
              details, government identity documents, or other sensitive information by
              ordinary email unless we specifically request a secure method.
            </p>
          </div>
        </div>
      </section>

      <ExperienceFooter />
    </main>
  );
}
