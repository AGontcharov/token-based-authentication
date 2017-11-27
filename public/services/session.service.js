(function() {
  'use strict';

  angular
    .module('app')
    .service('session', session);

  function session() {

    this.create = function(user) {
      this.username = user.username;
    };

    this.destroy = function() {
      this.username = null;
    };

    return this;
  }
})();