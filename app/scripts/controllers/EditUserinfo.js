'use strict';

angular.module('dashApp')
  .controller('EditUserinfoCtrl', ['$scope', 'dialog', 'UserInfo',
    function ($scope, dialog, UserInfo) {
      $scope.modalTitle = "회원 정보 수정";
      $scope.modalDoneButtonValue = "완료";
      $scope.placeholder = {
        curr_password: "현재 암호",
        password: "새 암호",
        confirm_password: "새 암호 확인"
      };
      $scope.isSignUpForm = false;

      $scope.userinfo = $.extend({}, UserInfo.getUserInfo());
      $scope.userinfo.confirm_email = $scope.userinfo.email;

      /*$scope.email = $scope.confirm_email = 'email';
      $scope.major = 'major';*/

      $scope.closeModal = function () {
        //$scope.$parent.signUpModalOpen = false;
        dialog.close();
        return false;
      };

      $scope.submit = function() {
        var promise = UserInfo.editUserInfo($scope.userinfo);
        return promise.then(function (res){
          dialog.close();
          return true;
        });
      }
    }]);
