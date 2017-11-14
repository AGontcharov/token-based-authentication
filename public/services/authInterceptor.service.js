(function() {
  'use strict';

  angular
    .module('app')
    .factory('authInterceptor', ['$cookies', '$location', '$q', authInterceptor]);

  function authInterceptor($cookies, $location, $q) {

    return {

      'request': function(config) {

        config.headers = config.headers || {};

        var token = $cookies.get('access-token');
        console.log('token:', token);

        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },

      'responseError': function(response) {

        if (response.status === 401 || response.status === 403) {
          $location.path('/');
        }
        return $q.reject(response);
      }
    };
  }
})();