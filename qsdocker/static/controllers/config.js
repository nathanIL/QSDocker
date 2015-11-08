angular.module('qsdocker.controllers.config',[])
    .controller('configController', ['$scope','$rootScope','WizardHandler',function($scope,$rootScope,WizardHandler) {
        $scope.template = 'static/templates/config.html';
        $rootScope.$on('pickedImage', function(event,pickedImage) {
            $scope.pickImageName = pickedImage['RepoTags'][0]
        });
        $scope.regularStartParameters = {};
        $scope.configSubmit = function() {
            console.log($scope.regularStartParameters)
        };
        $scope.regularParameterFields = [ { key: 'Hostname',  type: 'hostname', templateOptions: { placeholder: 'development-srv-01' } },
                                        { key: 'Domainname',type: 'domain',   templateOptions: { placeholder: 'mycompany.com' } },
                                        { key: 'User',
                                          type: 'input',
                                              templateOptions: {
                                              type: 'text',
                                              label: 'User',
                                              description: 'User to use within the container',
                                              placeholder: 'root' }
                                         },
                                         { key: 'Entrypoint',
                                           type: 'input',
                                           templateOptions: {
                                               type: 'text',
                                               label: 'Entrypoint script',
                                               placeholder: '/bin/sh -c',
                                               description: 'The very first command to run in the container upon start'
                                           },
                                           parsers: [ function(d) { return d.length ? d.split(/\s+/) : null } ] },
                                           { key: 'Cmd',
                                             type: 'input',
                                             templateOptions: {
                                                type: 'text',
                                                label: 'Command line',
                                                description: 'Arguments to Entrypoint'
                                            },
                                            parsers: [ function(d) { return d.length ? d.split(/\s+/) : null } ]
                                           },
                                           { key: 'Env',
                                             type: 'mapType',
                                             noFormControl: true,
                                             templateOptions: {
                                                label: 'Environment variables',
                                                key_name: 'Variable name',
                                                value_name: 'Variable value',
                                                validator: function(scope,k,v) {  scope.error = "Invalid environment variable";
                                                                                                  return /^[a-zA-Z_]+[a-zA-Z0-9_]*$/.test(k) },
                                                transform: function(v) {
                                                             var variables = [];
                                                             angular.forEach(v,function(v,k) {
                                                                variables.push(v['key'] + "=" + v['value'])
                                                              });
                                                              return variables
                                                }
                                             }
                                           },
                                           { key: 'Labels',
                                             type: 'mapType',
                                             noFormControl: true,
                                             templateOptions: {
                                                 label: 'Container labels',
                                                 key_name: 'Label name',
                                                 value_name: 'Label value',
                                                 validator: function(scope,k,v) {  scope.error = "Both label name and value must be non empty";
                                                                                   return k.length > 0 && v.length > 0 },
                                                 transform: function(v) {
                                                        var labels = {};
                                                        angular.forEach(v,function(v,k) {
                                                            labels[v.key] = v.value;
                                                        });
                                                        return labels
                                                 }
                                             }
                                           },
                                           { key: 'AttachStdin',
                                             type: 'checkbox',
                                             defaultValue: false,
                                             templateOptions: { label: 'Attach standard input?',
                                                                description: 'Attach standard input (STDIN) from host to container'}
                                           },
                                           { key: 'AttachStdout',
                                             type: 'checkbox',
                                             defaultValue: true,
                                             templateOptions: { label: 'Attach standard output?',
                                                                description: 'Attach standard output (STDOUT) from container to host'}
                                           },
                                           { key: 'AttachStderr',
                                             type: 'checkbox',
                                             defaultValue: true,
                                             templateOptions: { label: 'Attach standard error?',
                                                                description: 'Attach standard error (STDERR) from container to host' }
                                             },
                                             { key: 'Tty',
                                               type: 'checkbox',
                                               defaultValue: false,
                                               templateOptions: { label: 'Attach standard streams to tty?',
                                                                  description: 'Attach standard streams to a tty, including stdin if it is not closed'}
                                             },
                                             { key: 'OpenStdin',
                                               type: 'checkbox',
                                               defaultValue: false,
                                               templateOptions: { label: 'Open standard input?',
                                                                  description: 'Open the standard input stream'}
                                             },
                                             { key: 'StdinOnce',
                                               type: 'checkbox',
                                               defaultValue: false,
                                               templateOptions: { label: 'Close standard input once?',
                                                                  description: 'Close standard input after the 1 attached client disconnects'}
                                             } ];
    }]);