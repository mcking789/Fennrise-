"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";
import HomeExperienceSections from "./components/HomeExperienceSections";

export default function Home() {
  return (
    <main>
      <section className={styles.hero} id="top">
        <div className={`hero ${styles.backdrop}`} aria-hidden="true">
          <div className="particle p1" />
          <div className="particle p2" />
          <div className="particle p3" />
          <div className="particle p4" />
        </div>
        <div className={`orbit-system ${styles.orbit}`} aria-hidden="true">
          <div className="orbit-halo" />
          <div className="orbit-ring ring-one"><i /></div>
          <div className="orbit-ring ring-two"><i /></div>
          <div className="orbit-ring ring-three"><i /></div>
          <Image
            src="/fennrise-logo.png"
            alt=""
            width={280}
            height={280}
            priority
            sizes="(max-width: 760px) 24vw, (max-width: 1400px) 13vw, 182px"
          />
        </div>
        <div className={styles.copy}>
          <p className={styles.byline}>Fennrise · Independent technology company</p>
          <h1>Software for<br/><em>everyday life.</em></h1>
          <p className={styles.intro}>We’re a team in India building our own digital products and creating websites and software for businesses.</p>
          <div className={styles.actions}><Link href="/products">Explore products <span aria-hidden="true">→</span></Link><Link href="/services">Work with us</Link></div>
        </div>
      </section>
      <HomeExperienceSections />

      <footer>
        <div className="footer-main">
          <div>
            <Link href="/" className="brand footer-brand" data-brand-route>
              <Image className="brand-logo" src="/fennrise-logo.png" alt="" width={38} height={38} />
              <span>Fennrise</span>
            </Link>
            <p>Products, software & experiences.<br />Beautifully built.</p>
          </div>
          <div className="footer-links">
            <div><span>Explore</span><a href="/products">Products</a><a href="/services">Services</a><a href="#roadmap">Roadmap</a><a href="/about">About</a><a href="/contact">Contact</a></div>
            <div><span>Products</span><a href="/products#star">STAR</a><a href="/services#studio">Studio</a><a href="/products#fenn">Fenn</a><a href="/services#forge">Forge</a></div>
            <div><span>Connect</span><a href="mailto:connect@fennrise.com">General enquiries ↗</a><a href="mailto:support@fennrise.com">Support ↗</a></div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Fennrise. All rights reserved.</span>
          <div><a href="/privacy-policy">Privacy Policy</a><a href="/terms-of-service">Terms of Service</a></div>
          <a href="#top" className="back-top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
