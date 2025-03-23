``javascript
(function() {
    'use strict';

    // Define the AngularJS module (if it doesn't exist, create it)
    var app = angular.module('yourApp', []); // Replace 'yourApp' with your app name
    
    // Create the service to fetch the token
    app.service('appTokenService', appTokenService);

    appTokenService.$inject = ['$http', '$q'];

    function appTokenService($http, $q) {
        var service = {
            getAppToken: getAppToken
        };

        return service;

        function getAppToken() {
            var deferred = $q.defer();

            $http.get('/path/to/endpoint') // Replace with your endpoint
                .then(function(response) {
                    var token = response.headers('X-App-Fcrtkn');
                    deferred.resolve(token);
                })
                .catch(function(error){
                   deferred.reject(error);
                });

            return deferred.promise;
        }
    }
    
    // Create a controller to use the service
    app.controller('MyController', MyController);

    MyController.$inject = ['$scope', 'appTokenService'];

    function MyController($scope, appTokenService) {
        var vm = this;
        vm.myToken;
        
        vm.getToken = function(){
            appTokenService.getAppToken()
                .then(function(token) {
                    vm.myToken = token;
                    console.log('Token:', vm.myToken);
                }).catch(function(error){
                    console.error(error);
                });
        }
       
        vm.getToken();
    }
})();
