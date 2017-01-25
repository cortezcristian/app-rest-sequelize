'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:ClientesEditCtrl
 * @description
 * # ClientesEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('ClientesEditCtrl', function ($scope, $location, $timeout, toastr, Restangular, clientes) {
  $scope.operatoria = "Editar";
  var original = clientes;
  $scope.clientes = Restangular.copy(original);
  

  $scope.isClean = function() {
    return angular.equals(original, $scope.clientes);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/clientes";
      } else {
        $location.path('/crud/clientes');
      }
    });
  };

  $scope.save = function() {
    $scope.clientes.put().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/clientes";
      } else {
        toastr.info('Modificación de Clientes Satisfactoria', 'Operación Exitosa');
        $timeout(function(){
             $location.path('/crud/clientes');
        }, 2000);
      }
    });
  };
});
