"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./ExperienceChrome.module.css";

type ActivePage = "products" | "services" | "about" | "contact";

export function ExperienceHeader({ active }: { active?: ActivePage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand} aria-label="Fennrise home">
        <Image src="/fennrise-logo.png" alt="" width={38} height={38} priority />
        <span>Fennrise</span>
      </Link>
      <button className={styles.menu} aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`} aria-label="Main navigation">
        <Link className={active === "products" ? styles.active : ""} href="/products" onClick={() => setMenuOpen(false)}>Products</Link>
        <Link className={active === "services" ? styles.active : ""} href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
        <Link href="/#roadmap" onClick={() => setMenuOpen(false)}>Roadmap</Link>
        <Link className={active === "about" ? styles.active : ""} href="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link className={active === "contact" ? styles.active : ""} href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link className={styles.cta} href="/waitlist" onClick={() => setMenuOpen(false)}>Join waitlist <span>→</span></Link>
      </nav>
    </header>
  );
}

export function ExperienceFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <Link href="/" className={styles.brand}><Image src="/fennrise-logo.png" alt="" width={38} height={38} /><span>Fennrise</span></Link>
        <p>Products, software & experiences.<br />Beautifully built.</p>
        <div><Link href="/products">Products</Link><Link href="/services">Services</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div>
      </div>
      <div className={styles.footerBottom}><span>© 2026 Fennrise. All rights reserved.</span><div><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms-of-service">Terms of Service</Link></div><Link href="#page-top">Back to top ↑</Link></div>
    </footer>
  );
}
