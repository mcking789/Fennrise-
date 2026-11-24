import Link from "next/link";
import { ExperienceFooter } from "../components/ExperienceChrome";
import s from "../company-editorial.module.css";

const servicePolicies = [
  {
    question: "How does payment work?",
    answer:
      "Studio and Forge projects use a 50/50 payment structure: 50% as an advance before work begins and the remaining 50% after delivery. Exact project pricing is not published on the website; it is discussed directly and confirmed in writing before work starts.",
  },
  {
    question: "How are scope and pricing decided?",
    answer:
      "We first understand the pages, features, design requirements, integrations, delivery expectations, and other work the project needs. We then confirm the exact scope and project quote directly with the client before development begins. Fennrise does not publish fixed Studio or Forge project prices on the website.",
  },
  {
    question: "How do revisions work?",
    answer:
      "Reasonable revisions within the agreed project scope are handled during the project. Repeated, excessive, or scope-changing revision requests may carry an additional charge because they require additional design, development, and testing time. Any additional charge is discussed before the extra work is carried out.",
  },
  {
    question: "What if I request changes after delivery?",
    answer:
      "Changes requested after the website or Forge project has been delivered are treated as additional work and may be charged separately. This includes new changes, features, pages, redesign requests, integrations, or other work that was not part of the delivered scope. We confirm the work and applicable charge directly before starting it.",
  },
  {
    question: "What happens if I cancel the project midway?",
    answer:
      "If the client cancels after work has begun, payments already made are non-refundable. This reflects the design, development, planning, and other work already carried out for the project, subject to any rights that cannot be excluded under applicable law.",
  },
  {
    question: "What support is included?",
    answer:
      "If a verified bug is caused by the work Fennrise delivered within the agreed project scope, we will correct that bug without an additional charge. Problems caused by client-made changes, misuse, changed settings, external code, third-party services, hosting changes, or other modifications outside the delivered Fennrise work may be chargeable.",
  },
  {
    question: "Who owns the software and third-party tools?",
    answer:
      "Ownership of the custom project deliverables is defined in the written project agreement. Materials supplied by the client remain the client’s property. Third-party libraries, platforms, APIs, fonts, hosting services, payment providers, and other external tools remain subject to their own licences, ownership, and terms.",
  },
  {
    question: "Who pays for domains, hosting, APIs, and third-party services?",
    answer:
      "Domains, hosting plans, paid APIs, payment providers, messaging services, and other third-party tools may have separate fees. Responsibility for those costs is confirmed directly with the client before the relevant service is purchased or activated. These third-party prices are not published as part of Fennrise project pricing on this website.",
  },
  {
    question: "What controls the terms of a Studio or Forge project?",
    answer:
      "The project-specific written quotation, proposal, or agreement confirms the scope, fees, timeline, revision arrangements, ownership, and support for that project. Those written project terms apply to the project-specific matters agreed with the client.",
  },
];

const services = [
  { id:"studio", name:"Studio", description:"We design and build websites, from an initial landing page to a web application with a visual identity of its own.", work:["Website design","UI and UX design","Landing pages","Web applications","Brand direction","Responsive development"] },
  { id:"forge", name:"Forge", description:"We build software around the way your team works, connecting the information, people and tasks that run your business.", work:["Custom software","Business dashboards","Client portals","Workflow automation","Internal tools","Web applications"] },
];

export default function ServicesExperience() {
  return <main className={s.page} id="page-top">
    <header className={s.mast}><h1>Websites and custom software</h1><p>Work with Studio on what your customers see, or with Forge on the systems your team uses every day.</p></header>
    {services.map(service=><section className={s.section} key={service.id} id={service.id}><div className={s.split}>
      <div><h2>Fennrise {service.name}</h2><Link className={s.link} href={`/contact?service=${service.id}#project`}>Start a {service.name} project</Link></div>
      <div><p>{service.description}</p><ul className={s.list}>{service.work.map(item=><li key={item}>{item}</li>)}</ul></div>
    </div></section>)}
    <section className={s.section}><div className={s.split}><h2>How we work</h2><dl className={s.fact}>
      <div><dt>Discovery</dt><dd>We talk through the goal, the people who will use the work and the problems they face.</dd></div>
      <div><dt>Design</dt><dd>We agree on the structure and visual direction before development.</dd></div>
      <div><dt>Development</dt><dd>We build the features, connect integrations and test the experience.</dd></div>
      <div><dt>Launch</dt><dd>We deploy the project and confirm the support it needs.</dd></div>
    </dl></div></section>
    <section className={s.section} aria-labelledby="project-terms-title"><div className={s.split}><div><h2 id="project-terms-title">Project terms</h2><p>We discuss Studio and Forge pricing directly and confirm the scope before work begins.</p></div>
    <div>{servicePolicies.map(item=><details key={item.question} className={s.faq}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></div></section>
    <section className={s.section}><div className={s.split}><h2>Tell us about your project</h2><div><Link className={s.link} href="/contact#project">Start a project</Link><p><Link className={s.link} href="/products">Explore our products</Link></p></div></div></section>
    <ExperienceFooter />
  </main>;
}
