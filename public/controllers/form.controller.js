(function() {
  'use strict';

  angular
    .module('app')
    .controller('form', ['$location', 'userService', 'authentication', form]);

  function form($location, userService, authentication) {
    var vm = this;

    vm.register = register;
    vm.login = login;
    vm.switchTo = switchTo;
    vm.registerForm = true;

    function register() {
      userService.create(vm.account)
        .then(function() {
          $location.path('/home');
          authentication.createSession(vm.account);
        })
        .catch(function() { vm.error = true; });
    }

    function login() {
      userService.authenticate(vm.credentials)
        .then(function() {
          $location.path('/home');
          authentication.createSession(vm.credentials);
        })
        .catch(function() { vm.error = true; });
    }

    function switchTo(form) {
      vm.registerForm = false;
      vm.loginForm = false;
      vm.error = false;
      vm[form] = true;
    }
  }
})();