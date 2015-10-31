angular.module('qsdocker.controllers.wizard',[])
    .controller('wizardController',['$scope',function($scope) {
        $scope.strings = { login:  { title: 'Login', description: 'Please enter your username and password to login', bullet: 'Login' },
                           images: { title: 'Choose', description: 'Please choose the docker image to run', bullet: 'Image' },
                           config: { title: 'Run', description: 'Please configure the container', bullet: 'Run Config' },
                           manage: { title: 'Manage', description: 'Please manage your running containers', bullet: 'Manage' }};

        $scope.finishedWizard = function() { };
     }]);