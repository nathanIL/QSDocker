"""
User related API routes
"""
from qsdocker import app
from qsdocker import AuthService
from qsdocker.api.exceptions import UserAlreadyExists
from flask import request, Blueprint, jsonify
from flask_negotiate import consumes

user = Blueprint('user',__name__, url_prefix=app.config['BASE_REST_API_ROUTE'] + '/users')

@user.route('/register', methods=['POST'])
@consumes('application/json')
def register():
    """
    A route to register a user
    """
    try:
        AuthService.register(**request.json)
        response = jsonify(**request.json)
        response.status_code = 200
        return response
    except UserAlreadyExists as ue:
        return ue.response