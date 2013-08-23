'use strict';

angular.module('dashApp')
.controller('MainCtrl', ['$scope', '$window', '$dialog',
  function ($scope, $window, $dialog) {
    $scope.signUpModalOpen = false;

    $scope.signInDash = function () {
      $window.alert('sign in with dash account');
    };

    var signUpDialog = $dialog.dialog({
      templateUrl: 'views/userinfo_form.html',
      controller:'SignupCtrl',
      resolve: {
        majors: function (MajorInfo) {
          return MajorInfo.getMajorsInfo();
        }
      }
    });

    $scope.signUp = function () {
      //$scope.signUpModalOpen = true;
      signUpDialog.open();
    };
  }]);
