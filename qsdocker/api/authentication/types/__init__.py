from abc import ABCMeta, abstractmethod


class Authenticator:
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