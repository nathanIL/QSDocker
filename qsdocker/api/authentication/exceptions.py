from flask import jsonify


class QSDockerException(Exception):
    """
    Base class for all QSDocker related exceptions.
    """
    def __init__(self,message,status_code=400):
        super(QSDockerException,self).__init__(message)
        self._status_code = status_code
        self._response = jsonify(message=self.message, status_code=status_code, sunccess=False)
        self._response.status_code = status_code

    @property
    def status_code(self):
        return self._status_code

    @property
    def response(self):
        return self._response


class UserAlreadyExists(QSDockerException):
    """
    An exception class to be thrown when trying to register a user which already exists in the system.
    """
    def __init__(self,message="User already exists in the system",status_code=409):
        super(UserAlreadyExists,self).__init__(message,status_code)