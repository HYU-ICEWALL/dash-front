/* jshint -W106 */
'use strict';

angular.module('dashApp')
.controller('SignupCtrl', [
  '$scope', 'dialog', 'Account', 'majors',
  function ($scope, dialog, Account, majors) {
    $scope.majors = majors;

    $scope.modalTitle = '회원 가입';
    $scope.modalDoneButtonValue = '가입';
    $scope.placeholder = {
      curr_password: '',
      password: '암호',
      confirm_password: ''
    };
    $scope.isSignUpForm = true;

    $scope.userinfo = {};

    $scope.closeModal = function () {
      dialog.close();
    };

    $scope.submit = function () {
      var userinfo = $scope.userinfo;

      return Account.signUp({
        email: userinfo.email,
        password: userinfo.password,
        major: userinfo.major
      });
    };
  }
]);
