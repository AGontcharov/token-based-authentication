(function() {
  'use strict';

  angular
    .module('app')
    .service('session', session);

  function session() {

    this.create = function(username, token) {
      this.username = username;
      this.token = token;
    };

    this.destroy = function() {
      this.username = null;
      this.token = null;
    };

    return this;
  }
})();