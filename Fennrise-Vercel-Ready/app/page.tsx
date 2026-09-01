"use client";

import { useEffect, useState } from "react";

const roadmap = [
  { date: "Launched", title: "Fennrise Studio", text: "Premium web design and digital experience development.", active: true },
  { date: "Launched", title: "Fennrise Forge", text: "Custom software, business tools, dashboards, portals, and automation.", active: true },
  { date: "In development", title: "Fennrise Relay", text: "An AI calling assistant for business calls, lead capture, summaries, and intelligent routing.", active: false },
  { date: "In development", title: "Star", text: "An intelligent assistant for conversations and creation.", active: false },
  { date: "Next", title: "Fenn — Main App", text: "The complete focused productivity experience.", active: false },
  { date: "Beyond", title: "One Ecosystem", text: "More products. One seamless experience.", active: false },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <header className="nav-shell">
        <a href="#top" className="brand" aria-label="Fennrise home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-logo" src="/fennrise-logo.png" alt="" />
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
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#roadmap" onClick={() => setMenuOpen(false)}>Roadmap</a>
          <a
            href="/waitlist"
            className="nav-cta"
            onClick={() => setMenuOpen(false)}
          >
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/fennrise-logo.png" alt="" />
        </div>

        <div className="hero-content">
          <div className="eyebrow hero-eyebrow"><span /> Independent technology company</div>
          <h1>Building<br />the <em>Future.</em></h1>
          <p>
            Creating intelligent digital products, websites, custom software, and voice AI that help
            people and businesses work smarter, build faster, and achieve more.
          </p>
          <div className="hero-actions">
            <a className="button button-gold" href="/products">
              Explore Products <span>↓</span>
            </a>
            <a
              className="button button-ghost"
              href="/waitlist"
            >
              Join the Waitlist <span>→</span>
            </a>
          </div>
        </div>

        <div className="hero-bottom">
          <span>Technology · Software · Voice AI · Design · Intelligence</span>
          <a href="#about" aria-label="Scroll to our approach"><i>↓</i> Scroll to explore</a>
        </div>
      </section>

      <section className="why-minimal" id="about">
        <div className="why-minimal-inner">
          <div className="why-minimal-copy reveal">
            <span>Fennrise / Our approach</span>
            <h2>Thoughtful technology,<br /><em>made useful.</em></h2>
            <p>Focused software and digital products for clearer work and everyday progress.</p>
            <div className="why-steps" aria-label="Our approach">
              <span>Think</span><i />
              <span>Build</span><i />
              <span>Refine</span>
            </div>
          </div>

          <div className="principle-stack reveal delay-2" aria-label="Fennrise principles">
            <div className="principle-card principle-think">
              <span>01</span>
              <div><strong>Think.</strong><small>Clarity before complexity.</small></div>
              <i>↗</i>
            </div>
            <div className="principle-card principle-build">
              <span>02</span>
              <div><strong>Build.</strong><small>Ideas made useful.</small></div>
              <i>↗</i>
            </div>
            <div className="principle-card principle-refine">
              <span>03</span>
              <div><strong>Refine.</strong><small>Better with every release.</small></div>
              <i>↗</i>
            </div>
            <div className="principle-signature">
              <span>Fennrise / Method</span>
              <b>Purpose in every detail.</b>
            </div>
          </div>
        </div>
      </section>

      <section className="section roadmap-section" id="roadmap">
        <div className="roadmap-intro reveal">
          <div className="eyebrow"><span /> The roadmap</div>
          <h2>What we&apos;re<br /><em>building next.</em></h2>
          <p>
            Fennrise is expanding into a connected ecosystem of products, software,
            voice AI, and services for work, communication, creation, and growth.
          </p>
        </div>
        <div className="timeline reveal">
          {roadmap.map((item, index) => (
            <div className={item.active ? "timeline-item active" : "timeline-item"} key={item.title}>
              <div className="timeline-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div className="timeline-copy">
                <span>{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="waitlist-section" id="waitlist">
        <div className="waitlist-glow" />
        <div className="waitlist-card reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="waitlist-logo" src="/fennrise-logo.png" alt="" />
          <div className="eyebrow centered"><span /> Fennrise early access</div>
          <h2>Ready for what&apos;s<br /><em>coming next?</em></h2>
          <p>
            Early access and development updates for Star, Relay, and the Fenn main app
            will open through the official Fennrise waitlist.
          </p>
          <a
            className="button button-gold"
            href="/waitlist"
          >
            Join the Waitlist <span>→</span>
          </a>
        </div>
      </section>

      <footer>
        <div className="footer-main">
          <div>
            <a href="#top" className="brand footer-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="brand-logo" src="/fennrise-logo.png" alt="" />
              <span>Fennrise</span>
            </a>
            <p>Products, software & experiences.<br />Beautifully built.</p>
          </div>
          <div className="footer-links">
            <div><span>Explore</span><a href="/products">Products</a><a href="#about">About</a><a href="#roadmap">Roadmap</a></div>
            <div><span>Products</span><a href="/products#star">Star</a><a href="/services#studio">Studio</a><a href="/products#fenn">Fenn</a><a href="/services#forge">Forge</a><a href="/products#relay">Relay</a></div>
            <div><span>Connect</span><a href="#waitlist">Instagram ↗</a><a href="#waitlist">LinkedIn ↗</a><a href="mailto:hello@fennrise.com">Email ↗</a></div>
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
