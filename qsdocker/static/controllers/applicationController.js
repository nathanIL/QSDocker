angular.module('qsdocker.controllers.app',[])
    .controller('applicationController',['$scope','PRODUCT_INFO','Authentication',
     function($scope,PRODUCT_INFO,Authentication) {
        $scope.PRODUCT_INFO = PRODUCT_INFO;
        $scope.Authentication = Authentication;
     }]);