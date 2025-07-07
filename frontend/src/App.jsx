import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SYNFlood from './pages/SYNFlood'
import Navbar from './pages/Navbar'
import './index.css'
import DNSTunnel from './pages/DNSTunnel'
import PortScan from './pages/PortScan'
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/synflood" element={<SYNFlood />} />
        <Route path="/dnstunnel" element={<DNSTunnel/>} />
        <Route path="/portscan" element={<PortScan/>} />
      </Routes>
    </Router>
  )
}

export default App
