/* jshint -W106 */
'use strict';

angular.module('dashApp')
.factory('Facebook', ['StringResource',
function (StringResource) {
  var strRes = StringResource.FACEBOOK;
  var urlDialog = strRes.LOGIN_DIALOG.url;
  var redirect_uri = strRes.LOGIN_DIALOG.redirect_uri;
  var queryLoginDialog = {
    'client_id': strRes.APP_ID,
    'redirect_uri': redirect_uri
  };

  var urlForLoginDialog = urlDialog;
  urlForLoginDialog += '?' + jQuery.param(queryLoginDialog);

  // Public API here
  return {
    urlForLoginDialog: urlForLoginDialog
  };
}]);
