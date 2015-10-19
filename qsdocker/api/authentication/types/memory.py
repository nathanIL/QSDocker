from qsdocker.api.authentication.types import Authenticator


class method(Authenticator):
    """
    Memory based authenticator
    """
    def __init__(self):
        self._db = {}

    def authenticate(self,username,password):
        try:
            return self._db[username] == password
        except:
            return False

    def register(self,username,password):
        self._db[username] = password
