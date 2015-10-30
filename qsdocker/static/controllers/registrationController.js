angular.module('qsdocker.controllers.registration',[])
    .controller('registrationController', ['$scope','$location','Authentication','PopupMessage',
    function($scope,$location,Authentication,PopupMessage) {
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
            // TODO: write an angular-formly validation for that
            if ($scope.form.model.password_retype != $scope.form.model.password) {
                sweetAlert("Registration error", "Both passwords must be equal", "error");
                $scope.form.model.password_retype = $scope.form.model.password = ""
            } else {
                Authentication.register($scope.form.model).then(function(success){
                    // We go to the login page...
                    $location.path('/');
                },
                function(failure){
                    console.log(failure);
                    PopupMessage(failure.data);
                    $scope.form.model = {};
                })
            }
        };
    }]);