from flask import Flask
from flask.ext.bower import Bower
from qsdocker import config

app = Flask(__name__)
Bower(app)

app.config.from_object(config)
import qsdocker.views as views
import qsdocker.api as api

app.register_blueprint(views.bp)
app.register_blueprint(api.docker)
