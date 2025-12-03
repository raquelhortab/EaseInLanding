function Home() {
  const waitlistEmail = import.meta.env.VITE_WAITLIST_EMAIL || 'hello@example.com'
  const subject = encodeURIComponent('Unir-me a la llista d\'espera d\'Ease In')
  const body = encodeURIComponent(`Hola,

Estic interessat/ada en unir-me a la llista d'espera d'Ease In!

Si us plau, notifiqueu-me quan l'aplicació estigui disponible.

Gràcies!`)

  const mailtoLink = `mailto:${waitlistEmail}?subject=${subject}&body=${body}`

  return (
    <main className="main-content">
      <div className="hero-section">
        <h2 className="coming-soon">Molt Aviat</h2>
        <p className="tagline">
          Alguna cosa increïble està en camí. Estigueu atents!
        </p>
      </div>

      <div className="screenshot-section">
        <div className="screenshot-placeholder">
          <img
            src={`${import.meta.env.BASE_URL}screenshot.png`}
            alt="Vista prèvia d'Ease In"
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
            <p>Vista prèvia de l'aplicació</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <p className="waitlist-text">
          Sigues el primer a saber quan llancem
        </p>
        <a
          href={mailtoLink}
          className="waitlist-button"
        >
          Uneix-te a la llista d'espera
        </a>
      </div>
    </main>
  )
}

export default Home
