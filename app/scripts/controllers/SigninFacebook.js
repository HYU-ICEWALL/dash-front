'use strict';

angular.module('dashApp')
.controller('SigninFacebookCtrl', ['$scope', '$window', 'Account', 'Facebook',
function ($scope, $window, Account, Facebook) {
  $scope.signInFacebook = function () {
    $scope.isModalOpen = true;
  };

  $scope.closeModal = function () {
    $scope.isModalOpen = false;
  };

  $scope.urlForLoginDialog = Facebook.urlForLoginDialog;

  $scope.$on('fbsuccess', function () {
    $scope.closeModal();
    Account.checkSignIn();
  });
}]);
