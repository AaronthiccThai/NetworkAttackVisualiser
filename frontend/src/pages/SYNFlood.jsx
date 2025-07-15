import { useState  } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from 'recharts';

const SYNFlood = () => {
  const [packets, setPackets] = useState([])
  const [serverConnections, setServerConnections] = useState([])
  const [attackLog, setAttackLog] = useState([])
  const [connectionData, setConnectionData] = useState()    
  const generateMimicData = () => {
    const fullData = []
    // MAGIC NUMBERS GOOD CODING PRACTICE IS TO INITIALISE
    for (let i = 0; i < 5; i++) {
      fullData.push({ time: i, connections: Math.floor(Math.random() * 3) + 2 })
    }
    for (let i = 5; i < 50; i++) {
      fullData.push({ time: i, connections: Math.floor(Math.random() * 5) + 17 })
    }
    for (let i = 40 ; i < 60; i++) {
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
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 mb-4">
      <div>
        <p className="font-bold">What is a SYN Flood?</p>
        <ul className="list-disc list-inside text-sm">
          <li>It’s a type of DoS attack that sends many SYN requests to a server.</li>
          <li>The attacker never completes the TCP handshake, leaving connections "half-open".</li>
          <li>This exhausts server resources, making it unavailable to legitimate users.</li>
          <li>It is like leaving a person on red when they were conversing with you</li>
        </ul>
      </div>      
      <div>
        <p className="font-bold">What is a TCP connection?</p>
        <p>
          A <strong>TCP connection</strong> is a reliable way for two computers to communicate over a network. 
          It is established using a 3-step process called the TCP 3-Way Handshake:          
        </p>
        <ul className="list-decimal list-inside text-sm mt-2">
          <li><strong>SYN:</strong> The client sends a request to start the connection.</li>
          <li><strong>SYN-ACK:</strong> The server acknowledges the request and responds.</li>
          <li><strong>ACK:</strong> The client confirms, and the connection is established.</li>
        </ul>         

        <p className="text-sm mt-2">
          After this handshake, both devices can exchange data reliably. 
          A SYN flood disrupts this process by spamming SYN requests but never sending the final ACK, 
          which overwhelms the server’s capacity to handle new connections.
        </p>        
      </div>          
      <div>
        <p className="font-bold">How to prevent SYN Flooding?</p>
        <p>
          Preventing SYN Flooding is important due to the nature of this attack. It sends a massive amount of
          fake connection request to a server and the server has to respond back which would consume memory and CPU resources.
          This would consequently slow down these networks and could cause them to become unusuable or unresponsive. Downtime of websites, apps
          and APIs would disrupt business - lost of customers, revenue and public's trust.
          <br></br>
          Some prevention methods include:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            <strong> SYN Cookies: </strong> Enabling SYN cookies prevents the server from allocating resources until the TCP handshake is completed
          </li>
          <li>
            <strong> Firewall Rules: </strong> Limit the amount of half open connections from a single IP address
          </li>

          <li> 
            <strong> TCP connection timeout:</strong> Reduce how long the server waits for the handshake to complete. 
          </li>
          <li>
            <strong> Cloud based DDos Protection:</strong> Services like cloudflare, AWS shield detect and mitigate SYN floods
          </li>
        </ul>
      </div>
    </div>    
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
          
    </div>    
    <InteractivePanel/>

  </>    
  )
}

const InteractivePanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSYNFlood, sethasSYNFlood] = useState(false);

  const handleStartFlood = () => {
    sethasSYNFlood(true);
  };

  const handleStopFlood = () => {
    sethasSYNFlood(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (hasSYNFlood) {
      setTimeout(() => {
        alert("Registered successfully!");
        setIsSubmitting(false);
        setUsername("");
        setPassword("");
      }, 20000);
    } else {
      setTimeout(() => {
        alert("Registered successfully!");
        setIsSubmitting(false);
        setUsername("");
        setPassword("");
      }, 2000);
    } 
  };

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setIsSubmitting(false);
    sethasSYNFlood(false);
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        🚀 Interactive Feature
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center my-10 px-4 max-w-5xl mx-auto">
        <div className="bg-red-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-red-800">🧑‍💻 Attacker</h2>
          <button
            onClick={handleStartFlood}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded mr-2"
          >
            Start SYN Flooding
          </button>
          <button
            onClick={handleStopFlood}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          >
            Stop SYN Flooding
          </button>
        </div>

        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-green-800">🧍User</h2>
          <label> Register </label>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting}
              className="border p-1 text-sm mr-2 mb-2"
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="border p-1 text-sm mr-2 mb-2"
            />
            <div className="space-x-2 mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-3 py-1 rounded text-sm text-white ${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
              >
                Reset
              </button>
            </div>
          </form>
          {hasSYNFlood && (
            <p className="text-sm text-red-600 mt-2 italic">
              ⚠️ There is a lot of traffic. Please be patient.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SYNFlood