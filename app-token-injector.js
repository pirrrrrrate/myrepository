(function () {
  'use strict';

  // Define the AngularJS module (use 'app' or create a new one)
  var app = angular.module('app', []);

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

      $http.get('/v1/user/checkEmail?cacheTime=1742769583195') // **Correct endpoint**
        .then(function (response) {
          var token = response.headers('X-App-Fcrtkn');
          deferred.resolve(token);
        })
        .catch(function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }
  }
  // Run the getAppToken function immediately
  app.run(['appTokenService', function (appTokenService) {
    appTokenService.getAppToken()
      .then(function (token) {
        console.log('Token:', token);
      })
      .catch(function (error) {
        console.error('Error getting token:', error);
      });
  }]);
})();
