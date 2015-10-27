angular.module('qsdocker',['ngRoute','ngResource','mgo-angular-wizard','formly', 'formlyBootstrap','satellizer',
                           'qsdocker.controllers.wizard','qsdocker.controllers.app','qsdocker.services',
                           'qsdocker.controllers.registration'])
    .config(['$routeProvider','$authProvider','API_ENDPOINT', function($routeProvider,$authProvider,API_ENDPOINT) {
            $routeProvider.
              when('/', {
                templateUrl: 'static/templates/wizard.html',
                controller: 'wizardController'
              })
              .when('/user/register', {
                templateUrl: 'static/templates/register.html',
                controller: 'registrationController'
              })
              .otherwise({
                redirectTo: '/'
              });
            $authProvider.signupUrl = API_ENDPOINT + '/users/register';
            $authProvider.loginUrl  = API_ENDPOINT + '/authenticate';
            $authProvider.authToken = 'JWT';
            $authProvider.tokenName = 'access_token'; // flask_jwt default
        }
    ])
    .run(['$location','$rootScope','Authentication',function($location,$rootScope,Authentication) {
            $rootScope.$on("$routeChangeStart", function(event, next, current) {
              var template = next || current;
              var registration_template = "static/templates/register.html";
              // If we are logged in, there shouldn't be a way to reach the registration form.
              if (true == Authentication.loggedIn() && template.templateUrl == registration_template)  {
                $location.path('/');
              }
            });
     }])
    .constant('PRODUCT_INFO',{ title: "QSDocker", subtitle: "Quickly start docker containers", version: '1.0.0' })
    .constant('API_ENDPOINT', '/api/v1');