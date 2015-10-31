angular.module('qsdocker.controllers.images',[])
    .controller('imagesController',['$scope','$rootScope','Authentication','Images',
     function($scope,$rootScope,Authentication,Images) {
        $scope.template = 'static/templates/images.html';

        $rootScope.$on('loadImages',function(event) {
            loadImages();
        });

        function loadImages(args) {
            if (Authentication.loggedIn()) {
                        Images.get(function(s) {
                            $scope.images = s.images;
                        }, function(f) {
                            PopupMessage({ description: f.message, status_code: f.status_code,
                                           error: 'Could not load images' });
                        } );
            }
        }

        loadImages();
     }]);