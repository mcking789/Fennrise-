"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import StudioCanvasVisual from "./StudioCanvasVisual";
import styles from "./HomeExperienceSections.module.css";

const productModes = [
  { name: "STAR", number: "01", type: "Intelligence", line: "Talk. Create. Solve." },
  { name: "Fenn", number: "02", type: "Focus", line: "Plan. Focus. Achieve." },
  { name: "Relay", number: "03", type: "Voice", line: "Answer. Understand. Connect." },
];

const roadmapItems = [
  {
    date: "Launched",
    title: "Fennrise Studio",
    text: "Premium web design and digital experience development.",
    active: true,
  },
  {
    date: "Launched",
    title: "Fennrise Forge",
    text: "Custom software, business tools, dashboards, portals, and automation.",
    active: true,
  },
  {
    date: "In development",
    title: "Fennrise Relay",
    text: "An AI calling assistant for business calls, lead capture, summaries, and intelligent routing.",
    active: false,
  },
  { date: "In development", title: "STAR", text: "An intelligent assistant for conversations and creation.", active: false },
  { date: "Next", title: "Fenn — Main App", text: "The complete focused productivity experience.", active: false },
  { date: "Beyond", title: "One Ecosystem", text: "More products. One seamless experience.", active: false },
];

function ProductSignal({ reduceMotion }: { reduceMotion: boolean }) {
  const [activeMode, setActiveMode] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setActiveMode((mode) => (mode + 1) % productModes.length), 3200);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const product = productModes[activeMode];

  return (
    <div className={styles.productSignal} role="img" aria-label="Animated Fennrise product interface showing STAR, Fenn, and Relay">
      <div className={styles.signalGlow} />
      <motion.div
        className={styles.productConsole}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 24, rotateX: reduceMotion ? 0 : 4 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: .35 }}
        transition={{ duration: reduceMotion ? 0 : .9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.consoleTopbar}>
          <span><i /> FENNRISE / PRODUCT SYSTEM</span>
          <div>{productModes.map((mode, index) => <b className={index === activeMode ? styles.consoleActive : undefined} key={mode.name}>{mode.name}</b>)}</div>
        </div>

        <div className={styles.consoleBody}>
          <AnimatePresence mode="wait">
            <motion.div
              className={styles.consoleCopy}
              key={product.name}
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : -15 }}
              transition={{ duration: reduceMotion ? 0 : .5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>{product.number} / {product.type}</span>
              <strong>{product.name}</strong>
              <p>{product.line}</p>
            </motion.div>
          </AnimatePresence>

          <div className={styles.consoleInstrument} aria-hidden="true">
            <div className={styles.instrumentHeader}>
              <span>Mode / {product.number}</span>
              <i>Active</i>
            </div>
            <div className={styles.instrumentCore}>
              <AnimatePresence mode="wait">
                <motion.b
                  key={product.number}
                  initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : -12 }}
                  transition={{ duration: reduceMotion ? 0 : .45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {product.number}
                </motion.b>
              </AnimatePresence>
            </div>
            <div className={styles.instrumentMeta}>
              <span>{product.type}</span>
              <span>{activeMode + 1} / {productModes.length}</span>
            </div>
          </div>
        </div>

        <div className={styles.consoleFooter}>
          <div><i className={activeMode === 0 ? styles.consoleProgress : undefined} /><i className={activeMode === 1 ? styles.consoleProgress : undefined} /><i className={activeMode === 2 ? styles.consoleProgress : undefined} /></div>
          <span><i /> In development</span>
        </div>
      </motion.div>
      <div className={styles.signalStatus}><i /> Products / continually evolving</div>
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
        <motion.div className={styles.roadmapIntro} {...reveal}>
          <div className={styles.sectionLabel}><i /> The Roadmap</div>
          <h2>What we&apos;re<br /><em>building next.</em></h2>
          <p>
            Fennrise is expanding into a connected ecosystem of products, software,
            voice AI, and services for work, communication, creation, and growth.
          </p>
        </motion.div>

        <div className={styles.timeline} aria-label="Fennrise roadmap">
          {roadmapItems.map((item, index) => (
            <motion.div
              className={`${styles.timelineItem} ${item.active ? styles.timelineActive : ""}`}
              key={item.title}
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 20 }}
              whileInView={{ opacity: item.active ? 1 : .55, y: 0 }}
              viewport={{ once: true, amount: .35 }}
              transition={{ duration: reduceMotion ? 0 : .65, delay: reduceMotion ? 0 : index * .06 }}
            >
              <div className={styles.timelineMarker}><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div className={styles.timelineCopy}>
                <span>{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
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
