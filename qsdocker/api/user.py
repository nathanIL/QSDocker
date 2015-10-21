"""
User related API routes
"""
from qsdocker import app
from qsdocker.api.authentication import AuthService
from flask import request, Blueprint, jsonify
from flask_negotiate import consumes

user = Blueprint('user',__name__, url_prefix=app.config['BASE_REST_API_ROUTE'] + '/users')

@user.route('/register', methods=['POST'])
@consumes('application/json')
def register():
    """
    A route to register a user
    """
    response = None
    if 'username' in request.json and 'password' in request.json:
        authenticated = AuthService.register(username=request.json['username'],password=request.json['password'])
        response = jsonify(success=authenticated)
        response.status_code = 200 if authenticated else 400
    else:
        response = jsonify(success=False)
        response.status_code = 400

    return response