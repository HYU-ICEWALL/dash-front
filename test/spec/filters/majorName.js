'use strict';

describe('Filter: majorName', function () {

  // load the filter's module
  beforeEach(module('dashApp'));

  // initialize a new instance of the filter before each test
  var majorName;
  beforeEach(inject(function ($filter) {
    majorName = $filter('majorName');
  }));

  it('should return the name of major', function () {
    var code = 'H3HADD';
    expect(majorName(code)).toBe('컴퓨터공학부');
  });

});
