'use strict';

angular.module('dashApp')
.factory('MajorInfo', ['$http', '$q', 'StringResource', 'Utils',
function ($http, $q, StringResource, Utils) {
  var ERROR = StringResource.ERROR;
  var majorsInfo;

  function updatesMajorsInfo() {
    return $http.get('api/majors', {responseType: 'json'})
    .then(function (response) {
      majorsInfo = response.data;
      return majorsInfo;
    },
    Utils.handlerHttpError(ERROR.MAJORINFO.UPDATE_MAJORSINFO));
  }

  return (function () {
    var publics = {};

    publics.getMajorsInfo = function () {
      if (typeof majorsInfo === 'undefined') {
        return updatesMajorsInfo();
      } else {
        return $q.when(majorsInfo);
      }
    };

    publics.getNameByCode = function (code) {
      return publics.getMajorsInfo()
      .then(function (majorsInfo) {
        var name;

        jQuery.each(majorsInfo, function (index, major) {
          if (major.code !== code) {
            return true;
          }

          name = major.name;
          return false;
        });

        return name;
      });
    };

    publics.tempgetMajorsInfo = function() {
      return majorsInfo;
    };

    return publics;
  })();
}]);
