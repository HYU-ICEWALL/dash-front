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
    Account,
    majors,
    userId;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    Account = {
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
    majors = [
      {name: '컴퓨터공학부', code: 'H3HADD'},
      {name: '컴퓨터전공', code: 'H3HADDA'},
      {name: '소프트웨어전공', code: 'H3HADDB'}
    ];
    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope,
      Account: Account,
      dialog: {
        close: function () {}
      },
      majors: majors
    });
  }));

  it('should retrieve the list of majors from server', function () {
    expect(majors).toEqualData([
      {name: '컴퓨터공학부', code: 'H3HADD'},
      {name: '컴퓨터전공', code: 'H3HADDA'},
      {name: '소프트웨어전공', code: 'H3HADDB'}
    ]);
  })

  it('should sign up successfully with valid information and acquire user information', function () {
    scope.userinfo_form = {};
    scope.userinfo_form.email = 'somebody@example.com';
    scope.userinfo_form.password = '1234';
    scope.userinfo_form.major = 'H3HADD';

    var promise = scope.submit();

    promise.then(function (res) {
      expect(res).toBeTruthy();
      expect(Account.getUserInfo()).toEqualData({"major": "H3HADD", "email": "somebody@example.com", "fb_id": "fbid"});
    });
  });

  it('should fail signing up with invalid information', function () {
    scope.userinfo_form = {};
    scope.userinfo_form.email = 'somebody@example.';
    scope.userinfo_form.password = '1234';
    scope.userinfo_form.major = 'H3HADD';

    var promise = scope.submit();

    promise.then(function (res) {
      expect(res).toBeFalsy();
      expect(Account.getUserInfo()).toBeNull();
    });
  });
});
