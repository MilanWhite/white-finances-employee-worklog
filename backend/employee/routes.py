from flask import Blueprint, jsonify, request
from auth.utils import decode_token
from middlewares import requires_employee_role

employee_bp = Blueprint('employee', __name__)

@employee_bp.route('/dashboard', methods=['GET'])
@requires_employee_role
def employee_dashboard():
    print("employee dashboard")

@employee_bp.route('/punch-in', methods=['POST'])
@requires_employee_role
def punch_in():
    print("Punch in")