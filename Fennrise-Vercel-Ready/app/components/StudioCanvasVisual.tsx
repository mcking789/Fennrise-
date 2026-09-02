"use client";

import { motion, useReducedMotion } from "motion/react";
import styles from "./StudioCanvasVisual.module.css";

export default function StudioCanvasVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={styles.stage}
      role="img"
      aria-label="Fennrise Studio website design visual"
    >
      <div className={styles.glow} />
      <div className={styles.windows}>
        <motion.div
          className={`${styles.window} ${styles.back}`}
          animate={
            reduceMotion
              ? undefined
              : { y: [-3, 3, -3], rotate: [5, 5.8, 5] }
          }
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <span />
          <i />
          <i />
        </motion.div>

        <motion.div
          className={`${styles.window} ${styles.front}`}
          initial={reduceMotion ? false : { opacity: 0, y: 22, rotate: -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: -3 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span />
          <div className={styles.copy}>
            <b />
            <i />
            <i />
          </div>
          <motion.div
            className={styles.block}
            animate={
              reduceMotion
                ? undefined
                : {
                    filter: [
                      "brightness(0.78)",
                      "brightness(1.13)",
                      "brightness(0.78)",
                    ],
                  }
            }
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
