'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:ClientsNewCtrl
 * @description
 * # ClientsNewCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('ClientsNewCtrl', function ($scope, $timeout, $location, Restangular, toastr) {
  $scope.operation = "Create";
  $scope.isSaving = false;

  $scope.save = function(formData) {
    if(!$scope.isSaving){
      $scope.isSaving = true;
      var data = {};
      angular.forEach(formData, function (value, key) {
          if(typeof value === 'object' && value.hasOwnProperty('$modelValue')) {
              data[key] = value.$modelValue;
          }
      });

      Restangular.all('clients').post(data).then(function(clients) {
        toastr.info('New client was created', 'Operation Success');
        $timeout(function(){
           $scope.isSaving = false;
           $location.path('/crud/clients');
        }, 1000);
      });
    }
  }
});
