'use strict';

describe('Directive: scrollbar', function () {

  // load the directive's module
  beforeEach(module('dashApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<scrollbar></scrollbar>');
    element = $compile(element)(scope);
    expect(element.hasClass('ps-container')).toBe(true);
  }));
});
