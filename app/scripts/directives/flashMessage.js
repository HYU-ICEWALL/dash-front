'use strict';

angular.module('dashApp')
.directive('flashMessage', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      var element = jQuery(element);
      element.addClass('flash-message');
      element.hide();

      var duration = attrs.flashDuration || 1500;

      scope.$on(attrs.flashEventName, function () {
        element.fadeIn();
        $timeout(function () {
          element.fadeOut();
        }, duration);
      });
    }
  };
}]);
