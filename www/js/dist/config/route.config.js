/**
 * Created by wilkerjmachado on 30/08/16.
 */
(function() {
  'use strict';

  angular.module('app').config(stateConfig);

  stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function stateConfig($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl',
        controllerAs: 'vm'
      })

      .state('app.pag1', {
        url: '/pag1',
        views: {
          'menuContent': {
            templateUrl: 'templates/pag1.html',
            controller: 'Pag1Ctrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('app.pag2', {
        url: '/pag2',
        views: {
          'menuContent': {
            templateUrl: 'templates/pag2.html',
            controller: 'Pag2Ctrl',
            controllerAs: 'vm'
          }
        }
      })


    $urlRouterProvider.otherwise('/pag1');

  }
})();
