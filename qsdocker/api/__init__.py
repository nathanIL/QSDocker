from flask import Blueprint, request, g
import requests_unixsocket
import urllib
from qsdocker import app

docker = Blueprint('docker',__name__, url_prefix=app.config['BASE_REST_API_ROUTE'])
user = Blueprint('user',__name__, url_prefix=app.config['BASE_REST_API_ROUTE'] + '/user')



@docker.before_request
def docker_rest_api_request():
    method = request.method
    session = requests_unixsocket.Session()
    unix_socket = urllib.quote_plus( app.config['DOCKER_SOCKET'] )
    start_idx = request.url.find(app.config['BASE_REST_API_ROUTE']) + len(app.config['BASE_REST_API_ROUTE']) + 1
    docker_rest_endpoint = request.url[start_idx:]
    g.docker_api_response = getattr(session,method.lower())('http+unix://{0}/{1}'.format(unix_socket,docker_rest_endpoint),json=request.json, stream=True)
