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
            Think of it as a robber walking around the neighbour checking for unlocked doors. If there is an unlocked door, they can prepare to enter the house
            and start a robbery.
          </p>
          <p className="font-bold">What is Port?</p>
          <p>
            A port is a virtual point where network connections start and end. 
            Ports are used to identify specific processes or services running on a device. Each port is associated with a unique number, 
            ranging from 0 to 65535.
            For example, port 80 is typically used for HTTP (web) traffic, and port 443 is used for HTTPS (secure web) traffic.
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

          <p className="font-bold">Consequences of being Port scanned?</p>
          <p> The severity of a Port scan is between low to medium. Port scanning alone doesn’t cause damage, but it’s an important 
            early stage attack that leads to more serious threats if not monitored or blocked. Port scanning reveals open ports, running services
            and potential vulnerabilities. Hackers can then prepare for more exploits such as bruteforcing password, delivering malware
            on these open ports depending on its response.
          </p>
          <p className="font-bold">How to prevent Port Scanning?</p>

          <p>
            While we can't completely stop port scanning, there are several strategies to reduce their effectiveness and occurence:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Use Firewalls:</strong> Configure firewalls to block or filter unused ports and 
              restrict access based on IP address or traffic type.
            </li>
            <li><strong>Disable Unused Services:</strong> Turn off services that aren’t 
              necessary to reduce the number of open ports.
            </li>
            <li><strong>Enable Port Knocking:</strong> A technique where ports remain closed 
              unless a user sends a specific sequence of packets to “unlock” them.
            </li>
          </ul>                
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

        {/* Ports 
          Each port is associated with its functionality, hence the type of attack 
          Port 21: used for transferring  file
          Port 22: provides encrypted remote login
          Port 23: remote login not secure
          Port 80: accessing website
          Port 1234: Other
        */}
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
                    {result.status === 'open' && port === 21 && (
                      <button
                        onClick={() => alert("Password: admin123")}
                        className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      >
                        Attempt FTP Bruteforce
                      </button>
                    )}

                    {result.status === 'open' && port === 22 && (
                      <button
                        onClick={() => alert("SSH Key: ssh-rsa DAzcBdrAvbCasdBASsfsdgG")}
                        className="mt-2 bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 text-sm"
                      >
                        Find SSH Key
                      </button>
                    )}

                    {result.status === 'open' && port === 80 && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          alert("username=admin password=1234 sessionToken=AfkgGhjkzx");
                        }}
                        className="mt-2"
                      >
                        <input
                          type="text"
                          placeholder="Enter username"
                          className="border p-1 text-sm mr-2"
                        />
                        <input
                          type="password"
                          placeholder="Enter password"
                          className="border p-1 text-sm mr-2"
                        />
                        <button type="submit" className="bg-green-600 text-white px-2 py-1 rounded text-sm">
                          Submit
                        </button>
                      </form>
                    )}               

                    {result.status === 'filtered' && (
                      <h2 className="text-red-800">Connection timed out</h2>
                    )}     

                    {result.status === 'closed' && (
                      <h2 className="text-red-800"> Connection refused</h2>
                    )}
                  </>
                ) : (
                  <p className="text-gray-600"> Not scanned yet</p>
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
