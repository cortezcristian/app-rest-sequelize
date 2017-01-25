'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:ClientsEditCtrl
 * @description
 * # ClientsEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('ClientsEditCtrl', function ($scope, $location, $timeout, toastr, Restangular, clients) {
  $scope.operation = "Edit";

  var original = clients;
  $scope.clients = Restangular.copy(original);


  $scope.isClean = function() {
    return angular.equals(original, $scope.clients);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
      $location.path('/crud/clients');
    });
  };

  $scope.save = function() {
    $scope.clients.put().then(function() {
      toastr.info('Client info was edited', 'Operation Success');
      $timeout(function(){
        $location.path('/crud/clients');
      }, 1000);
    });
  };
});
