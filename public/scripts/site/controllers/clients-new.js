'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:ClientesNewCtrl
 * @description
 * # ClientesNewCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('ClientesNewCtrl', function ($scope, $timeout, $location, Restangular, toastr) {
  $scope.operatoria = "Alta";
  $scope.save = function(formData) {
    var data = {};
    angular.forEach(formData, function (value, key) {
        if(typeof value === 'object' && value.hasOwnProperty('$modelValue')) {
            data[key] = value.$modelValue;
        }
    });

    Restangular.all('clientes').post(data).then(function(clientes) {  
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/clientes";
      } else {
        toastr.info('Alta de Clientes Satisfactoria', 'Operación Exitosa');
        $timeout(function(){
             $location.path('/crud/clientes');
        }, 2000);
      }
    });
  }
});
