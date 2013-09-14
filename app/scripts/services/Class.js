'use strict';

angular.module('dashApp')
.factory('Class', ['$resource', function ($resource) {
  return $resource('api/classes/:classNo', {classNo: '@classNo'});
}]);
