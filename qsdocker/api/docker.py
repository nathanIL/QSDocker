"""
Authentication aware Docker remote REST API routes.
Docker remote API docs can be found here: https://docs.docker.com/reference/api/docker_remote_api_v1.21/#list-images
"""
from flask import Blueprint, jsonify
from qsdocker import app, docker_client
from flask_jwt import jwt_required
import docker

docker = Blueprint('docker',__name__, url_prefix=app.config['BASE_REST_API_ROUTE'])


@docker.route('/images', methods=['GET'])
@jwt_required()
def images():
    """
    A flask route for the /images Docker Remote API:
    https://docs.docker.com/reference/api/docker_remote_api_v1.21/#list-images
    """
    try:
        images = docker_client.images()
        response = jsonify(images=images, message="Success")
        response.status_code = 200
        return response
    except docker.exceptions.APIError as e:
        response = jsonify(images=[], message=e.strerror)
        response.status_code = e.response.status_code
        return response


