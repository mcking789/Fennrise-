import type { Metadata } from "next";
import { ExperienceFooter, ExperienceHeader } from "../components/ExperienceChrome";
import ContactForm from "./ContactForm";
import styles from "./contact.module.css";

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
    title: "Existing customer and product support",
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
          <h1>Let&apos;s build<br /><em>what&apos;s next.</em></h1>
          <p>
            Reach the right team, send a project enquiry, or contact Fennrise directly for support and company matters.
          </p>
          <div className={styles.heroMeta} aria-label="Fennrise contact areas">
            <span>Studio</span><i /><span>Forge</span><i /><span>Support</span><i /><span>Company</span>
          </div>
        </div>
      </section>

      <section className={styles.projectSection} id="project" aria-labelledby="project-title">
        <div className={styles.projectIntro}>
          <span>Start a project</span>
          <h2 id="project-title">Tell us what you<br />want to <em>build.</em></h2>
          <p>
            Send the requirement directly to Fennrise. If you arrived from Studio or Forge, the correct service is already selected.
            We review the project and discuss scope and pricing with you directly.
          </p>
        </div>
        <div className={styles.projectPanel}>
          <ContactForm initialService={initialService} />
        </div>
      </section>

      <section className={styles.directorySection} aria-labelledby="contact-directory-title">
        <div className={styles.directoryPanel}>
          <div className={styles.directoryHeader}>
            <div className={styles.directoryKicker}><i>F</i> Contact directory</div>
            <h2 id="contact-directory-title">Four clear ways<br />to <em>reach us.</em></h2>
            <p>
              Choose the inbox that matches what you need. Each address routes your message to the right place inside Fennrise.
            </p>
          </div>

          <div className={styles.contactRail}>
            {contacts.map((contact, index) => (
              <a className={styles.contactChannel} href={`mailto:${contact.email}`} key={contact.email}>
                <div className={styles.contactTop}>
                  <span>{contact.label}</span>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                </div>
                <strong>{contact.title}</strong>
                <small>{contact.email} ↗</small>
              </a>
            ))}
          </div>

          <p className={styles.directoryNote}>
            Fennrise is based in India. Please do not send passwords, payment-card details, government identity documents,
            or other sensitive information by ordinary email unless we specifically request a secure method.
          </p>
        </div>
      </section>

      <ExperienceFooter />
    </main>
  );
}
