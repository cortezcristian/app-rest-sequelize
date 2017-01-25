'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('MainCtrl', function ($scope) {

    // Grid Options
    $scope.gridOptions = {
      paginationPageSizes: [25, 50, 75, 2000],
      paginationPageSize: 25,
      // External
      useExternalPagination: true,
      useExternalSorting: true,
      useExternalFiltering: true,
      exporterMenuCsv: true,
      enableGridMenu: true,
      enableSorting: true,
      enableFiltering: true,
      columnDefs: [
        /* fields start */
        { field: 'name' },
        { field: 'email' },
        { field: 'phone' },
        { field: 'providers' },
        /* fields end */
        { field: 'edit', name: '',
          enableFiltering: false,
          enableSorting: false,
          enableColumnMenu: false,
          width: 34,
          enableCellEdit: false,
          enableHiding: false, cellTemplate:'../scripts/site/views/ui-grid-edit-btn.html' }
      ]
    };

  });
