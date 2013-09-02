'use strict';

angular.module('dashApp')
  .filter('koreanEulLeul', function () {
    var getCaseMarker = function (str) {
      if (!str) {
        return '';
      }

      var lastChar = str[str.length - 1];
      var hangulRegex = /[가-힣]/;

      if (!hangulRegex.test(lastChar)) {
        return '';
      }

      var codeLastChar = lastChar.charCodeAt(0);

      if ((codeLastChar - parseInt('0xac00', 16)) % 28) {
        return '을';
      } else {
        return '를';
      }
    };

    return function (input, concat) {
      var caseMarker = getCaseMarker(input);

      if (typeof concat === 'undefined') {
        concat = true;
      }

      if (concat) {
        return input + caseMarker;
      } else {
        return caseMarker;
      }
    };
  });
