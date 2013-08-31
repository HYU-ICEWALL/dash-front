'use strict';

angular.module('dashApp')
.factory('Timetable', ['$resource', function ($resource) {
  // Public API here
  return $resource('api/users/me/timetables/:ttId', {ttId: '@id'});
}]);
