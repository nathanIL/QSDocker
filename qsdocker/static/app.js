angular.module('qsdocker',['mgo-angular-wizard','formly', 'formlyBootstrap'])
    .controller('footerHeaderController',['$scope','PRODUCT_INFO',function($scope,PRODUCT_INFO) {
        $scope.PRODUCT_INFO = PRODUCT_INFO;

    }])
    .controller('wizardController',['$scope','$log','PRODUCT_INFO', function($scope,$log,PRODUCT_INFO) {
        $scope.PRODUCT_INFO = PRODUCT_INFO;
        $scope.logged = false;
        $scope.strings = { login:  { title: 'Please login', description: 'Please enter your username and password to login', bullet: 'LOGIN' },
                           images: { title: 'Choose image', description: 'Please choose the docker image to run', bullet: 'IMAGES' },
                           config: { title: 'Run configurations', description: 'Please configure the container', bullet: 'RUN CONFIG' } };
        $scope.fields = { login:
        [{
                key: 'email',
                type: 'input',
                templateOptions: {
                  label: 'User email address',
                  type: 'email',
                  required: true,
                  placeholder: 'Email Address...' }
        },
        {
                key: 'password',
                type: 'input',
                templateOptions: {
                  type: 'password',
                  label: 'Password',
                  required: true,
                  placeholder: 'Password...' }
        },
        ]};
        $scope.model = { login: {} };


        $scope.loginOnSubmit = function() {};
        $scope.finishedWizard = function() {
            $log.info("Called!");

        };


    }])
    .constant('PRODUCT_INFO',{ title: "QSDocker", subtitle: "Quickly start docker containers", version: '1.0.0' });