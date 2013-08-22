/**
 * @ngdoc object
 * @name dashApp.UserInfo
 * @requires $http, $q
 *
 * @description
 * Dash app의 사용자에 관한 정보를 보관하고, 처리하는 팩토리.
 */
'use strict';

angular.module('dashApp')
.factory('UserInfo', ['$http', '$q', function ($http, $q) {
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
    /**
     * @ngdoc method
     * @name dashApp.UserInfo#signIn
     * @description 계정 인증 정보를 전달한 사용자를 로그인시키고,
     * {@link dashApp.UserInfo UserInfo} 서비스가 보관중인 사용자 정보를 갱신하는 메서드.
     * @param  {string} username 로그인하는 계정의 사용자 이름.
     * @param  {string} password 로그인하는 계정의 암호.
     * @return {Promise} 로그인 결과가 전달될 promise 객체.
     * 인증 정보가 올바르다고 판단되어 로그인이 성공하면 `true`,
     * 인증 정보가 올바르지 않다고 판단되어 로그인이 실패하면 `false`로 resolve됨.
     * 이외의 문제로 서버와의 통신이 올바르게 이루어지지 않은 경우에는 에러 메시지로 reject됨.
     */
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

      return deferred.promise;
    },

    /**
     * @ngdoc method
     * @name dashApp.UserInfo#signUp
     * @description 새로운 사용자의 정보를 전달받아 서버에 등록하고,
     * {@link dashApp.UserInfo UserInfo} 서비스가 보관중인 사용자 정보를 갱신하는 메서드.
     * @param  {Object} data 새로운 사용자의 정보가 담긴 객체.
     *
     * 객체 속성:
     * - `email` – `{string}` – 이메일. 로그인 시에 사용.
     * - `password` – `{string}` – 암호. 로그인 시에 사용.
     * - `major` – `{string}` – 소속 전공.
     * - `fb_id` – `{string}` – 선택적임. Facebook ID.
     *
     * @return {Promise} 계정 생성 결과가 전달될 promise 객체.
     * 사용자 정보에 문제가 없다고 판단되어 계정 생성에 성공하면 `true`,
     * 사용자 정보에 문제가 있다고 판단되어 계정 생성에 실패하면 `false`로 resolve됨.
     * 이외의 문제로 서버와의 통신이 올바르게 이루어지지 않은 경우에는 에러 메시지로 reject됨.
     */
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
