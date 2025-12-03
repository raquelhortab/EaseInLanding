function Home() {
  const waitlistEmail = import.meta.env.VITE_WAITLIST_EMAIL || 'hello@example.com'
  const subject = encodeURIComponent('Join Ease In Waitlist')
  const body = encodeURIComponent(`Hi there,

I'm interested in joining the Ease In waitlist!

Please notify me when the app is available.

Thanks!`)

  const mailtoLink = `mailto:${waitlistEmail}?subject=${subject}&body=${body}`

  return (
    <main className="main-content">
      <div className="hero-section">
        <h2 className="coming-soon">Coming Soon</h2>
        <p className="tagline">
          Something amazing is on the way. Stay tuned!
        </p>
      </div>

      <div className="screenshot-section">
        <div className="screenshot-placeholder">
          <img
            src={`${import.meta.env.BASE_URL}screenshot.png`}
            alt="Ease In App Preview"
            className="app-screenshot"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextElementSibling.style.display = 'flex'
            }}
          />
          <div className="screenshot-fallback" style={{ display: 'none' }}>
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <p>App Preview</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <p className="waitlist-text">
          Be the first to know when we launch
        </p>
        <a
          href={mailtoLink}
          className="waitlist-button"
        >
          Join the Waitlist
        </a>
      </div>
    </main>
  )
}

export default Home
