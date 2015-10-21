from abc import ABCMeta, abstractmethod
import bcrypt

class User(object):
    """
     Authenticated identity class
    """
    def __init__(self, username, password,id):
        self._username = username
        self._hashpw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self._id = id

    @property
    def username(self):
        return self._username

    @property
    def hashed_password(self):
        return self._hashpw

    def check_password(self,password):
        return bcrypt.hashpw(password.encode('utf-8'), self.hashed_password) == self.hashed_password

    def __str__(self):
        return self.username


class Authenticator(object):
    """
    Authentication classes ABC (Abstract Base Class / Interface)
    """
    __metaclass__ = ABCMeta

    @abstractmethod
    def authenticate(self,username,password):
        """
        Checks against the resource (db,file,nis, etc..) if the user is valid and can be authenticated
        :param username: the username to validate
        :param password: the password
        :return: True if authenticated, False otherwise
        """
        pass

    @abstractmethod
    def register(self,username,password):
        """
        Registers a user to the system
        :param username: the username to register
        :param password: the username password
        :return:
        """
        pass