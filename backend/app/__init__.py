from flask import Flask, jsonify
from flask_cors import CORS
from .routes import simulate_routes
def create_app() -> Flask:    
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(simulate_routes)
    return app