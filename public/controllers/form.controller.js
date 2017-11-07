(function() {
  'use strict';

  angular
    .module('app')
    .controller('form', ['$location', 'userService', form]);

  function form($location, userService) {
    var vm = this;

    vm.register = register;
    vm.login = login;
    vm.switchTo = switchTo;
    vm.registerForm = true;

    function register() {
      console.log('account', vm.account);

      userService.create(vm.account)
        .then(function() { $location.path('/home'); })
        .catch(function() { vm.error = true; });
    }

    function login() {
      console.log('credentials', vm.credentials);

      userService.authenticate(vm.credentials)
        .then(function() { $location.path('/home'); })
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