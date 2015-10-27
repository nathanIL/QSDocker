angular.module('qsdocker.services',[])
    .service('Authentication', ['API_ENDPOINT','$http','$auth','$q',function(API_ENDPOINT,$http,$auth,$q) {
        this.loggedIn = $auth.isAuthenticated;
        this.register = $auth.signup;
        this.login = $auth.login;
        this.payload = $auth.getPayload;
        this.logout = function() { if (this.loggedIn()) {
                                        $auth.logout();
                                        return true
                                   } else {
                                        return false
                                   } };
        this.name = function() {
                var payload = this.payload();
                return (payload && 'name' in payload) ? payload['name'] : 'User'
        }
    }])
    .service('Images', ['$resource','API_ENDPOINT', function($resource,API_ENDPOINT) {
        return $resource(API_ENDPOINT + '/images')
    }]);