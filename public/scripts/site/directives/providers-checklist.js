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
      link: function postLink($scope, element, attrs) {
      }
    };
  });
