angular.module('qsdocker',['ngRoute','mgo-angular-wizard','formly', 'formlyBootstrap','qsdocker.controllers.wizard',
                           'qsdocker.controllers.app','qsdocker.services'])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
              when('/', {
                templateUrl: 'static/templates/wizard.html',
                controller: 'wizardController'
              }).
              otherwise({
                redirectTo: '/'
              })
        }
    ])
    .constant('PRODUCT_INFO',{ title: "QSDocker", subtitle: "Quickly start docker containers", version: '1.0.0' });