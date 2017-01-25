'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:ClientsCtrl
 * @description
 * # ClientsCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('ClientsCtrl', function ($scope, $timeout, $location,
    $http, $rootScope, $q, $log, $modal, toastr, Restangular) {

    // Selection counter
    $scope.multipleSelected = 0;

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
          width: 120,
          enableCellEdit: false,
          enableHiding: false, cellTemplate:'../scripts/site/views/ui-grid-edit-btn.html' }
      ]
    };

   // Query builders
   var param = { query : '' };
   var query = '{}';
   param.query = query;

   param.limit = 25;
   param.skip = 0;
   $scope.sortConfig = { name: 'name', sort: { direction: "asc" } };

   // Main Data Fetch
   $scope.getPage = function(pageSize, newPage, sortOpts, filterOpts) {
     param.limit = pageSize;
     param.skip = (newPage-1)*param.limit;
     var param_count = {};
     // unselect checked
     $scope.multipleSelected=0;
     if($scope.gridOptions) {
         $timeout(function(){
            $(".ui-grid-all-selected, .ui-grid-icon-minus-squared").click();
         }, 400);
         //$scope.gridOptions.$gridScope['allSelected'] = false;
     }

     if(sortOpts && sortOpts != null) {
       param.sort = {};
       //param.sort[sortOpts.name] = (sortOpts.sort.direction === "asc") ? 1 : 0;
       param.sort = ((sortOpts.sort.direction === "asc") ? "" : "-")+sortOpts.name;
     }

     if(filterOpts && filterOpts != null) {
       angular.forEach(filterOpts, function(col){
         //console.log(col.field, col.filters[0].term)
         if(col.filters[0].term){
           param[col.field] = '~'+col.filters[0].term;
           param_count[col.field] = '~'+col.filters[0].term;
         }
         if((typeof col.filters[0].term !== "string"
             && col.filters[0].term === "")
             || col.filters[0].term == null){
             // Clear all parameters with empty string
             delete param[col.field];
             delete param_count[col.field];
         }
       });
     } else if($scope.gridOptions && $scope.gridOptions.columnDefs ) {
       angular.forEach($scope.gridOptions.columnDefs, function(col){
         // Clear all parameters just in case
         delete param[col.field];
         delete param_count[col.field];
       });

     }

     param_count.q = "100";
     //param_count.query = query;
     // Count Total
     $http.get($rootScope.config.app_api+'clients?count=100')//, {params: param_count})
      .then(function(response) {
       $scope.gridOptions.totalItems = response.data.count;
       $scope.gridOptions.data = Restangular.all("clients").getList(param).$object;
     });
   };

   // Fetch for the first time
   $scope.getPage(25,1, $scope.sortConfig);
   //$scope.clients = Restangular.all("clients").getList().$object;

   // Remove functionality
   $scope.confirmRemove = function (size) {

    var modalInstance = $modal.open({
      //animation: $scope.animationsEnabled,
      templateUrl: '../scripts/site/views/modal-remove.html',
      controller: 'ModalRemoveInstanceCtrl',
      size: size,
      resolve: {
        valor: function(){ return 'nombre'; },
        extra: function(){ return '';},
        items: function () {
          return $scope.gridApi.selection.getSelectedRows();
        }
      }
    });

    modalInstance.result.then(function (docs) {
      var n = 0;
      var prom = [];

      angular.forEach(docs, function(doc){
        prom.push(
          doc.remove().then(function() {
            var index = $scope.gridOptions.data.indexOf(doc);
            $log.log("Removed", index);
            if (index !== -1) {
                $scope.gridOptions.data.splice(index, 1);
                n++;
            }
          }));
      });

      $q.all(prom).then(function () {
          $scope.multipleSelected -= n;
          toastr.info(' '+n+' documentos borrados', 'Operación Exitosa');
      });

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
   };


   // Edit Trigger
   $scope.editRow = function (grid, row) {
        // Redirect to edit
        $timeout(function(){
            $location.path('/crud/clients-edit/'+row.entity.id);
        }, 1000)
   };


   // Registered grid apis

   $scope.gridOptions.onRegisterApi = function(gridApi){
      //set gridApi on scope
      $scope.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        var msg = 'row selected ' + row.isSelected;
        $log.log(msg);
        if(row.isSelected) {
            $scope.multipleSelected++;
        } else {
            $scope.multipleSelected--;
        }
      });

      gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
        var msg = 'rows changed ' + rows.length;
        $log.log(msg);
        if(rows[0].isSelected){
            $scope.multipleSelected += rows.length;
        } else {
            $scope.multipleSelected -= rows.length;
        }
      });

      // External Filtering
      // http://ui-grid.info/docs/#/tutorial/308_external_filtering
      $scope.gridApi.core.on.filterChanged( $scope, function() {
        var grid = this.grid;

        // Go to 1st page
        grid.options.paginationCurrentPage = 1;
        // Sort Global Config

        $scope.getPage(
            grid.options.paginationPageSize,
            grid.options.paginationCurrentPage,
            $scope.sortConfig,
            grid.columns);
      });

      // External Sort
      // http://ui-grid.info/docs/#/tutorial/307_external_sorting
      $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
        var grid = this.grid;
        var sortOpts;
        if (sortColumns && sortColumns.length > 0) {
          sortOpts = sortColumns[0];
        } else {
          sortOpts = null;
        }
        // Go to 1st page
        grid.options.paginationCurrentPage = 1;
        // Sort Global Config
        $scope.sortConfig = sortOpts;

        $scope.getPage(
            grid.options.paginationPageSize,
            grid.options.paginationCurrentPage,
            sortOpts,
            grid.columns);
      });

      // External Pagination
      // http://ui-grid.info/docs/#/tutorial/314_external_pagination
      gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
        var grid = this.grid;
        $scope.gridOptions.pageNumber = newPage;
        $scope.gridOptions.pageSize = pageSize;

        $scope.getPage(pageSize, newPage,
            $scope.sortConfig, grid.columns);

      });
    };


  });
