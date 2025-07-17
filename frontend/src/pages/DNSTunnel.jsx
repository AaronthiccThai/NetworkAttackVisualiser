import { useState  } from 'react';
import Xarrow from 'react-xarrows';

const DNSTunnel = () => {
  const [currentStep, setCurrentStep] = useState(-1)
  const [animationInterval, setAnimationInterval] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const stepMessages = [
    `The attacker registers a seemingly harmless domain like evil.tunnel.attacker.com.
      This domain is set up to covertly tunnel data using DNS queries. 
      This step lays the groundwork for evading security systems by hiding in normal-looking traffic.`,

    `The attacker crafts a DNS query to the evil domain. 
      This query contains hidden or encoded data meant to reach the attacker's command server. 
      It looks like a regular DNS request, which most systems don’t block.`,

    `The trusted DNS server receives the query and, unaware of its malicious intent, resolves it like any other domain. 
      Because it's doing its job, it forwards the request through normal DNS resolution chains.`,

    `The firewall sees traffic coming from a trusted DNS server and allows it to pass. 
      Since DNS is a common, allowed protocol, no alarms are triggered. This is how DNS tunneling bypasses most firewalls undetected.`,

    `The attacker's Command & Control server receives the DNS query and decodes the hidden message. 
      It may respond with a DNS reply that also contains embedded commands to control the victim's system.`,

    `The victim device receives instructions from the attacker's server (via DNS replies). 
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
  const [attackerDomain, setAttackerDomain] = useState("")
  const [commandInput, setCommandInput] = useState("")
  const [victimSite, setVictimSite] = useState("")
  const [benignDomains] = useState([
    'google.com',
    'unsw.edu.au',
    'github.com',
    'cloudflare.com',
    'microsoft.com'
  ]);

  const combinedDomains = attackerDomain
    ? [...benignDomains, attackerDomain]
    : benignDomains;

  const [wasAttacked, setWasAttacked] = useState(false)
  const [fetchedUser, setFetchedUser] = useState(null);

  const simulateDNSTunnel = async () => {
    setCurrentStep(-1)
    let step = 0
    setCurrentStep(0);     
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
    setAttackerDomain("");
    setCommandInput("");
    setVictimSite("");
    setWasAttacked(false);
    setFetchedUser(null);
    setAnimationInterval(null);
  }


  // Idea is to have different sections, have a packet travel through each section to simulate
  return (
    <>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 mb-4">
        <div>
          <p className="font-bold">What is DNS tunneling?</p>
          <p>
            DNS tunneling is a method of hiding data or commands inside DNS queries/responses to bypass firewalls. 
            Hackers hide secret messages inside these queries and replies, like slipping hidden notes inside a phone call. 
            Because DNS traffic is usually trusted and not blocked by firewalls, attackers can use it to receive commands from a remote server
            and send stolen data out of a network.  
          </p>
        </div>
        <div>
          <p className="font-bold">What is a DNS?</p>
          <p>
            DNS stands for Domain Name System. It translates human friendly website names such as google.com into IP addresses like 192.0.2.1
            that computers use to locate and connect with each other.
          </p>
        </div>    
        <div>
          <p className="font-bold">What is a DNS query?</p>
          <p>
            A DNS query is a request sent from a device to a DNS server. When we type a website into our browser, our computer doesn't know
            its IP address, which is what it needs to connect. So it would send a DNS query to ask for the IP address of the website.
            Think of a DNS query looking up a user in a database based on their birthdate.
          </p>
        </div>              
        <div>
          <p className="font-bold">Consequences of DNS tunneling?</p>
          <p>
            A DNS tunneling attack is a highly dangerous attack that all organisations and individuals should be prepared for.
            This is because it is stealthy, hard to detect, and can result in serious data breaches or persistent system compromise.
            There could be exfiltration of sensitive data and creation of undetectable communication backdoors which can result in the network being hijacked.
          
          </p>
        </div>                            
        <div>
          <p className="font-bold">How can DNS tunneling be prevented?</p>
          <p>
            Preventing DNS tunneling can be challenging as it is possible to flag a legitimate system as dangerous (false positive). DNS tunneling detection
            relies on traffic patterns and heuristics, such as looking for long sub domains or high volume of DNS requests. However, legitimate
            systems such as antivirus softwares or security tools can trigger these same behaviours. Yet despite this, there are still methods
            to reduce the likelihood of a DNS tunneling breaching through a network. 
            <br></br>
            Some prevention methods are listed below:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>DNS Traffic Monitoring:</strong> Analyse DNS queries for unusual patterns such as long or random looking subdomains, 
              a high volume of requests to specific domains, or irregular timing intervals. These may indicate tunneling activity.
            </li>
            <li>
              <strong>Threat Intelligence & Domain Filtering:</strong> Use threat intelligence feeds to block access to known 
              malicious or suspicious domains. Many DNS tunneling attacks rely on attacker-controlled domains that can be blacklisted.
            </li>
            <li>
              <strong>Implement DNS Firewalls:</strong> DNS firewall services (e.g., Cisco Umbrella, Cloudflare Gateway) 
              can intercept and inspect DNS queries and prevent communication with known malicious endpoints.
            </li>
            <li>
              <strong>Restrict External DNS Use:</strong> Ensure internal systems only use approved DNS servers. 
              Block outbound DNS requests to public or untrusted DNS resolvers that could be used for tunneling.
            </li>
            <li>
              <strong>Deep Packet Inspection (DPI):</strong> DPI tools can analyse the contents of DNS queries 
              to detect anomalies in payloads, such as embedded data or encoding schemes not typical of normal DNS usage.
            </li>
            <li>
              <strong>Behavioral Analysis & Machine Learning:</strong> Advanced solutions leverage machine 
              learning to detect tunneling based on subtle deviations in DNS usage behavior across time or users.
            </li>
            <li>
              <strong>Rate Limiting:</strong> Limit the rate of DNS requests per user or device to prevent large scale data exfiltration through DNS.
            </li>
          </ul>            
          <p>
            Ultimately, preventing DNS tunneling requires a multi layered security strategy that combines visibilty and control.

            Because DNS is an essential and often trusted protocol, organisations must be cautious not to block 
            legitimate traffic while still enforcing rigorous monitoring and response procedures.
          </p>
  
        </div>

      </div>    
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
      <div className="text-4xl font-bold text-gray-800 mb-4"> 🧠 Attack log</div>
      <div className="mt-4 p-4 text-2xl bg-gray-100 rounded text-gray-700 italic">
        {currentStep >= 0 ? stepMessages[currentStep] : "Press start to begin simulation"}
      </div>       
      <div className="grid grid-cols-3 gap-4 text-center my-10">
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
            id={`phase-${index}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative p-4 rounded h-28 flex items-center justify-center transition-all duration-300 ${
              currentStep === index ? 'bg-green-300 scale-105 shadow-lg' : 'bg-gray-100'
            } hover:bg-blue-200 hover:cursor-pointer`}
          >
            {label}
            {hoveredIndex === index && (
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
              bg-black text-white text-sm rounded px-2 py-1 max-w-[400px] z-10 shadow-lg"
            >
              {sectionInfo[index]}
            </div>

            )}
          </div>
          
        ))}
      </div>
      {currentStep >= 0 && currentStep < 5 && (
        <Xarrow
          start={`phase-${currentStep}`}
          end={`phase-${currentStep + 1}`}
          color="blue"
          path="smooth"
          strokeWidth={3}
          headSize={6}
          labels={{
            middle: (
              <span className="bg-white text-blue-700 text-sm px-2 py-1 rounded shadow">
                {[
                  "Attacker sends DNS query",
                  "DNS query to server",
                  "Server forwards request",
                  "Firewall allows traffic",
                  "C2 responds to victim"
                ][currentStep]}
              </span>
            )
          }}    
        />
      )}
     
      <br></br>

      <InteractivePanel
        attackerDomain={attackerDomain}
        setAttackerDomain={setAttackerDomain}
        commandInput={commandInput}
        setCommandInput={setCommandInput}
        victimSite={victimSite}
        setVictimSite={setVictimSite}
        dnsDomains={combinedDomains}
        wasAttacked={wasAttacked}
        setWasAttacked={setWasAttacked}
        fetchedUser={fetchedUser}
        setFetchedUser={setFetchedUser}
      />        

    </>
  )
}

const InteractivePanel = ({
  attackerDomain,
  setAttackerDomain,
  commandInput,
  setCommandInput,
  victimSite,
  setVictimSite,
  dnsDomains,
  setWasAttacked,
  wasAttacked,
  fetchedUser,
  setFetchedUser
}) => {
  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">🚀 Interactive Feature</h1>
      <div className="grid grid-cols-[1fr_auto_auto_1fr] gap-6 text-center my-10 px-4">
        <div className="bg-red-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-red-800">🧑‍💻 Attacker</h2>
          <div className="text-left">
            <label className="block mb-1 text-sm font-medium text-red-700">Evil Domain</label>
            <input 
              type="text"
              value={attackerDomain}
              onChange={(e) => setAttackerDomain(e.target.value)}
              placeholder="sussy.domain.com"
              className="w-full p-2 mb-4 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            {wasAttacked && (
              <>
                <label className="block mb-1 text-sm font-medium text-red-700">Command & Control</label>
                <input 
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="Enter exfil as the command"
                  className="w-full p-2 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && commandInput.trim()) {
                      const cmd = commandInput.trim().toLowerCase();
                      setCommandInput('');        
                      if (cmd.includes('exfil')) {
                        fetch('https://randomuser.me/api/')
                          .then(res => res.json())
                          .then(data => {
                            const user = data.results[0];
                            const userInfo = {
                              name: `${user.name.first} ${user.name.last}`,
                              email: user.email,
                              country: user.location.country
                            };
                            setFetchedUser(userInfo);
                          });
                      } else {
                        setFetchedUser(null);  
                      }                                    
                    }
                  }}
                />      
                {fetchedUser && (
                  <div className="mt-4 p-3 bg-white rounded shadow border border-green-300 text-sm">
                    <p className="font-semibold text-green-700">📦 Exfiltrated Data:</p>
                    <p><strong>Name:</strong> {fetchedUser.name}</p>
                    <p><strong>Email:</strong> {fetchedUser.email}</p>
                    <p><strong>Location:</strong> {fetchedUser.country}</p>
                  </div>
                )}                
              </>
            )}   

          </div>
        </div>

        <div className="bg-blue-100 p-6 rounded-lg shadow-md flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-blue-800">🌐 DNS Server</h2>
          <div className="text-left mt-2">
            <p className="text-sm font-medium text-blue-700 mb-1">Possible Queries:</p>
            <ul className="list-disc list-inside text-sm text-blue-800">
              {dnsDomains.map((domain, i) => (
                <li key={i}>
                  {domain}
                </li>
              ))}
            </ul>
          </div>          
        </div>

        <div className="bg-yellow-100 p-6 rounded-lg shadow-md flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-yellow-800">🧱 Firewall</h2>
          <div className="text-left mt-2">
            <p className="text-sm font-medium text-blue-700 mb-1">Safe Queries:</p>
            <ul className="list-disc list-inside text-sm text-blue-800">
              {dnsDomains.map((domain, i) => (
                <li key={i}>
                  {domain}
                </li>
              ))}
            </ul>
          </div>          
        </div>

        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-green-800">🧍 User</h2>
          <div className="text-left">
            <label className="block mb-1 text-sm font-medium text-green-700">Website</label>
            <input 
              type="text"
              value={victimSite}
              onChange={(e) => setVictimSite(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && victimSite.trim()) {
                  const site = victimSite.trim();

                  if (site === attackerDomain) {
                    setWasAttacked(true);
                  } else {
                    setWasAttacked(false);
                    window.open(`https://${site}`, '_blank', 'noopener,noreferrer');
                  }
                }
              }}             
              placeholder="website name e.g google.com"
              className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
         
          </div>
        </div>
      </div>
    </>
  );
};

export default DNSTunnel
