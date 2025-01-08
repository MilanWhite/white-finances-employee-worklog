from flask import Blueprint, jsonify, request
from auth.utils import decode_token
from middlewares import requires_manager_role

manager_bp = Blueprint('manager', __name__)

@manager_bp.route('/dashboard', methods=['GET'])
@requires_manager_role
def manager_dashboard():
    print("manager dashboard")