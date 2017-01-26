'use strict';

/**
 * @ngdoc directive
 * @name anyandgoApp.directive:providersChecklist
 * @description
 * # providersChecklist
 */
angular.module('anyandgoApp')
  .directive('providersChecklist', function () {
    return {
      restrict: 'AC',
      templateUrl: '/scripts/site/views/providers-checklist.html',
      controller: function($scope, $log, Restangular, toastr){
        $log.log('Started!');
        $scope.newprovider = "";
        $scope.list = [];

        $scope.createProvider = function(){
          if($scope.newprovider !== ""){
            Restangular.all('providers').post({name: $scope.newprovider}).then(function(providers) {
              toastr.info('New provider was created', 'Operation Success');
              $scope.refreshProvidersList();
            });
          }
        }

        $scope.refreshProvidersList = function() {
          $scope.list = Restangular.all("providers").getList().$object;
        }

        // Fetch List
        $scope.refreshProvidersList();
      },
      link: function postLink($scope, element, attrs) {
      }
    };
  });
