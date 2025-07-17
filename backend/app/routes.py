from flask import Blueprint, request, jsonify
import random
import time
"""
Routes
  Simulate
    SYN floods
    Port scanning
    DNS tunneling 
    ...

  
The project is to mimic network attacks, and showcase to users what it looks like
interactive packet visualiser, using generated packets rather than actual packets - 
"""
simulate_routes = Blueprint('simulate', __name__)
main_routes = Blueprint('main', __name__)

"""
    Creates a fake packet that simulates the actual packet
    Params
        Protocol: TCP/UDP
        Src IP: ip from where packet is being  sent
        Dst IP: destination of ip
        Info: some other misc info

"""
def generate_packet(protocol, src_ip, dst_ip, info):
    return {
        "timestamp": time.time(),
        "protocol": protocol,
        "src_ip": src_ip,
        "dst_ip": dst_ip,
        "info": info
    }


# --- Simulate Routes ---

"""
    Simulates a SYN Flood by sending packets over to a dest IP from different SRC ip
    We can do this by creating fake packets, and generating random source ports, 
    then sending it over to one destination prot
"""
@simulate_routes.route('/simulate/syn-flood', methods=['POST'])
def simulate_syn_flood():
    dst_ip = '192.168.0.1'
    packets = []

    for _ in range(20):
        src_ip = f"192.168.0.{random.randint(2, 254)}"
        packet = generate_packet("TCP", src_ip, dst_ip, "SYN")
        packets.append(packet)

    return jsonify({"status": "SYN flood simulated", "packets": packets}), 200


"""
    Simulates a Port Scan by sending packets towards hardcoded ports
    We set 5 types of port each with its own meaning
    Then we utilise our generate packet function to send it over to each port with the status in each
    Then what we can do with the port is handled from frontend since it easier

"""
@simulate_routes.route('/simulate/port-scan', methods=['POST'])
def simulate_port_scan():
    src_ip = '10.0.0.5'
    dst_ip = '10.0.0.1'
    ports = [21, 22, 23, 80, 1234]
    packets = []

    for port in ports:
        # Simulate response based on port
        if port == 21:
            info = f"Port {port} (FTP) open - vulnerable to brute force login"
        elif port == 22:
            info = f"Port {port} (SSH) open - SSH-2.0-OpenSSH_7.4 - leaked SSH key"
        elif port == 23:
            info = f"Port {port} (Telnet) filtered - no response (timeout)"
        elif port == 80:
            info = f"Port {port} (HTTP) open - data leakage possible"
        elif port == 1234:
            info = f"Port {port} closed - connection refused"
        else:
            info = f"Port {port} unknown"

        packet = generate_packet("TCP", src_ip, dst_ip, info)
        packet["port"] = port
        if "open" in info:
            packet["status"] = "open"
        elif "filtered" in info:
            packet["status"] = "filtered"
        elif "closed" in info:
            packet["status"] = "closed"
        else:
            packet["status"] = "unknown"

        packets.append(packet)

    return jsonify({"status": "Port scan simulated", "packet": packets}), 200



