'use strict';

angular.module('dashApp')
.controller('CreateCtrl', ['$scope', 'storedContext', 'Class',
function ($scope, storedContext, Class) {
  var convertStoredClassCart = function (classCart) {
    angular.forEach(classCart, function (entity) {
      //
    });
  };

  $scope.classCart = convertStoredClassCart(storedContext.classCart);
  $scope.excludedTime = storedContext.excludedTime;
  $scope.options = storedContext.options;
}]);
