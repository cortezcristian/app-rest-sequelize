'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:ModalRemoveInstanceCtrl
 * @description
 * # ModalRemoveInstanceCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('ModalRemoveInstanceCtrl', function ($scope, $modalInstance, items, $filter) {
      $scope.items = items;

      $scope.ok = function () {
        $modalInstance.close($scope.items);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  });
