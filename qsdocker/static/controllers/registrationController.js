angular.module('qsdocker.controllers.registration',[])
    .controller('registrationController', ['$scope', function($scope) {
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
                           { key: 'email',
                            type: 'input',
                            templateOptions: {
                              label: 'Your email address?',
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
    }]);