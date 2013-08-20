'use strict';

describe('Controller: SignupCtrl', function () {

  // load the controller's module
  beforeEach(module('dashApp'));

  // add a matcher
  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  var SignupCtrl,
    scope,
    UserInfo,
    userId;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    UserInfo = {
      signUp: function (data) {
        var deferred = $q.defer();
        if (data.email == 'somebody@example.com' &&
            typeof data.password !== 'undefined' &&
            typeof data.major !== 'undefined') {
          userId = 1;
          deferred.resolve(true);
        } else {
          userId = undefined;
          deferred.resolve(false);
        }
        return deferred.promise;
      },
      getUserInfo: function () {
        if (userId == 1) {
          return {"major": "H3HADD", "email": "somebody@example.com", "fb_id": "fbid"};
        } else {
          return null;
        }
      }
    };
    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope,
      UserInfo: UserInfo,
      dialog: {
        close: function () {}
      }
    });
  }));

  it('should sign up successfully with valid information and acquire user information', function () {
    scope.signup_form = {};
    scope.signup_form.email = 'somebody@example.com';
    scope.signup_form.password = '1234';
    scope.signup_form.major = 'H3HADD';

    var promise = scope.signUp();

    promise.then(function (res) {
      expect(res).toBeTruthy();
      expect(UserInfo.getUserInfo()).toEqualData({"major": "H3HADD", "email": "somebody@example.com", "fb_id": "fbid"});
    });
  });

  it('should fail signing up with invalid information', function () {
    scope.signup_form = {};
    scope.signup_form.email = 'somebody@example.';
    scope.signup_form.password = '1234';
    scope.signup_form.major = 'H3HADD';

    var promise = scope.signUp();

    promise.then(function (res) {
      expect(res).toBeFalsy();
      expect(UserInfo.getUserInfo()).toBeNull();
    });
  });
});
