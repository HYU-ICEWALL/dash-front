'use strict';

angular.module('dashApp')
.factory('MajorInfo', ['$http', '$q', 'StringResource', 'Utils',
function ($http, $q, StringResource, Utils) {
  var ERROR = StringResource.ERROR;
  var majorsInfo;

  function updatesMajorsInfo() {
    return $http.get('/api/majors', {responseType: 'json'})
    .then(function (response) {
      majorsInfo = response.data;
      return majorsInfo;
    },
    Utils.handlerHttpError(ERROR.MAJORINFO.UPDATE_MAJORSINFO));
  }

  return {
    getMajorsInfo : function () {
      if (typeof majorsInfo === 'undefined') {
        return updatesMajorsInfo();
      } else {
        return $q.when(majorsInfo);
      }
    },

    tempgetMajorsInfo : function() {
      return majorsInfo;
    }
  };
}]);
