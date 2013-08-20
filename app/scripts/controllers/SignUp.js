'use strict';

angular.module('dashApp')
.controller('SignupCtrl', ['$scope', 'dialog', 'UserInfo', 'MajorInfo',
  function ($scope, dialog, UserInfo, MajorInfo) {

    $scope.majors = MajorInfo.getMajorsInfo();

    $scope.closeModal = function () {
      //$scope.$parent.signUpModalOpen = false;
      dialog.close();
    };

    $scope.signUp = function () {
      return UserInfo.signUp({
        email: $scope.signup_form.email,
        password: $scope.signup_form.password,
        major: $scope.signup_form.major
      });
    };

  }]);
