'use strict';

angular.module('dashApp')
  .controller('NavBarCtrl', ['$scope', 'StringResource', 'config', '$dialog',
    function ($scope, StringResource, config, $dialog) {
      $scope.items = [
        { id: 'create', name: '시간표 생성' },
        { id: 'timetable', name: '시간표 관리' }
      ];

      $scope.getURL = function (id) {
        return '#/' + config.appName.toLowerCase() + '/' + id + '/';
      };

      var userinfoDialog = $dialog.dialog({
        templateUrl: StringResource.VIEW.urlFor('userinfo_form.html'),
        controller: 'EditUserinfoCtrl',
        resolve: {
          majors: ['MajorInfo', function (MajorInfo) {
            return MajorInfo.getMajorsInfo();
          }]
        }
      });

      $scope.updateUserinfo = function () {
        userinfoDialog.open();
        return false;
      };
    }]);
