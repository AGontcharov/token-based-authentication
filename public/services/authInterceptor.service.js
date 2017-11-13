(function() {
  'use strict';

  angular
    .module('app')
    .factory('authInterceptor', ['session', '$location', '$injector', '$q', authInterceptor]);

  function authInterceptor(session, $location, $injector, $q) {

    return {

      'request': function(config) {

        console.log('session', session);

        if (session) {
          config.headers.Authorization = 'Bearer ' + session.token;
        }
        return config;
      },

      'responseError': function(response) {

        if (response.status === 401 || response.status === 403) {
          $location.path('/')
        }
        return $q.reject(response);
      }
    };
  }
})();