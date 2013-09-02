'use strict';

describe('Filter: majorName', function () {

  // load the filter's module
  beforeEach(module('dashApp'));

  // initialize a new instance of the filter before each test
  var majorName;
  var MajorInfo;
  var $timeout;

  beforeEach(module(function ($provide) {
    $provide.factory('MajorInfo', ['$q', function ($q) {
      var getMajorsInfo = function () {
        console.log('getMajorsInfo');
        return $q.when([
          {name: '컴퓨터공학부', code: 'H3HADD'},
          {name: '소프트웨어전공', code: 'H3HADD010'},
          {name: '컴퓨터전공', code: 'H3HADD020'}
        ]);
      };

      return {
        getMajorsInfo: getMajorsInfo
      };
    }]);
  }));

  beforeEach(inject(function ($filter, _$timeout_, _MajorInfo_) {
    $timeout = _$timeout_;
    MajorInfo = _MajorInfo_;
    majorName = $filter('majorName');
  }));

  it('should return the name of major', function () {
    var code = 'H3HADD';

    $timeout.flush();
    expect(majorName(code)).toBe('컴퓨터공학부');

    /*MajorInfo.getMajorsInfo().then(function (majors) {
      console.log(majors);

    });*/
  });

});
