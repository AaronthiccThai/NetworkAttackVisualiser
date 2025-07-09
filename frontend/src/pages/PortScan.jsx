import { useState } from "react"
import Xarrow from 'react-xarrows';

const PortScan = () => {


  // Simulate user as the hacker
  // User can click button to send a message to a range of port - packet 
  // They receive a response back from port - determine if its being used and any weakness that can be exploited
    // Open port: Port21 (FTP): Bruteforce password
    // Open port: Port 22 (SSH): Open - SSH-2.0-OpenSSH_7.4 - leaked ssh key
    // Filtered port:  Port23 (Tellnet) - Filtered - No response (timeout)
    // Open port: Port 80 (HTTP) - Leak data
    // Closed port: Port1234 : Connection refused

  // Organizations can implement firewalls, intrusion detection systems, 
  // and regular security audits to detect and prevent malicious port scanning attempts.   
  // Can do something like a protected port where when user tries to send packet to this it gets reflected?
  const [packets, setPackets] = useState([])
  const predefinedPorts = [21, 22, 23, 80, 1234];

  const simulatePortScan = async() => {
    setPackets([])
    const res = await fetch("http://localhost:5000/simulate/port-scan", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    setPackets(data.packet)
    console.log(data.packet)
  }
  const clear = () => {
    setPackets([])
  }
  const getPortClass = (result) => {
    if (!result) return "border-gray-300 bg-gray-100";

    switch (result.status) {
      case "open":
        return "border-green-500 bg-green-100";
      case "closed":
        return "border-red-500 bg-red-100";
      case "filtered":
        return "border-yellow-500 bg-yellow-100";
      default:
        return "border-gray-300 bg-gray-100";
    }
  };

  return (
    <>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 mb-4">
        <div>
          <p className="font-bold">What is Port scanning?</p>
          <p>
            It is a process of probing a computer network to determine which ports are open and potentially accepting connections.
            It involves sending packets to multiple ports on a target system and then analysing its response to identify open, closed or filtered ports.
          </p>
          <p className="mt-2">
            Each port can respond in one of the following ways:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Open:</strong> The port is active and accepting connections.
              This means a service (like a web server or database) is running and reachable. Attackers may target these for vulnerabilities.
            </li>
            <li>
              <strong>Closed:</strong> The port is accessible but no service is listening on it. 
              It confirms the system is reachable, but that specific port isn’t currently in use.
            </li>
            <li>
              <strong>Filtered:</strong> The port appears blocked by a firewall or security device. 
              The scanner receives no response or an error, making it hard to tell whether the port is open or closed.
            </li>
          </ul>
          <p className="mt-2">
            Port scanning is commonly used by security professionals to identify and secure vulnerable entry points, 
            but it is also used by attackers during the reconnaissance phase of a cyberattack.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 mt-6">
        {/* Attacker Info */}
        <div className="w-full text-center content-center">
          <h2 id="attacker" className="text-xl font-bold mb-2 inline-block" >🧑‍💻 Attacker</h2>
          <p>Source IP: 10.0.0.5</p>
          <p className="text-sm text-gray-600 mt-2 italic">
            Let the simulation run completely before resetting to ensure accurate results.
          </p>            
          <button
            onClick={simulatePortScan}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow mt-4"
          >
            🚀 Start Port Scanning
          </button>
          <button
            onClick={clear}
            className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded shadow"
          >
            🧹 Clear
          </button>            
        </div>

        {/* Ports */}
        <div className="flex flex-col gap-4">
          {predefinedPorts.map((port) => {
            const result = packets.find((p) => p.port === port);
            const id = `port-${port}`
            return (
              <div key={port} id={id} className={`border-2 p-4 rounded shadow ${getPortClass(result)}`}>
                <h3 className="font-bold text-lg">Port {port}</h3>
                {result ? (
                  <>
                    <p><strong>Status:</strong> {result.status}</p>
                    <p><strong>Info:</strong> {result.info}</p>
                  </>
                ) : (
                  <p className="text-gray-600">⏳ Not scanned yet</p>
                )}
                {result && <Xarrow start="attacker" end={id} />}
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default PortScan
