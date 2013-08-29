'use strict';

angular.module('dashApp')
.controller('TTviewCtrl', ['$scope', 'StringResource', 'config',
  function ($scope, StringResource, config) {
    $scope.title = '시간표 이름';
    $scope.freetime = 0;
    $scope.total = 0;
    $scope.classday = config.DAYS_PER_WEEK;
    var time_byDay = [];
    var i = 0;
    for(i=0; i<config.DAYS_PER_WEEK ; i++){
      time_byDay[i] = [];
    };

    $scope.cal_total = function (timetable) {
      angular.forEach(timetable.classes, function(c){
        $scope.total += c.score;
      });
    };

    $scope.cal_time = function (timetable) {
      angular.forEach(timetable.classes, function(c){
        angular.forEach(c.time, function(t){
          time_byDay[parseInt(t.start_time/100)-1].push(t);
        });
      });

      angular.forEach(time_byDay, function(t){
        t.sort(function(a,b){
          return parseInt(a.start_time) - parseInt(b.start_time);
        });
      });

      for(i=0;i<config.DAYS_PER_WEEK;i++){
        if(time_byDay[i][0] == undefined){
          $scope.classday--;
        }
      }

      angular.forEach(time_byDay, function(t) {
        for(i=0;i<(t.length-1);i++){
          $scope.freetime += t[i+1].start_time-t[i].end_time-1;
        }
      });
    };

    $scope.timetable = {
      display: {start_time: 1, end_time: 20},
      classes: [
        {
          'course_no': 'ITE231',
          'class_no': '10443',
          'title': '컴퓨터구조론',
          'instructor': '이인환',
          'score': 3.00,
          'time': [
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0207'},
            {'start_time': 514, 'end_time': 516, 'room': 'H77-0207'}
          ],
          'grade':'3학년',
          'major':'컴퓨터공학부'
        },
        {
          'course_no': 'ITE316',
          'class_no': '10415',
          'title': '데이터베이스시스템',
          'instructor': '김상욱',
          'score': 3.00,
          'time': [
            {'start_time': 115, 'end_time': 117, 'room': 'H77-0813'},
            {'start_time': 315, 'end_time': 317, 'room': 'H77-0813'}
          ],
          'grade':'3학년',
          'major':'컴퓨터공학부'
        },
        {
          'course_no': 'SYH003',
          'class_no': '10130',
          'title': '비즈니스리더십(HELP3)',
          'instructor': null,
          'score': 2.00,
          'time': [
            {'start_time': 607, 'end_time': 610, 'room': 'H'}
          ],
          'grade':'3학년',
          'major':'컴퓨터공학부'
        },
        {
          'course_no': 'CSE406',
          'class_no': '10407',
          'title': '소프트웨어공학',
          'instructor': '유인경',
          'score': 3.00,
          'time': [
            {'start_time': 213, 'end_time': 215, 'room': 'H93-0811'},
            {'start_time': 306, 'end_time': 308, 'room': 'H93-0811'}
          ],
          'grade':'3학년',
          'major':'컴퓨터공학부'
        },
        {
          'course_no': 'ELE429',
          'class_no': '10400',
          'title': '컴파일러',
          'instructor': '임을규',
          'score': 3.00,
          'time': [
            {'start_time': 303, 'end_time': 305, 'room': 'H77-0813'},
            {'start_time': 505, 'end_time': 507, 'room': 'H77-0507'}
          ],
          'grade':'3학년',
          'major':'컴퓨터공학부'
        },
        {
          'course_no': 'ENE419',
          'class_no': '10410',
          'title': '컴퓨터네트워크',
          'instructor': '조인휘',
          'score': 3.00,
          'time': [
            {'start_time': 418, 'end_time': 420, 'room': 'H77-0203'},
            {'start_time': 511, 'end_time': 513, 'room': 'H77-0501'}
          ],
          'grade':'3학년',
          'major':'컴퓨터공학부'
        },
        {
          'course_no': 'GEN606',
          'class_no': '10417',
          'title': '특허법의이해',
          'instructor': '장의선',
          'score': 2.00,
          'time': [
            {'start_time': 205, 'end_time': 208, 'room': 'H77-0813'}
          ],
          'grade':'3학년',
          'major':'컴퓨터공학부'
        }
      ],
      excludedPeriods: [109, 110, 209, 210, 309, 310, 409, 410]
    };

    $scope.cal_total($scope.timetable);
    $scope.cal_time($scope.timetable);
    $scope.freetime = $scope.freetime*(config.MINUTES_PER_PERIOD)/60;

  }]);
