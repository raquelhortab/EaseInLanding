import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Download from './pages/Download'

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="landing-page">
        <div className="container">
          <header className="header">
            <h1 className="logo">Ease In</h1>
          </header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/download" element={<Download />} />
          </Routes>

          <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Ease In. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </Router>
  )
}

export default App
