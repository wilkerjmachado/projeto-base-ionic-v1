/**
 * Created by wilkerjmachado on 30/08/16.
 */
(function() {
  'use strict';

  angular.module('app').controller('AppCtrl', AppCtrl);

  AppCtrl.$inject = ['$scope', '$state', 'CONSTANTES', '$ionicHistory'];

  function AppCtrl ($scope, $state, CONSTANTES, $ionicHistory) {

    var vm = this;

    vm.nomeApp = CONSTANTES.NOME_APP;
    vm.versaoApp = CONSTANTES.VERSAO_APP;

    vm.goBack = function() {

      $ionicHistory.goBack();

    };

    vm.redirecionar = function(state){

      $state.go(state);
    }

  }
})();
