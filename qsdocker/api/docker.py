"""
Authentication aware Docker remote REST API routes.
Docker remote API docs can be found here: https://docs.docker.com/reference/api/docker_remote_api_v1.21/#list-images
"""
from flask import g
from . import docker

@docker.route('/images/json')
def images():
    """
    A flask route for the /images/json Docker Remote API: https://docs.docker.com/reference/api/docker_remote_api_v1.21/#list-images
    :return: A response tuple with all images available / installed.
    """
    return (g.docker_api_response.text, g.docker_api_response.status_code, g.docker_api_response.headers.items())
