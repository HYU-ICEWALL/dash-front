'use strict';

describe('Controller: TimetablesCtrl', function () {

  // load the controller's module
  beforeEach(module('dashApp'));

  var TimetablesCtrl, scope, httpBackend;
  var config, StringResource, Timetable;
  var timetables = [
      {
        'id': '123',
        'name': '이번 학기 최종 시간표',
        'created_by': '1',
        'created_time': '2013-08-25T09:28:28+0000',
        'classes': [
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
            ]
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
            ]
          },
          {
            'course_no': 'ENE419',
            'class_no': '10410',
            'title': '컴퓨터네트워크',
            'instructor': '조인휘',
            'score': 3.00,
            'time': [
              {'start_time': 417, 'end_time': 419, 'room': 'H77-0203'},
              {'start_time': 512, 'end_time': 514, 'room': 'H77-0501'}
            ]
          },
          {
            'course_no': 'GEN606',
            'class_no': '10417',
            'title': '특허법의이해',
            'instructor': '장의선',
            'score': 2.00,
            'time': [
              {'start_time': 205, 'end_time': 208, 'room': 'H77-0813'}
            ]
          }
        ]
      },

      {
        'id': '124',
        'name': '다음 학기 최종 시간표',
        'created_by': '1',
        'created_time': '2013-08-25T09:28:28+0000',
        'classes': [
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
            ]
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
            ]
          },
          {
            'course_no': 'ENE419',
            'class_no': '10410',
            'title': '컴퓨터네트워크',
            'instructor': '조인휘',
            'score': 3.00,
            'time': [
              {'start_time': 418, 'end_time': 420, 'room': 'H77-0203'},
              {'start_time': 512, 'end_time': 514, 'room': 'H77-0501'}
            ]
          },
          {
            'course_no': 'GEN606',
            'class_no': '10417',
            'title': '특허법의이해',
            'instructor': '장의선',
            'score': 2.00,
            'time': [
              {'start_time': 205, 'end_time': 208, 'room': 'H77-0813'}
            ]
          }
        ]
      }
    ];

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $resource, _config_, _StringResource_) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;

    Timetable = $resource('api/users/me/timetables/:ttId');

    config = _config_;
    StringResource = _StringResource_;
    TimetablesCtrl = $controller('TimetablesCtrl', {
      $scope: scope,
      timetables: timetables,
      Timetable: Timetable,
      config: config,
      StringResource: StringResource
    });
  }));

  it('should be populated with timetables', function () {
    expect(scope.timetables).toEqualData(timetables);
  });

  it('should load more timetables', function () {
    var anotherTimetable = {
      'id': '125',
      'name': '추가로 읽은 시간표',
      'created_by': '1',
      'created_time': '2013-08-31T09:28:28+0000',
      'classes': [
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
          ]
        },
        {
          'course_no': 'ENE419',
          'class_no': '10410',
          'title': '컴퓨터네트워크',
          'instructor': '조인휘',
          'score': 3.00,
          'time': [
            {'start_time': 417, 'end_time': 419, 'room': 'H77-0203'},
            {'start_time': 512, 'end_time': 514, 'room': 'H77-0501'}
          ]
        },
        {
          'course_no': 'GEN606',
          'class_no': '10417',
          'title': '특허법의이해',
          'instructor': '장의선',
          'score': 2.00,
          'time': [
            {'start_time': 205, 'end_time': 208, 'room': 'H77-0813'}
          ]
        }
      ]
    };
    expect(scope.timetables.length).toBe(2);
    httpBackend.expectGET('api/users/me/timetables?limit=20&offset=2')
    .respond(200, [anotherTimetable]);

    scope.loadMoreTimetables();
    httpBackend.flush();

    expect(scope.timetables.length).toBe(3);
    expect(scope.timetables[2]).toEqualData(anotherTimetable);
  });

  it('should change the value of viewTemplateUrl if viewMode has changed', function () {
    var urlFor = StringResource.VIEW.DASH.TIMETABLES.LEFT_COLUMN.urlFor;

    scope.viewMode = 'list';
    scope.$apply();

    expect(scope.viewTemplateUrl).toBe(urlFor('list.html'));

    scope.viewMode = 'gallery';
    scope.$apply();

    expect(scope.viewTemplateUrl).toBe(urlFor('gallery.html'));

    scope.viewMode = 'gallery-extended';
    scope.$apply();

    expect(scope.viewTemplateUrl).toBe(urlFor('gallery-extended.html'));
  });
});
