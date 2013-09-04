/* jshint -W106 */
/**
 * @ngdoc object
 * @name dashApp.factory:Account
 * @requires $http
 * @requires $q
 *
 * @description
 * Dash app의 사용자에 관한 정보를 보관하고, 처리하는 팩토리.
 *
 *
 */
'use strict';

angular.module('dashApp')
.factory('Account', ['$http', '$location', '$q', 'Utils', 'StringResource',
function ($http, $location, $q, Utils, StringResource) {
  var userId;
  var userInfo = null;
  var ERROR = StringResource.ERROR;

  function getUserId() {
    return $http.get('/api/users/me', { responseType: 'json' })
    .then(
      function (response) {
        var id = response.data.id;
        userId = id;
        return id;
      },
      Utils.handlerHttpError(ERROR.ACCOUNT.GET_USERID)
    );
  }

  function updateUserInfo() {
    if (typeof userId !== 'undefined') {
      return $http.get('/api/users/me', {responseType: 'json'})
      .then(function (response) {
        userInfo = angular.extend({}, response.data);
        userInfo.fb_id = userInfo.fb_id || null;
        return true;
      }, Utils.handlerHttpError(ERROR.ACCOUNT.UPDATE_USERINFO));
    } else {
      return $q.reject(ERROR.ACCOUNT.UPDATE_USERINFO.SIGNIN_REQUIRED);
    }
  }

  function cbSuccessfulSignIn() {
    return function (response) {
      userId = response.data.id;
      return updateUserInfo();
    };
  }

  // Public API here
  return {
    /**
     * @ngdoc method
     * @methodOf dashApp.factory:Account
     * @name dashApp.factory:Account#getUserId
     * @description 로그인한 사용자의 ID를 알아내어
     * {@link dashApp.factory:Account Account} 서비스가 보관중인
     * 사용자 ID와 사용자 정보를 갱신하는 메서드.
     * @return {Promise} 사용자의 ID로 resolve될 promise 객체.
     * 로그인하지 않은 상태이거나 이외의 원인에 의해 오류가 발생했으면 에러 메시지로 reject됨.
     */
    getUserId: getUserId,

    /**
     * @ngdoc method
     * @methodOf dashApp.factory:Account
     * @name dashApp.factory:Account#signIn
     * @description 계정 인증 정보를 전달한 사용자를 로그인시키고,
     * {@link dashApp.factory:Account Account} 서비스가 보관중인 사용자 정보를 갱신하는 메서드.
     * @param  {string} username 로그인하는 계정의 사용자 이름.
     * @param  {string} password 로그인하는 계정의 암호.
     * @return {Promise} 로그인 결과가 전달될 promise 객체.
     * 인증 정보가 올바르다고 판단되어 로그인이 성공하면 `true`,
     * 인증 정보가 올바르지 않다고 판단되어 로그인이 실패하면 `false`로 resolve됨.
     * 이외의 문제로 서버와의 통신이 올바르게 이루어지지 않은 경우에는 에러 메시지로 reject됨.
     */
    signIn: function (username, password) {
      var credential = $.param({username: username, password: password});

      return $http.post('/api/login', credential, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType: 'json'
      })
      .then(
        cbSuccessfulSignIn(),
        Utils.handlerHttpError(ERROR.ACCOUNT.SIGNIN)
      );
    },

    /**
     * @ngdoc method
     * @methodOf dashApp.factory:Account
     * @name dashApp.factory:Account#signUp
     * @description 새로운 사용자의 정보를 전달받아 서버에 등록하고,
     * {@link dashApp.factory:Account Account} 서비스가 보관중인 사용자 정보를 갱신하는 메서드.
     *
     * @param {object} data 새로운 사용자의 정보가 담긴 객체. 객체 속성:
     *
     *    - **email** – `{string}` – 이메일. 로그인 시에 사용.
     *    - **password** – `{string}` – 암호. 로그인 시에 사용.
     *    - **major** – `{string}` – 소속 전공.
     *    - **fb_id** – `{string}` – 선택적임. Facebook ID.
     *
     * @returns {Promise} 계정 생성 결과가 전달될 promise 객체.
     * 사용자 정보에 문제가 없다고 판단되어 계정 생성에 성공하면 `true`,
     * 사용자 정보에 문제가 있다고 판단되어 계정 생성에 실패하면 `false`로 resolve됨.
     * 이외의 문제로 서버와의 통신이 올바르게 이루어지지 않은 경우에는 에러 메시지로 reject됨.
     */
    signUp: function (data) {
      return $http.post('/api/users', data, {responseType: 'json'})
      .then(
        cbSuccessfulSignIn(),
        Utils.handlerHttpError(ERROR.ACCOUNT.SIGNUP)
      );
    },

    /**
     * @ngdoc method
     * @methodOf dashApp.factory:Account
     * @name dashApp.factory:Account#updateUserInfo
     * @description {@link dashApp.factory:Account Account} 서비스가
     *              보관중인 사용자 정보를 갱신하는 메서드.
     *
     * @returns {Promise} 계정 정보 갱신 결과가 전달될 promise 객체.
     * 성공하면 `true`로 resolve됨. 인증 상태에 문제가 있거나
     * 이외의 문제로 서버와의 통신이 올바르게 이루어지지 않은 경우에는 에러 메시지로 reject됨.
     */
    updateUserInfo: updateUserInfo,

    /**
     * @ngdoc method
     * @methodOf dashApp.factory:Account
     * @name dashApp.factory:Account#checkSignIn
     * @description {@link dashApp.factory:Account#getUserId getUserId()}
     *              메서드를 호출하여 사용자가 로그인한 상태인지 확인하고, 로그인한 상태이면 {@link
     *              dashApp.factory:Account#updateUserInfo updateUserInfo()}
     *              메서드를 호출한 다음 로그인 화면으로 이동하는 메서드.
     */
    checkSignIn: function () {
      getUserId()
      .then(function () {
        return updateUserInfo();
      })
      .then(function (result) {
        if (result) {
          $location.path('/dash/');
        }
      });
    },

    /**
     * @ngdoc method
     * @methodOf dashApp.factory:Account
     * @name dashApp.factory:Account#getUserInfo
     * @description 로그인한 사용자의 정보를 반환하는 메서드.
     *
     * @returns {object} data 로그인한 사용자의 정보가 담긴 객체. 객체 속성:
     *
     *    - **email** – `{string}` – 이메일. 로그인 시에 사용.
     *    - **password** – `{string}` – 암호. 로그인 시에 사용.
     *    - **major** – `{string}` – 소속 전공.
     *    - **fb_id** – `{string}` – Facebook ID.
     *      Facebook 계정과 연동되지 않은 계정인 경우에는 `null`.
     *
     *    로그인한 상태가 아니면 `null`을 반환.
     */
    getUserInfo: function () {
      return userInfo;
    },

    /**
     * @ngdoc method
     * @methodOf dashApp.factory:Account
     * @name dashApp.factory:Account#editUserInfo
     * @description 로그인한 사용자의 정보를 편집하고 보관중인 사용자 정보를 갱신하는 메서드.
     *
     * @param {object} data 로그인한 사용자의 새로운 정보가 담긴 객체. 객체 속성:
     *
     *    - **email** – `{string}` – 이메일. 로그인 시에 사용.
     *    - **password** – `{string}` – 암호. 로그인 시에 사용.
     *    - **major** – `{string}` – 소속 전공.
     *    - **fb_id** – `{string}` – Facebook ID. 선택적임.
     *
     *    정보가 변경되지 않는 필드에는 기존 정보가 제공되어야 한다.
     *
     * @returns {Promise} 로그인한 사용자의 정보가 성공적으로 편집되면 `true`로 resolve됨.
     *     편집에 실패한 경우, 전달된 정보에 문제가 있으면
     *     `'failed editing user information: invalid user information'`로,
     *     이외의 원인에 대해서는 실패한 부분에 대한 정보와 함께 HTTP 응답 코드로 reject함.
     *     후자의 경우에는
     *
     *     <pre>
     *       failed editing user information: HTTP 500
     *     </pre>
     *
     *     혹은
     *
     *     <pre>
     *       failed retrieving new user information: HTTP 500
     *     </pre>
     *
     *     와 같은 식으로 reject함.
     */
    editUserInfo: function (data) {
      var d = $.extend({}, data);
      delete d.confirm_email;
      delete d.confirm_password;

      return $http.put('/api/users/me' , d)
      .then(function () {
        return updateUserInfo();
      }, Utils.handlerHttpError(ERROR.ACCOUNT.EDIT_USERINFO));
    },

    /**
     * @ngdoc method
     * @methodOf dashApp.factory:Account
     * @name dashApp.factory:Account#deleteAccount
     * @description 로그인한 사용자의 계정을 삭제하는 메서드.
     *
     * @param {object} credential 로그인한 사용자의 계정을 삭제하기 위해
     *                            필요한 인증 정보가 담긴 객체.
     *                            객체 속성:
     *
     *    - **password** – `{string}` – 암호. 로그인 시에 사용.
     *
     * @returns {Promise} 로그인한 사용자의 계정이 성공적으로 삭제되면 `true`로 resolve됨.
     *     삭제에 실패한 경우, 전달된 인증 정보에 문제가 있으면
     *     `'failed deleting user account: invalid credential information'`로,
     *     이외의 원인에 대해서는
     *     `'failed deleting user account: HTTP 500'`과 같이 HTTP 응답 코드를
     *     포함하여 reject됨.
     */
    deleteAccount: function (credential) {
      var c = $.param(credential);
      return $http(
        {
          method : 'DELETE',
          url : '/api/users/me',
          data : c,
          headers : {'Content-Type' : 'application/json'}
        }
      )
      .then(function () {
        userInfo = null;
        return true;
      }, Utils.handlerHttpError(ERROR.ACCOUNT.DELETE_ACCOUNT));
    },


    findPw: function (email){
      var c = $.param(email);
      return $http.post('/api/reset_password', c)
      .then(function() {
        return true;
      }, Utils.handlerHttpError(ERROR.ACCOUNT.FIND_PASSWORD));
    }

  };
}]);
