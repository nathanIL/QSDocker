angular.module('qsdocker.controllers.images',[])
    .controller('imagesController',['$scope','$rootScope','$uibModal','$document','Authentication','Images',
                'InspectImage','PopupMessage','WizardHandler',
     function($scope,$rootScope,$uibModal,$document,Authentication,Images,InspectImage,PopupMessage,
       WizardHandler) {
        $scope.template = 'static/templates/images.html';

        $rootScope.$on('loadImages',function(event) {
            loadImages();
        });

        function loadImages(args) {
            if (Authentication.loggedIn()) {
                        Images.get(function(s) {
                            $scope.images = s.data;
                        }, function(f) {
                            PopupMessage({ description: f.message, status_code: f.status_code,
                                           error: 'Could not load images' });
                        } );
            }
        }
        $scope.open = function(image) {
            var modal_scope = $rootScope.$new(false);

             InspectImage.get({ id: image['Id'] }).$promise
                .then(function(success){
                        modal_scope.selectedImage = image;
                        var modalInstance = $uibModal.open({
                          scope: modal_scope,
                          animation: true,
                          templateUrl: 'imageInfoModal.html',
                          size: 'lg' });

                         modalInstance.rendered.then(function(d) {
                         var imageInfoArea = angular.element( document.querySelector('#imageInfoArea') );
                         var node = JsonHuman.format(success.data, { showArrayIndex: false });
                         imageInfoArea.append(node);
                  } )

                })
                .catch(function(e){
                    PopupMessage(e.data, function(confirmed) {
                        window.location = '/';
                    })
                });
           };

         $scope.pickImage = function(pickedImage) {
            $rootScope.$emit('pickedImage', pickedImage);
            WizardHandler.wizard().next()
         };

        loadImages();
     }]);