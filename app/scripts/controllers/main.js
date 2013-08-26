'use strict';

angular.module('dashApp')
.controller('MainCtrl', ['$scope', '$location', 'Account', '$dialog',
  function ($scope, $location, Account, $dialog) {
    Account.checkSignIn();

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
      signUpDialog.open();
    };
  }]);
