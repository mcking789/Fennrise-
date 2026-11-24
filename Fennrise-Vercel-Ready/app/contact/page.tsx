import type { Metadata } from "next";
import { ExperienceFooter } from "../components/ExperienceChrome";
import ContactForm from "./ContactForm";
import s from "../company-editorial.module.css";

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

  return <main className={s.page} id="page-top">
    <header className={s.mast}><h1>Contact Fennrise</h1><p>Tell us about a project or choose an inbox for company, support, privacy and legal enquiries.</p></header>
    <section className={s.section} id="project" aria-labelledby="project-title"><div className={s.split}>
      <div><h2 id="project-title">What would you like to build?</h2><p>Describe what you need and who will use it. We’ll review the requirements and discuss scope and pricing with you.</p></div>
      <ContactForm initialService={initialService} />
    </div></section>
    <section className={s.section} aria-labelledby="contact-directory-title"><div className={s.split}><h2 id="contact-directory-title">Email the team</h2><div>
      {contacts.map(contact=><div className={s.entry} key={contact.email}><h3>{contact.label}</h3><p>{contact.title}</p><a className={s.link} href={`mailto:${contact.email}`}>{contact.email}</a></div>)}
      <p>Please do not send passwords, payment-card details, government identity documents or other sensitive information by ordinary email unless we specifically request a secure method.</p>
    </div></div></section>
    <ExperienceFooter />
  </main>;
}
