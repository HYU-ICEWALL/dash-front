'use strict';

describe('Controller: NavBarCtrl', function () {

  // load the controller's module
  beforeEach(module('dashApp'));

  var NavbarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavbarCtrl = $controller('NavBarCtrl', {
      $scope: scope
    });
  }));
});
