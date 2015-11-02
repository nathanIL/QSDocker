angular.module('qsdocker.controllers.config',[])
    .controller('configController', ['$scope','WizardHandler',function($scope,WizardHandler) {
        $scope.template = 'static/templates/config.html';

    }]);