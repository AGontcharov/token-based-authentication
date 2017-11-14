(function() {
  'use strict';

  angular
    .module('app')
    .controller('form', ['$location', 'userService', 'session', form]);

  function form($location, userService, session) {
    var vm = this;

    vm.register = register;
    vm.login = login;
    vm.switchTo = switchTo;
    vm.registerForm = true;

    function register() {
      userService.create(vm.account)
        .then(function() { 
          $location.path('/home');
          session.create(vm.account.username);
        })
        .catch(function() { vm.error = true; });
    }

    function login() {
      userService.authenticate(vm.credentials)
        .then(function() { 
          $location.path('/home');
          session.create(vm.credentials.username);
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