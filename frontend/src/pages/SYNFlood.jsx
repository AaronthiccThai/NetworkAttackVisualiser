import { useState, useEffect } from 'react';

const SYNFlood = () => {
  const [packets, setPackets] = useState([])
  const [serverConnections, setServerConnections] = useState([])
  const [attackLog, setAttackLog] = useState([])

  const simulateSYNFloodVisual = async () => {
    setPackets([])
    setAttackLog([])
    setServerConnections([])

    const res = await fetch("http://localhost:5000/simulate/syn-flood", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
    const data = await res.json()
    const synPackets = data.packets

    let i = 0
    const interval = setInterval(() => {
      const packet = synPackets[i++]
      setPackets(prev => [...prev, packet])

      setAttackLog(prev => [...prev, `🚀 SYN sent from ${packet.src_ip} to ${packet.dst_ip}`])
      setServerConnections(prev => [...prev, {
        src: packet.src_ip,
        dst: packet.dst_ip,
        status: 'waiting for ACK',
        startTime: Date.now()
      }])
      setAttackLog(prev => [...prev, `🧠 Server opens half-connection to ${packet.src_ip}, waiting for ACK`])
      setAttackLog(prev => [...prev, `❌ ACK from ${packet.src_ip} never arrives`])

      if (i === synPackets.length || serverConnections.length >= 15) {
        setAttackLog(prev => [...prev, `⚠️ Server is overwhelmed with half-open connections!`])
        clearInterval(interval)
      }
    }, 1000)
  }

  const clear = () => {
    setAttackLog([])
    setPackets([])
    setServerConnections([])
  }
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded shadow h-96 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">📦 Packets</h2>
        <ul className="space-y-1 text-sm">
          {packets.map((packet, index) => (
            <li key={index} className="text-gray-800">
              <strong>{packet.protocol}</strong> | {packet.src_ip} → {packet.dst_ip} | {packet.info}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow h-96 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">🖥️ Server Half-Open Connections</h2>
        {serverConnections.map((conn, index) => (
          <div key={index} className="text-sm text-gray-800 mb-1">
            {conn.src} → {conn.dst} ({conn.status})
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow h-96 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">📜 Attack Narrative</h2>
        <ul className="space-y-1 text-sm text-gray-800">
          {attackLog.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>    
  )
}
export default SYNFlood