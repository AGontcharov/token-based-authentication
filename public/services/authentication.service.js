(function() {
  'use strict';

  angular
    .module('app')
    .factory('authentication', ['session', '$cookies', 'jwtHelper', authentication]);

  function authentication(session, $cookies, jwtHelper) {
    var service = {
      createSession: createSession,
      refreshSession: refreshSession,
      logout: logout
    };

    return service;

    function createSession(user) {
      session.create(user.username);
    }

    function refreshSession() {
      var token = $cookies.get('access-token');

      if (token) {
        var tokenPayload = jwtHelper.decodeToken(token);
        session.create(tokenPayload.username)
      }
    }

    function logout() {
      $cookies.remove('access-token');
      session.destroy();
    }
  }
})();