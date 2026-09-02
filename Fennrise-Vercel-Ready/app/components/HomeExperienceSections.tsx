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
      <div className={styles.signalRing}><i /><i /><i /></div>
      <motion.div
        className={styles.signalStar}
        animate={reduceMotion ? undefined : { scale: [0.94, 1.06, 0.94], rotate: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        ✦
      </motion.div>
      <motion.span
        className={`${styles.productName} ${styles.starName}`}
        animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      >STAR <small>Intelligence</small></motion.span>
      <motion.span
        className={`${styles.productName} ${styles.fennName}`}
        animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
      >Fenn <small>Focus</small></motion.span>
      <motion.span
        className={`${styles.productName} ${styles.relayName}`}
        animate={reduceMotion ? undefined : { x: [0, 7, 0] }}
        transition={{ duration: 6.1, repeat: Infinity, ease: "easeInOut" }}
      >Relay <small>Voice</small></motion.span>
      <div className={styles.signalStatus}><i /> Three products in development</div>
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
