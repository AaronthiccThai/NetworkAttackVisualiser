import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SYNFlood from './pages/SYNFlood'
import Navbar from './pages/Navbar'
import './index.css'
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/synflood" element={<SYNFlood />} />
      </Routes>
    </Router>
  )
}

export default App
