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
    'ui.bootstrap',
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

    // Setup Restangular
    RestangularProvider.setBaseUrl('/api/v1');

    //$locationProvider.html5Mode(true).hashPrefix('!');

    // Routes Setup
    $routeProvider
      .when('/', {
        templateUrl: '/scripts/site/views/clients.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  }).run(function ($rootScope, $location, $route, $timeout, $http, $cookies, $anchorScroll, $log) {

    /*
     * Global configs
    */

    $rootScope.config = {};
    $rootScope.config.app_url = $location.url();
    $rootScope.config.app_path = $location.path();
    $rootScope.config.app_domain = '';
    if($location.port()!=='80'){
        $rootScope.config.app_domain = $location.protocol() + "://" + $location.host() + ":" + $location.port()
    } else {
        $rootScope.config.app_domain = $location.protocol() + "://" + $location.host();
    }
    $rootScope.config.app_api = $rootScope.config.app_domain + '/api/v1/';
    $rootScope.layout = {};
    $rootScope.layout.loading = false;


    $rootScope.$on('$routeChangeStart', function () {
        $log.log('$routeChangeStart');
        //show loading gif
        $timeout(function(){
          $rootScope.layout.loading = true;
        });
    });

    $rootScope.$on('$routeChangeSuccess', function () {
        $log.log('$routeChangeSuccess');
        //hide loading gif
        $timeout(function(){
          $rootScope.layout.loading = false;
        }, 200);
    });
    $rootScope.$on('$routeChangeError', function () {

        //hide loading gif
        $log.log('error');
        $rootScope.layout.loading = false;

    });


  });

