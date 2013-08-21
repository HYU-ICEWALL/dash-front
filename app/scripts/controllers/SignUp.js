/* jshint -W106 */
'use strict';

angular.module('dashApp')
.controller('SignupCtrl', ['$scope', 'dialog', 'UserInfo',
  function ($scope, dialog, UserInfo) {
    $scope.modalTitle = "회원 가입";
    $scope.modalDoneButtonValue = "가입";
    $scope.placeholder = {
      curr_password: "",
      password: "암호",
      confirm_password: ""
    };
    $scope.isSignUpForm = true;

    $scope.userinfo = {};

    $scope.majors = [
      {text: '컴퓨터공학부', value: 'H3HADD'},
      {text: '컴퓨터전공', value: 'H3HADDA'},
      {text: '소프트웨어전공', value: 'H3HADDB'}
    ];

    $scope.closeModal = function () {
      //$scope.$parent.signUpModalOpen = false;
      dialog.close();
    };

    $scope.submit = function () {
      var userinfo = $scope.userinfo;

      return UserInfo.signUp({
        email: userinfo.email,
        password: userinfo.password,
        major: userinfo.major
      });
    };

  }]);
