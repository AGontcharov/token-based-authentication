(function() {
  'use strict';

  angular
    .module('app')
    .factory('userService', ['$http', '$q', userService]);

  function userService($http, $q) {
    
    const BASE_URL = '/api/v1';

    var service = {
      create: create,
      authenticate: authenticate,
      getAll: getAll,
      getRestricted: getRestricted
    };

    return service;

    function create(user) {
      return $http.post(BASE_URL + '/users', user)
        .then(successHandle)
        .catch(errorHandle);
    }

    function authenticate(user) {
      return $http.post(BASE_URL + '/login', user)
        .then(successHandle)
        .catch(errorHandle);
    }

    function getAll() {
      return $http.get(BASE_URL + '/users')
        .then(successHandle)
        .catch(errorHandle);
    }

    function getRestricted() {
      return $http.get(BASE_URL + '/restricted')
        .then(successHandle)
        .catch(errorHandle);
    }

    function successHandle(response) {
      return response.data;
    }

    function errorHandle(response) {
      return $q.reject(response);
    }
  }
})();