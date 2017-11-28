(function() {
  'use strict';

  angular
    .module('app', ['ngRoute', 'ngCookies', 'angular-jwt'])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', config])
    .run(['$rootScope', '$location', 'session', 'authentication', run]);

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
        controllerAs: 'vm',
        resolve: {

          // How should I be storing/checking login state?
          loggedIn: ['$q', '$cookies', function($q, $cookies) {
            var deferred = $q.defer();

            if ($cookies.get('access-token')) deferred.resolve();
            else deferred.reject('Unathorized');

            return deferred.promise;
          }]
        }
      })
      .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  }

  function run($rootScope, $location, session, authentication) {

    // On route start
    $rootScope.$on('$routeChangeStart', function(event, next, current) {

      // Refresh user session
      if (!session.username) authentication.refreshSession();
    });

    // Check route instantce errors here => Unathorized, Forbidden, 404, w/e
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
      console.log(rejection);
      $location.path('/');
    });
  }
})();