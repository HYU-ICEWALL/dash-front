'use strict';

angular.module('dashApp')
.filter('majorName', ['$rootScope', 'MajorInfo',
function ($rootScope, MajorInfo) {
  var majorsInfo;

  MajorInfo.getMajorsInfo().then(function (mInfo) {
    majorsInfo = mInfo;
  });

  var majorNameCache = {};

  var getMajorNameByCode = function (code) {
    if (!!majorNameCache[code]) {
      return majorNameCache[code];
    }

    angular.forEach(majorsInfo, function (major) {
      if (major.code === code) {
        majorNameCache[code] = major.name;
        return major.name;
      }
    });

    return undefined;
  };

  return function (code) {
    return getMajorNameByCode(code);
  };
}]);
