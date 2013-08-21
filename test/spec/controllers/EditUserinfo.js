'use strict';

describe('Controller: EditUserinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('dashApp'));

  var EdituserinfoCtrl,
    scope;
  var UserInfo, dialog;
  var userInfo = {
    email : 'abc@example.kr',
    major : 'example'
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    UserInfo = {
      getUserInfo : function(){
        return userInfo;
      },

      editUserInfo : function(data){
        var deferred = $q.defer();
        userInfo = data;
        deferred.resolve(true);
        return deferred.promise;
      }
    }

    dialog = jasmine.createSpyObj('dialog', ['close']);
    EdituserinfoCtrl = $controller('EditUserinfoCtrl', {
      $scope: scope,
      UserInfo : UserInfo,
      dialog : dialog
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
      dialog.close.toHaveBeenCalled();
    });
  })
});
