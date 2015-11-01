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
    A flask route for the to get list of images from the docker remote API.
    """
    try:
        images = docker_client.images()
        response = jsonify(data=images, message="Success")
        response.status_code = 200
        return response
    except docker.exceptions.APIError as e:
        response = jsonify(data=[], message=e.strerror)
        response.status_code = e.response.status_code
        return response


@docker.route('/image/inspect/<string:id>', methods=['GET'])
@jwt_required()
def inspect(id):
    """
     A flask route for the to get inspect data for an image from the docker remote API.
    """
    try:
        inspect_data = docker_client.inspect_image(id)
        response = jsonify(data=inspect_data, message="Success")
        response.status_code = 200
        return response
    except docker.exceptions.APIError as e:
        response = jsonify(data=[], message=e.strerror)
        response.status_code = e.response.status_code
        return response