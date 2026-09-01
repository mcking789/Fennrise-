"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ExperienceFooter, ExperienceHeader } from "../components/ExperienceChrome";
import FennFocusVisual from "../components/FennFocusVisual";
import StarIntelligence from "../components/StarIntelligence";
import RelayVisual from "../components/VoiceVisual";
import styles from "./products.module.css";

const productIndex = ["STAR", "Fenn", "Relay"];

export default function ProductsExperience() {
  const pageRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });
  const railX = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["5%", "-24%"]);

  return (
    <main className={styles.page} id="page-top" ref={pageRef}>
      <ExperienceHeader active="products" />
      <motion.div className={styles.progress} style={{ scaleX: scrollYProgress }} />

      <section className={styles.hero}>
        <div className={styles.heroGrid} />
        <motion.div className={styles.heroCopy} initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: [0.22,1,0.36,1] }}>
          <div className={styles.eyebrow}><i /> Fennrise products / 01–03</div>
          <h1>Technology<br />with a <em>purpose.</em></h1>
          <p>Three products being built around intelligence, focus, and communication—designed to become useful parts of everyday work.</p>
          <a href="#star">Explore the products <span>↓</span></a>
        </motion.div>
        <motion.div className={styles.indexRail} style={{ x: railX }} aria-hidden="true">
          {[...productIndex, ...productIndex].map((name, index) => <span key={`${name}-${index}`}>{name}<i>✦</i></span>)}
        </motion.div>
      </section>

      <section className={`${styles.chapter} ${styles.starChapter}`} id="star">
        <div className={styles.chapterCopy}>
          <motion.div initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .8 }}>
            <span className={styles.number}>01 / Intelligent assistant</span>
            <h2>STAR</h2>
            <h3>Talk. Create. Solve.</h3>
            <p>An intelligent assistant designed for useful conversations, clearer thinking, faster creation, and practical actions across everyday work.</p>
          </motion.div>
          <div className={styles.capabilityList}>
            {['Conversations','Writing & creation','Research','Coding','Everyday actions'].map((item,index)=><motion.span key={item} initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: reduceMotion ? 0 : index * .07 }}><i>{String(index+1).padStart(2,'0')}</i>{item}</motion.span>)}
          </div>
          <span className={styles.status}><i /> In development</span>
        </div>
        <div className={styles.chapterVisual}><StarIntelligence /></div>
      </section>

      <section className={`${styles.chapter} ${styles.reverse}`} id="fenn">
        <div className={styles.chapterCopy}>
          <motion.div initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .8 }}>
            <span className={styles.number}>02 / Productivity system</span>
            <h2>Fenn</h2>
            <h3>Plan. Focus. Achieve.</h3>
            <p>The main Fennrise productivity experience—built to turn ambitious plans into focused, consistent progress without adding more noise.</p>
          </motion.div>
          <div className={styles.capabilityList}>{['Goals & planning','Focus Mode','Habits','Smart reminders','Opportunities','Progress insights'].map((item,index)=><motion.span key={item} initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: reduceMotion ? 0 : index*.06 }}><i>{String(index+1).padStart(2,'0')}</i>{item}</motion.span>)}</div>
          <span className={styles.status}><i /> In development</span>
        </div>
        <div className={styles.chapterVisual}><FennFocusVisual /></div>
      </section>

      <section className={`${styles.chapter} ${styles.relayChapter}`} id="relay">
        <div className={styles.chapterCopy}>
          <motion.div initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .8 }}>
            <span className={styles.number}>03 / Voice AI for business</span>
            <h2>Relay</h2>
            <h3>Answer. Understand. Connect.</h3>
            <p>A business calling assistant being developed to understand customer requests, answer common questions, capture leads, summarize calls, and route conversations.</p>
          </motion.div>
          <div className={styles.capabilityList}>{['AI calls','Lead capture','Call summaries','FAQs','Smart routing','Follow-ups'].map((item,index)=><motion.span key={item} initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: reduceMotion ? 0 : index*.06 }}><i>{String(index+1).padStart(2,'0')}</i>{item}</motion.span>)}</div>
          <span className={styles.status}><i /> In development</span>
        </div>
        <div className={`${styles.chapterVisual} ${styles.relayVisual}`}><RelayVisual /></div>
      </section>

      <section className={styles.closing}>
        <span>Products of our own.</span>
        <h2>Need technology<br />built for <em>yours?</em></h2>
        <p>Studio and Forge bring the same product thinking to websites, software, portals, automation, and digital systems for businesses.</p>
        <div><Link href="/services">Explore services <span>→</span></Link><Link href="/waitlist">Follow product updates <span>↗</span></Link></div>
      </section>

      <ExperienceFooter />
    </main>
  );
}
