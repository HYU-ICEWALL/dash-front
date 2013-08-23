'use strict';

describe('Service: StringResource', function () {

  // load the service's module
  beforeEach(module('dashApp'));

  // instantiate service
  var StringResource;
  beforeEach(inject(function (_StringResource_) {
    StringResource = _StringResource_;
  }));

  it('should do something', function () {
    expect(!!StringResource).toBe(true);
  });

});
