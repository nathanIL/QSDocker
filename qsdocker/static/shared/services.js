angular.module('qsdocker.services',[])
    .service('Authentication', ['API_ENDPOINT','$http','$auth','$q',function(API_ENDPOINT,$http,$auth,$q) {
        this.loggedIn = $auth.isAuthenticated;
        this.register = $auth.signup;
        this.login = $auth.login;
        this.payload = $auth.getPayload;
    }]);