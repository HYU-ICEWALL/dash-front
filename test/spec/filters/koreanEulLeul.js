'use strict';

describe('Filter: koreanEulLeul', function () {

  // load the filter's module
  beforeEach(module('dashApp'));

  // initialize a new instance of the filter before each test
  var koreanEulLeul;
  beforeEach(inject(function ($filter) {
    koreanEulLeul = $filter('koreanEulLeul');
  }));

  it('should return original string if the last character of given string is not Hangul', function () {
    var text = 'angularjs';
    expect(koreanEulLeul(text)).toBe('angularjs');
  });

  it('should add \'을\' if the last character of given string has Jong-sung', function () {
    var text = 'angularjs 쓰세요 꼭 쓰세요 두 번 쓰세용';
    expect(koreanEulLeul(text)).toBe('angularjs 쓰세요 꼭 쓰세요 두 번 쓰세용을');
  });

  it('should add \'를\' if the last character of given string does not have Jong-sung', function () {
    var text = 'angularjs 쓰세요 꼭 쓰세요 두 번 쓰세요';
    expect(koreanEulLeul(text)).toBe('angularjs 쓰세요 꼭 쓰세요 두 번 쓰세요를');
  });

});
