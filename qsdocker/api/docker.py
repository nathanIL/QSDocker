"""
Authentication aware Docker remote REST API routes.
Docker remote API docs can be found here: https://docs.docker.com/reference/api/docker_remote_api_v1.21/#list-images
"""
from flask import Blueprint, jsonify
from qsdocker import app, docker_client
from flask_jwt import jwt_required
import flask

docker = Blueprint('docker',__name__, url_prefix=app.config['BASE_REST_API_ROUTE'])


@docker.route('/images', methods=['GET'])
@jwt_required()
def images():
    """
    A flask route for the /images Docker Remote API:
    https://docs.docker.com/reference/api/docker_remote_api_v1.21/#list-images
    """
    # TODO: Handle errors
    images = docker_client.images()
    return jsonify(images=images)
