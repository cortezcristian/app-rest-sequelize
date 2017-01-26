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
      transclude: true,
      templateUrl: '/scripts/site/views/providers-checklist.html',
      bindToController: true,
      scope: true,
      controller: function($scope, $log, $modal, Restangular, toastr, $q){
        $log.log('Parent Scope List', $scope.providers_list);
        $scope.newprovider = "";
        $scope.list = [];

        // Create
        $scope.createProvider = function(){
          if($scope.newprovider !== ""){
            Restangular.all('providers').post({name: $scope.newprovider}).then(function(providers) {
              toastr.info('New provider was created', 'Operation Success');
              $scope.newprovider = "";
              $scope.refreshProvidersList();
            });
          }
        }

        // Remove functionality
        $scope.confirmRemove = function (item) {
          var items = [];
          items.push(item);

          var modalInstance = $modal.open({
            //animation: $scope.animationsEnabled,
            templateUrl: '../scripts/site/views/modal-remove.html',
            controller: 'ModalRemoveInstanceCtrl',
            size: item,
            resolve: {
              items: function () {
                return items;
              }
            }
          });

          modalInstance.result.then(function (docs) {
            var prom = [];

            angular.forEach(docs, function(doc){
              prom.push(
                doc.remove().then(function() {
                  $log.log("Removed", doc);
                }));
            });

            $q.all(prom).then(function () {
              toastr.info('Provider was removed', 'Operation Success');
              $scope.refreshProvidersList();
            });

          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
        };

        // Edit
        $scope.startEdition = function(doc){
          doc.editing = true;
        }

        $scope.cancelEdition = function(doc){
          doc.editing = false;
        }

        $scope.changeProvider = function(doc, e) {
          doc.put().then(function() {
            toastr.info('Client info was edited', 'Operation Success');
            doc.editing = false;
            $scope.refreshProvidersList();
          });
        };

        $scope.keyPressProvider = function(doc, e) {
          if(e.keyCode == 13){
            e.preventDefault();
            e.stopPropagation();
            if(angular.isDefined(doc.id)) {
              $scope.changeProvider(doc, e);
            } else {
              $scope.createProvider();
            }
          }
        };

        // Fetch
        $scope.refreshProvidersList = function() {
          $scope.list = Restangular.all("providers").getList().$object;
        }

        // Watch Current List
        $scope.$watch('list', function(){
          $log.log("List changed: ", $scope.list);
          $scope.updateCheckedItems();
        });

        // Scan and Check
        $scope.updateCheckedItems = function(){
          $scope.$parent.providers_list = $scope.list.filter(function(elem){
            return elem.checked;
          });
          $log.log("Updated $parent.:", $scope.$parent.providers_list);
        }

        $scope.initializeCheckedItems = function(){
          // Iterate parent list
          angular.forEach($scope.$parent.providers_list, function(prov){
            angular.forEach($scope.list, function(p, i){
              if(p.id === prov.id){
                $scope.list[i].checked = true;
              }
            });
          });
          $scope.itemInitialized = true;
        };

        $scope.itemInitialized = false;
        // Watch Current List
        $scope.$parent.$watch('providers_list', function(){
          if(!$scope.itemInitialized){
            $log.log("Initialize from parent:", $scope.$parent.providers_list);
            $scope.initializeCheckedItems();
          }
        });

        // Fetch List
        $scope.refreshProvidersList();
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
