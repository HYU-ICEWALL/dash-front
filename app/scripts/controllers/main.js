'use strict';

angular.module('dashApp')
.controller('MainCtrl', ['$scope', '$window', function ($scope, $window) {
  $scope.signUpModalOpen = false;

  $scope.signInDash = function () {
    $window.alert('sign in with dash account');
  };

  $scope.signUp = function () {
    $scope.signUpModalOpen = true;
  };
}]);
