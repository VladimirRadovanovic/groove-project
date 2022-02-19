from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Listing


order_routes = Blueprint('orders', __name__)


order_routes.route('/checkout', methods=['POST'])
@login_required
def make_order():
    print(request.data)
    return {'order': 'in route'}
