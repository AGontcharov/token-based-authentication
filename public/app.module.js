(function() {
  'use strict';

  angular
    .module('app', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', config]);

  function config($routeProvider, $locationProvider) {
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
  }

})();