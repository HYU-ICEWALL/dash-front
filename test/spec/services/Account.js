'use strict';

describe('Service: Account', function () {

  // load the service's module
  beforeEach(module('dashApp'));

  // add a mock services which it depends on
  /*
  beforeEach(module(function ($provide) {
    $provide.factory('Utils', function () {
      return {
        handlerHttpError: function () {
          return true;
        }
      };
    });
  }));
  */

  // add a matcher
  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  // instantiate service
  var Account, httpBackend, rootScope, StringResource;
  beforeEach(inject(function (_Account_, _$httpBackend_, $rootScope, _StringResource_) {
    Account = _Account_;
    httpBackend = _$httpBackend_;
    rootScope = $rootScope;
    StringResource = _StringResource_;
  }));

  it('should get the ID of user if the user has signed in', function () {
    httpBackend.expectGET('/api/users/me')
      .respond(200, {"id": 1});

    var result;
    var promise = Account.getUserId();
    promise.then(function (res) {
      result = res;
    });

    httpBackend.flush();

    expect(result).toBe(1);
  });

  it('should not get the ID of user if the user has not signed in', function () {
    httpBackend.expectGET('/api/users/me')
      .respond(404);

    var reason;
    var promise = Account.getUserId();
    promise.then(function() {}, function (r) {
      reason = r;
    });

    httpBackend.flush();

    var signInErr = StringResource.ERROR.ACCOUNT.GET_USERID;
    var expectedReason = signInErr.prefix + signInErr.reasons[0].reason;
    expect(reason).toBe(expectedReason);
  });

  it('should return the user information if correct credential information is given', function () {
    httpBackend.expectPOST('/api/login', 'username=user&password=1234')
      .respond(200, {"id": 1});

    var result;
    var promise = Account.signIn('user', '1234');

    expect(Account.getUserInfo()).toBeNull();

    promise.then(function (res) {
      result = res;
    });

    httpBackend.expectGET('/api/users/me')
      .respond(200, {"id": "1", "major": "H3HADD", "email": "somebody@example.com", "fb_id": "fbid"});

    httpBackend.flush();

    expect(result).toBeTruthy();
    expect(Account.getUserInfo()).toEqualData({"id": "1", "major": "H3HADD", "email": "somebody@example.com", "fb_id": "fbid"});
  });

  it('should reject if incorrect credential information is given', function () {
    httpBackend.expectPOST('/api/login', 'username=user&password=4321')
      .respond(401);

    var result;
    var promise = Account.signIn('user', '4321');
    var reason;

    expect(Account.getUserInfo()).toBeNull();

    promise.then(
      function () {},
      function (r) {
        reason = r;
      }
    );

    httpBackend.flush();

    var signInErr = StringResource.ERROR.ACCOUNT.SIGNIN;
    var expectedReason = signInErr.prefix + signInErr.reasons[0].reason;
    expect(reason).toBe(expectedReason);
    expect(Account.getUserInfo()).toBeNull();
  });

  it('should return the new user information if valid form data is passed', function () {
    httpBackend.expectPOST('/api/users', {
      "email": "somebody@example.com",
      "password": "1234",
      "major": "H3HADD"
    })
    .respond(200, {"id": 1});

    var result;
    var promise = Account.signUp({
      "email": "somebody@example.com",
      "password": "1234",
      "major": "H3HADD"
    });

    expect(Account.getUserInfo()).toBeNull();

    promise.then(function (res) {
      result = res;
    });

    httpBackend.expectGET('/api/users/me')
      .respond(200, {"id": "1", "major": "H3HADD", "email": "somebody@example.com", "fb_id": "fbid"});

    httpBackend.flush();

    expect(result).toBeTruthy();
    expect(Account.getUserInfo()).toEqualData({"id": "1", "major": "H3HADD", "email": "somebody@example.com", "fb_id": "fbid"});
  });

  it('should edit user\s info', function(){
    httpBackend.expectPOST('/api/login', 'username=user&password=1234')
      .respond(200, {"id": 1});
    httpBackend.expectGET('/api/users/me')
      .respond(200, {"id": "1", "major": "H3HADD", "email": "somebody@example.com", "fb_id": "fbid"});

    var promise = Account.signIn('user', '1234');
    var result;

    promise.then(function (res) {
      result = res;
    });

    httpBackend.flush();

    expect(result).toBeTruthy();

    httpBackend.expectPUT('/api/users/me',{
      major : 'example2',
      email : 'cde@example.kr',
      password : 'newpassword',
    }).respond(200);
    httpBackend.expectGET('/api/users/me')
    .respond(200, {"id": "1", "major": "example2", "email": "cde@example.kr", "fb_id": "fbid"});

    promise = Account.editUserInfo({
      major : 'example2',
      email : 'cde@example.kr',
      password : 'newpassword',
    });

    promise.then(function (res) {
      result = res;
    });

    httpBackend.flush();

    expect(result).toBeTruthy();
    expect(Account.getUserInfo()).toEqualData({
      "id": "1", "major": "example2", "email": "cde@example.kr", "fb_id": "fbid"
    });
  });

  it('should delete account when the user passed correct password', function () {
    httpBackend.expectPOST('/api/login', 'username=user&password=1234')
      .respond(200, {"id": 1});
    httpBackend.expectGET('/api/users/me')
      .respond(200, {"id": "1", "major": "H3HADD", "email": "somebody@example.com", "fb_id": "fbid"});

    var promise = Account.signIn('user', '1234');
    var result;

    promise.then(function (res) {
      result = res;
    });

    httpBackend.flush();

    expect(result).toBeTruthy();

    httpBackend.expect('DELETE', '/api/users/me', 'password=1234').respond(204);
    promise = Account.deleteAccount({ password: '1234'});
    promise.then(function (res) {
      result = res;
    })

    httpBackend.flush();

    expect(result).toBeTruthy();
  });

  it('should send email if email exist in database', function () {
    var c = $.param({
      email : 'abc@example.com'
    });
    httpBackend.expectPOST('/api/reset_password',c).respond(200);
    var promise = Account.findPw({ email: 'abc@example.com'});
    var result;
    promise.then(function (res) {
      result = res;
    });

    httpBackend.flush();

    expect(result).toBeTruthy();
  });

  it('should reject request when user not exist', function () {
    var c = $.param({
      email : 'def@example.com'
    });
    httpBackend.expectPOST('/api/reset_password',c).respond(404);
    var promise = Account.findPw({ email: 'def@example.com'});
    var result;
    promise.then(function (res) {
      result = res;
    });

    httpBackend.flush();

    expect(result).toBeFalsy();
  })

});
