/**
 * Created by wilkerjmachado on 30/08/16.
 */
(function() {
  'use strict';

  angular.module('app').run(run);

  run.$inject = ['$ionicPlatform', 'stateHandler'];

  function run($ionicPlatform, stateHandler) {

    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.backgroundColorByHexString('#0B8045');
      }

    });

    stateHandler.initialize();

  };

})();
