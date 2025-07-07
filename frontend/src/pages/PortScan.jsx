
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
}

export default PortScan
