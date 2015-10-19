from qsdocker import app
import importlib

AuthService = importlib.import_module(app.config['AUTHENTICATION_TYPE']).method()

def register(username,password):
    """
    Register a user to the system.
    :param username: username to register.
    :param password: the password to use for this user.
    """
    pass

def authenticate(username,password):
    pass


def identity(payload):
    pass