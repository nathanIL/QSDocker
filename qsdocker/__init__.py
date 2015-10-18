from flask import Flask
from flask.ext.bower import Bower
from flask_jwt import JWT
from qsdocker import config

app = Flask(__name__)
Bower(app)

app.config.from_object(config)
from qsdocker.api.authentication import register,identity
jwt = JWT(app, register, identity)

import qsdocker.views as views
import qsdocker.api as api

app.register_blueprint(views.bp)
app.register_blueprint(api.docker)
app.register_blueprint(api.user)

