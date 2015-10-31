angular.module('qsdocker.controllers.login',[])
    .controller('loginController',['$scope','$rootScope','Authentication','WizardHandler','PopupMessage',
     function($scope,$rootScope,Authentication,WizardHandler,PopupMessage) {
        $scope.template = 'static/templates/login.html';
        $scope.Authentication = Authentication;
        $scope.model = { };
        $scope.login = [
                {
                        key: 'username',
                        type: 'input',
                        templateOptions: {
                          label: 'User email address',
                          type: 'email',
                          required: true,
                          placeholder: 'Enter your email address...' }
                },
                {
                        key: 'password',
                        type: 'input',
                        templateOptions: {
                          type: 'password',
                          label: 'Password',
                          required: true,
                          placeholder: 'Enter your password...' }
                }];

        $scope.loginOnSubmit = function() {
                Authentication.login($scope.model).then(
                    function(okResponse) {
                            $rootScope.$emit('loadImages');
                            WizardHandler.wizard().next();
                    },
                    function(failureResponse) {
                        PopupMessage(failureResponse.data)
                    }
                );
        };
     }]);