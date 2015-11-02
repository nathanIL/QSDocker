DEBUG=True
BASE_REST_API_ROUTE='/api/v1'
DOCKER_BASE_URL='unix://var/run/docker.sock'
SECRET_KEY='my_secret_sadKeyMakeLoveNotwar1111'
JWT_AUTH_URL_RULE=BASE_REST_API_ROUTE + '/authenticate'
AUTHENTICATION_TYPE='qsdocker.api.authentication.types.memory'
JWT_EXPIRATION_DELTA=300