'use strict';

angular.module('dashApp')
.controller('TimetablesCtrl', ['$scope', 'timetables', 'Timetable', 'StringResource',
function ($scope, timetables, Timetable, StringResource) {
  var limit;
  limit = 20;

  $scope.timetables = timetables;
  $scope.loadMoreTimetables = function () {
    Timetable.query(
      {limit: limit, offset: $scope.timetables.length},
      function (tts) {
        $scope.timetables = $scope.timetables.concat(tts);
      }
    );
  };

  $scope.viewMode = 'list';

  $scope.$watch('viewMode', function (mode) {
    var urlFor = StringResource.VIEW.DASH.TIMETABLES.LEFT_COLUMN.urlFor;
    switch (mode) {
    case 'gallery':
      $scope.viewTemplateUrl = urlFor('gallery.html');
      break;
    case 'gallery-extended':
      $scope.viewTemplateUrl = urlFor('gallery-extended.html');
      break;
    case 'list':
    default:
      $scope.viewTemplateUrl = urlFor('list.html');
    }
  });
}]);
