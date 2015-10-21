from flask import Flask
from flask.ext.bower import Bower
from flask_jwt import JWT
from qsdocker import config

app = Flask(__name__)
Bower(app)

app.config.from_object(config)
from qsdocker.api.authentication import authenticate,identity
jwt = JWT(app, authenticate, identity)

from qsdocker.views import root_views
from qsdocker.api.docker import docker
from qsdocker.api.user import user

app.register_blueprint(root_views)
app.register_blueprint(docker)
app.register_blueprint(user)

