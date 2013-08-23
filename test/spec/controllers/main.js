'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('dashApp'));

  var controller,
    MainCtrl,
    rootScope,
    scope,
    location,
    httpBackend,
    Account;

  var userId;
  var userInfo;

  function injectToController() {
    MainCtrl = controller('MainCtrl', {
      $scope: scope,
      Account: Account,
      $location: location
    });
  }

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location, $q) {
    controller = $controller;
    rootScope = $rootScope;
    scope = $rootScope.$new();
    location = $location;

    function updateUserInfo() {
      if (userId == 1) {
        return $q.when(true);
      } else {
        return $q.reject('failed to retrieve user information: sign in required');
      }
    }

    function getUserId() {
      if (userId == 1) {
        return $q.when(1);
      } else {
        return $q.reject('failed to retrieve user id: sign in required');
      }
    }

    Account = {
      getUserId: getUserId,
      checkSignIn: function () {
        getUserId()
        .then(function () {
          return updateUserInfo();
        })
        .then(function (result) {
          if (result) {
            location.path('/dash/');
          }
        });
      },
      updateUserInfo: updateUserInfo
    };

    spyOn(Account, 'checkSignIn').andCallThrough();
  }));

  it('should redirect to dash page if the user has signed in', function () {
    userId = 1;
    injectToController();

    expect(Account.checkSignIn).toHaveBeenCalled();

    rootScope.$apply();

    expect(location.path()).toBe('/dash/');
  });
});
