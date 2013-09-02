'use strict';

angular.module('dashApp')
.controller('TTviewCtrl', [
  '$scope', '$stateParams', '$dialog',
  'config', 'StringResource', 'Timetable',
  function ($scope, $stateParams, $dialog,
    config, StringResource, Timetable) {

    $scope.timetable = Timetable.get({ttId: $stateParams.ttId});

    var calculateTotalScore = function (classes) {
      var totalScore = 0;
      angular.forEach(classes, function (c) {
        totalScore += c.score;
      });

      return totalScore;
    };

    var classesTotimeForDay = function (classes) {
      var timeForDay = [];
      var i;

      for (i = 0; i < config.DAYS_PER_WEEK; ++i) {
        timeForDay[i] = [];
      }

      angular.forEach(classes, function (c) {
        angular.forEach(c.time, function (t) {
          timeForDay[parseInt(t.start_time / 100) - 1].push(t);
        });
      });

      angular.forEach(timeForDay, function (time) {
        time.sort(function (a, b) {
          return a.start_time - b.start_time;
        });
      });

      return timeForDay;
    };

    var calculateClassDays = function (timeForDay) {
      var nClassDays = config.DAYS_PER_WEEK;

      for (var i = 0; i < config.DAYS_PER_WEEK; ++i) {
        if (!timeForDay[i][0]) {
          --nClassDays;
        }
      }

      return nClassDays;
    };

    var calculateFreeHours = function (timeForDay) {
      var nFreePeriods = 0;

      angular.forEach(timeForDay, function (time) {
        for (var i = 0; i < time.length - 1; ++i) {
          nFreePeriods += time[i + 1].start_time - time[i].end_time - 1;
        }
      });

      return nFreePeriods *
        (config.MINUTES_PER_PERIOD + config.MINUTES_BREAK) / 60;
    };

    var colorClasses = function (classes) {
      var newClasses = angular.extend({}, classes);

      angular.forEach(newClasses, function (c, iColor) {
        c.color = StringResource.UI.TIMETABLE.COLOR_SWATCH[iColor];
      });

      return newClasses;
    };

    $scope.$watch('timetable', function (timetable) {
      var classes = timetable.classes;
      $scope.title = timetable.name;
      $scope.totalScore = calculateTotalScore(classes);
      var timeForDay = classesTotimeForDay(classes);
      $scope.nClassDays = calculateClassDays(timeForDay);
      $scope.nFreeHours = calculateFreeHours(timeForDay);
      timetable.classes = colorClasses(classes);
    });

    var confirmDeleteDialog = $dialog.dialog({
      templateUrl: StringResource.VIEW.DASH.TIMETABLES.urlFor('confirm_delete.html'),
      resolve: {
        title: function () { return $scope.timetable.name; }
      },
      controller: ['$scope', '$filter', 'dialog', 'title',
      function ($scope, $filter, dialog, title) {
        $scope.koreanEulLeul = $filter('koreanEulLeul');
        $scope.title = title;

        $scope.cancel = function () {
          dialog.close('cancel');
        };

        $scope.delete = function () {
          dialog.close('delete');
        };
      }]
    });

    $scope.delete = function () {
      confirmDeleteDialog.open()
      .then(function (result) {
        if (result === 'delete') {
          Timetable.delete(
            {ttId: $stateParams.ttId},
            function () {
              $scope.emit('timetableDeleted');
            },
            function () {
              $scope.emit('timetableDeleteFailed');
            }
          );
        }
      });
    };

    $scope.timetable = {
      'id': '123',
      'name': '이번 학기 최종 시간표',
      'created_by': '1',
      'created_time': '2013-08-25T09:28:28+0000',
      'classes': [
        {
          'course_no': 'ITE231',
          'class_no': '10443',
          'major': 'H3HADD010',
          'title': '컴퓨터구조론',
          'instructor': '이인환',
          'score': 3.00,
          'grade': 2,
          'time': [
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0207'},
            {'start_time': 514, 'end_time': 516, 'room': 'H77-0207'}
          ]
        },
        {
          'course_no': 'ITE316',
          'class_no': '10415',
          'major': 'H3HADD',
          'title': '데이터베이스시스템',
          'instructor': '김상욱',
          'score': 3.00,
          'grade': 3,
          'time': [
            {'start_time': 115, 'end_time': 117, 'room': 'H77-0813'},
            {'start_time': 315, 'end_time': 317, 'room': 'H77-0813'}
          ]
        },
        {
          'course_no': 'SYH003',
          'class_no': '10130',
          'major': 'H3HADD',
          'title': '비즈니스리더십(HELP3)',
          'instructor': null,
          'score': 2.00,
          'grade': 3,
          'time': [
            {'start_time': 607, 'end_time': 610, 'room': 'H'}
          ]
        },
        {
          'course_no': 'CSE406',
          'class_no': '10407',
          'major': 'H3HADD',
          'title': '소프트웨어공학',
          'instructor': '유인경',
          'score': 3.00,
          'grade': 3,
          'time': [
            {'start_time': 213, 'end_time': 215, 'room': 'H93-0811'},
            {'start_time': 306, 'end_time': 308, 'room': 'H93-0811'}
          ]
        },
        {
          'course_no': 'ELE429',
          'class_no': '10400',
          'major': 'H3HADD',
          'title': '컴파일러',
          'instructor': '임을규',
          'score': 3.00,
          'grade': 3,
          'time': [
            {'start_time': 303, 'end_time': 305, 'room': 'H77-0813'},
            {'start_time': 505, 'end_time': 507, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'ENE419',
          'class_no': '10410',
          'major': 'H3HADD',
          'title': '컴퓨터네트워크',
          'instructor': '조인휘',
          'score': 3.00,
          'grade': 3,
          'time': [
            {'start_time': 417, 'end_time': 419, 'room': 'H77-0203'},
            {'start_time': 511, 'end_time': 513, 'room': 'H77-0501'}
          ]
        },
        {
          'course_no': 'GEN606',
          'class_no': '10417',
          'major': 'H3HADD',
          'title': '특허법의이해',
          'instructor': '장의선',
          'score': 2.00,
          'grade': 3,
          'time': [
            {'start_time': 205, 'end_time': 208, 'room': 'H77-0813'}
          ]
        }
      ]
    };

  }
]);
