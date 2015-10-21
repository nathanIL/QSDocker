from flask import Blueprint, render_template

root_views = Blueprint('root', __name__, url_prefix='/')

@root_views.route('/')
def index():
    return render_template('index.html')
