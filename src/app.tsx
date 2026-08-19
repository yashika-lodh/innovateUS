import RegistrationForm from "./registration-form";

function App() {
  return (
    <>
      {/* Top partner bar */}
      <div className="partner-bar">
        <span className="partner-label">This is a partner project of :</span>
        <a href="https://burnes.northeastern.edu/ai-for-impact-coop/" target="_blank" rel="noopener noreferrer">
          ↗ AI for Impact
        </a>
        <a href="https://www.theburnescenter.org" target="_blank" rel="noopener noreferrer">
          ↗ The Burnes Center for Social Change
        </a>
        <a href="https://rebootdemocracy.ai" target="_blank" rel="noopener noreferrer">
          ↗ Reboot Democracy
        </a>
        <a href="https://thegovlab.org" target="_blank" rel="noopener noreferrer">
          ↗ The GovLab
        </a>
      </div>

      {/* Nav */}
      <header className="site-header">
        <a className="logo" href="#">
          innovate<span className="logo-us">(us)</span>
        </a>
        <nav className="main-nav">
          <a href="#">Ways to Learn ⌄</a>
          <a href="#">Featured Topics</a>
          <a href="#">News &amp; Perspectives ⌄</a>
          <a href="#">About Us ⌄</a>
        </nav>
        <a href="#" className="pill-btn pill-btn--outline">
          Sign Up for Updates
        </a>
      </header>

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
          <a href="#" className="pill-btn pill-btn--ghost">
            Join Our Mailing List
          </a>

          <div className="footer-grid">
            <a className="logo logo--footer" href="#">
              innovate<span className="logo-us">(us)</span>
            </a>
          </div>

          <div className="footer-columns">
            <div>
              <a href="#">Contact Us</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Accessibility Policy</a>
            </div>
            <div>
              <p className="footer-label">Follow Us On</p>
              <div className="social-icons">
                <span aria-hidden="true">in</span>
                <span aria-hidden="true">🦋</span>
              </div>
            </div>
            <div>
              <p className="footer-label">
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
            This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;