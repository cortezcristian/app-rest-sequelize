'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:ClientsEditCtrl
 * @description
 * # ClientsEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('ClientsEditCtrl', function ($scope, $location, $log, $timeout, toastr, Restangular, clients,
    $http, $rootScope) {
  $scope.operation = "Edit";

  var original = clients;
  $scope.clients = Restangular.copy(original);

  // Providers list
  $scope.providers_list = [];
  $scope.providers_relationships = [];

  $scope.$watchCollection('providers_list', function(){
    $log.log("List changed in Edit: ", $scope.providers_list);
  });

  $scope.$watchCollection('providers_relationships', function(){
    $log.log("Grab provider relationships : ", $scope.providers_relationships);
  });

  $scope.getProviders = function() {
    $scope.providers_relationships = Restangular.all("clientproviders").getList({ ClientId: $scope.clients.id }).$object;
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
    $scope.clients.put().then(function(c) {
      $log.log(c, $scope.providers_list);
      // Iterate and save relationships sending that to the new endpoint
      if(angular.isDefined(c.id) && $scope.providers_list.length > 0) {
        var list = $scope.providers_list.map(function(a){ return a.id;}).join(',');
        $http.get($rootScope.config.app_api+'add-providers-to-clients/'+c.id+'/'+list)
          .then(function(response) {
            $log.log("Add providers to clients:", response);
            toastr.info('Client info was edited', 'Operation Success');
            $timeout(function(){
              $location.path('/crud/clients');
            }, 1000);
          });
      } else {
        // No relationships to save
        toastr.info('Client info was edited', 'Operation Success');
        $timeout(function(){
          $location.path('/crud/clients');
        }, 1000);
      }
    });
  };
});
