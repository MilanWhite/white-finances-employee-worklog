from flask import jsonify
from flask_wtf.csrf import CSRFProtect, generate_csrf, CSRFError

csrf = CSRFProtect()

def register_csrf_routes(app):
    @app.route("/api/csrf-token")
    def csrf_token():
        return jsonify({"csrf_token": generate_csrf()})

    @app.errorhandler(CSRFError)
    def handle_csrf_error(e):
        return jsonify({"error": "CSRF token missing or incorrect."}), 400
