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

  function cbSuccessfulSignIn(deferred) {
    return function (data) {
      userId = data.id;
      updateUserInfo();
      deferred.resolve(true);
    };
  }

  function cbErrorFor(task, status, deferred) {
    if (typeof task !== 'string') {
      status = task;
      task = '';
    }

    if (typeof status === 'number') {
      var code = status;
      status = [code];
    }

    return function (d, s) {
      var resolved = false;

      $.each(status, function (index) {
        if (s === status[index]) {
          deferred.resolve(false);
          resolved = true;
          return false;
        }
      });

      if (!resolved) {
        deferred.reject(
          ((task !== '') ? task + ' ' : task) +
          'failed due to server error'
        );
      }
    };
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
      .success(cbSuccessfulSignIn(deferred))
      .error(cbErrorFor('sign in', 401, deferred));
      /*
      .error(function (data, status) {
        if (status === 401) {
          deferred.resolve(false);
        } else {
          deferred.reject('Sign in failed due to server error.');
        }
      });
      */

      return deferred.promise;
    },

    signUp: function (data) {
      var deferred = $q.defer();

      $http.post('/member', data, {responseType: 'json'})
      .success(cbSuccessfulSignIn(deferred))
      .error(cbErrorFor('sign up', 400, deferred));

      return deferred.promise;
    },

    getUserInfo: function () {
      return userInfo;
    }
  };
}]);
