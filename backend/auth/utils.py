import jwt
from datetime import datetime, timedelta, timezone
from flask import current_app, jsonify, make_response

def create_access_token(user_id, is_manager, remember_me):
    return jwt.encode(
        {
            "id": user_id,
            "isManager": is_manager,
            "rememberMe": remember_me,
            "exp": datetime.now(timezone.utc) + timedelta(minutes=current_app.config["ACCESS_TOKEN_EXPIRES_MINUTES"]),
        },
        current_app.config["SECRET_KEY"],
        algorithm="HS256"
    )

def create_refresh_token(user_id, is_manager, remember_me):
    return jwt.encode(
        {
            "id": user_id,
            "isManager": is_manager,
            "rememberMe": remember_me,
            "exp": datetime.now(timezone.utc) + timedelta(days=current_app.config["REFRESH_TOKEN_EXPIRES_DAYS"]),
        },
        current_app.config["SECRET_KEY"],
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
        return jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise ValueError("Token expired")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token")