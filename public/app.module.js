(function() {
  'use strict';

  angular
    .module('app', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', config])
    .run(['$rootScope', 'session', run]);

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

  function run($rootScope, session) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      
      if (!session) {

      }
    });
  }

})();