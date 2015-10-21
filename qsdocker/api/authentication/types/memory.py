from qsdocker.api.authentication.types import Authenticator, User


class method(Authenticator):
    """
    Simple memory based authentication class
    """
    def __init__(self):
        self._db = {}
        self._id = 0

    def authenticate(self,username,password):
        try:
            if self._db[username].check_password(password):
                return self._db[username]
        except:
            return False

    def register(self,username,password):
        try:
            if username in self._db:
                return True
            user = User(username=username, password=password, id=self._id)
            self._id += 1
            self._db[user] = user
            return True
        except Exception as e:
            print(e)
            return False