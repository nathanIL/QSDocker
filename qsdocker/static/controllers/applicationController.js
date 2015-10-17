angular.module('qsdocker.controllers.app',[])
    .controller('applicationController',['$scope','PRODUCT_INFO',function($scope,PRODUCT_INFO) {
        $scope.PRODUCT_INFO = PRODUCT_INFO;

    }]);