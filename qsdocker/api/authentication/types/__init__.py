from abc import ABCMeta, abstractmethod
import bcrypt

class User(object):
    """
     Authenticated identity class
    """
    def __init__(self, username, password, name, id, **kwargs):
        self._username = username
        self._name = name
        self._hashpw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self._id = id

    @property
    def id(self):
        return self._id

    @property
    def name(self):
        return self._name

    @property
    def username(self):
        """
        The actual unique user identity (the email).
        """
        return self._username

    @property
    def hashed_password(self):
        return self._hashpw

    def check_password(self,password):
        return bcrypt.hashpw(password.encode('utf-8'), self.hashed_password) == self.hashed_password

    def __getitem__(self, item):
        return getattr(self,item)

    def __str__(self):
        return "User(id='%s', username='%s', name='%s')" % (self.id, self.username, self.name)


class Authenticator(object):
    """
    Authentication classes ABC (Abstract Base Class / Interface)
    """
    __metaclass__ = ABCMeta


    @abstractmethod
    def authenticate(self, **kwargs):
        """
        Checks against the resource (db,file,nis, etc..) if the user is valid and can be authenticated.
        :returns: The identity object if success, False on failure.
        """
        pass

    @abstractmethod
    def identity(self, payload):
        """
        Returns the identity object
        """
        pass

    @abstractmethod
    def register(self, **kwargs):
        """
        Registers a user to the system.
        Should be implemented only if required by the selected AUTHENTICATION_TYPE.
        On failure should throw a relevant exception from qsdocker.api.exceptions
        """
        pass