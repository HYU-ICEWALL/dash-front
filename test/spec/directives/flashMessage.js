'use strict';

describe('Directive: flashMessage', function () {

  // load the directive's module
  beforeEach(module('dashApp'));

  var element,
    scope;
  var $timeout;

  beforeEach(inject(function ($rootScope, _$timeout_) {
    scope = $rootScope.$new();
    $timeout = _$timeout_;
  }));

  it('should make element handle the event which is given as attribute', inject(function ($compile) {
    element = angular.element('<div flash-message flash-event-name="timetableDeleted">' +
      '<strong>성공!</strong> 시간표가 삭제되었습니다.' +
    '</div>');
    element = $compile(element)(scope);
    expect(jQuery(element)).toHaveClass('flash-message');
    spyOn(jQuery.fn, 'fadeIn').andCallThrough();
    spyOn(jQuery.fn, 'fadeOut').andCallThrough();
    //expect(element.text()).toBe('this is the flashMessage directive');
    scope.$broadcast('timetableDeleted');
    expect(jQuery.fn.fadeIn).toHaveBeenCalled();
    $timeout.flush();
    expect(jQuery.fn.fadeOut).toHaveBeenCalled();
  }));
});
