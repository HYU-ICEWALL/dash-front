'use strict';

describe('Controller: FindpwCtrl', function () {

  // load the controller's module
  beforeEach(module('dashApp'));

  var FindpwCtrl,
  	scope,
  	Account,
  	httpBackend,
  	rootScope;

  var existEmail = "abc@example.com";
  var status, dialog;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    rootScope = $rootScope;
    scope = $rootScope.$new();

    Account = {
    	findPw : function(c){
        var deferred = $q.defer();
        var email = c.email;

	      if(email == existEmail && status == 200){
          deferred.resolve(true);
        }
        else {
          if (status == 404) {
            deferred.reject('failed to send email: can\'t find the account with such email address');
          } else {
            deferred.reject('failed to send email: HTTP ' + status);
          }
        }
        return deferred.promise;
    	}

    }

    dialog = jasmine.createSpyObj('dialog', ['closeModal']);

    FindpwCtrl = $controller('FindpwCtrl', {
      $scope: scope,
      Account: Account
    });

  }));

  it('should show ok alert page and closeModal', function () {
  	scope.email='abc@example.com';
  	status = 200;

    scope.openModal();
  	scope.findPassword();

  	rootScope.$apply();

  	expect(scope.findPwErrorOccurred).toBeFalsy();
  	expect(scope.shouldBeOpen).toBeFalsy();
  });

  it('should show error message if user passed the incorrect email', function () {
  	scope.email='def@example.com';
  	status = 404;

    scope.openModal();
  	scope.findPassword();

  	rootScope.$apply();

    expect(scope.shouldBeOpen).toBeTruthy();
  	expect(scope.findPwErrorOccurred).toBeTruthy();
  	expect(scope.findPwError).toBe('잘못된 이메일입니다.');
  });

  it('should show error message if an error occured during transfer', function () {
  	scope.email='def@example.com';
  	status = 500;

    scope.openModal();
  	scope.findPassword();

  	rootScope.$apply();

    expect(scope.shouldBeOpen).toBeTruthy();
  	expect(scope.findPwErrorOccurred).toBeTruthy();
  	expect(scope.findPwError).toBe('오류가 발생했습니다. HTTP 응답 코드는 ' + status + '입니다.');

  });
});