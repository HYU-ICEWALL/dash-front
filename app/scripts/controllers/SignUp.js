/* jshint -W106 */
'use strict';

angular.module('dashApp')
.controller('SignupCtrl', ['$scope', 'dialog', 'UserInfo', 'MajorInfo',
  function ($scope, dialog, UserInfo, MajorInfo) {
    $scope.majors = MajorInfo.getMajorsInfo();
    $scope.modalTitle = "회원 가입";
    $scope.modalDoneButtonValue = "가입";
    $scope.placeholder = {
      curr_password: "",
      password: "암호",
      confirm_password: ""
    };
    $scope.isSignUpForm = true;

    $scope.userinfo = {};

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
