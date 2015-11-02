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
    }])
    .service('InspectImage', ['$resource','API_ENDPOINT', function($resource,API_ENDPOINT) {
        return $resource(API_ENDPOINT + '/image/inspect/:id')
    }])
    .service('PopupMessage', function() {
        /* Accepts a standard JSON object returned from the server with the following keys:
        error,description,status_code.
        swal is a SweetAlert function from here: http://t4t5.github.io/sweetalert/
        */
        return function(data, confirmCallback) {
            var swal_data = {};

            if (data.status_code < 300) {
                swal_data.type = "success"
            } else if (data.status_code >= 300) {
                swal_data = { type: "error", confirmButtonColor: "#DD6B55" }
            }

            swal_data.text = data.description;
            swal_data.title = data.error + " (" + data.status_code + ")";
            swal(swal_data,confirmCallback)
        }
    });