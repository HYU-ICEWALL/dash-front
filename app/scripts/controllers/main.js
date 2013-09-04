'use strict';

angular.module('dashApp')
.controller('MainCtrl', ['$scope', '$location', 'StringResource', 'Account', '$dialog',
  function ($scope, $location, StringResource, Account, $dialog) {
    Account.checkSignIn();

    var signUpDialog = $dialog.dialog({
      templateUrl: StringResource.VIEW.urlFor('userinfo_form.html'),
      controller:'SignupCtrl',
      resolve: {
        majors: ['MajorInfo', function (MajorInfo) {
          return MajorInfo.getMajorsInfo();
        }]
      }
    });


    $scope.signUp = function () {
      signUpDialog.open();
    };
  }]);
