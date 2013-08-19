'use strict';

angular.module('dashApp')
.controller('SigninCtrl', ['$scope', 'UserInfo', function ($scope, UserInfo) {
  this.signIn = function (username, password) {
    return UserInfo.signIn(username, password);
  };
}]);
