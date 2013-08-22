/**
 * @ngdoc object
 * @name dashApp
 * @requires ui.bootstrap
 * @requires ui.select2
 * @requires ui.validate
 * @requires ui.state
 *
 * @description
 * 우주최강 대학교 시간표 서비스 프레임워크 Dash의 프론트엔드 Angular 앱 모듈.
 */
'use strict';

angular.module('dashApp', ['ui.bootstrap', 'ui.select2', 'ui.validate', 'ui.state'])
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