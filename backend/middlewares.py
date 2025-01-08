from functools import wraps
from flask import jsonify, request
from auth.utils import decode_token

def requires_manager_role(func):
    @wraps(func)
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

def requires_employee_role(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        access_token = request.cookies.get("access_token")
        if not access_token:
            return jsonify({"message": "Missing access token"}), 401

        try:
            decoded = decode_token(access_token)
            if decoded.get("isManager"):
                return jsonify({"message": "Access denied: Not an employee"}), 403
            return func(*args, **kwargs)
        except ValueError as e:
            return jsonify({"message": str(e)}), 401
    return decorated_function