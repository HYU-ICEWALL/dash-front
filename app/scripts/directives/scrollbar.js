'use strict';

angular.module('dashApp')
.directive('scrollbar', function () {
  return {
    template: '<div ng-transclude></div>',
    transclude: true,
    restrict: 'EA',
    link: function postLink(scope, element, attrs) {
      element.perfectScrollbar();
      element.bind('update', function () {
        element.scrollTop(0);
        element.perfectScrollbar('update');
      });
    }
  };
})
.directive('repeatAndUpdate', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      if (scope.$last) {
        $timeout(function () {
          element.trigger('update');
        });
      }
    }
  };
}]);
