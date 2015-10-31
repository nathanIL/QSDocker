angular.module('qsdocker.controllers.images',[])
    .controller('imagesController',['$scope','$rootScope','$uibModal','Authentication','Images',
     function($scope,$rootScope,$uibModal,Authentication,Images) {
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
        $scope.open = function(image) {
            var modal_scope = $rootScope.$new(false);
            modal_scope.selectedImage = image;

            var modalInstance = $uibModal.open({
              scope: modal_scope,
              animation: true,
              templateUrl: 'imageInfoModal.html',
              size: 'lg'
              })
        };

        loadImages();
     }]);