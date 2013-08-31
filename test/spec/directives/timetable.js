'use strict';

describe('Directive: timetable', function () {
  var config, StringResource;
  var TIMETABLE;
  var $compile, $rootScope;
  var element;

  beforeEach(module('views/timetable.html'));

  beforeEach(function () {
    module('dashApp', function ($provide) {
      $provide.constant('config', {
        appName: 'Dash',
        START_TIME: 8,
        MINUTES_PER_PERIOD: 30,
        MINUTES_BREAK: 0,
        DAYS_PER_WEEK: 6
      });

      $provide.constant('StringResource', {
        VIEW: {
          urlFor: function (filename) { return 'views/' + filename; }
        },

        UI: {
          TIMETABLE: {
            DAYS_OF_WEEK: ['월', '화', '수', '목', '금', '토', '일'],
            COLOR_SWATCH: ['#d8e200', '#f1bdcc', '#e4d198', '#68c7c1', '#86bce3', '#fdb900', '#f08162']
          }
        }
      });
    });
  });
  beforeEach(inject(function (_config_, _StringResource_) {
    config = _config_;
    StringResource = _StringResource_;
    TIMETABLE = StringResource.UI.TIMETABLE;
  }));

  var testTimetable = {
    display: {start_time: 3, end_time: 18},
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
        ]
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
        ]
      },
      {
        'course_no': 'SYH003',
        'class_no': '10130',
        'title': '비즈니스리더십(HELP3)',
        'instructor': null,
        'score': 2.00,
        'time': [
          {'start_time': 607, 'end_time': 610, 'room': 'H'}
        ]
      }
    ],
    excludedPeriods: [109, 110, 209, 210, 309, 310, 409, 410]
  };

  var testDrawDays = function () {
    return function () {
      var days = jQuery('.days', element);
      var arrDay = jQuery('.day', days);

      expect(arrDay.length).toBe(config.DAYS_PER_WEEK);
      arrDay.each(function (index) {
        expect(jQuery(this).text()).toBe(TIMETABLE.DAYS_OF_WEEK[index]);
      });
    };
  };

  var testDrawUnits = function (displayStartTime, displayEndTime) {
    return function () {
      var units = jQuery('.units', element);
      var arrUnit = jQuery('.unit', units);

      var iDisplay = displayStartTime;

      arrUnit.each(function (index) {
        var unit = iDisplay;
        expect(unit > displayEndTime).toBe(false);

        unit = unit % 12;
        unit = unit ? unit : 12;
        expect(jQuery(this).find('.text').text())
        .toBe(unit + ':00');
        ++iDisplay;
      });

      expect(iDisplay).toBe(displayEndTime + 1);
    };
  };

  var testDrawClasses = function (classes) {
    return function () {
      var times = jQuery('.times', element);
      var arrTime = times.find('.time');

      angular.forEach(classes, function (c) {
        var arr = jQuery.grep(arrTime, function (time) {
          return jQuery(time).find('.text').text() === c.name;
        });
        expect(arr.length).toBe(c.classes_per_week);
      });
    }
  };

  var testDrawExcluded = function (numOfExcludedPeriods) {
    return function () {
      var times = jQuery('.times', element);
      var arrExcludedtime = times.find('.excluded.time');

      expect(arrExcludedtime.length).toBe(numOfExcludedPeriods);
    };
  };

  describe('with no binding', function () {
    beforeEach(inject(function (_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      element = $compile('<timetable></timetable>')($rootScope);
      $rootScope.$digest();
      element = jQuery(element);
    }));

    it('should draw columns for days of week according to the configuration',
      testDrawDays());
  });

  describe('with display data binding', function () {
    beforeEach(inject(function (_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;

      $rootScope.display = testTimetable.display;

      element = $compile('<timetable display="display"></timetable>')($rootScope);
      $rootScope.$digest();
      element = jQuery(element);
    }));

    it('should draw columns for days of week according to the configuration',
      testDrawDays());

    it('should draw rows for hours of a day ' +
      'according to the display attribute and the configuration',
      testDrawUnits(9, 17));
  });

  describe('with classes data binding', function () {
    beforeEach(inject(function (_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;

      $rootScope.classes = testTimetable.classes;

      element = $compile('<timetable classes="classes"></timetable>')($rootScope);
      $rootScope.$digest();
      element = jQuery(element);
    }));

    it('should draw columns for days of week according to the configuration',
      testDrawDays());

    it('should draw rows for hours of a day ' +
      'according to the classes attribute and the configuration',
      testDrawUnits(11, 17));

    it('should draw time cells of classes', testDrawClasses([
      {name: '컴퓨터구조론', classes_per_week: 2},
      {name: '데이터베이스시스템', classes_per_week: 2},
      {name: '비즈니스리더십(HELP3)', classes_per_week: 1}
    ]));
  });

  describe('with display and classes data binding', function () {
    beforeEach(inject(function (_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;

      $rootScope.display = testTimetable.display;
      $rootScope.classes = testTimetable.classes;

      element = $compile('<timetable display="display" classes="classes"></timetable>')($rootScope);
      $rootScope.$digest();
      element = jQuery(element);
    }));

    it('should draw columns for days of week according to the configuration',
      testDrawDays());

    it('should draw rows for hours of a day ' +
      'according to the display attribute and the configuration',
      testDrawUnits(9, 17));

    it('should draw time cells of classes', testDrawClasses([
      {name: '컴퓨터구조론', classes_per_week: 2},
      {name: '데이터베이스시스템', classes_per_week: 2},
      {name: '비즈니스리더십(HELP3)', classes_per_week: 1}
    ]));
  });

  describe('with classes and excluded-periods data binding', function () {
    beforeEach(inject(function (_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;

      $rootScope.classes = testTimetable.classes;
      $rootScope.excludedPeriods = testTimetable.excludedPeriods;

      element = $compile('<timetable classes="classes" excluded-periods="excludedPeriods"></timetable>')($rootScope);
      $rootScope.$digest();
      element = jQuery(element);
    }));

    it('should draw columns for days of week according to the configuration',
      testDrawDays());

    it('should draw rows for hours of a day ' +
      'according to the classes attribute and the configuration',
      testDrawUnits(11, 17));

    it('should draw time cells of classes', testDrawClasses([
      {name: '컴퓨터구조론', classes_per_week: 2},
      {name: '데이터베이스시스템', classes_per_week: 2},
      {name: '비즈니스리더십(HELP3)', classes_per_week: 1}
    ]));

    it('should draw time cells of excluded periods', testDrawExcluded(8));
  });

  describe('with display, classes, and excluded-periods data binding', function () {
    beforeEach(inject(function (_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;

      $rootScope.display = testTimetable.display;
      $rootScope.classes = testTimetable.classes;
      $rootScope.excludedPeriods = testTimetable.excludedPeriods;

      element = $compile('<timetable display="display" classes="classes" excluded-periods="excludedPeriods"></timetable>')($rootScope);
      $rootScope.$digest();
      element = jQuery(element);
    }));

    it('should draw columns for days of week according to the configuration',
      testDrawDays());

    it('should draw rows for hours of a day ' +
      'according to the display attribute and the configuration',
      testDrawUnits(9, 17));

    it('should draw time cells of classes', testDrawClasses([
      {name: '컴퓨터구조론', classes_per_week: 2},
      {name: '데이터베이스시스템', classes_per_week: 2},
      {name: '비즈니스리더십(HELP3)', classes_per_week: 1}
    ]));

    it('should draw time cells of excluded periods', testDrawExcluded(8));
  });
});
