'use strict';

angular.module('dashApp')
  .controller('NavBarCtrl', ['$scope', 'config', '$dialog',
    function ($scope, config, $dialog) {
      $scope.items = [
        { id: 'create', name: '시간표 생성' },
        { id: 'timetable', name: '시간표 관리' }
      ];

      $scope.getURL = function (id) {
        return '#/' + config.appName.toLowerCase() + '/' + id + '/';
      };

      var userinfoDialog = $dialog.dialog({
        templateUrl: 'views/userinfo_form.html',
        controller: 'EditUserinfoCtrl',
        resolve: {
          majors: function (MajorInfo) {
            return MajorInfo.getMajorsInfo();
          }
        }
      });

      $scope.updateUserinfo = function () {
        userinfoDialog.open();
        return false;
      };
    }]);
