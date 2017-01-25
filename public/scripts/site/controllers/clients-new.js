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

  $scope.save = function(formData) {
    var data = {};
    angular.forEach(formData, function (value, key) {
        if(typeof value === 'object' && value.hasOwnProperty('$modelValue')) {
            data[key] = value.$modelValue;
        }
    });

    Restangular.all('clients').post(data).then(function(clients) {
      toastr.info('New client was created', 'Operation Success');
      $timeout(function(){
         $location.path('/crud/clients');
      }, 1000);
    });
  }
});
