'use strict';

describe('Service: MajorInfo', function () {

  // load the service's module
  beforeEach(module('dashApp'));

  // add a matcher
  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  // instantiate service
  var MajorInfo, httpBackend;
  beforeEach(inject(function (_MajorInfo_, _$httpBackend_) {
    MajorInfo = _MajorInfo_;
    httpBackend= _$httpBackend_;
  }));


  it('should get major list ', function () {
    httpBackend.expectGET('/major').respond(200, [
      {name: '컴퓨터공학부', code: 'H3HADD'},
      {name: '컴퓨터전공', code: 'H3HADDA'},
      {name: '소프트웨어전공', code: 'H3HADDB'}
    ]);

    var promise = MajorInfo.getMajorsInfo();
    var result;

    promise.then(function (res) {
      result = res;
    });

    httpBackend.flush();

    expect(result).toEqualData([
      {name: '컴퓨터공학부', code: 'H3HADD'},
      {name: '컴퓨터전공', code: 'H3HADDA'},
      {name: '소프트웨어전공', code: 'H3HADDB'}
    ]);
  });

});
