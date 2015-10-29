angular.module('qsdocker.controllers.wizard',[])
    .controller('wizardController',['$scope','WizardHandler','Authentication','Images',
     function($scope,WizardHandler,Authentication,Images) {
        $scope.Authentication = Authentication;
        $scope.strings = { login:  { title: 'Login', description: 'Please enter your username and password to login', bullet: 'Login' },
                           images: { title: 'Choose', description: 'Please choose the docker image to run', bullet: 'Image' },
                           config: { title: 'Run', description: 'Please configure the container', bullet: 'Run Config' },
                           manage: { title: 'Manage', description: 'Please manage your running containers', bullet: 'Manage' }};

        $scope.fields = { login:
                [{
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
                }]
        };

        $scope.model = { login: {} };
        function loadImages() {
            if (Authentication.loggedIn()) {
                        Images.get(function(s) {
                            $scope.images = s.images;
                        }, function(f) {} );
            }
        }

        $scope.loginOnSubmit = function() {
                Authentication.login($scope.model.login).then(
                    function(okResponse) {
                            loadImages()
                            WizardHandler.wizard().next();
                    },
                    function(failureResponse) {
                        // TODO: Alert use with the failure
                    }
                );
        };


        loadImages();
        $scope.finishedWizard = function() { };
     }]);