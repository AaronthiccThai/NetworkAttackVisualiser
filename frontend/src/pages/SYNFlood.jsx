import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from 'recharts';

const SYNFlood = () => {
  const [packets, setPackets] = useState([])
  const [serverConnections, setServerConnections] = useState([])
  const [attackLog, setAttackLog] = useState([])
  const [connectionData, setConnectionData] = useState()    

  const generateMimicData = () => {
    const fullData = []

    for (let i = 0; i < 5; i++) {
      fullData.push({ time: i, connections: Math.floor(Math.random() * 3) + 2 })
    }
    for (let i = 5; i < 40; i++) {
      fullData.push({ time: i, connections: Math.floor(Math.random() * 5) + 17 })
    }
    for (let i = 50; i < 60; i++) {
      fullData.push({ time: i, connections: Math.floor(Math.random() * 3) + 2 })
    }

    let index = 0
    const interval = setInterval(() => {
      setConnectionData(prev => [...(prev || []), fullData[index]])
      index++
      if (index >= fullData.length) clearInterval(interval)
    }, 200)
  }
  const simulateSYNFloodVisual = async () => {
    setPackets([])
    setAttackLog([])
    setServerConnections([])
    setConnectionData([])
    generateMimicData()       
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
    setConnectionData([])
  }

  return (
  <>
    <div className="w-full text-center my-4">
      <button
        onClick={simulateSYNFloodVisual}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
      >
        🚀 Start SYN Flood Simulation
      </button>
      <button
        onClick={clear}
        className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded shadow"
      >
        🧹 Clear
      </button>   
      <p className="text-sm text-gray-600 mt-2 italic">
        Let the simulation run completely before resetting to ensure accurate results.
      </p>      
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded shadow h-96 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">📦 Packets</h2>
        <ul className="space-y-1 text-sm">
          {packets.map((packet, index) => (
            <li key={index} className="text-gray-800">
              <strong>{packet.protocol}</strong> | {packet.src_ip} <span className="text-red-600">(Attacker)</span> → {packet.dst_ip} 
              <span className="text-green-600">(Target Server)</span> | {packet.info}
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

      <div className="bg-white p-4 rounded shadow col-span-full h-80">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">📈 Connections Over Time</h2>
        <ResponsiveContainer width="80%" height="100%">
          <LineChart data={connectionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 25]} />
            <Tooltip />
            <Line type="monotone" dataKey="connections" stroke="#3182ce" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>  

      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 mb-4">
        <div>
          <p className="font-bold">What is a SYN?</p>
          <p>
            A <strong>SYN</strong> (synchronize) packet is the first step in establishing a TCP connection. 
            The client sends it to the server to say: “I want to start a conversation.”
          </p>
        </div>

        <div>
          <p className="font-bold">What is a SYN-ACK?</p>
          <p>
            A <strong>SYN-ACK</strong> is the server’s reply to the client’s SYN. 
            It acknowledges the request and sends back its own SYN: “Got it. I’m ready to talk too.”
          </p>
        </div>

        <div>
          <p className="font-bold">What is an ACK?</p>
          <p>
            An <strong>ACK</strong> (acknowledgment) is the final step. 
            The client replies with this to confirm the handshake: “Cool, we’re connected now.”
          </p>
        </div>
        <p className="font-bold">What is a SYN Flood?</p>
        <ul className="list-disc list-inside text-sm">
          <li>It’s a type of DoS attack that sends many SYN requests to a server.</li>
          <li>The attacker never completes the handshake, leaving connections "half-open".</li>
          <li>This exhausts server resources, making it unavailable to legitimate users.</li>
          <li>It is like leaving a person on red when they were conversing with you</li>
        </ul>
      </div>      
    </div>    
  </>    
  )
}
export default SYNFlood