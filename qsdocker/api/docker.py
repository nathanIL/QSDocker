"""
Authentication aware Docker remote REST API routes.
Docker remote API docs can be found here: https://docs.docker.com/reference/api/docker_remote_api_v1.21/
The API is not called directly but uses the docker library which is imported to this module as 'docker_client'.
"""
from flask import Blueprint, jsonify
from qsdocker import app, docker_client
from flask_jwt import jwt_required
import docker as docker_module

docker = Blueprint('docker',__name__, url_prefix=app.config['BASE_REST_API_ROUTE'])


def api_call(method,*args,**kwargs):
    """
    A wrapper to call docker client method and create proper responses in a success or failure (exception raised,...).
    :return: the Response object
    """
    try:
        api_method = getattr(docker_client,method)
        response = jsonify(data=api_method(*args, **kwargs), message="Success")
        response.status_code = 200
        return response
    except docker_module.exceptions.APIError as e:
        response = jsonify(data=[], message=e.strerror)
        response.status_code = e.response.status_code
        return response


@docker.route('/images', methods=['GET'])
@jwt_required()
def images():
    """
    A flask route for the to get list of images from the docker remote API.
    """
    return api_call('images')


@docker.route('/image/inspect/<string:id>', methods=['GET'])
@jwt_required()
def inspect(id):
    """
     A flask route for the to get inspect data for an image from the docker remote API.
    """
    return api_call('inspect_image', id)