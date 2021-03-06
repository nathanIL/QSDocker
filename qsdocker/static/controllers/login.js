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

        if (Authentication.loggedIn()) {
            $rootScope.wizardEditMode = true
        }
        $scope.loginOnSubmit = function() {
                Authentication.login($scope.model).then(
                    function(okResponse) {
                            $rootScope.$emit('loadImages'); // imagesController listens to this.
                            WizardHandler.wizard().next();
                            $rootScope.wizardEditMode = true
                    },
                    function(failureResponse) {
                        PopupMessage(failureResponse.data)
                    }
                );
        };
     }]);