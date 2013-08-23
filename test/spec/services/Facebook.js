'use strict';

describe('Service: Facebook', function () {

  // load the service's module
  beforeEach(module('dashApp'));

  // instantiate service
  var Facebook, StringResource;
  beforeEach(inject(function (_Facebook_, _StringResource_) {
    Facebook = _Facebook_;
    StringResource = _StringResource_;
  }));

  it('should generate Login Dialog URL', function () {
    var FACEBOOK = StringResource.FACEBOOK;
    var LOGIN_DIALOG = FACEBOOK.LOGIN_DIALOG;
    var expectedUrl = LOGIN_DIALOG.url;
    expectedUrl += '?client_id=' + FACEBOOK.APP_ID;
    expectedUrl += '&redirect_uri=';
    expectedUrl += encodeURIComponent(LOGIN_DIALOG.redirect_uri);

    expect(Facebook.urlForLoginDialog).toBe(expectedUrl);
  });

});
