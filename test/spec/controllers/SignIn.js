'use strict';

describe('Controller: SigninCtrl', function () {

  // load the controller's module
  beforeEach(module('dashApp'));

  var SigninCtrl,
    scope,
    UserInfo;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserInfo = {
      signIn: function(username, password) {
        if (username == 'user' && password == '1234') {
          return true;
        } else {
          return false;
        }
      }
    };
    SigninCtrl = $controller('SigninCtrl', {
      $scope: scope,
      UserInfo: UserInfo
    });
  }));

/*  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });*/

  it('should sign the user in only when correct credential info was given', function() {
    expect(SigninCtrl.signIn('user', '1234')).toBeTruthy();
    expect(SigninCtrl.signIn('user', '5678')).toBeFalsy();
    expect(SigninCtrl.signIn('resu', '1234')).toBeFalsy();
  });
});
