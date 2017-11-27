(function() {
  'use strict';

  angular
    .module('app')
    .controller('home', ['session', 'userService', home]);

  function home(session, userService) {
    var vm = this;

    vm.getProtected = getProtected;

    activate();

    function getProtected() {
      userService.getProtected()
        .then( function(response) { vm.secret = response.message; }).
        catch( function() {} );
    }

    function activate() {
      vm.username = session.username;
    }
  }
})();