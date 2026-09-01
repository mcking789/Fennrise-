"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { useRef } from "react";
import { ExperienceFooter, ExperienceHeader } from "../components/ExperienceChrome";
import ForgeDashboard from "../components/ForgeDashboard";
import StudioCanvasVisual from "../components/StudioCanvasVisual";
import styles from "./services.module.css";

const process = ["Discover", "Design", "Build", "Launch"];

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
          <a href="mailto:hello@fennrise.com?subject=Fennrise%20Studio%20Project">Start a Studio project <b>↗</b></a>
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
          <a href="mailto:hello@fennrise.com?subject=Fennrise%20Forge%20Project">Start a Forge project <b>↗</b></a>
        </div>
        <div className={`${styles.visual} ${styles.forgeVisual}`}><ForgeDashboard /></div>
      </section>

      <section className={styles.process}>
        <div className={styles.processIntro}><span>How we work</span><h2>One clear path<br />from <em>idea to launch.</em></h2></div>
        <div className={styles.processLine}>{process.map((step,index)=><motion.div key={step} initial={{opacity:reduceMotion?1:0,y:reduceMotion?0:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:reduceMotion?0:index*.1}}><span>{String(index+1).padStart(2,'0')}</span><h3>{step}</h3><p>{['Understand the goal, audience, and real business problem.','Shape the structure, interaction, and visual direction.','Develop, test, refine, and connect every moving part.','Deploy the finished experience and support what comes next.'][index]}</p></motion.div>)}</div>
      </section>

      <section className={styles.closing}>
        <span>Have something worth building?</span>
        <h2>Let&apos;s bring it<br /><em>to life.</em></h2>
        <p>Tell us the goal, the existing problem, or simply the idea. We&apos;ll help shape the right digital direction.</p>
        <div><a href="mailto:hello@fennrise.com?subject=Start%20a%20Fennrise%20Project">Start a project <b>→</b></a><Link href="/products">Explore our products <b>↗</b></Link></div>
      </section>

      <ExperienceFooter />
    </main>
  );
}
