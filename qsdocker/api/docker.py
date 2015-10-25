"""
Authentication aware Docker remote REST API routes.
Docker remote API docs can be found here: https://docs.docker.com/reference/api/docker_remote_api_v1.21/#list-images
"""
from flask import request, g, Blueprint
from qsdocker import app
from flask_jwt import jwt_required
import requests_unixsocket
import urllib

docker = Blueprint('docker',__name__, url_prefix=app.config['BASE_REST_API_ROUTE'])

@docker.before_request
def docker_rest_api_request():
    method = request.method
    session = requests_unixsocket.Session()
    unix_socket = urllib.quote_plus( app.config['DOCKER_SOCKET'] )
    start_idx = request.url.find(app.config['BASE_REST_API_ROUTE']) + len(app.config['BASE_REST_API_ROUTE']) + 1
    docker_rest_endpoint = request.url[start_idx:]
    g.docker_api_response = getattr(session,method.lower())('http+unix://{0}/{1}'.format(unix_socket,docker_rest_endpoint),json=request.json)

@docker.route('/images/json', methods=['GET'])
@jwt_required
def images():
    """
    A flask route for the /images/json Docker Remote API: https://docs.docker.com/reference/api/docker_remote_api_v1.21/#list-images
    The context global 'g' is populated in 'docker_rest_api_request' method.
    :return: A response tuple with all images available / installed.
    """
    return (g.docker_api_response.text, g.docker_api_response.status_code, g.docker_api_response.headers.items())
