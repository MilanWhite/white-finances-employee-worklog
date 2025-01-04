from datetime import datetime, timedelta, timezone


from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
import jwt

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}}) #ensures only the frontend can make Cross Origin requests

ACCESS_TOKEN_EXPIRES_MINUTES = 15
REFRESH_TOKEN_EXPIRES_DAYS = 7

def create_access_token(user_id):
    return jwt.encode(
        {"id": user_id, "exp": datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES)},
        app.secret_key,
        algorithm="HS256"
    )

def create_refresh_token(user_id):
    return jwt.encode(
        {"id": user_id, "exp": datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRES_DAYS)},
        app.secret_key,
        algorithm="HS256"
    )

def generate_access_and_refresh_response(user_id):
    access_token = create_access_token(user_id)
    refresh_token = create_refresh_token(user_id)

    response = make_response(jsonify({"message": "Logged in successfully"}))
    response.set_cookie('access_token', access_token, httponly=True, secure=False, samesite='Strict', path='/') # secure = true in production
    response.set_cookie('refresh_token', refresh_token, httponly=True, secure=False, samesite='Strict', path='/') # secure = true in production

    return response

@app.route('/auth/validate', methods=['POST'])
def validate_token():
    access_token = request.cookies.get("access_token")

    if not access_token:
        return jsonify({"isValid": False}), 401
    try:
        decoded = jwt.decode(access_token, app.secret_key, algorithms=["HS256"])
        return jsonify({"isValid": True, "user_id": decoded["id"]}), 200
    except jwt.ExpiredSignatureError:
        print("Access token expired")
        return jsonify({"isValid": False, "message": "Access token expired", "error_message": "TOKEN_EXPIRED"}), 401
    except jwt.InvalidTokenError:
        print("Invalid token")
        return jsonify({"isValid": False, "message": "Invalid token", "error_message": "TOKEN_INVALID"}), 401

@app.route('/auth/refresh', methods=['POST'])
def refresh_token():
    refresh_token = request.cookies.get('refresh_token')
    if not refresh_token:
        return jsonify({"message": "Missing refresh token"}), 401

    try:
        decoded = jwt.decode(refresh_token, app.secret_key, algorithms=["HS256"])
        user_id = decoded["id"]
        user_folder_id = decoded['user_folder_id']

        # Generate a new access token
        new_access_token = create_access_token(user_id, user_folder_id)

        response = make_response(jsonify({"message": "Access token refreshed"}))
        response.set_cookie('access_token', new_access_token, httponly=True, secure=False, samesite='Strict', path='/') # secure = true in production

        return response
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Refresh token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid refresh token"}), 401

if __name__ == "__main__":
    app.run(debug=True)