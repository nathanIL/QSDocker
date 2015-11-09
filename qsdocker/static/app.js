angular.module('qsdocker',['ngRoute','ngResource','mgo-angular-wizard','formly', 'formlyBootstrap','satellizer','ui.bootstrap',
                           'qsdocker.filters','qsdocker.controllers.wizard','qsdocker.controllers.app','qsdocker.services',
                           'qsdocker.controllers.registration','qsdocker.controllers.login','qsdocker.controllers.images',
                           'qsdocker.controllers.config','qsdocker.controllers.manage'])
    .config(['$routeProvider','$authProvider','API_ENDPOINT','formlyConfigProvider',
        function($routeProvider,$authProvider,API_ENDPOINT,formlyConfigProvider) {
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
            formlyConfigProvider.setType([
               { /* A type for representing a hostname input */
                  name: 'hostname',
                  extends: 'input',
                  defaultOptions: {
                    validators: {
                      hostname: function(viewValue, modelValue) {
                        var value = modelValue || viewValue || "";
                        var regex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;

                        value = value.trim();
                        return value.length == 0 || regex.test(value);
                      }
                    },
                    templateOptions: {
                      label: 'Hostname',
                      description: 'The hostname to use'
                    }
                  }
                },
                { name: 'domain',
                  extends: 'input',
                  defaultOptions: {
                    validators: {
                      hostname: function(viewValue, modelValue) {
                        var value = modelValue || viewValue || "";
                        var regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

                        value = value.trim();
                        return value.length == 0 || regex.test(value);
                      }
                    },
                    templateOptions: {
                      label: 'Domain Name',
                      description: 'The domain name to use'
                    }
                  }
                },
                { /* A type for representing a a Key value pairs in a table
                     in the templateOptions the following should be available:
                     1) key_name - Stands for the key name that will be used in the view (model value is 'key').
                     2) key_value - Stand for the key value that will be used in the view (model value is 'value').
                     3) transform - a callback (function) that will be used to transform that data. it will have a single parameter
                        holding map / object with the model info ({ key: ... ,value: ... }).
                     4) validator: func(scope.key,value)
                     Rest of the values are similar to the other angular-formly types.
                    */
                  name: 'mapType',
                  templateUrl: 'mapType-template.html',
                  controller: function($scope) {
                         $scope.error = "";
                         $scope.valid_kv_input = function(k,v) {
                                                    var func = $scope.options.templateOptions.validator || function(scope,k,v) { return false }
                                                    return func($scope,k,v);
                                                 };
                         $scope._mp_key = $scope._mp_value = "";
                         $scope.add = function() {
                             if ($scope.model[$scope.options.key] === undefined) {
                                 $scope.model[$scope.options.key] = [];
                                 $scope.model[$scope.options.key + '_transform'] = $scope.options.templateOptions.transform || function(v) { return v };
                             }
                             $scope.model[$scope.options.key].unshift({ key: $scope._mp_key, value: $scope._mp_value });
                             $scope._mp_key = $scope._mp_value = "";
                         }
                         $scope.remove = function(index) {
                             $scope.model[$scope.options.key].splice(index,1)
                         }
                   }
                }])
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