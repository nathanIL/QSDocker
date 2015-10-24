from qsdocker.api.authentication.types import Authenticator, User
from qsdocker.api.exceptions import UserAlreadyExists


class method(Authenticator):
    """
    Simple memory based authentication class
    """
    def __init__(self):
        self._db = {}
        self._id = 0

    def authenticate(self, username, password, **kwargs):
        try:
            if not self._db[username].check_password(password):
                return self._db[username]
        except:
            return False

    def register(self, username, password, **kwargs):
        if username in self._db:
            raise UserAlreadyExists()
        user = User(username=username, password=password, id=self._id)
        self._id += 1
        self._db[username] = user
