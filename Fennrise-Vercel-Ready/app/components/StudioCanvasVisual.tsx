"use client";

import { motion, useReducedMotion } from "motion/react";
import styles from "./StudioCanvasVisual.module.css";

export default function StudioCanvasVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className={styles.stage} role="img" aria-label="Fennrise Studio website design visual">
      <div className={styles.grid} />
      <motion.div
        className={`${styles.window} ${styles.back}`}
        animate={reduceMotion ? undefined : { y: [-5, 5, -5], rotate: [4, 5.5, 4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className={styles.top}><i /><i /><i /></div><span /><span /><span />
      </motion.div>
      <motion.div
        className={`${styles.window} ${styles.middle}`}
        animate={reduceMotion ? undefined : { y: [4, -5, 4], rotate: [-1, -2.5, -1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className={styles.top}><i /><i /><i /></div><span /><span />
      </motion.div>
      <motion.div
        className={`${styles.window} ${styles.front}`}
        initial={{ opacity: 0, y: 30, rotate: -4 }}
        whileInView={{ opacity: 1, y: 0, rotate: -2 }}
        viewport={{ once: true, amount: .4 }}
        transition={{ duration: reduceMotion ? 0 : 1, ease: [0.22,1,0.36,1] }}
      >
        <div className={styles.top}><i /><i /><i /><b>studio / live canvas</b></div>
        <div className={styles.copy}><strong /><span /><span /></div>
        <div className={styles.media} />
      </motion.div>
    </div>
  );
}
