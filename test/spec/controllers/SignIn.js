'use strict';

describe('Controller: SigninCtrl', function () {

  // load the controller's module
  beforeEach(module('dashApp'));

  var SigninCtrl,
    scope,
    Account,
    httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, _$httpBackend_) {
    scope = $rootScope.$new();
    Account = {
      signIn: function(username, password) {
        var deferred = $q.defer();

        if (username == 'user' && password == '1234') {
          deferred.resolve(true);
        } else {
          deferred.resolve(false);
        }

        return deferred.promise;
      }
    };
    SigninCtrl = $controller('SigninCtrl', {
      $scope: scope,
      Account: Account
    });
    httpBackend = _$httpBackend_;
  }));

/*  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });*/

  it('should sign the user in only when correct credential info was given', function() {
    var promise;

    promise = SigninCtrl.signIn('user', '1234');
    promise.then(function (res) {
      expect(res).toBeTruthy();
    });

    promise = SigninCtrl.signIn('user', '5678');
    promise.then(function (res) {
      expect(res).toBeFalsy();
    });

    promise = SigninCtrl.signIn('resu', '1234');
    promise.then(function (res) {
      expect(res).toBeFalsy();
    });
  });
});
