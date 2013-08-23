'use strict';

describe('Service: Utils', function () {

  // load the service's module
  beforeEach(module('dashApp'));

  // instantiate service
  var Utils, StringResource, $rootScope;
  beforeEach(inject(function (_Utils_, _StringResource_, _$rootScope_) {
    Utils = _Utils_;
    StringResource = _StringResource_;
    $rootScope = _$rootScope_;
  }));

  it('should handle HTTP error with error spec', function () {
    var errorSpec = {
      prefix: 'failed to sign in: ',
      reasons: [
        { code: 401, reason: 'invalid credential information' },
        { code: 500, reason: 'internal server error' }
      ]
    };

    var handler = Utils.handlerHttpError(errorSpec);

    handler({ status: 401 }).then(
      function () {},
      function (reason) {
        expect(reason).toBe('failed to sign in: invalid credential information');
      }
    );

    handler({ status: 500 }).then(
      function () {},
      function (reason) {
        expect(reason).toBe('failed to sign in: internal server error');
      }
    );

    $rootScope.$apply();
  });

  it('should strip HTTP status code from error reason only if available', function () {
    var reason;

    reason = 'failed to sign in: HTTP 500';
    expect(Utils.getHttpCodeFromErrorReason(reason)).toBe(500);

    reason = 'failed to sign in: something went wrong';
    expect(Utils.getHttpCodeFromErrorReason(reason)).toBeNull();
  });

  it('should generate error messages containing HTTP status code for the UI', function () {
    var code = 404;
    var expected = StringResource.UI.HTTP_ERROR.PREFIX +
                   code + StringResource.UI.HTTP_ERROR.SUFFIX;

    expect(Utils.reasonHttpError(code)).toBe(expected);
  });

});
