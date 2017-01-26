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
            Restangular.all('providers').post({name: $scope.newprovider}).then(function(provider) {
              toastr.info('New provider was created', 'Operation Success');
              $scope.newprovider = "";
              //$scope.refreshProvidersList();
              // Push the new provider unchecked
              $scope.list.push(provider);
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
                  $scope.list.forEach(function(d, i){
                    if(d.id === doc.id){
                      //delete $scope.list[i];
                      $scope.list.splice(i, 1);
                    }
                  });
                }));
            });

            $q.all(prom).then(function () {
              toastr.info('Provider was removed', 'Operation Success');
              //$scope.refreshProvidersList();
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
            // resolve editing
            //$scope.refreshProvidersList();
            $scope.list.forEach(function(d, i){
              if(d.id === doc.id){
                // keep checked status
                doc.checked = d.checked;
                // swap them
                $scope.list[i] = doc;
              }
            });
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
        $scope.$watchCollection('list', function(){
          $log.log("List changed: ", $scope.list);
          $scope.updateCheckedItems();
          if($scope.$parent.providers_relationships
            && $scope.$parent.providers_relationships.length > 0
            && $scope.list.length > 0
            && !$scope.itemInitialized){
            $scope.initializeCheckedItems();
          }
        });

        // Fetch List
        $scope.refreshProvidersList();

        // Scan and Check
        $scope.updateCheckedItems = function(){
          // Propagate to parent
          $scope.$parent.providers_list = $scope.list.filter(function(elem){
            return elem.checked;
          });
          $log.log("Updated $parent.:", $scope.$parent.providers_list);
        }

        $scope.itemInitialized = false;
        $scope.initializeCheckedItems = function(){
          // Child list shuold be ready
          if($scope.list.length > 0){
            // Iterate parent list
            angular.forEach($scope.$parent.providers_relationships, function(prov){
              angular.forEach($scope.list, function(p, i){
                if(p.id === prov.ProviderId){
                  $scope.list[i].checked = true;
                }
              });
            });
            $scope.itemInitialized = true;
          }
        };

        /*
        // Watch Current List
        $scope.$parent.$watch('providers_list', function(){
          if(!$scope.itemInitialized){
            $log.log("Initialize from parent:", $scope.$parent.providers_list);
            $scope.initializeCheckedItems();
          }
        });
        */
        // Watch Provider Relationships
        $scope.$parent.$watchCollection('providers_relationships', function(){
          $log.log("Client Grab provider relationships : ", $scope.providers_relationships);
          if( $scope.providers_relationships.length > 0) {
            $scope.initializeCheckedItems();
          }
        });



      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
