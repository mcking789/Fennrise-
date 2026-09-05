"use client";

import Image from "next/image";
import { useState } from "react";
import HomeExperienceSections from "./components/HomeExperienceSections";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <header className="nav-shell">
        <a href="#top" className="brand" aria-label="Fennrise home">
          <Image className="brand-logo" src="/fennrise-logo.png" alt="" width={38} height={38} priority />
          <span>Fennrise</span>
        </a>

        <button
          className="menu-button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          <a href="/products" onClick={() => setMenuOpen(false)}>Products</a>
          <a href="/services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#roadmap" onClick={() => setMenuOpen(false)}>Roadmap</a>
          <a href="/about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="/waitlist" className="nav-cta" onClick={() => setMenuOpen(false)}>
            Join waitlist <span>→</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="particle p1" />
        <div className="particle p2" />
        <div className="particle p3" />
        <div className="particle p4" />
        <div className="orbit-system" aria-hidden="true">
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
            sizes="(max-width: 760px) 220px, 300px"
          />
        </div>

        <div className="hero-content">
          <div className="eyebrow hero-eyebrow"><span /> Independent technology company</div>
          <h1>Building<br />the <em>Future.</em></h1>
          <p>
            Creating intelligent digital products, websites, custom software, and voice AI that help
            people and businesses work smarter, build faster, and achieve more.
          </p>
          <div className="hero-actions">
            <a className="button button-gold" href="#products">
              Explore Products <span>↓</span>
            </a>
            <a className="button button-ghost" href="/waitlist">
              Join the Waitlist <span>→</span>
            </a>
          </div>
        </div>

        <div className="hero-bottom">
          <span>Technology · Software · Voice AI · Design · Intelligence</span>
          <a href="#about" aria-label="Scroll to our approach"><i>↓</i> Scroll to explore</a>
        </div>
      </section>

      <HomeExperienceSections />

      <footer>
        <div className="footer-main">
          <div>
            <a href="#top" className="brand footer-brand">
              <Image className="brand-logo" src="/fennrise-logo.png" alt="" width={38} height={38} />
              <span>Fennrise</span>
            </a>
            <p>Products, software & experiences.<br />Beautifully built.</p>
          </div>
          <div className="footer-links">
            <div><span>Explore</span><a href="/products">Products</a><a href="/services">Services</a><a href="#roadmap">Roadmap</a><a href="/about">About</a><a href="/contact">Contact</a></div>
            <div><span>Products</span><a href="/products#star">STAR</a><a href="/services#studio">Studio</a><a href="/products#fenn">Fenn</a><a href="/services#forge">Forge</a><a href="/products#relay">Relay</a></div>
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
