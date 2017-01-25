'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('MainCtrl', function ($scope, $timeout, $location,
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
          width: 34,
          enableCellEdit: false,
          enableHiding: false, cellTemplate:'../scripts/site/views/ui-grid-edit-btn.html' }
      ]
    };

   var param = { query : '' };
   var query = '{}';
   param.query = query;

   param.limit = 25;
   param.skip = 0;
   $scope.sortConfig = { name: 'name', sort: { direction: "asc" } };

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

   $scope.getPage(25,1, $scope.sortConfig);
   //$scope.clients = Restangular.all("clients").getList().$object;


  });
