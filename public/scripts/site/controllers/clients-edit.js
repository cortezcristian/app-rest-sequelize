'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:ClientsEditCtrl
 * @description
 * # ClientsEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('ClientsEditCtrl', function ($scope, $location, $log, $timeout, toastr, Restangular, clients) {
  $scope.operation = "Edit";

  var original = clients;
  $scope.clients = Restangular.copy(original);

  // Providers list
  $scope.providers_list = [];

  $scope.$watchCollection('providers_list', function(){
    $log.log("List changed in Edit: ", $scope.providers_list);
  });


  $scope.getProviders = function(){
    $scope.providers_list = Restangular.all("providers").getList().$object;
  }
  $scope.getProviders();

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
      // TODO: iterate and save relationships sending that to the new endpoint
      toastr.info('Client info was edited', 'Operation Success');
      $timeout(function(){
        $location.path('/crud/clients');
      }, 1000);
    });
  };
});
