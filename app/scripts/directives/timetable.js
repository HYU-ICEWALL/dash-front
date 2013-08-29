/* jshint -W106 */
'use strict';

angular.module('dashApp')
.directive('timetable', ['config', 'StringResource',
function (config, StringResource) {
  var timeForPeriods = function (periods) {
    return periods * (config.MINUTES_PER_PERIOD + config.MINUTES_BREAK) / 60;
  };

  var timeForPeriodNumber = function (periodNumber) {
    return config.START_TIME + timeForPeriods(periodNumber - 1);
  };

  var divWithClass = function (className) {
    return jQuery('<div></div>').addClass(className);
  };

  var getCssValue = function (className, property, context) {
    var obj = divWithClass(className).appendTo(context);
    var value = obj.css(property);
    obj.remove();
    return value;
  };

  var getWidth = function (className, context) {
    var obj = divWithClass(className).appendTo(context);
    var width = obj.width();
    obj.remove();
    return width;
  };

  var getHeight = function (className, context) {
    var obj = divWithClass(className).appendTo(context);
    var height = obj.height();
    obj.remove();
    return height;
  };

  return {
    templateUrl: StringResource.VIEW.urlFor('dash_timetable.html'),
    restrict: 'EA',
    scope: {
      display: '=',
      classes: '=',
      excludedPeriods: '='
    },
    compile: function compile(element) {
      var days = jQuery('.days', element);
      var DAYS_PER_WEEK = config.DAYS_PER_WEEK;
      // Math.floor() was used to fix 1px-whitespace bug
      var widthPerDay = Math.floor(days.width() / DAYS_PER_WEEK);

      for (var i = 0; i < DAYS_PER_WEEK; ++i) {
        var day = divWithClass('day');

        day.text(StringResource.UI.TIMETABLE.DAYS_OF_WEEK[i])
           .css('left', widthPerDay * i + 'px')
           .css('width', widthPerDay)
           .appendTo(days);
      }

      var dayHeight = divWithClass('day height').appendTo(days);
      var heightDays = dayHeight.css('height');
      dayHeight.remove();

      return function postLink(scope, element) {
        scope.widthPerDay = widthPerDay;
        scope.timeForPeriod = timeForPeriods(1);

        var heightPerHour = getHeight('cell', element);
        var heightPerPeriod = heightPerPeriod * (config.MINUTES_PER_PERIOD / 60);
        scope.heightPerHour = heightPerHour;
        scope.heightPerPeriod = heightPerPeriod;

        var watchDisplay = function (display) {
          var units = [];

          var displayTimeStart = Math.floor(timeForPeriodNumber(
                                   display.start_time));
          var displayTimeEnd = Math.ceil(timeForPeriodNumber(
                                 display.end_time + 1));
          scope.displayTimeStart = displayTimeStart;

          var heightUnits = (displayTimeEnd - displayTimeStart + 1 + 0.5) *
                            heightPerHour;
          scope.heightUnits = heightUnits;

          for (var i = Math.floor(displayTimeStart);
               i <= Math.ceil(displayTimeEnd);
               ++i) {
            var unit = i%12;
            units.push(unit ? unit : 12);
          }

          element.css('height', heightDays + heightUnits);

          scope.units = units;
          scope.isDisplaySet = true;
        };

        scope.$watch('display', watchDisplay, true);

        var watchClasses = function (classes) {
          var times = [];
          var iColor = 0;

          angular.forEach(classes, function (c){
            var color = StringResource.UI.TIMETABLE.COLOR_SWATCH[iColor];

            angular.forEach(c.time, function (time) {
              times.push({
                day_of_week: (parseInt(time.start_time / 100, 10) - 1),
                hour_of_time: timeForPeriodNumber(time.start_time % 100),
                length: timeForPeriods(time.end_time - time.start_time + 1),
                name: c.title,
                color: color
              });
            });

            ++iColor;
          });

          if (!scope.isDisplaySet) {
            var minStartTime, maxEndTime;

            angular.forEach(classes, function (c){
              angular.forEach(c.time, function (time) {
                if (!minStartTime || minStartTime > time.start_time % 100) {
                  minStartTime = time.start_time % 100;
                }

                if (!maxEndTime || maxEndTime < time.end_time % 100) {
                  maxEndTime = time.end_time % 100;
                }
              });
            });

            watchDisplay({start_time: minStartTime, end_time: maxEndTime});
          }

          scope.times = times;
        };

        scope.$watch('classes', watchClasses, true);

        var watchExcludedPeriods = function (excludedPeriods) {
          var excludedTimes = [];

          angular.forEach(excludedPeriods, function (period){
            excludedTimes.push({
              day_of_week: (parseInt(period / 100, 10) - 1),
              hour_of_time: timeForPeriodNumber(period % 100)
            });
          });

          scope.excludedTimes = excludedTimes;
        };

        scope.$watch('excludedPeriods', watchExcludedPeriods, true);
      };
    }
  };
}]);
