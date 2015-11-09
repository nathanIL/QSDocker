angular.module('qsdocker.controllers.manage',[]).
    controller('manageController', ['$scope','$rootScope', function($scope,$rootScope) {
        $scope.template = 'static/templates/manage.html';
        $rootScope.$on('launchedContainer', function(event,data) {
            console.log(data)

        });
    }])