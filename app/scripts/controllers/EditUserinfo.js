/* jshint -W106 */
'use strict';

angular.module('dashApp')
.controller('EditUserinfoCtrl', [
  '$scope', '$location', 'StringResource', 'Utils',
  'dialog', 'Account', 'majors',
  function ($scope, $location, StringResource,
            Utils, dialog, Account, majors) {
    var STR = StringResource.UI.EDIT_USERINFO;
    $scope.modalDoneButtonValue = STR.DONE_BUTTON;
    $scope.placeholder = {
      curr_password: STR.PLACEHOLDER.CURR_PASSWORD,
      password: STR.PLACEHOLDER.PASSWORD,
      confirm_password: STR.PLACEHOLDER.CONFIRM_PASSWORD
    };
    $scope.isSignUpForm = false;

    $scope.majors = majors;

    $scope.userinfo = $.extend({}, Account.getUserInfo());
    $scope.userinfo.confirm_email = $scope.userinfo.email;

    $scope.closeModal = function () {
      dialog.close();
      return false;
    };

    $scope.submit = function () {
      var promise = Account.editUserInfo($scope.userinfo);
      return promise.then(function (){
        dialog.close();
        return true;
      });
    };

    $scope.askingDelete = false;
    $scope.deletePassword = '';
    $scope.deleteErrorOccurred = false;
    $scope.deleteError = '';

    var title = {
      edit: STR.TITLE.EDIT,
      delete: STR.TITLE.DELETE
    };

    $scope.$watch('askingDelete', function (newVal) {
      if (newVal === true) {
        $scope.modalTitle = title.delete;
      } else {
        $scope.modalTitle = title.edit;
      }
    });

    $scope.deleteAccount = function () {
      Account.deleteAccount({
        password: $scope.deletePassword
      }).then(function () {
        $scope.askingDelete = false;
        dialog.close();
        $location.path('/');
      }, function (reason) {
        $scope.deleteErrorOccurred = true;
        if (reason.indexOf('invalid credential information') !== -1) {
          $scope.deleteError = STR.ERROR.INCORRECT_PASSWORD;
        } else {
          var code = Utils.getHttpCodeFromErrorReason(reason);
          $scope.deleteError = Utils.reasonHttpError(code);
        }
      });
    };
  }
]);
