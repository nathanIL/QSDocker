angular.module('qsdocker.services',[])
    .service('Authentication', ['API_ENDPOINT','$http',function(API_ENDPOINT,$http) {
        this.loggedIn = false;
        this.register = function(username,password) {
                return $http({url: API_ENDPOINT + '/users/register',
                              method: 'POST',
                              headers: { 'Content-Type':'application/json;' },
                              data: { username: username, password: password} });
        };
        this.login = function(username,password) { }
    }]);