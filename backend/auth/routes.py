from flask import Blueprint, jsonify, request, make_response
from auth.utils import (
    create_access_token,
    generate_access_and_refresh_response,
    decode_token
)

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/validate', methods=['POST'])
def validate_token():

    access_token = request.cookies.get("access_token")

    if not access_token:
        return jsonify({"isValid": False}), 401
    try:
        decoded = decode_token(access_token)
        return jsonify({"isValid": True, "user_id": decoded["id"], "isManager": decoded["isManager"]}), 200
    except ValueError as e:
        return jsonify({"isValid": False, "message": str(e)}), 401

@auth_bp.route('/refresh', methods=['POST'])
def refresh_token():

    try:
        decoded = decode_token(refresh_token)

        user_id = decoded["id"]
        is_manager = decoded["isManager"]
        remember_me = decoded["rememberMe"]

        new_access_token = create_access_token(user_id, is_manager, remember_me)

        response = make_response(jsonify({"message": "Access token refreshed successfully"}))
        response.set_cookie('access_token', new_access_token, httponly=True, secure=False, samesite='Strict', path='/')

        return response

    except ValueError as e:
        return jsonify({"message": str(e)}), 401

@auth_bp.route('/employee/login', methods=['POST'])
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

@auth_bp.route('/manager/login', methods=['POST'])
def manager_login():
    try:
        email = request.form.get("email")
        password = request.form.get("password")
        remember_me = request.form.get("rememberMe") == "true"

        print(email)
        print(password)
        print(remember_me)

        if not email or not password:
            return jsonify({"message": "Missing required fields"}), 400

        print(email)
        print(password)
        print(remember_me)

        # SUCCESSFUL MANAGER LOGIN

        return generate_access_and_refresh_response(1, True, remember_me)

    except Exception as e:
        return jsonify({"message": "A server error occured"}), 500