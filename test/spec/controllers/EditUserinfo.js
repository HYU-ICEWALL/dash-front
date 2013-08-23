'use strict';

describe('Controller: EditUserinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('dashApp'));

  var EdituserinfoCtrl,
    scope;
  var rootScope;
  var Account, dialog;
  var location;
  var userInfo = {
    email : 'abc@example.kr',
    major : 'example'
  };
  var defaultpassword = "1234";
  var status;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, $location) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    Account = {
      getUserInfo : function(){
        return userInfo;
      },

      editUserInfo : function(data){
        var deferred = $q.defer();
        userInfo = data;
        deferred.resolve(true);
        return deferred.promise;
      },

      deleteAccount : function(c) {
        var deferred = $q.defer();
        var pwd = c.password;

        if(pwd == defaultpassword && status == 204){
          deferred.resolve(true);
        } else {
          if (status == 404) {
            deferred.reject('failed to delete user account: invalid credential information');
          } else {
            deferred.reject('failed to delete user account: HTTP ' + status);
          }
        }

        return deferred.promise;
      }
    }

    dialog = jasmine.createSpyObj('dialog', ['close']);
    location = $location;

    EdituserinfoCtrl = $controller('EditUserinfoCtrl', {
      $scope: scope,
      $location: location,
      Account : Account,
      dialog : dialog,
      majors: [
        {name: '컴퓨터공학부', code: 'H3HADD'},
        {name: '컴퓨터전공', code: 'H3HADDA'},
        {name: '소프트웨어전공', code: 'H3HADDB'}
      ]
    });
  }));

  it('should prepopulate user\'s information', function () {
    expect(scope.userinfo.email).toBe('abc@example.kr');
    expect(scope.userinfo.confirm_email).toBe('abc@example.kr');
    expect(scope.userinfo.major).toBe('example');
  });

  it('should transfer user\'s information and update user\'s edited information', function() {
    scope.userinfo.email = 'cde@example.kr';
    scope.userinfo.confirm_email = 'cde@example.kr';
    scope.userinfo.major = 'example2';

    var promise = scope.submit();
    promise.then(function (res) {
      expect(userInfo.email).toBe('cde@example.kr');
      expect(userInfo.major).toBe('example2');
      expect(res).toBeTruthy();
      expect(dialog.close).toHaveBeenCalled();
    });
    rootScope.$apply();
  });

  it('should delete account if the user passed the correct password', function () {
    scope.askingDelete = true;
    scope.deletePassword = '1234';
    status = 204;

    scope.deleteAccount();

    rootScope.$apply();

    expect(scope.askingDelete).toBeFalsy();
    expect(scope.deleteErrorOccurred).toBeFalsy();
    expect(dialog.close).toHaveBeenCalled();
    expect(location.path()).toBe("/");
  });

  it('should not delete account if the user passed the incorrect password', function () {
    scope.askingDelete = true;
    scope.deletePassword = '4321';
    status = 404;

    scope.deleteAccount();

    rootScope.$apply();

    expect(scope.askingDelete).toBeTruthy();
    expect(scope.deleteErrorOccurred).toBeTruthy();
    expect(scope.deleteError).toBe('잘못된 암호입니다.');
  });

  it('should not delete account if an error occured during transfer', function () {
    scope.askingDelete = true;
    scope.deletePassword = '4321';
    status = 500;

    scope.deleteAccount();

    rootScope.$apply();

    expect(scope.askingDelete).toBeTruthy();
    expect(scope.deleteErrorOccurred).toBeTruthy();
    expect(scope.deleteError).toBe('오류가 발생했습니다. HTTP 응답 코드는 ' + status + '입니다.');
  });
});
