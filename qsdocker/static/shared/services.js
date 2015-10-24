angular.module('qsdocker.services',[])
    .service('Authentication', ['API_ENDPOINT','$http',function(API_ENDPOINT,$http) {
        this.loggedIn = false;
        this.register = function(data) {
                return $http({url: API_ENDPOINT + '/users/register',
                              method: 'POST',
                              headers: { 'Content-Type':'application/json;' },
                              data: data });
        };
        this.login = function(username,password) { }
    }]);