'use strict';

angular.module('dashApp')
  .factory('MajorInfo', ['$http', '$q', function ($http, $q) {

    var majorsInfo;

    function updatesMajorsInfo() {
      var deferred = $q.defer();

      $http.get('/api/majors', {responseType:'json'})
      .success(function (data){
        majorsInfo = data;
        deferred.resolve(true);
      });

      return deferred.promise;
    }
    return{
      getMajorsInfo : function (){
        var deferred = $q.defer();

        function cbResolveInfo() {
          deferred.resolve(majorsInfo);
        }

        if (typeof majorsInfo === 'undefined') {
          var promise = updatesMajorsInfo();
          promise.then(cbResolveInfo);
        } else {
          cbResolveInfo();
        }

        return deferred.promise;
      }
    };

  }]);
