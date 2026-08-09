"use client";

import { useEffect, useState } from "react";

const products = [
  {
    number: "01",
    name: "Star",
    line: "Talk. Create. Solve.",
    description:
      "An intelligent assistant designed for useful conversations, clear thinking, and faster creation.",
    features: ["Conversations", "Writing", "Research", "Coding", "Everyday tasks"],
    visual: "star",
    status: "In development",
  },
  {
    number: "02",
    name: "Studio",
    line: "Design. Build. Launch.",
    description:
      "Digital experiences built with sharp strategy, thoughtful design, and production-ready technology.",
    features: ["Web design", "UI/UX", "Branding", "Web apps", "Landing pages"],
    visual: "studio",
    status: "Launched",
  },
  {
    number: "03",
    name: "Fenn",
    line: "Plan. Focus. Achieve.",
    description:
      "Our main productivity app, built to turn ambitious plans into focused, consistent progress.",
    features: ["Planner", "Focus Mode", "Goals", "Habits", "Opportunities", "Insights"],
    visual: "fenn",
    status: "In development",
  },
];

const roadmap = [
  { date: "Launched", title: "Fennrise Studio", text: "Premium design and development services.", active: true },
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
          <a href="#products" onClick={() => setMenuOpen(false)}>Products</a>
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
            Creating intelligent digital products that help people work smarter,
            build faster, and achieve more.
          </p>
          <div className="hero-actions">
            <a className="button button-gold" href="#products">
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
          <span>Technology · Design · Intelligence</span>
          <a href="#products" aria-label="Scroll to products"><i>↓</i> Scroll to explore</a>
        </div>
      </section>

      <section className="section products-section" id="products">
        <div className="section-heading reveal">
          <div>
            <div className="eyebrow"><span /> Our products</div>
            <h2>Ideas, turned into<br /><em>useful products.</em></h2>
          </div>
          <p>
            One ecosystem of carefully designed tools, created to help people do
            meaningful work with less friction.
          </p>
        </div>

        <div className="product-showcase">
          {products.map((product, index) => (
            <article className={`product-row reveal ${index % 2 === 1 ? "reverse" : ""}`} key={product.name}>
              <div className="product-row-copy">
                <div className="product-row-meta">
                  <span>{product.number} / 03</span>
                  <span className={product.status === "Launched" ? "status launched" : "status"}>
                    <i /> {product.status}
                  </span>
                </div>
                <h3>{product.name}</h3>
                <h4>{product.line}</h4>
                <p>{product.description}</p>
                <div className="tags">
                  {product.features.map((feature) => <span key={feature}>{feature}</span>)}
                </div>
                <span className="product-word" aria-hidden="true">{product.name}</span>
              </div>

              <div className="product-stage">
                <div className={`product-visual ${product.visual}`} aria-hidden="true">
                  {product.visual === "fenn" && (
                    <div className="fenn-window">
                      <div className="window-bar"><i /><i /><i /><span>Today</span></div>
                      <div className="window-body">
                        <div className="mini-greeting">Good morning.</div>
                        <div className="progress-row"><span>Daily progress</span><b>72%</b></div>
                        <div className="progress"><i /></div>
                        <div className="task"><i>✓</i><span>Plan the next milestone</span></div>
                        <div className="task"><i /><span>45 min focus session</span></div>
                      </div>
                    </div>
                  )}
                  {product.visual === "star" && (
                    <div className="star-core">
                      <i className="ray ray-1" /><i className="ray ray-2" />
                      <i className="ray ray-3" /><i className="ray ray-4" />
                      <b>✦</b>
                    </div>
                  )}
                  {product.visual === "studio" && (
                    <div className="studio-windows">
                      <div className="studio-window back"><span /><i /><i /></div>
                      <div className="studio-window front">
                        <span /><div className="studio-copy"><b /><i /><i /></div>
                        <div className="studio-block" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="manifesto" id="about">
        <div className="manifesto-content reveal">
          <div className="eyebrow"><span /> About Fennrise</div>
          <div className="about-lead-grid">
            <p className="manifesto-lead">
              Technology should feel <em>powerful,</em><br />
              not complicated.
            </p>
          </div>

          <div className="about-principles">
            <div>
              <span>01</span>
              <h3>Solve real problems.</h3>
              <p>Every idea begins with a genuine need—not a passing trend.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Make it clear.</h3>
              <p>Thoughtful design keeps powerful technology simple to use.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Keep improving.</h3>
              <p>We build, listen, refine, and move every product forward.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-minimal" id="why">
        <div className="why-minimal-inner">
          <div className="why-minimal-copy reveal">
            <span>Fennrise / Our approach</span>
            <h2>Thoughtful technology,<br /><em>made useful.</em></h2>
            <p>Focused digital products for clearer work and everyday progress.</p>
            <div className="why-steps" aria-label="Our approach">
              <span>Think</span><i />
              <span>Build</span><i />
              <span>Refine</span>
            </div>
          </div>

          <div className="why-line-art reveal delay-2" aria-hidden="true">
            <svg viewBox="0 0 620 440" role="presentation">
              <path className="signal-path signal-base" d="M22 342 C116 342 117 101 223 101 C326 101 306 308 407 308 C493 308 489 150 598 150" />
              <path className="signal-path signal-moving" d="M22 342 C116 342 117 101 223 101 C326 101 306 308 407 308 C493 308 489 150 598 150" />
              <path className="signal-guide" d="M22 390 H598 M22 52 H598" />
              <circle className="signal-node" cx="22" cy="342" r="6" />
              <circle className="signal-node signal-node-gold" cx="223" cy="101" r="8" />
              <circle className="signal-node" cx="407" cy="308" r="6" />
              <circle className="signal-node signal-node-gold" cx="598" cy="150" r="8" />
            </svg>
            <span className="signal-label signal-think"><i /> Think</span>
            <span className="signal-label signal-build"><i /> Build</span>
            <span className="signal-label signal-refine"><i /> Refine</span>
            <b className="signal-index">01—03</b>
          </div>
        </div>
      </section>

      <section className="section roadmap-section" id="roadmap">
        <div className="roadmap-intro reveal">
          <div className="eyebrow"><span /> The roadmap</div>
          <h2>What we&apos;re<br /><em>building next.</em></h2>
          <p>
            Fennrise is starting with focus—and expanding into a connected
            ecosystem of products for work, creation, and growth.
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
            Early access to Star and the Fenn main app will open through the
            official Fennrise waitlist.
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
            <p>Intelligent products.<br />Beautifully built.</p>
          </div>
          <div className="footer-links">
            <div><span>Explore</span><a href="#products">Products</a><a href="#about">About</a><a href="#roadmap">Roadmap</a></div>
            <div><span>Products</span><a href="#products">Star</a><a href="#products">Studio</a><a href="#products">Fenn</a></div>
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
