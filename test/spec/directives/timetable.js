'use strict';

describe('Directive: timetable', function () {
  beforeEach(module('dashApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<timetable></timetable>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the timetable directive');
  }));
});
