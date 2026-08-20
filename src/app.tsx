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

function App() {
  const [partnerBarOpen, setPartnerBarOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [openNavSection, setOpenNavSection] = useState<string | null>(null);
  const [footerPartnerBarOpen, setFooterPartnerBarOpen] = useState(false);

  return (
    <>
      {/* Top partner bar — collapsible, matches reference site's expand/collapse behavior */}
      {/* <div className="partner-bar">
        <button
          className="partner-bar__toggle"
          onClick={() => setPartnerBarOpen((open) => !open)}
          aria-expanded={partnerBarOpen}
          aria-controls="partner-links"
        >
          <span className="partner-label">This is a partner project of :</span>
          <span className={`partner-bar__arrow ${partnerBarOpen ? "partner-bar__arrow--open" : ""}`} aria-hidden="true">
            ↓
          </span>
        </button>
        <div id="partner-links" className={`partner-bar__links ${partnerBarOpen ? "partner-bar__links--open" : ""}`}>
          {PARTNER_LINKS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
              ↗ {link.label}
            </a>
          ))}
        </div>
      </div> */}

      <PartnerBar open={partnerBarOpen} onToggle={() => setPartnerBarOpen((o) => !o)} />

      {/* Nav */}
      <header className="site-header">
        <a href="#">
          <img src="https://innovate-us.org/images/wordmark_light.svg" alt="InnovateUS" className="logo-img" />
        </a>

        {/* Desktop nav — always visible */}
        <nav className="main-nav main-nav--desktop">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href="#">
              {link.label} {link.expandable ? "⌄" : ""}
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
                    ↓
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
              <span className="event-card__icon" aria-hidden="true">
                📋
              </span>
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
        <div className="container">
          <p className="footer-cta">
            Want to be a part of our community of innovators? <em>We'd love to keep in touch.</em>
          </p>
          <a href="#" className="pill-btn pill-btn--ghost footer-cta-btn">
            Join Our Mailing List
          </a>

          <div className="footer-grid">
            <a href="#">
              <img src="https://innovate-us.org/images/wordmark_dark.svg" alt="InnovateUS" className="logo-img logo-img--footer" />
            </a>
          </div>

          <div className="footer-columns">
            <div>
              <a href="#">Contact Us</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Accessibility Policy</a>
            </div>
            <div>
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
            <div>
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
      <div className="footer-bottom-bar"/>
      <PartnerBar open={footerPartnerBarOpen} onToggle={() => setFooterPartnerBarOpen((o) => !o)} />

    </>
  );
}

export default App;