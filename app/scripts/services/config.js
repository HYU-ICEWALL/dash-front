'use strict';

angular.module('dashApp')
  .constant('config', {
    appName: 'Dash',
    START_TIME: 8,
    MINUTES_PER_PERIOD: 30,
    MINUTES_BREAK: 0,
    DAYS_PER_WEEK: 6,
    isPlacementRequired: function (classObj) {
      return !/[H,Y]3$/m.test(classObj.major);
    }
  });
