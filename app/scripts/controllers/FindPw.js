'use strict';

angular.module('dashApp')
.controller('FindpwCtrl', ['$scope',function ($scope) {

  $scope.findPassword = function () {
    $scope.shouldBeOpen = true;
  };

  $scope.closeModal = function () {
    $scope.shouldBeOpen = false;
    $scope.email=undefined;
  };

  $scope.items = ['item1', 'item2'];

  $scope.opts = {
    backdropFade: true,
    dialogFade:true
  };

}]);
