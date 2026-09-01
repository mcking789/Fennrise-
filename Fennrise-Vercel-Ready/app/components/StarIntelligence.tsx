"use client";

import { motion, useReducedMotion } from "motion/react";
import styles from "./StarIntelligence.module.css";

const capabilities = ["Think", "Create", "Solve", "Act"];

export default function StarIntelligence({ compact = false }: { compact?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`${styles.shell} ${compact ? styles.compact : ""}`} role="img" aria-label="STAR intelligent assistant visual">
      <div className={styles.grid} />
      <motion.div
        className={styles.scan}
        animate={reduceMotion ? undefined : { y: ["-40%", "140%"] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
      />

      <svg className={styles.signalMap} viewBox="0 0 720 430" aria-hidden="true">
        <defs>
          <linearGradient id="starSignal" x1="0" x2="1">
            <stop offset="0" stopColor="#f4b400" stopOpacity="0" />
            <stop offset="0.5" stopColor="#f4b400" stopOpacity="0.9" />
            <stop offset="1" stopColor="#f4b400" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M35 214 C145 214 164 128 258 174 C318 204 335 228 390 214 C474 193 509 263 685 214"
          fill="none"
          stroke="url(#starSignal)"
          strokeWidth="1.4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduceMotion ? 0 : 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M55 260 C160 240 195 292 284 244 C356 205 430 215 491 260 C542 297 603 270 670 245"
          fill="none"
          stroke="rgba(244,180,0,.16)"
          strokeWidth="1"
          strokeDasharray="5 12"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -68] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      <motion.div
        className={styles.outerOrbit}
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        {capabilities.map((capability, index) => (
          <span className={styles[`capability${index + 1}`]} key={capability}>{capability}</span>
        ))}
      </motion.div>

      <motion.div
        className={styles.innerOrbit}
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <i />
        <i />
      </motion.div>

      <motion.div
        className={styles.core}
        animate={reduceMotion ? undefined : { scale: [0.96, 1.04, 0.96], filter: ["brightness(.86)", "brightness(1.16)", "brightness(.86)"] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <span>✦</span>
      </motion.div>

      <motion.div
        className={styles.prompt}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: reduceMotion ? 0 : 0.45, duration: 0.8 }}
      >
        <span><i /> STAR is ready</span>
        <strong>What can we create?</strong>
        <b>↗</b>
      </motion.div>
    </div>
  );
}
