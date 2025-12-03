import InviteCodeGate from '../components/InviteCodeGate'

function Download() {
  return (
    <main className="main-content">
      <div className="hero-section">
        <h2 className="coming-soon">Descarrega Ease In</h2>
        <p className="tagline">
          L'accés anticipat està disponible amb un codi d'invitació
        </p>
      </div>

      <InviteCodeGate />

      <div className="info-section">
        <p className="info-text">
          No tens un codi d'invitació? Uneix-te a la nostra llista d'espera per ser notificat quan l'accés públic estigui disponible!
        </p>
      </div>
    </main>
  )
}

export default Download
