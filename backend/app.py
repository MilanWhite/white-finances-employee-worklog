from datetime import datetime, timedelta, timezone
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
import jwt
from flask_talisman import Talisman
import os
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}})

app.secret_key = os.getenv("SECRET_KEY")

ACCESS_TOKEN_EXPIRES_MINUTES = 15
REFRESH_TOKEN_EXPIRES_DAYS = 7

#CSP POLICY
csp = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "https://apis.example.com"],
    'object-src': ["'none'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", "data:"],
    'connect-src': ["'self'", "https://apis.example.com"],
}
Talisman(app, content_security_policy=csp)

#CSRF protection
csrf = CSRFProtect(app)

def create_access_token(user_id, is_manager, remember_me):
    return jwt.encode(
        {
            "id": user_id,
            "isManager": is_manager,
            "rememberMe": remember_me,
            "exp": datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES),
        },
        app.secret_key,
        algorithm="HS256"
    )

def create_refresh_token(user_id, is_manager, remember_me):
    return jwt.encode(
        {
            "id": user_id,
            "isManager": is_manager,
            "rememberMe": remember_me,
            "exp": datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRES_DAYS),
        },
        app.secret_key,
        algorithm="HS256"
    )

def generate_access_and_refresh_response(user_id, is_manager, remember_me):
    access_token = create_access_token(user_id, is_manager, remember_me)
    refresh_token = create_refresh_token(user_id, is_manager, remember_me)

    response = make_response(jsonify({"message": "Logged in successfully"}))
    response.set_cookie('access_token', access_token, httponly=True, secure=False, samesite='Strict', path='/')  # secure=True in production
    response.set_cookie('refresh_token', refresh_token, httponly=True, secure=False, samesite='Strict', path='/')  # secure=True in production

    return response

def decode_token(token):
    try:
        return jwt.decode(token, app.secret_key, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise ValueError("Token expired")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token")

def requires_manager_role(func):
    def decorated_function(*args, **kwargs):
        access_token = request.cookies.get("access_token")
        if not access_token:
            return jsonify({"message": "Missing access token"}), 401

        try:
            decoded = decode_token(access_token)
            if not decoded.get("isManager"):
                return jsonify({"message": "Access denied: Not a manager"}), 403
            return func(*args, **kwargs)
        except ValueError as e:
            return jsonify({"message": str(e)}), 401
    return decorated_function

@app.route('/auth/validate', methods=['POST'])
def validate_token():
    access_token = request.cookies.get("access_token")

    if not access_token:
        return jsonify({"isValid": False}), 401
    try:
        decoded = decode_token(access_token)
        return jsonify({"isValid": True, "user_id": decoded["id"], "isManager": decoded["isManager"]}), 200
    except ValueError as e:
        return jsonify({"isValid": False, "message": str(e)}), 401

@app.route('/manager/dashboard', methods=['GET'])
@requires_manager_role
def manager_dashboard():
    return jsonify({"message": "Welcome to the manager dashboard!"}), 200

@app.route('/employee/dashboard', methods=['GET'])
def employee_dashboard():
    access_token = request.cookies.get("access_token")
    if not access_token:
        return jsonify({"message": "Access token missing"}), 401

    try:
        decoded = decode_token(access_token)
        return jsonify({
            "message": "Welcome to the employee dashboard!",
            "user_id": decoded["id"],
            "isManager": decoded["isManager"]
        }), 200
    except ValueError as e:
        return jsonify({"message": str(e)}), 401

@app.route('/employee/login', methods=['POST'])
def employee_login():
    try:
        email = request.form.get("email")
        password = request.form.get("password")
        remember_me = request.form.get("rememberMe") == "true"

        if not email or not password:
            return jsonify({"message": "Missing required fields"}), 400

        print(email)
        print(password)
        print(remember_me)

        # SUCCESSFUL EMPLOYEE LOGIN

        return generate_access_and_refresh_response(1, False, remember_me)

    except Exception as e:
        return jsonify({"message": "A server error occured"}), 500

@app.route('/manager/login', methods=['POST'])
def manager_login():
    try:
        email = request.form.get("email")
        password = request.form.get("password")
        remember_me = request.form.get("rememberMe") == "true"

        if not email or not password:
            return jsonify({"message": "Missing required fields"}), 400

        print(email)
        print(password)
        print(remember_me)

        # SUCCESSFUL MANAGER LOGIN

        return generate_access_and_refresh_response(1, True, remember_me)

    except Exception as e:
        return jsonify({"message": "A server error occured"}), 500



if __name__ == "__main__":
    app.run(debug=True)
