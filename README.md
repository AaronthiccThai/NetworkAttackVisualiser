# Network Attack Visualiser

## What is it?
The Network Attack Visauliser is simple web based tool designed to simultae and demonstrate various types of network attacks
such as SYN floods, Port scanning and DNS tunneling. It helps users regardless of technical background understand how attacks work
at the packet level and how network devices respond. This visualisation tool is useful for educational purposes, especially in learning 
cybersecurity concepts, severity and consequences of cyber attacks and mitigation techniques.

## Installation

### Method 1
This was done on WSL Unbuntu, so it is best to start it on the same subsystem

To run this program, git clone the repository (https version)

Then give permission to the start.sh file - chmod 755 start.sh. Then run the file and on your terminal, there should be a localhost.
Don't use the popup localhost but one on terminal since the popup gives to an invalid url. The port should be user forwarded and not auto forwarded


### Method 2
If the shell script doesn't work, you can manually run both the frontend and the backend. Ensure that you have pip3 and npm installed. 
To do this, just clone the repository, then open two terminals, one in the frontend folder and other in backend folder.
Ensure that you install everything once you are in these directories (Frontend you can just install it using npm install, backend you need to manually
install Flask - reference start.sh)
Then run frontend using npm run dev, and run backend using python3 run.py.



## Bibliography
https://www.akamai.com/glossary/what-is-dns-tunneling
https://www.paloaltonetworks.com.au/cyberpedia/what-is-dns-tunneling
https://www.brightsec.com/blog/dns-tunneling/
https://www.fortinet.com/resources/cyberglossary/what-is-port-scan