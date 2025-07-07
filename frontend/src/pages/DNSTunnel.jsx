import { useState, useEffect } from 'react';

const DNSTunnel = () => {
  const [packets, setPackets] = useState([])
  const [currentStep, setCurrentStep] = useState(-1)
  const [animationInterval, setAnimationInterval] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const stepMessages = [
    `🧑‍💻 The attacker registers a seemingly harmless domain like evil.tunnel.attacker.com.
    This domain is set up to covertly tunnel data using DNS queries. 
    This step lays the groundwork for evading security systems by hiding in normal-looking traffic.`,

    `🌐 The attacker crafts a DNS query to the evil domain. 
      This query contains hidden or encoded data meant to reach the attacker's command server. 
      It looks like a regular DNS request, which most systems don’t block.`,

    `✅ The trusted DNS server receives the query and, unaware of its malicious intent, resolves it like any other domain. 
      Because it's doing its job, it forwards the request through normal DNS resolution chains.`,

    `🧱 The firewall sees traffic coming from a trusted DNS server and allows it to pass. 
      Since DNS is a common, allowed protocol, no alarms are triggered. This is how DNS tunneling bypasses most firewalls undetected.`,

    `☁️ The attacker's Command & Control server receives the DNS query and decodes the hidden message. 
      It may respond with a DNS reply that also contains embedded commands to control the victim's system.`,

    `🧍 The victim device receives instructions from the attacker's server (via DNS replies). 
      This could include actions like data exfiltration or executing payloads — all hidden within allowed DNS traffic.`
  ];

  const sectionInfo = [
    "Attacker would be someone like a hacker",
    "Evil domain would be a suspicious website such as evilwebsite.com or sussy.org",
    "A trusted DNS server translates domain names like google.com into its IP addresses so computers can find each other the internet.",
    "A firewall is a security system inbuilt in most modern computers. It monitors and controls incoming and outgoing network traffic",
    "Communication channel between the attacker and the comprised system. Attackers use this server to send command and receive data back",
    "The victim or comprised system which is connected via the Command and Control (C2)"
  ]
  // MAKE SIMULATON A BIT BETTER LIKE MYBE USE ARROWS OR SMTH
  const simulateDNSTunnel = async () => {
    setCurrentStep(-1)
    setPackets([])
    const res = await fetch("http://localhost:5000/simulate/dns-tunnel", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json()
    const receivedPackets = data.packets
    setPackets(receivedPackets)
    console.log(receivedPackets)
    let step = 0
    const interval = setInterval(() => {
      setCurrentStep(step)
      step++
      if (step > 5) {
        clearInterval(interval)
        setAnimationInterval(null)
      }
    }, 4000)

    setAnimationInterval(interval)
  }


  const clear = () => {
    if (animationInterval) clearInterval(animationInterval)
    setCurrentStep(-1)
    setPackets([])
  }


  // Idea is to have different sections, have a packet travel through each section to simulate
  return (
    <>
      <div className="w-full text-center my-4">
        <button
          onClick={simulateDNSTunnel}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          🚀 Start DNS Tunneling Simulation
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
      <div className="grid grid-cols-6 gap-4 text-center my-10">
        {[
          '🧑‍💻 Attacker',
          '🌐 Evil Domain',
          '✅ Trusted DNS Server',
          '🧱 Firewall',
          '☁️ Command & Control',
          '🧍 Victim'
        ].map((label, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative p-4 rounded h-28 flex items-center justify-center transition-all duration-300 ${
              currentStep === index ? 'bg-green-300 scale-105 shadow-lg' : 'bg-gray-100'
            } hover:bg-blue-200 hover:cursor-pointer`}
          >
            {label}
            {hoveredIndex === index && (
              // MIGHT HAVE TO ADJUST FOR VIEWPORT
            <div
              className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm rounded px-2 py-1 
              max-w-[400px] z-10 shadow-lg"
              style={{ whiteSpace: 'normal' }}
            >
              {sectionInfo[index]}
            </div>

            )}
          </div>
        ))}
      </div>
      <div className="text-4xl font-bold text-gray-800 mb-4"> 🧠 Attack log</div>
      <div className="mt-4 p-4 text-2xl bg-gray-100 rounded text-gray-700 italic">
        {currentStep >= 0 ? stepMessages[currentStep] : "Press start to begin simulation"}
      </div>      
    </>
  )
}

export default DNSTunnel
