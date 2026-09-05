import type { Metadata } from "next";
import { ExperienceFooter, ExperienceHeader } from "../components/ExperienceChrome";
import styles from "../company-pages.module.css";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Fennrise",
  description:
    "Contact Fennrise for Studio and Forge projects, general enquiries, support, privacy requests, or legal notices.",
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
    title: "Product & service support",
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

type ContactPageProps = {
  searchParams: Promise<{ service?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const initialService = params.service === "studio" || params.service === "forge" ? params.service : "general";

  return (
    <main className={styles.page} id="page-top">
      <ExperienceHeader active="contact" />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>Contact Fennrise</div>
          <h1>Reach the <em>right team.</em></h1>
          <p>
            Start a Studio or Forge project directly through Fennrise, or use the
            contact directory for support, privacy, legal, and company enquiries.
          </p>
        </div>
      </section>

      <section className={styles.section} id="project">
        <div className={styles.split}>
          <span className={styles.label}>Start a project</span>
          <div className={styles.copy}>
            <h2>Tell us what you want to build.</h2>
            <p>
              Send the requirement directly to Fennrise. If you arrived from Studio or
              Forge, the correct service is already selected. We review the project and
              discuss scope and pricing with you directly.
            </p>
            <ContactForm initialService={initialService} />
          </div>
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
