import { useState, useEffect } from 'react';

const DNSTunnel = () => {
  const [packets, setPackets] = useState([])
  const [serverConnections, setServerConnections] = useState([])
  const [attackLog, setAttackLog] = useState([])
  const [connectionData, setConnectionData] = useState()    

  const simulateDNSTunnel = async () => {
    const res = await fetch("http://localhost:5000/simulate/dns-tunnel", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})    
    })
    const data = await res.json()
    const synPackets = data.packets

  }
  return (
    <>
    
    </>
  )
}

export default DNSTunnel
