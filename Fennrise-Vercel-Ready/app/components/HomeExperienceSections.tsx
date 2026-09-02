"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import FennFocusVisual from "./FennFocusVisual";
import ForgeDashboard from "./ForgeDashboard";
import StudioCanvasVisual from "./StudioCanvasVisual";
import RelayVisual from "./VoiceVisual";
import styles from "./HomeExperienceSections.module.css";

type ProductId = "star" | "fenn" | "relay";

const products: Array<{
  id: ProductId;
  number: string;
  name: string;
  line: string;
  text: string;
  meta: string;
  status: string;
  href: string;
}> = [
  {
    id: "star",
    number: "01",
    name: "STAR",
    line: "Talk. Create. Solve.",
    text: "An intelligent assistant for clearer thinking, faster creation, and useful everyday action.",
    meta: "Intelligence · Creation · Action",
    status: "In development",
    href: "/products#star",
  },
  {
    id: "fenn",
    number: "02",
    name: "Fenn",
    line: "Plan. Focus. Achieve.",
    text: "A focused productivity system that turns ambitious goals into steady, visible progress.",
    meta: "Planning · Focus · Progress",
    status: "In development",
    href: "/products#fenn",
  },
  {
    id: "relay",
    number: "03",
    name: "Relay",
    line: "Answer. Understand. Connect.",
    text: "Voice technology designed to handle business calls, capture intent, and keep work moving.",
    meta: "Voice AI · Leads · Routing",
    status: "Prototype",
    href: "/products#relay",
  },
];

const milestones = [
  {
    label: "Now",
    title: "Studio + Forge",
    text: "Websites, digital experiences, software, portals, and automation for businesses.",
    status: "Live",
    live: true,
  },
  {
    label: "Building",
    title: "STAR + Relay",
    text: "Intelligent assistance and voice technology moving from prototype to useful product.",
    status: "In development",
    live: false,
  },
  {
    label: "Next",
    title: "Fenn",
    text: "A focused system for planning, habits, opportunities, and visible everyday progress.",
    status: "Product direction",
    live: false,
  },
];

function StarHomeVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className={styles.starVisual} role="img" aria-label="STAR intelligent assistant interface preview">
      <div className={styles.starGrid} />
      <motion.div
        className={styles.starCore}
        animate={reduceMotion ? undefined : { scale: [0.96, 1.04, 0.96], opacity: [0.82, 1, 0.82] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span>✦</span>
      </motion.div>
      <div className={styles.starInterface}>
        <div className={styles.starTopbar}>
          <span><i /> STAR / ACTIVE</span>
          <b>INTELLIGENCE 01</b>
        </div>
        <div className={styles.starPrompt}>
          <small>Good morning.</small>
          <strong>What are we building today?</strong>
          <div>
            <span>Turn this idea into a clear plan...</span>
            <i>↗</i>
          </div>
        </div>
        <div className={styles.starOutput}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function ProductVisual({ id, reduceMotion }: { id: ProductId; reduceMotion: boolean }) {
  if (id === "fenn") return <FennFocusVisual />;
  if (id === "relay") return <RelayVisual />;
  return <StarHomeVisual reduceMotion={reduceMotion} />;
}

export default function HomeExperienceSections() {
  const [activeProduct, setActiveProduct] = useState<ProductId>("star");
  const reduceMotion = useReducedMotion() ?? false;
  const currentProduct = products.find((product) => product.id === activeProduct) ?? products[0];
  const reveal = {
    initial: { y: reduceMotion ? 0 : 24 },
    whileInView: { y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <>
      <section className={styles.about} id="about">
        <div className={styles.aboutGlow} aria-hidden="true" />
        <motion.div className={styles.aboutInner} {...reveal}>
          <div className={styles.sectionLabel}><i /> About Fennrise <span>Independent technology company</span></div>
          <div className={styles.aboutGrid}>
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

      <section className={styles.products} id="products">
        <div className={styles.sectionIntro}>
          <motion.div {...reveal}>
            <div className={styles.sectionLabel}><i /> Fennrise Products <span>01–03</span></div>
            <h2>Three products.<br /><em>One direction.</em></h2>
          </motion.div>
          <motion.div className={styles.introAside} {...reveal}>
            <p>Useful technology for intelligence, focus, and communication—shown as products, not promises.</p>
            <Link href="/products">Explore every product <b>→</b></Link>
          </motion.div>
        </div>

        <div className={styles.productShowcase}>
          <div className={styles.productRail} role="tablist" aria-label="Fennrise products">
            {products.map((product) => {
              const active = product.id === activeProduct;
              return (
                <button
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="fennrise-product-stage"
                  className={active ? styles.productActive : undefined}
                  key={product.id}
                  onClick={() => setActiveProduct(product.id)}
                  onFocus={() => setActiveProduct(product.id)}
                  onPointerEnter={() => setActiveProduct(product.id)}
                >
                  <span>{product.number}</span>
                  <div><strong>{product.name}</strong><small>{product.line}</small></div>
                  <i>{active ? "●" : "○"}</i>
                </button>
              );
            })}
          </div>

          <div className={styles.productStage} id="fennrise-product-stage" role="tabpanel" aria-live="polite">
            <div className={styles.stageGlow} aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.div
                className={styles.productVisual}
                key={currentProduct.id}
                initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : -12 }}
                transition={{ duration: reduceMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductVisual id={currentProduct.id} reduceMotion={reduceMotion} />
              </motion.div>
            </AnimatePresence>
            <div className={styles.stageDetails}>
              <div>
                <span><i /> {currentProduct.status}</span>
                <p>{currentProduct.text}</p>
                <small>{currentProduct.meta}</small>
              </div>
              <Link href={currentProduct.href} aria-label={`Explore ${currentProduct.name}`}>
                Explore {currentProduct.name} <b>↗</b>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.services} id="services">
        <div className={styles.sectionIntro}>
          <motion.div {...reveal}>
            <div className={styles.sectionLabel}><i /> Fennrise Services <span>Studio + Forge</span></div>
            <h2>Built around<br /><em>your business.</em></h2>
          </motion.div>
          <motion.div className={styles.introAside} {...reveal}>
            <p>From the first idea to a live website, platform, workflow, or complete digital product.</p>
            <Link href="/services">Explore every service <b>→</b></Link>
          </motion.div>
        </div>

        <div className={styles.serviceStories}>
          <article className={styles.serviceStory} id="studio">
            <motion.div className={styles.serviceCopy} {...reveal}>
              <span>01 / Fennrise Studio</span>
              <h3>Studio</h3>
              <strong>Design. Build. Launch.</strong>
              <p>Premium websites and digital experiences shaped with clear strategy, expressive design, and production-ready development.</p>
              <div className={styles.deliverables}>
                <span>Websites</span><span>UI/UX</span><span>Web apps</span><span>Brand direction</span>
              </div>
              <Link href="/services#studio">Enter Studio <b>↗</b></Link>
            </motion.div>
            <div className={styles.serviceVisual}><StudioCanvasVisual /></div>
          </article>

          <article className={`${styles.serviceStory} ${styles.serviceReverse}`} id="forge">
            <motion.div className={styles.serviceCopy} {...reveal}>
              <span>02 / Fennrise Forge</span>
              <h3>Forge</h3>
              <strong>Build. Automate. Scale.</strong>
              <p>Custom software designed around real operations—from portals and dashboards to internal tools and connected automation.</p>
              <div className={styles.deliverables}>
                <span>Custom software</span><span>Portals</span><span>Dashboards</span><span>Automation</span>
              </div>
              <Link href="/services#forge">Enter Forge <b>↗</b></Link>
            </motion.div>
            <div className={`${styles.serviceVisual} ${styles.forgeVisual}`}><ForgeDashboard /></div>
          </article>
        </div>
      </section>

      <section className={styles.roadmap} id="roadmap">
        <div className={styles.roadmapIntro}>
          <motion.div {...reveal}>
            <div className={styles.sectionLabel}><i /> The Roadmap <span>Honest progress</span></div>
            <h2>Built now.<br /><em>Becoming next.</em></h2>
          </motion.div>
          <motion.p {...reveal}>
            A simpler view of where Fennrise is today and what the company is deliberately building toward.
          </motion.p>
        </div>

        <ol className={styles.roadmapRail}>
          {milestones.map((milestone, index) => (
            <motion.li
              key={milestone.label}
              initial={{ y: reduceMotion ? 0 : 22 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : index * 0.08 }}
            >
              <div><span>{String(index + 1).padStart(2, "0")} / {milestone.label}</span><b className={milestone.live ? styles.live : undefined}><i />{milestone.status}</b></div>
              <h3>{milestone.title}</h3>
              <p>{milestone.text}</p>
            </motion.li>
          ))}
        </ol>
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
