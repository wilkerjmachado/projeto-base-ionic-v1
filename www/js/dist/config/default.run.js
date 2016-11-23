/**
 * Created by wilkerjmachado on 22/09/16.
 */

(function() {
  'use strict';

  angular.module('app').run(run);

  run.$inject = ['$rootScope', '$ionicPopup', '$ionicLoading'];

  function run($rootScope, $ionicPopup, $ionicLoading) {

    $rootScope.loading = function (status) {
      if (status) {
        $ionicLoading.show();
      } else {
        $ionicLoading.hide();
      }
    };

    $rootScope.$on('$stateChangeStart', function() {
      $rootScope.loading(true);
    });
    $rootScope.$on('$stateChangeSuccess', function(event) {
      $rootScope.loading(false);
    });

    $rootScope.showAlert = function (message, title) {
      var alertPopup = $ionicPopup.alert({
        title: title ? title : 'Alerta',
        template: message
      });
      alertPopup.then(function (res) {
        console.log('Ok');
      });
    };

    $rootScope.confirmDialog = function (message, funcao) {
      var popup = $ionicPopup.confirm({
        title: 'Confirmação',
        template: message,
        okText: 'Sim',
        cancelText: 'Não'
      });
      popup.then(function (res) {
        if (res) {
          funcao();
        } else {
          console.log('ok');
        }
      });
    };

  }

})();
