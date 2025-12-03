import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Download from './pages/Download'

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="landing-page">
        <div className="container">
          <header className="header">
            <Link to="/" className="logo-link">
              <h1 className="logo">EaseIn</h1>
            </Link>
          </header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/download" element={<Download />} />
          </Routes>

          <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Ease In. Tots els drets reservats.</p>
          </footer>
        </div>
      </div>
    </Router>
  )
}

export default App
