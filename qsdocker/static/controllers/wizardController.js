angular.module('qsdocker.controllers.wizard',[])
    .controller('wizardController',['$scope','$log','WizardHandler','Authentication',
     function($scope,$log,WizardHandler,Authentication) {
        $scope.Authentication = Authentication;
        $scope.strings = { login:  { title: 'Please login', description: 'Please enter your username and password to login', bullet: 'LOGIN' },
                           images: { title: 'Choose an image', description: 'Please choose the docker image to run', bullet: 'IMAGE' },
                           config: { title: 'Run configurations', description: 'Please configure the container', bullet: 'RUN CONFIG' } };
        $scope.fields = { login:
                [{
                        key: 'email',
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
                }]
        };
        $scope.model = { login: {} };

        $scope.loginOnSubmit = function() {
                Authentication.login($scope.model.login.email,$scope.model.login.password).then(
                    function(okResponse) {
                            Authentication.loggedIn = true;
                            WizardHandler.wizard().next();
                    },
                    function(failureResponse) {
                        // TODO: Alert use with the failure
                        $log.info(r)
                    }
                );
        };
        $scope.finishedWizard = function() { };
     }]);