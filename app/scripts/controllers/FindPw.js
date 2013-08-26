'use strict';

angular.module('dashApp')
.controller('FindpwCtrl', ['$scope', 'Account', 'StringResource', 'Utils', function ($scope, Account, StringResource, Utils) {

  var STR = StringResource.UI.EDIT_USERINFO;
  $scope.email=undefined;
  $scope.findPwErrorOccurred = false;
  $scope.findPwError = '';

  $scope.openModal = function () {
    $scope.shouldBeOpen = true;
  };

  $scope.closeModal = function () {
    $scope.shouldBeOpen = false;
    $scope.email=undefined;
  };

  $scope.findPassword = function() {
    Account.findPw({
      email: $scope.email
    }).then(function(){
      window.alert("해당 이메일로 비밀번호가 전송되었습니다.");
      $scope.closeModal();
    }, function (reason) {
      $scope.findPwErrorOccurred = true;
      if (reason.indexOf('can\'t find the account with such email address') != -1) {
        $scope.findPwError = STR.ERROR.INCORRECT_EMAIL;
      } else {
        var code = Utils.getHttpCodeFromErrorReason(reason);
        $scope.findPwError = Utils.reasonHttpError(code);
      }
    });
  };

  $scope.opts = {
    backdropFade: true,
    dialogFade:true
  };

}]);
