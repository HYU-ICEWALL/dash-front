'use strict';

angular.module('dashApp')
.directive('scrollbar', function () {
  var postLink = function (scope, element) {
    element = jQuery(element);

    scope.$apply(function () {
      element.perfectScrollbar();
    });

    scope.$on('update', function () {
      element.perfectScrollbar('update');
    });
  };

  return {
    template: '<div ng-transclude></div>',
    transclude: true,
    restrict: 'EA',
    link: postLink
  };
});
