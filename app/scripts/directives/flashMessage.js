'use strict';

angular.module('dashApp')
.directive('flashMessage', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      var element = jQuery(element);
      element.addClass('flash');
      element.hide();

      scope.$on(attrs.flashEventName, function () {
        element.fadeIn();
        $timeout(function () {
          element.fadeOut();
        }, 1500);
      });
    }
  };
}]);
