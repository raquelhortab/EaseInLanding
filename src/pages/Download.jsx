import InviteCodeGate from '../components/InviteCodeGate'

function Download() {
  return (
    <main className="main-content">
      <div className="hero-section">
        <h2 className="coming-soon">Download Ease In</h2>
        <p className="tagline">
          Early access is available with an invite code
        </p>
      </div>

      <InviteCodeGate />

      <div className="info-section">
        <p className="info-text">
          Don't have an invite code? Join our waitlist to be notified when public access is available!
        </p>
      </div>
    </main>
  )
}

export default Download
