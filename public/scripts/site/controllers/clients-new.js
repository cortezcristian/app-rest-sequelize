'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:ClientsNewCtrl
 * @description
 * # ClientsNewCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('ClientsNewCtrl', function ($scope, $timeout, $location, Restangular, toastr,
    $http, $rootScope, $log) {
  $scope.operation = "Create";
  $scope.isSaving = false;

  // Providers list
  $scope.providers_list = [];

  $scope.save = function(formData) {
    if(!$scope.isSaving){
      $scope.isSaving = true;
      var data = {};
      angular.forEach(formData, function (value, key) {
          if(typeof value === 'object' && value.hasOwnProperty('$modelValue')) {
              data[key] = value.$modelValue;
          }
      });

      Restangular.all('clients').post(data).then(function(c) {
        $log.log(c, $scope.providers_list);
        // Iterate and save relationships sending that to the new endpoint
        if(angular.isDefined(c.id) && $scope.providers_list.length > 0) {
          var list = $scope.providers_list.map(function(a){ return a.id;}).join(',');
          $http.get($rootScope.config.app_api+'add-providers-to-clients/'+c.id+'/'+list)
            .then(function(response) {
              $log.log("Add providers to clients:", response);
              toastr.info('New client was created', 'Operation Success');
              $timeout(function(){
                 $scope.isSaving = false;
                 $location.path('/crud/clients');
              }, 1000);
            });
        } else {
          // No relationships to save
          toastr.info('New client was created', 'Operation Success');
          $timeout(function(){
             $scope.isSaving = false;
             $location.path('/crud/clients');
          }, 1000);
        }
      });
    }
  }
});
