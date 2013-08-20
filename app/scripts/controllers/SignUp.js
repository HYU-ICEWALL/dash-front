/* jshint -W106 */
'use strict';

angular.module('dashApp')
.controller('SignupCtrl', ['$scope', 'dialog', 'UserInfo',
  function ($scope, dialog, UserInfo) {
    $scope.majors = [
      {text: '컴퓨터공학부', value: 'H3HADD'},
      {text: '컴퓨터전공', value: 'H3HADDA'},
      {text: '소프트웨어전공', value: 'H3HADDB'}
    ];

    $scope.closeModal = function () {
      //$scope.$parent.signUpModalOpen = false;
      dialog.close();
    };

    $scope.signUp = function () {
      var form = $scope.signup_form;

      return UserInfo.signUp({
        email: form.email,
        password: form.password,
        major: form.major
      });
    };

  }]);
