"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { useRef } from "react";
import { ExperienceFooter, ExperienceHeader } from "../components/ExperienceChrome";
import ForgeDashboard from "../components/ForgeDashboard";
import StudioCanvasVisual from "../components/StudioCanvasVisual";
import styles from "./services.module.css";

const process = ["Discover", "Design", "Build", "Launch"];

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

export default function ServicesExperience() {
  const pageRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });

  return (
    <main className={styles.page} id="page-top" ref={pageRef}>
      <ExperienceHeader active="services" />
      <motion.div className={styles.progress} style={{ scaleX: scrollYProgress }} />

      <section className={styles.hero}>
        <div className={styles.heroLines} aria-hidden="true"><i /><i /><i /><i /></div>
        <motion.div className={styles.heroCopy} initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: [0.22,1,0.36,1] }}>
          <div className={styles.eyebrow}><i /> Fennrise services / Studio + Forge</div>
          <h1>Ideas made<br /><em>useful.</em></h1>
          <p>From a first idea to a launched experience, we design and build the technology your business needs next.</p>
          <a href="#studio">Explore our services <span>↓</span></a>
        </motion.div>
      </section>

      <section className={styles.service} id="studio">
        <div className={styles.copy}>
          <motion.div initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount:.35 }} transition={{ duration:.85 }}>
            <span>01 / Fennrise Studio</span>
            <h2>Studio</h2>
            <h3>Design. Build. Launch.</h3>
            <p>Premium websites and digital experiences built with clear strategy, thoughtful design, smooth interaction, and production-ready technology.</p>
          </motion.div>
          <div className={styles.serviceList}>{['Website design','UI/UX design','Landing pages','Web applications','Brand direction','Responsive development'].map((item,index)=><motion.span key={item} initial={{opacity:reduceMotion?1:0,x:reduceMotion?0:-18}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:reduceMotion?0:index*.06}}><i>{String(index+1).padStart(2,'0')}</i>{item}</motion.span>)}</div>
          <a href="mailto:connect@fennrise.com?subject=Fennrise%20Studio%20Project">Start a Studio project <b>↗</b></a>
        </div>
        <div className={styles.visual}><StudioCanvasVisual /></div>
      </section>

      <section className={`${styles.service} ${styles.reverse}`} id="forge">
        <div className={styles.copy}>
          <motion.div initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount:.35 }} transition={{ duration:.85 }}>
            <span>02 / Fennrise Forge</span>
            <h2>Forge</h2>
            <h3>Build. Automate. Scale.</h3>
            <p>Custom software designed around the way your business actually works—from internal tools and dashboards to client portals, automation, and complete web applications.</p>
          </motion.div>
          <div className={styles.serviceList}>{['Custom software','Business dashboards','Client portals','Workflow automation','Internal tools','Web applications'].map((item,index)=><motion.span key={item} initial={{opacity:reduceMotion?1:0,x:reduceMotion?0:-18}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:reduceMotion?0:index*.06}}><i>{String(index+1).padStart(2,'0')}</i>{item}</motion.span>)}</div>
          <a href="mailto:connect@fennrise.com?subject=Fennrise%20Forge%20Project">Start a Forge project <b>↗</b></a>
        </div>
        <div className={`${styles.visual} ${styles.forgeVisual}`}><ForgeDashboard /></div>
      </section>

      <section className={styles.process}>
        <div className={styles.processIntro}><span>How we work</span><h2>One clear path<br />from <em>idea to launch.</em></h2></div>
        <div className={styles.processLine}>{process.map((step,index)=><motion.div key={step} initial={{opacity:reduceMotion?1:0,y:reduceMotion?0:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:reduceMotion?0:index*.1}}><span>{String(index+1).padStart(2,'0')}</span><h3>{step}</h3><p>{['Understand the goal, audience, and real business problem.','Shape the structure, interaction, and visual direction.','Develop, test, refine, and connect every moving part.','Deploy the finished experience and support what comes next.'][index]}</p></motion.div>)}</div>
      </section>

      <section className={styles.projectTerms} aria-labelledby="project-terms-title">
        <div className={styles.projectTermsIntro}>
          <span>Project terms</span>
          <h2 id="project-terms-title">Clear before we build.</h2>
          <p>Studio and Forge pricing is discussed directly. These are the general project rules we use so both sides know what to expect before work starts.</p>
        </div>
        <div className={styles.projectTermsList}>
          {servicePolicies.map((item, index) => (
            <details className={styles.projectTerm} key={item.question}>
              <summary><small>{String(index + 1).padStart(2, "0")}</small><span>{item.question}</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.closing}>
        <span>Have something worth building?</span>
        <h2>Let&apos;s bring it<br /><em>to life.</em></h2>
        <p>Tell us the goal, the existing problem, or simply the idea. We&apos;ll help shape the right digital direction.</p>
        <div><a href="mailto:connect@fennrise.com?subject=Start%20a%20Fennrise%20Project">Start a project <b>→</b></a><Link href="/products">Explore our products <b>↗</b></Link></div>
      </section>

      <ExperienceFooter />
    </main>
  );
}
