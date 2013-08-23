'use strict';

describe('Controller: SigninFacebookCtrl', function () {

  // load the controller's module
  beforeEach(module('dashApp'));

  var SigninfacebookCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SigninfacebookCtrl = $controller('SigninfacebookCtrl', {
      $scope: scope
    });
  }));
});
