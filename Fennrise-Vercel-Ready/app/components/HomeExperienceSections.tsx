"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import StudioCanvasVisual from "./StudioCanvasVisual";
import styles from "./HomeExperienceSections.module.css";

function ProductSignal({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className={styles.productSignal} role="img" aria-label="Fennrise products signal visual">
      <div className={styles.signalGlow} />
      <svg className={styles.signalWave} viewBox="0 0 760 460" aria-hidden="true">
        <defs>
          <linearGradient id="fennrise-product-wave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#755900" stopOpacity="0" />
            <stop offset=".2" stopColor="#f4b400" />
            <stop offset=".52" stopColor="#ffd84b" />
            <stop offset=".82" stopColor="#f4b400" />
            <stop offset="1" stopColor="#755900" stopOpacity="0" />
          </linearGradient>
          <filter id="fennrise-wave-glow" x="-30%" y="-100%" width="160%" height="300%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>
        <path className={styles.waveGuide} d="M18 250 C92 250 108 175 179 181 C247 187 257 302 333 278 C402 256 412 166 488 191 C560 215 593 298 742 224" />
        <motion.path
          className={styles.waveGlow}
          d="M18 250 C92 250 108 175 179 181 C247 187 257 302 333 278 C402 256 412 166 488 191 C560 215 593 298 742 224"
          initial={{ pathLength: reduceMotion ? 1 : 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: .4 }}
          transition={{ duration: reduceMotion ? 0 : 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          className={styles.waveEnergy}
          d="M18 250 C92 250 108 175 179 181 C247 187 257 302 333 278 C402 256 412 166 488 191 C560 215 593 298 742 224"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -180] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle cx="179" cy="181" r="7" animate={reduceMotion ? undefined : { r: [5, 9, 5], opacity: [.65, 1, .65] }} transition={{ duration: 3.2, repeat: Infinity }} />
        <motion.circle cx="333" cy="278" r="7" animate={reduceMotion ? undefined : { r: [5, 9, 5], opacity: [.65, 1, .65] }} transition={{ duration: 3.2, delay: .7, repeat: Infinity }} />
        <motion.circle cx="488" cy="191" r="7" animate={reduceMotion ? undefined : { r: [5, 9, 5], opacity: [.65, 1, .65] }} transition={{ duration: 3.2, delay: 1.4, repeat: Infinity }} />
      </svg>
      <motion.div
        className={styles.pulseStar}
        animate={reduceMotion ? undefined : { scale: [.92, 1.08, .92], opacity: [.78, 1, .78] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      >✦</motion.div>
      <span className={`${styles.pulseProduct} ${styles.pulseStarName}`}><small>01</small>STAR <i>Intelligence</i></span>
      <span className={`${styles.pulseProduct} ${styles.pulseFennName}`}><small>02</small>Fenn <i>Focus</i></span>
      <span className={`${styles.pulseProduct} ${styles.pulseRelayName}`}><small>03</small>Relay <i>Voice</i></span>
      <div className={styles.signalStatus}><i /> Three products / one signal</div>
    </div>
  );
}

export default function HomeExperienceSections() {
  const reduceMotion = useReducedMotion() ?? false;
  const reveal = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.22 },
    transition: { duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <>
      <section className={styles.about} id="about">
        <div className={styles.aboutGlow} aria-hidden="true" />
        <motion.div className={styles.aboutInner} {...reveal}>
          <div className={styles.sectionLabel}><i /> About Fennrise <span>Independent technology company</span></div>
          <div className={styles.aboutLayout}>
            <h2>Ideas become valuable when technology makes them <em>clear and useful.</em></h2>
            <div className={styles.aboutCopy}>
              <p>
                Fennrise is building intelligent products of its own while creating websites, software,
                and digital systems for ambitious businesses.
              </p>
              <p>
                One side explores what technology can become. The other applies that thinking to what
                businesses need today.
              </p>
              <span>Products + Services / One Fennrise standard</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className={`${styles.portal} ${styles.productsPortal}`} id="products">
        <div className={styles.portalWord} aria-hidden="true">PRODUCTS</div>
        <motion.div className={styles.portalCopy} {...reveal}>
          <div className={styles.sectionLabel}><i /> Fennrise Products <span>STAR · Fenn · Relay</span></div>
          <h2>Products of<br /><em>our own.</em></h2>
          <p>Intelligent technology for clearer thinking, focused progress, and better communication.</p>
          <Link className={styles.portalLink} href="/products">Explore Products <span>↗</span></Link>
        </motion.div>
        <motion.div className={styles.portalVisual} {...reveal}>
          <ProductSignal reduceMotion={reduceMotion} />
        </motion.div>
      </section>

      <section className={`${styles.portal} ${styles.servicesPortal}`} id="services">
        <div className={styles.portalWord} aria-hidden="true">SERVICES</div>
        <motion.div className={`${styles.portalVisual} ${styles.serviceCanvas}`} {...reveal}>
          <StudioCanvasVisual />
          <div className={styles.canvasCaption}><i /> Studio + Forge / Built for business</div>
        </motion.div>
        <motion.div className={styles.portalCopy} {...reveal}>
          <div className={styles.sectionLabel}><i /> Fennrise Services <span>Studio + Forge</span></div>
          <h2>Technology<br /><em>for yours.</em></h2>
          <p>Premium websites, digital experiences, custom software, and automation—built around the way your business works.</p>
          <Link className={styles.portalLink} href="/services">Explore Services <span>↗</span></Link>
        </motion.div>
      </section>

      <section className={styles.roadmap} id="roadmap">
        <motion.div className={styles.roadmapInner} {...reveal}>
          <div className={styles.sectionLabel}><i /> The Roadmap <span>Honest progress</span></div>
          <h2>Live now. <em>Building forward.</em></h2>
          <div className={styles.roadmapFlow} aria-label="Fennrise roadmap">
            <span><small>Now</small>Studio + Forge</span>
            <b>→</b>
            <span><small>Building</small>STAR + Relay</span>
            <b>→</b>
            <span><small>Next</small>Fenn</span>
          </div>
        </motion.div>
      </section>

      <section className={styles.waitlist} id="waitlist">
        <div className={styles.waitlistRings} aria-hidden="true"><i /><i /><i /></div>
        <motion.div className={styles.waitlistInner} {...reveal}>
          <Image className={styles.waitlistLogo} src="/fennrise-logo.png" width={86} height={86} alt="" />
          <div className={`${styles.sectionLabel} ${styles.centerLabel}`}><i /> Fennrise early access</div>
          <h2>Follow what&apos;s<br /><em>coming to life.</em></h2>
          <p>Early access and honest development updates for STAR, Relay, and the Fenn productivity experience.</p>
          <div className={styles.waitlistActions}>
            <Link className={styles.primaryAction} href="/waitlist">Join the Waitlist <span>→</span></Link>
            <Link href="/products">Explore Products <span>↗</span></Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
