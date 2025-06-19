from flask import Blueprint, request, jsonify

"""
Routes
  Simulate
    SYN floods
    Port scanning
    DNS tunneling 
    ...
  Detect
    detect
    alert
    /packets/live w
  

"""
simulate_routes = Blueprint('simulate', __name__)
main_routes = Blueprint('main', __name__)
# --- Simulate Routes ---
@simulate_routes.route('/simulate/syn-flood', methods=['POST'])
def simulate_syn_flood():
    # logic here
    return jsonify({"status": "SYN flood simulation started"}), 200

@simulate_routes.route('/simulate/port-scan', methods=['POST'])
def simulate_port_scan():
    # logic here
    return jsonify({"status": "Port scan simulation started"}), 200

@simulate_routes.route('/simulate/dns-tunnel', methods=['POST'])
def simulate_dns_tunnel():
    # logic here
    return jsonify({"status": "DNS tunneling simulation started"}), 200

# --- Detect Routes ---
@main_routes.route('/main/detect', methods=['GET'])
def detect():
    # logic to run detection algorithms
    return jsonify({"status": "Detection running"}), 200

@main_routes.route('/main/alert', methods=['GET'])
def get_alerts():
    # return detected alerts
    return jsonify({"alerts": []}), 200

@main_routes.route('/main/packets_live', methods=['GET'])
def live_packets():
    # stream or return live packet data
    return jsonify({"packets": []}), 200