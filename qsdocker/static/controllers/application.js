angular.module('qsdocker.controllers.app',[])
    .controller('applicationController',['$scope','$rootScope','$location','PRODUCT_INFO','Authentication',
     function($scope,$rootScope,$location,PRODUCT_INFO,Authentication) {
        $scope.PRODUCT_INFO = PRODUCT_INFO;
        $scope.Authentication = Authentication;
        $rootScope.wizardEditMode = false;
        $scope.logout = function() {
                if ($scope.Authentication.logout()) {
                    $location.path('#/')
                }
        }
     }]);