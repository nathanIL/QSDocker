from flask import Flask
from flask.ext.bower import Bower
from flask_jwt import JWT
from qsdocker import config
from datetime import datetime
import flask
import time
import importlib
import docker

app = Flask(__name__)
Bower(app)
app.config.from_object(config)
docker_client = docker.Client(base_url=app.config['DOCKER_BASE_URL'], version='auto')
AuthService = importlib.import_module(app.config['AUTHENTICATION_TYPE']).method()


def authenticate(username, password):
    return AuthService.authenticate(username, password)

def identity(payload):
    return AuthService.identity(payload)

jwt = JWT(app, authenticate, identity)


@jwt.jwt_payload_handler
def payload_handler(identity):
    """
    Populate the JWT payload with some more information that we need during the application lifespan.
    :param identity: The User object which services as the identity object.
    :return: a dict with the JWT payload data.
    """
    now_epoch = time.mktime(datetime.now().timetuple())
    return dict(identity=identity.id, username=identity.username, iat=now_epoch, nbf=now_epoch,
                name=identity.name, exp=now_epoch + 300)


from qsdocker.views import root_views
from qsdocker.api.docker import docker as docker_bp
from qsdocker.api.user import user

app.register_blueprint(root_views)
app.register_blueprint(docker_bp)
app.register_blueprint(user)

