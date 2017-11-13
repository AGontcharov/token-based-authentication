(function() {
  'use strict';

  angular
    .module('app')
    .controller('home', ['session', home]);

  function home(session) {
    var vm = this;

    activate();

    function activate() {
      vm.username = session.username;
    }
  }
})();