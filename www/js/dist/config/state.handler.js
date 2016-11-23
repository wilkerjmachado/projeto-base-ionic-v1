(function() {
    'use strict';

    angular
        .module('app')
        .factory('stateHandler', stateHandler);

    stateHandler.$inject = ['$rootScope'];

    function stateHandler($rootScope) {

        function initialize() {

            var stateChangeStart = $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState) {

              $rootScope.toState = toState;
              $rootScope.toStateParams = toStateParams;
              $rootScope.fromState = fromState;

            });

            var stateChangeSuccess = $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
              $rootScope.previousState = { route: fromState, routeParams: fromParams }
            });

            $rootScope.$on('$destroy', function () {
                if(angular.isDefined(stateChangeStart) && stateChangeStart !== null){
                    stateChangeStart();
                }
                if(angular.isDefined(stateChangeSuccess) && stateChangeSuccess !== null){
                    stateChangeSuccess();
                }
            });
        }

        return {
            initialize: initialize
        };
    }
})();
