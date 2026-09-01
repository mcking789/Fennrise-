"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import styles from "./HomeExperienceSections.module.css";

const products = [
  {
    number: "01",
    name: "STAR",
    line: "Talk. Create. Solve.",
    text: "An intelligent assistant for clearer thinking, faster creation, and useful everyday action.",
    meta: "Intelligence · Creation · Action",
    href: "/products#star",
    mark: "✦",
  },
  {
    number: "02",
    name: "Fenn",
    line: "Plan. Focus. Achieve.",
    text: "A focused productivity system that turns ambitious goals into steady, visible progress.",
    meta: "Planning · Focus · Progress",
    href: "/products#fenn",
    mark: "F",
  },
  {
    number: "03",
    name: "Relay",
    line: "Answer. Understand. Connect.",
    text: "Voice technology designed to handle business calls, capture intent, and keep work moving.",
    meta: "Voice AI · Leads · Routing",
    href: "/products#relay",
    mark: "R",
  },
];

const services = [
  {
    number: "01",
    name: "Studio",
    line: "Design. Build. Launch.",
    meta: "Websites · UI/UX · Web apps · Brand direction",
    href: "/services#studio",
  },
  {
    number: "02",
    name: "Forge",
    line: "Build. Automate. Scale.",
    meta: "Custom software · Portals · Dashboards · Automation",
    href: "/services#forge",
  },
];

export default function HomeExperienceSections() {
  const reduceMotion = useReducedMotion();
  const reveal = {
    initial: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 34 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.22 },
    transition: { duration: reduceMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <>
      <section className={styles.about} id="about">
        <div className={styles.aboutGlow} aria-hidden="true" />
        <motion.div className={styles.aboutInner} {...reveal}>
          <div className={styles.kicker}><i /> About Fennrise <span>Independent technology company</span></div>
          <div className={styles.aboutStatement}>
            <h2>We turn ambitious ideas into technology that feels <em>clear, useful, and alive.</em></h2>
            <div className={styles.aboutCopy}>
              <p>
                Fennrise builds intelligent products of its own and creates digital systems for businesses.
                Every experience is shaped around a real problem, a clear purpose, and the people using it.
              </p>
              <span>Products of our own.<br />Technology for yours.</span>
            </div>
          </div>

          <div className={styles.signal} aria-label="How Fennrise works">
            <motion.i
              aria-hidden="true"
              initial={{ scaleX: reduceMotion ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <span><b>01</b><strong>Think clearly</strong><small>Find the real problem.</small></span>
            <span><b>02</b><strong>Build purposefully</strong><small>Make the idea useful.</small></span>
            <span><b>03</b><strong>Keep evolving</strong><small>Refine what matters.</small></span>
          </div>
        </motion.div>
      </section>

      <section className={styles.products} id="products">
        <div className={styles.sectionHead}>
          <motion.div {...reveal}>
            <span>Fennrise / Products</span>
            <h2>Technology we&apos;re<br /><em>bringing to life.</em></h2>
          </motion.div>
          <motion.div className={styles.headAside} {...reveal}>
            <p>Three focused products for intelligence, productivity, and communication.</p>
            <Link href="/products">Explore all products <b>→</b></Link>
          </motion.div>
        </div>

        <div className={styles.productList}>
          {products.map((product, index) => (
            <motion.div
              className={styles.productRow}
              key={product.name}
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : index * 0.08 }}
            >
              <Link href={product.href} aria-label={`Explore ${product.name}`}>
                <span className={styles.rowNumber}>{product.number}</span>
                <div className={styles.productName}>
                  <h3>{product.name}</h3>
                  <span>{product.line}</span>
                </div>
                <p>{product.text}</p>
                <span className={styles.productMeta}>{product.meta}</span>
                <b className={styles.productMark} aria-hidden="true">{product.mark}</b>
                <i className={styles.rowArrow}>↗</i>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.services} id="services">
        <div className={styles.serviceLight} aria-hidden="true" />
        <div className={styles.sectionHead}>
          <motion.div {...reveal}>
            <span>Fennrise / Services</span>
            <h2>Technology built<br /><em>around your business.</em></h2>
          </motion.div>
          <motion.div className={styles.headAside} {...reveal}>
            <p>From a first idea to a launched website, system, or complete digital product.</p>
            <Link href="/services">Explore all services <b>→</b></Link>
          </motion.div>
        </div>

        <div className={styles.serviceBands}>
          {services.map((service, index) => (
            <motion.div
              className={styles.serviceBand}
              key={service.name}
              initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : index === 0 ? -48 : 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={service.href} aria-label={`Explore Fennrise ${service.name}`}>
                <span>{service.number} / Fennrise</span>
                <h3>{service.name}</h3>
                <div><strong>{service.line}</strong><small>{service.meta}</small></div>
                <i>Enter {service.name} <b>→</b></i>
              </Link>
            </motion.div>
          ))}
        </div>

      </section>
    </>
  );
}
