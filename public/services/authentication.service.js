(function() {
  'use strict';

  angular
    .module('app')
    .factory('authentication', ['session', '$cookies', authentication]);

  function authentication(session, $cookies) {
    var service = {
      createSession: createSession,
      refreshSession: refreshSession
    };

    function createSession(user) {
      session.create(user);
      $cookies.put('user', JSON.stringify(user));
    }

    function refreshSession() {
      var userSession = JSON.parse($cookies.get('user'));
      if (userSession) session.create(userSession);
    }

    return service;
  }
})();