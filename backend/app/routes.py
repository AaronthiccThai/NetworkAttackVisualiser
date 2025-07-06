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


def generate_packet(protocol, src_ip, dst_ip, info):
    return {
        "timestamp": time.time(),
        "protocol": protocol,
        "src_ip": src_ip,
        "dst_ip": dst_ip,
        "info": info
    }


# --- Simulate Routes ---
@simulate_routes.route('/simulate/syn-flood', methods=['POST'])
def simulate_syn_flood():
    src_ip = request.json.get('src_ip', '192.168.0.100')
    dst_ip = request.json.get('dst_ip', '192.168.0.1')
    packets = []

    for _ in range(20):
        spoofed_ip = f"192.168.0.{random.randint(2, 254)}"
        packet = generate_packet("TCP", spoofed_ip, dst_ip, "SYN")
        packets.append(packet)

    return jsonify({"status": "SYN flood simulated", "packets": packets}), 200

@simulate_routes.route('/simulate/port-scan', methods=['POST'])
def simulate_port_scan():
    src_ip = request.json.get('src_ip', '10.0.0.5')
    dst_ip = request.json.get('dst_ip', '10.0.0.1')
    ports = [21, 22, 23, 80, 443]
    packets = []

    for port in ports:
        packet = generate_packet("TCP", src_ip, dst_ip, f"Scan port {port}")
        packets.append(packet)

    return jsonify({"status": "Port scan simulated", "packets": packets}), 200

@simulate_routes.route('/simulate/dns-tunnel', methods=['POST'])
def simulate_dns_tunnel():
    src_ip = request.json.get('src_ip', '172.16.0.2')
    dst_ip = request.json.get('dst_ip', '8.8.8.8')
    domains = [
        "evil.tunnel.attacker.com",
        "veryevil.tunnel.attacker.com",
        "123.tunnel.attacker.com"
    ]
    packets = []

    for domain in domains:
        packet = generate_packet("DNS", src_ip, dst_ip, f"Query: {domain}")
        packets.append(packet)

    return jsonify({"status": "DNS tunnel simulated", "packets": packets}), 200

