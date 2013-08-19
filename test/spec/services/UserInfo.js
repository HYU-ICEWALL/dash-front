'use strict';

describe('Service: UserInfo', function () {

  // load the service's module
  beforeEach(module('dashApp'));

  // add a matcher
  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  // instantiate service
  var UserInfo, httpBackend;
  beforeEach(inject(function (_UserInfo_, _$httpBackend_) {
    UserInfo = _UserInfo_;
    httpBackend = _$httpBackend_;
  }));

  it('should return the user information if correct credential information is given', function () {
    httpBackend.expectPOST('/login', 'username=user&password=1234')
      .respond(200, {"id": 1});

    var result;
    var promise = UserInfo.signIn('user', '1234');

    expect(UserInfo.getUserInfo()).toBeNull();

    promise.then(function (res) {
      result = res;
    });

    httpBackend.expectGET('/member/1')
      .respond(200, {"major": "H3HADD", "email": "somebody@example.com", "fb_id": "fbid"});

    httpBackend.flush();

    expect(result).toBeTruthy();
    expect(UserInfo.getUserInfo()).toEqualData({"major": "H3HADD", "email": "somebody@example.com", "fb_id": "fbid"});
  });

  it('should return false if incorrect credential information is given', function () {
    httpBackend.expectPOST('/login', 'username=user&password=4321')
      .respond(401);

    var result;
    var promise = UserInfo.signIn('user', '4321');

    expect(UserInfo.getUserInfo()).toBeNull();

    promise.then(function (res) {
      result = res;
    });

    httpBackend.flush();

    expect(result).toBeFalsy();
    expect(UserInfo.getUserInfo()).toBeNull();
  });

});
