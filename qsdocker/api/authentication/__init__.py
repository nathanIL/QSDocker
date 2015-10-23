from qsdocker import app
import importlib

AuthService = importlib.import_module(app.config['AUTHENTICATION_TYPE']).method()

def register(username,password):
    """
    Register a user to the system.
    :param username: username to register.
    :param password: the password to use for this user.
    :return: True if registration successful, False otherwise.
    """
    return AuthService.register(username,password)


def authenticate(username,password):
    return AuthService.authenticate(username,password)


def identity(payload):
    pass