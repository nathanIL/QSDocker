from flask import Flask
from flask.ext.bower import Bower
from qsdocker import config
from qsdocker.views import index

app = Flask(__name__)
Bower(app)

app.register_blueprint(index.bp)
app.config.from_object(config)
