"use client";

import Chevron from "../components/Chevron";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { ExperienceFooter } from "../components/ExperienceChrome";
import FennFocusVisual from "../components/FennFocusVisual";
import StarVisual from "../components/StarVisual";
import styles from "./products.module.css";

export default function ProductsExperience() {
  const pageRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  return (
    <main className={`company-surface ${styles.page}`} id="page-top" ref={pageRef}>

      <section className={styles.hero}>
        <div className={styles.heroGrid} />
        <motion.div className={styles.heroCopy} initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: [0.22,1,0.36,1] }}>
          <div className={styles.eyebrow}><i /> Fennrise products / 01–02</div>
          <h1><span>Technology with a</span><br /><em>purpose.</em></h1>
          <p>Two products in development, built around intelligence and focus—with usefulness at the centre of everyday work.</p>
          <a href="#star">Explore the products <span><Chevron direction="down" /></span></a>
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
          <span className={styles.status}><i /> In development</span>
        </div>
        <motion.div className={styles.chapterVisual} initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .9, ease: [0.22,1,0.36,1] }}><StarVisual /></motion.div>
      </section>

      <section className={`${styles.chapter} ${styles.reverse}`} id="fenn">
        <div className={styles.chapterCopy}>
          <motion.div initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .8 }}>
            <span className={styles.number}>02 / Productivity system</span>
            <h2>Fenn</h2>
            <h3>Your future, organized.</h3>
            <p>The main Fennrise productivity experience—built to turn ambitious plans into focused, consistent progress without adding more noise.</p>
          </motion.div>
          <span className={styles.status}><i /> In development</span>
        </div>
        <motion.div className={styles.chapterVisual} initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .9, ease: [0.22,1,0.36,1] }}><FennFocusVisual /></motion.div>
      </section>


      <section className={styles.closing}>
        <span>Products of our own.</span>
        <h2>Need technology<br />built for <em>yours?</em></h2>
        <p>Studio and Forge bring the same product thinking to websites, software, portals, automation, and digital systems for businesses.</p>
        <div><Link href="/services">Explore services <span><Chevron /></span></Link></div>
      </section>

      <ExperienceFooter />
    </main>
  );
}
