angular.module('qsdocker.controllers.wizard',[])
    .controller('wizardController',['$scope','$log', function($scope,$log) {
        $scope.logged = false;
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
                  placeholder: 'Email Address...' }
        },
        {
                key: 'password',
                type: 'input',
                templateOptions: {
                  type: 'password',
                  label: 'Password',
                  required: true,
                  placeholder: 'Password...' }
        },
        ]};
        $scope.model = { login: {} };


        $scope.loginOnSubmit = function() {};
        $scope.finishedWizard = function() {
            $log.info("Called!");

        };


    }]);