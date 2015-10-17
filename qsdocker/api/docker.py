from flask import g
from . import docker

@docker.route('/images/json')
def images():
    print(g.docker_api_response)
    return (g.docker_api_response.text, g.docker_api_response.status_code, g.docker_api_response.headers.items())
