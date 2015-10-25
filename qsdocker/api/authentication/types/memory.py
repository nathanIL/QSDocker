from qsdocker.api.authentication.types import Authenticator, User
from qsdocker.api.exceptions import UserAlreadyExists


class method(Authenticator):
    """
    Simple memory based authentication class
    """
    _id_table = {}
    _username_table = {}

    def __init__(self):
        self._id = 0

    def authenticate(self, username, password, **kwargs):
        try:
            if self._username_table[username].check_password(password):
                return self._username_table[username]
        except:
            pass

    def identity(self, payload):
        return self._id_table.get(payload['id'], None)

    def register(self, username, password, **kwargs):
        if username in self._username_table:
            raise UserAlreadyExists()
        user = User(username=username, password=password, id=self._id)
        self._id_table[self._id] = user
        self._username_table[username] = user
        self._id += 1
