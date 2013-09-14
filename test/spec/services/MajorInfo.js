'use strict';

describe('Service: MajorInfo', function () {

  // load the service's module
  beforeEach(module('dashApp'));

  // instantiate service
  var MajorInfo, httpBackend;
  beforeEach(inject(function (_MajorInfo_, $httpBackend) {
    MajorInfo = _MajorInfo_;
    httpBackend= $httpBackend;
  }));


  it('should get major list ', function () {
    httpBackend.expectGET('api/majors').respond(200, [
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
