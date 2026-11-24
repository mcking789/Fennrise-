import type { Metadata } from "next";
import { ExperienceFooter } from "../components/ExperienceChrome";
import Link from "next/link";
import Image from "next/image";
import s from "../company-editorial.module.css";

export const metadata: Metadata = {
  title: "About Fennrise — Independent Technology Company",
  description:
    "Learn what Fennrise is building, how we work, and the principles behind our products.",
  alternates: { canonical: "/about" },
};

const team = [
  { name: "Siddhesh Sonwane", role: "Chief Executive Officer", description: "Guiding Fennrise's vision, direction and long-term development." },
  { name: "Ansh Ovhal", role: "Co-founder", description: "Contributing to strategy, innovation and company development." },
  { name: "Ratnesh Naik", role: "Co-founder & COO", description: "Supporting operations, coordination and company execution." },
  { name: "Sanaa Juneja", role: "Head of Marketing", description: "Shaping the company's brand communication and public presence." },
];

export default function AboutPage() {
  return <main className={s.page} id="page-top">
    <header className={`${s.mast} ${s.portraitMast}`}><div><h1>About Fennrise</h1><p>We’re an independent technology team in India. We build our own products and work with businesses on websites and software.</p></div><Image src="/fennrise-glass.webp" width={1536} height={1024} sizes="(max-width:700px) 90vw, 43vw" alt="The Fennrise sunrise mark in amber glass" priority /></header>
    <section className={s.section}><div className={s.split}><h2>What we’re building</h2><div>
      <Link href="/products#star" className={s.entry}><h3 className={s.name}>STAR</h3><p>An assistant for conversations, writing and research.</p></Link>
      <Link href="/products#fenn" className={s.entry}><h3 className={s.name}>Fenn</h3><p>A planning app that connects everyday tasks with longer-term goals.</p></Link>
    </div></div></section>
    <section className={s.section}><div className={s.split}><h2>How we make decisions</h2><dl className={s.fact}>
      <div><dt>Start with the task</dt><dd>We look for work people repeat and ask where software could save them time.</dd></div>
      <div><dt>Keep it clear</dt><dd>Someone should be able to use a feature without having to learn how it works underneath.</dd></div>
      <div><dt>Learn from use</dt><dd>Watching someone use a first version helps us decide what to improve next.</dd></div>
    </dl></div></section>
    <section className={s.section} aria-labelledby="identity-heading"><div className={s.split}><h2 id="identity-heading">The Fennrise name</h2><div><p>“Fenn” gives the company its name. “Rise” reflects our ambition to build on each useful idea and improve it over time.</p><p>Our aim is to make work, learning and communication easier through the products we build in India.</p></div></div></section>
    <section className={s.section} aria-labelledby="team-heading"><div className={s.split}><h2 id="team-heading">The team</h2><div>
      {team.map(member=><article className={s.entry} key={member.name}><h3>{member.name}</h3><small>{member.role}</small><p>{member.description}</p></article>)}
      <div className={s.entry}><h3>Future team member</h3><p>This place is reserved for our next team member.</p></div>
    </div></div></section>
    <section className={s.section}><div className={s.split}><h2>Based in India</h2><div><p>For partnerships and company enquiries, you can reach our team directly.</p><a className={s.link} href="mailto:connect@fennrise.com">connect@fennrise.com</a></div></div></section>
    <ExperienceFooter />
  </main>;
}
