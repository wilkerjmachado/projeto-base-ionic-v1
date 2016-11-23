/**
 * Created by wilkerjmachado on 22/09/16.
 */

(function () {
  'use strict';

  angular.module('app').factory('httpInterceptor', httpInterceptor);

  httpInterceptor.$inject = ['$q', '$rootScope'];

  function httpInterceptor($q, $rootScope) {

    var xhrCreations = 0;
    var xhrResolutions = 0;

    var isLoading = function () {
      return xhrResolutions < xhrCreations;
    }

    var updateStatus = function () {
      $rootScope.loading(isLoading());
    }

    var errorMessage = function (error) {
      console.log(error);
      $rootScope.showAlert('Erro inesperado!');
    }

    return {
      request: function (config) {
        if (!config.naoExibirDialog) {
          xhrCreations++;
        }
        updateStatus();
        return config;
      },

      requestError: function (rejection) {
        if (!rejection.config.naoExibirDialog) {
          xhrResolutions++;
        }
        updateStatus();
        errorMessage(rejection);
        return $q.reject(rejection);
      },

      response: function (response) {
        if (!response.config.naoExibirDialog) {
          xhrResolutions++;
        }
        updateStatus();
        return response;

      },
      responseError: function (rejection) {
        if (!rejection.config.naoExibirDialog) {
          xhrResolutions++;
        }
        updateStatus();
        if (rejection.config.showExceptionFromServer) {
          errorMessage(rejection);
        }
        return $q.reject(rejection);
      }

    };
  }
})();

(function () {
  'use strict';

  angular.module('app').config(httpConfig);

  httpConfig.$inject = ['$httpProvider'];

  function httpConfig($httpProvider) {

    $httpProvider.interceptors.push('httpInterceptor');

  }
})();
