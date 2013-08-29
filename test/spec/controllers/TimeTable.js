'use strict';

describe('Controller: TimetableCtrl', function () {

  // load the controller's module
  beforeEach(module('dashApp'));

  var TimetableCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TimetableCtrl = $controller('TimetableCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
