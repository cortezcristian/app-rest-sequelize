'use strict';
/**
 * @ngdoc overview
 * @name anyandgoApp
 * @description
 * # anyandgoApp
 *
 * Main module of the application.
 */
angular
  .module('anyandgoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.grid',
    'ui.grid.expandable',
    'ui.grid.selection',
    'ui.grid.pinning',
    'ui.grid.pagination',
    'ui.grid.edit',
    'ui.grid.cellNav',
    'cfp.hotkeys',
    'toastr',
    'restangular'
  ])
  .config(function ($routeProvider, $locationProvider, RestangularProvider, hotkeysProvider, toastrConfig) {

    // Hotkeys killswitch
    // see https://github.com/chieffancypants/angular-hotkeys#configuration
    hotkeysProvider.includeCheatSheet = true;

    // Toastr Configuration
    angular.extend(toastrConfig, {
      autoDismiss: false,
      containerId: 'toast-container',
      maxOpened: 0,
      newestOnTop: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
      preventOpenDuplicates: false,
      target: 'body'
    });

    //$locationProvider.html5Mode(true).hashPrefix('!');
    //$cookies.lang = "en-us";
    $routeProvider
      .when('/', {
        templateUrl: '/scripts/site/views/clients.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(function ($rootScope, $location, $route, $timeout, $http, $cookies, $anchorScroll) {

    /*
    */

    $rootScope.config = {};
    $rootScope.config.app_url = $location.url();
    $rootScope.config.app_path = $location.path();
    $rootScope.layout = {};
    $rootScope.layout.loading = false;


    $rootScope.$on('$routeChangeStart', function () {
        console.log('$routeChangeStart');
        //show loading gif
        $timeout(function(){
          $rootScope.layout.loading = true;
        });
    });

    $rootScope.$on('$routeChangeSuccess', function () {
        console.log('$routeChangeSuccess');
        //hide loading gif
        $timeout(function(){
          $rootScope.layout.loading = false;
        }, 200);
    });
    $rootScope.$on('$routeChangeError', function () {

        //hide loading gif
        console.log('error');
        $rootScope.layout.loading = false;

    });


  });

