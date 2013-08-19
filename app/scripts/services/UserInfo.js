'use strict';

angular.module('dashApp')
.factory('UserInfo', ['$http', '$q', function ($http, $q) {
  // Service logic
  // ...
  
  var userId;
  var userInfo = null;

  function updateUserInfo() {
    if (typeof userId !== 'undefined') {
      $http.get('/member/' + userId, {responseType: 'json'})
      .success(function (data) {
        userInfo = data;
      });
    }
  }

  // Public API here
  return {
    signIn: function (username, password) {
      var credential = $.param({username: username, password: password});
      var deferred = $q.defer();

      $http.post('/login', credential, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType: 'json'
      })
      .success(function (data) {
        userId = data.id;

        updateUserInfo();

        deferred.resolve(true);
      })
      .error(function (data, status) {
        if (status === 401) {
          deferred.resolve(false);
        } else {
          deferred.reject('Sign in failed due to server error.');
        }
      });

      return deferred.promise;
    },

    getUserInfo: function () {
      return userInfo;
    }
  };
}]);
