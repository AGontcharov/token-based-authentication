(function() {
  'use strict';

  angular
    .module('app', ['ngRoute', 'ngCookies'])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', config])
    .run(['$rootScope', 'session', 'authentication', run]);

  function config($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/form.html',
        controller: 'form',
        controllerAs: 'vm'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'home',
        controllerAs: 'vm'
      })
      .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  }

  function run($rootScope, session, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {

      // Refresh user session
      if (!session.username) authentication.refreshSession();
    });
  }

})();