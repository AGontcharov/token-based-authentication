(function() {
  'use strict';

  angular
    .module('app')
    .service('session', session);

  function session() {

    this.create = function(username) {
      this.username = username ;
    };

    this.destroy = function() {
      this.username = null;
    };

    return this;
  }
})();