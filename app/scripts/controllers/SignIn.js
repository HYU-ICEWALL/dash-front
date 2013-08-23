'use strict';

angular.module('dashApp')
.controller('SigninCtrl', ['$scope', 'Account', function ($scope, Account) {
  this.signIn = function (username, password) {
    return Account.signIn(username, password);
  };
}]);
