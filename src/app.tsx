import { useState } from "react";
import RegistrationForm from "./registration-form";

const PARTNER_LINKS = [
  { label: "AI for Impact", href: "https://burnes.northeastern.edu/ai-for-impact-coop/" },
  { label: "The Burnes Center for Social Change", href: "https://www.theburnescenter.org" },
  { label: "Reboot Democracy", href: "https://rebootdemocracy.ai" },
  { label: "The GovLab", href: "https://thegovlab.org" },
];

const NAV_LINKS = [
  { label: "Ways to Learn", expandable: true },
  { label: "Featured Topics", expandable: false },
  { label: "News & Perspectives", expandable: true },
  { label: "About Us", expandable: true },
];

function PartnerBar({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="partner-bar">
      <button
        className="partner-bar__toggle"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="partner-links"
      >
        <span className="partner-label">This is a partner project of :</span>
        <span className={`partner-bar__arrow ${open ? "partner-bar__arrow--open" : ""}`} aria-hidden="true">
          ↓
        </span>
      </button>
      <div id="partner-links" className={`partner-bar__links ${open ? "partner-bar__links--open" : ""}`}>
        {PARTNER_LINKS.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
            ↗ {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function ArrowDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 4 }}>
      <path d="M6 2v7M3 6.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function App() {
  const [partnerBarOpen, setPartnerBarOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [openNavSection, setOpenNavSection] = useState<string | null>(null);
  const [footerPartnerBarOpen, setFooterPartnerBarOpen] = useState(false);

  return (
    <>
      <PartnerBar open={partnerBarOpen} onToggle={() => setPartnerBarOpen((o) => !o)} />

      {/* Nav */}
      <header className="site-header">
        <div className="container header-inner">
          <a href="#">
            <img src="https://innovate-us.org/images/wordmark_light.svg" alt="InnovateUS" className="logo-img" />
          </a>

          {/* Desktop nav — always visible */}
          <nav className="main-nav main-nav--desktop">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href="#" style={{ display: "inline-flex", alignItems: "center" }}>
                {link.label} {link.expandable && <ArrowDown />}
              </a>
            ))}
          </nav>

          <a href="#" className="pill-btn pill-btn--outline main-nav__cta">
            Sign Up for Updates
          </a>

          {/* Mobile hamburger toggle */}
          <button
            className="hamburger"
            onClick={() => setNavOpen((open) => !open)}
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
            aria-label={navOpen ? "Close menu" : "Open menu"}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile nav — collapsible hamburger menu */}
      {navOpen && (
        <nav id="mobile-nav" className="mobile-nav">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="mobile-nav__item">
              <button
                className="mobile-nav__link"
                onClick={() =>
                  link.expandable ? setOpenNavSection((cur) => (cur === link.label ? null : link.label)) : undefined
                }
                aria-expanded={link.expandable ? openNavSection === link.label : undefined}
              >
                {link.label}
                {link.expandable && (
                  <span className={`mobile-nav__chevron ${openNavSection === link.label ? "mobile-nav__chevron--open" : ""}`}>
                    <ArrowDown />
                  </span>
                )}
              </button>
            </div>
          ))}
          <a href="#" className="pill-btn pill-btn--outline mobile-nav__cta">
            Sign Up for Updates
          </a>
        </nav>
      )}

      <main className="page">
        <div className="container">
          <p className="eyebrow">You will be registered to this session.</p>

          {/* Event summary card */}
          <section className="event-card" aria-label="Workshop details">
            <div className="event-card__banner">
              <img
                src="https://directus.theburnescenter.org/assets/55e9b688-fdda-42b5-8f4e-760686a76d17?width=50"
                alt="Practical Approaches to Evaluating AI for Public Benefit"
                className="event-card__icon"
              />
              <div>
                <p className="event-card__series">Series</p>
                <p className="event-card__series-title">
                  PRACTICAL APPROACHES TO EVALUATING AI FOR PUBLIC BENEFIT
                </p>
              </div>
            </div>
            <div className="event-card__body">
              <p className="event-card__kicker">Workshop</p>
              <h1 className="event-card__title">Comparing Humans, AI, and Human-AI Teams</h1>
              <div className="event-card__meta">
                <div>
                  <p>
                    <strong>Led by:</strong> Vera Liao, Amy Perez
                  </p>
                  <p>
                    <strong>Format:</strong> Online
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Date &amp; Time:</strong> September 22, 2026, 2:00 PM ET
                  </p>
                  <p>
                    <strong>Duration:</strong> 60 minutes
                  </p>
                </div>
              </div>
            </div>
          </section>

          <RegistrationForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-container">
          <div className="footer-col footer-col--left">
            <p className="footer-cta">
              Want to be a part of our community of innovators? <em>We'd love to keep in touch.</em>
            </p>
            <a href="#" className="pill-btn pill-btn--ghost footer-cta-btn">
              Join Our Mailing List
            </a>

            <a href="#" className="footer-logo-link">
              <img src="https://innovate-us.org/images/wordmark_dark.svg" alt="InnovateUS" className="logo-img logo-img--footer" />
            </a>

            <div className="footer-bottom-row">
              <div className="footer-links-col">
                <a href="#">Contact Us</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Accessibility Policy</a>
              </div>

              <div className="footer-follow-col">
                <p className="footer-label footer-label--follow">Follow Us On</p>
                <div className="social-icons">
                  <a href="#" aria-label="LinkedIn">
                    <img src="/icons/linkedin.png" alt="LinkedIn" />
                  </a>
                  <a href="#" aria-label="Bluesky">
                    <img src="/icons/bluesky.png" alt="Bluesky" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-col footer-col--right">
            <p className="footer-label footer-label--subscribe">
              <em>Subscribe</em> for Updates
            </p>
            <div className="subscribe-row">
              <input type="email" placeholder="Your Email" />
              <button type="button" className="pill-btn pill-btn--ghost">
                Subscribe
              </button>
            </div>
          </div>

          <p className="license-line">
            This work is licensed under a{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">
              Creative Commons Attribution-ShareAlike 4.0 International License
            </a>
            .
          </p>
        </div>
      </footer>
      <PartnerBar open={footerPartnerBarOpen} onToggle={() => setFooterPartnerBarOpen((o) => !o)} />
    </>
  );
}

export default App;