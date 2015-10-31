angular.module('qsdocker.controllers.app',[])
    .controller('applicationController',['$scope','$location','PRODUCT_INFO','Authentication',
     function($scope,$location,PRODUCT_INFO,Authentication) {
        $scope.PRODUCT_INFO = PRODUCT_INFO;
        $scope.Authentication = Authentication;
        $scope.logout = function() {
                if ($scope.Authentication.logout()) {
                    $location.path('#/')
                }
        }
     }]);