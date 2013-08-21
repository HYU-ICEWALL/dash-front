'use strict';

angular.module('dashApp', ['ui.bootstrap', 'ui.select2', 'ui.validate', 'ui.state'])
/*  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });*/
    .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('dash', {
        url: '/dash/',
        templateUrl: 'views/dash.html',
        controller: 'DashboardCtrl'
      });
  });
