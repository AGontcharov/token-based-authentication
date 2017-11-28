(function() {
  'use strict';

  angular
    .module('app')
    .controller('home', ['$location', '$cookies', 'jwtHelper', 'session', 'userService', 'authentication', home]);

  function home($location, $cookies, jwtHelper, session, userService, authentication) {
    var vm = this;

    vm.getRestricted = getRestricted;
    vm.logout = logout;
    vm.isActive = isActive;

    activate();

    function isActive(viewLocation) {
      return viewLocation === $location.path();
    }

    function getRestricted() {
      userService.getRestricted()
        .then( function(response) { vm.secret = response.message; }).
        catch( function() {} );
    }

    function logout() {
      authentication.logout();
      $location.path('/');
    }

    function activate() {
      var token = $cookies.get('access-token');

      vm.username = session.username;
      vm.token = token;
      vm.payload = JSON.stringify(jwtHelper.decodeToken(token), null, 4);
    }
  }
})();