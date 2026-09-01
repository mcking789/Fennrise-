"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import styles from "./HomepageGateway.module.css";

export default function HomepageGateway() {
  const reduceMotion = useReducedMotion();
  const enter = reduceMotion ? {} : { opacity: 1, y: 0 };

  return (
    <section className={styles.section} id="products">
      <div className={styles.intro}>
        <div className="eyebrow"><span /> Products & services</div>
        <h2>Two ways we<br /><em>build forward.</em></h2>
        <p>Explore technology we are creating for everyday use, or work with Fennrise to build something for your business.</p>
      </div>

      <div className={styles.paths}>
        <motion.div className={`${styles.path} ${styles.products}`} initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 45 }} whileInView={enter} viewport={{ once: true, amount: .28 }} transition={{ duration: .9, ease: [0.22,1,0.36,1] }}>
          <Link href="/products" className={styles.link} aria-label="Explore Fennrise products">
            <div className={styles.copy}>
              <span>01 / Technology of our own</span>
              <h3>Products</h3>
              <p>STAR · Fenn · Relay</p>
              <b>Enter products <i>↗</i></b>
            </div>
            <div className={styles.productScene} aria-hidden="true">
              <motion.i className={styles.orbitOne} animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} />
              <motion.i className={styles.orbitTwo} animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 13, repeat: Infinity, ease: "linear" }} />
              <motion.strong animate={reduceMotion ? undefined : { scale: [1,.94,1], filter: ["brightness(1)","brightness(.72)","brightness(1)"] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}>✦</motion.strong>
              <span>Think</span><span>Create</span><span>Solve</span>
            </div>
            <span className={styles.ghostWord}>PRODUCTS</span>
          </Link>
        </motion.div>

        <motion.div className={`${styles.path} ${styles.services}`} initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 45 }} whileInView={enter} viewport={{ once: true, amount: .28 }} transition={{ duration: .9, delay: reduceMotion ? 0 : .1, ease: [0.22,1,0.36,1] }}>
          <Link href="/services" className={styles.link} aria-label="Explore Fennrise services">
            <div className={styles.copy}>
              <span>02 / Technology for your business</span>
              <h3>Services</h3>
              <p>Studio · Forge</p>
              <b>Enter services <i>↗</i></b>
            </div>
            <div className={styles.serviceScene} aria-hidden="true">
              <motion.div className={styles.webLayerOne} animate={reduceMotion ? undefined : { y: [-5,5,-5], rotate: [4,5,4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}><i /><span /><span /></motion.div>
              <motion.div className={styles.webLayerTwo} animate={reduceMotion ? undefined : { y: [5,-5,5], rotate: [-3,-1.5,-3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><i /><span /><b /></motion.div>
              <svg viewBox="0 0 260 90"><motion.path d="M0 75 C42 70 46 48 78 56 C112 66 116 31 150 42 C185 53 208 18 260 22" fill="none" stroke="#f4b400" strokeWidth="1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 1.4, delay: .4 }} /></svg>
            </div>
            <span className={styles.ghostWord}>SERVICES</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
