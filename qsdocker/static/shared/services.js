angular.module('qsdocker.services',[])
    .service('Authentication', ['API_ENDPOINT','$http','$auth','$q',function(API_ENDPOINT,$http,$auth,$q) {
        this.loggedIn = false;
        this.register = function(data) {
            return $auth.signup(data)
        };
        this.login = function(data) {
            return $auth.login(data)
        };
        //this.authenticate = function() {};
    }]);