angular.module('qsdocker.controllers.registration',[])
    .controller('registrationController', ['$scope','$location','Authentication', function($scope,$location,Authentication) {
        $scope.form = { title: 'Registration form',
                        model: {},
                        fields: [
                           { key: 'name',
                            type: 'input',
                            templateOptions: {
                              label: 'Your name?',
                              type: 'text',
                              required: true }
                           },
                           { key: 'username',
                            type: 'input',
                            templateOptions: {
                              label: 'Your email address (will be your username)?',
                              type: 'email',
                              required: true }
                           },
                           { key: 'password',
                            type: 'input',
                            templateOptions: {
                              label: 'Your password?',
                              type: 'password',
                              required: true }
                           },
                           { key: 'password_retype',
                            type: 'input',
                            templateOptions: {
                              label: 'Please retype your chosen password',
                              type: 'password',
                              required: true }
                           } ]
        };
        $scope.submitRegistration = function() {
            Authentication.register($scope.form.model).then(function(success){
                // We go to the login page...
                $location.path('/');
            },
            function(failure){
                // TODO: Notify the user for the failure (Popver, tooltip, bootstrap alert, toastr?)
            });
        };
    }]);