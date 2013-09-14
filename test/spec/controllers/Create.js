'use strict';

describe('Controller: CreateCtrl', function () {

  // load the controller's module
  beforeEach(module('dashApp'));

  var $controller, $httpBackend, $q, $timeout;
  var CreateCtrl,
    scope;

  var storedContext = {
    classCart: [
      {
        placement_required: true,
        course_no: 'GEN253',
        classes: [
          {class_no: '13056', fixed: false},
          {class_no: '13057', fixed: true},
          {class_no: '10455', fixed: false}
        ]
      }
    ],
    excludedTime: [109, 110, 209, 210, 309, 310, 409, 410],
    options: undefined
  };

  var basicSearchResult = [
    {
      name: '미분적분학2',
      course_no: 'GEN253',
      major: 'H3HADD',
      grade: 1,
      credit: 3.00,
      classes: [
        {
          instructor: null,
          class_no: '13056',
          time: [
            {start_time: 211, end_time: 213, room: 'H05-0103'},
            {start_time: 514, end_time: 516, room: 'H05-0103'}
          ]
        },
        {
          instructor: '신교일',
          class_no: '13057',
          time: [
            {start_time: 211, end_time: 213, room: 'H05-0202'},
            {start_time: 514, end_time: 516, room: 'H05-0202'}
          ]
        },
        {
          instructor: '평인수',
          class_no: '10455',
          time: [
            {start_time: 211, end_time: 213, room: 'H05-0203'},
            {start_time: 514, end_time: 516, room: 'H05-0203'}
          ]
        }
      ]
    },
    {
      name: '미분적분학2',
      course_no: 'GEN253',
      major: 'H3HADG',
      grade: 1,
      credit: 3.00,
      classes: [
        {
          instructor: 'Benjamin Dieckman Willson',
          class_no: '10303',
          time: [
            {start_time: 114, end_time: 116, room: 'H05-0103'},
            {start_time: 417, end_time: 419, room: 'H05-0103'}
          ]
        },
        {
          instructor: '박영선',
          class_no: '10301',
          time: [
            {start_time: 206, end_time: 208, room: 'H05-0103'},
            {start_time: 403, end_time: 405, room: 'H05-0103'}
          ]
        },
        {
          instructor: '황신철',
          class_no: '10302',
          time: [
            {start_time: 114, end_time: 116, room: 'H05-0102'},
            {start_time: 417, end_time: 419, room: 'H05-0102'}
          ]
        }
      ]
    }
  ];

  // Inject $httpBackend
  beforeEach(inject(function (_$httpBackend_) {
    $httpBackend = _$httpBackend_;
  }));

  // mock server data
  beforeEach(function() {
    var resultForGetClasses = [
      {
        name: '미분적분학2',
        course_no: 'GEN253',
        major: 'H3HADD',
        grade: 1,
        credit: 3.00,
        instructor: null,
        class_no: '13056',
        time: [
          {start_time: 211, end_time: 213, room: 'H05-0103'},
          {start_time: 514, end_time: 516, room: 'H05-0103'}
        ],
        category: '기초필수'
      },
      {
        name: '미분적분학2',
        course_no: 'GEN253',
        major: 'H3HADD',
        grade: 1,
        credit: 3.00,
        instructor: '신교일',
        class_no: '13057',
        time: [
          {start_time: 211, end_time: 213, room: 'H05-0202'},
          {start_time: 514, end_time: 516, room: 'H05-0202'}
        ],
        category: '기초필수'
      },
      {
        name: '미분적분학2',
        course_no: 'GEN253',
        major: 'H3HADD',
        grade: 1,
        credit: 3.00,
        instructor: '평인수',
        class_no: '10455',
        time: [
          {start_time: 211, end_time: 213, room: 'H05-0203'},
          {start_time: 514, end_time: 516, room: 'H05-0203'}
        ],
        category: '기초필수'
      },
      {
        name: '미분적분학2',
        course_no: 'GEN253',
        major: 'H3HADG',
        grade: 1,
        credit: 3.00,
        instructor: 'Benjamin Dieckman Willson',
        class_no: '10303',
        time: [
          {start_time: 114, end_time: 116, room: 'H05-0103'},
          {start_time: 417, end_time: 419, room: 'H05-0103'}
        ],
        category: '기초필수'
      },
      {
        name: '미분적분학2',
        course_no: 'GEN253',
        major: 'H3HADG',
        grade: 1,
        credit: 3.00,
        instructor: '박영선',
        class_no: '10301',
        time: [
          {start_time: 206, end_time: 208, room: 'H05-0103'},
          {start_time: 403, end_time: 405, room: 'H05-0103'}
        ],
        category: '기초필수'
      },
      {
        name: '미분적분학2',
        course_no: 'GEN253',
        major: 'H3HADG',
        grade: 1,
        credit: 3.00,
        instructor: '황신철',
        class_no: '10302',
        time: [
          {start_time: 114, end_time: 116, room: 'H05-0102'},
          {start_time: 417, end_time: 419, room: 'H05-0102'}
        ],
        category: '기초필수'
      }
    ];
    $httpBackend.whenGET('api/classes?name=%EB%AF%B8%EB%B6%84%EC%A0%81%EB%B6%84%ED%95%99')
    .respond(200, resultForGetClasses);
    $httpBackend.whenGET('api/classes?name=%EB%AF%B8%EB%B6%84%EC%A0%81%EB%B6%84%ED%95%99&major=H3HADD')
    .respond(200, resultForGetClasses.slice(0, 3));
    $httpBackend.whenGET('api/classes?name=%EB%AF%B8%EB%B6%84%EC%A0%81%EB%B6%84%ED%95%99&class_no=10455')
    .respond(200, resultForGetClasses.slice(2, 3));
    $httpBackend.whenGET('api/classes?name=%EB%AF%B8%EB%B6%84%EC%A0%81%EB%B6%84%ED%95%99&major=H3HADD&class_no=10455')
    .respond(200, resultForGetClasses.slice(2, 3));
    $httpBackend.whenGET('api/classes/13056')
    .respond(200, {
      class_no: '13056',
      course_no: 'GEN253',
      name: '미분적분학2',
      major: 'H3HADD',
      time: [
        {start_time: 211, end_time: 213, room: 'H05-0103'},
        {start_time: 514, end_time: 516, room: 'H05-0103'}
      ],
      credit: 3.00,
      grade: 1,
      instructor: null,
      category: '기초필수'
    });
    $httpBackend.whenGET('api/classes/13057')
    .respond(200, {
      class_no: '13057',
      course_no: 'GEN253',
      name: '미분적분학2',
      major: 'H3HADD',
      time: [
        {start_time: 211, end_time: 213, room: 'H05-0202'},
        {start_time: 514, end_time: 516, room: 'H05-0202'}
      ],
      credit: 3.00,
      grade: 1,
      instructor: '신교일',
      category: '기초필수'
    });
    $httpBackend.whenGET('api/classes/10455')
    .respond(200, {
      class_no: '10455',
      course_no: 'GEN253',
      name: '미분적분학2',
      major: 'H3HADD',
      time: [
        {start_time: 211, end_time: 213, room: 'H05-0203'},
        {start_time: 514, end_time: 516, room: 'H05-0203'}
      ],
      credit: 3.00,
      grade: 1,
      instructor: '평인수',
      category: '기초필수'
    });
    $httpBackend.whenGET('api/classes/10303')
    .respond(200, {
      class_no: '10303',
      course_no: 'GEN253',
      name: '미분적분학2',
      major: 'H3HADG',
      time: [
        {start_time: 114, end_time: 116, room: 'H05-0103'},
        {start_time: 417, end_time: 419, room: 'H05-0103'}
      ],
      credit: 3.00,
      grade: 1,
      instructor: 'Benjamin Dieckman Willson',
      category: '기초필수'
    });
    $httpBackend.whenGET('api/classes/10301')
    .respond(200, {
      class_no: '10301',
      course_no: 'GEN253',
      name: '미분적분학2',
      major: 'H3HADG',
      time: [
        {start_time: 206, end_time: 208, room: 'H05-0103'},
        {start_time: 403, end_time: 405, room: 'H05-0103'}
      ],
      credit: 3.00,
      grade: 1,
      instructor: '박영선',
      category: '기초필수'
    });
    $httpBackend.whenGET('api/classes/10302')
    .respond(200, {
      class_no: '10302',
      course_no: 'GEN253',
      name: '미분적분학2',
      major: 'H3HADG',
      time: [
        {start_time: 114, end_time: 116, room: 'H05-0102'},
        {start_time: 417, end_time: 419, room: 'H05-0102'}
      ],
      credit: 3.00,
      grade: 1,
      instructor: '황신철',
      category: '기초필수'
    });

    var majorsInfo = [
      {name: '컴퓨터공학부', code: 'H3HADD'},
      {name: '컴퓨터전공', code: 'H3HADDA'},
      {name: '소프트웨어전공', code: 'H3HADDB'},
      {name: '융합전자공학부', code: 'H3HADG'}
    ];
    $httpBackend.whenGET('api/majors')
    .respond(200, majorsInfo);
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _$q_, _$timeout_) {
    $controller = _$controller_;
    $q = _$q_;
    $timeout = _$timeout_;
    scope = $rootScope.$new();
    CreateCtrl = $controller('CreateCtrl', {
      $scope: scope,
      storedContext: storedContext,
    });
  }));

  var testClassCart = function (storedContext, testFunc, expectedScopeClassCart, expectedStoredClassCart) {
    return function () {
      CreateCtrl = $controller('CreateCtrl', {
        $scope: scope,
        storedContext: angular.copy(storedContext),
        MajorInfo: MajorInfo,
        Class: Class
      });

      spyOn(jQuery, 'cookie').andCallThrough();
      $timeout.flush();

      testFunc();

      var expectedStoredContext = {
        classCart: expectedStoredClassCart,
        excludedTime: storedContext.excludedTime,
        options: storedContext.options
      };

      expect(scope.classCart).toEqualData(expectedScopeClassCart);
      expect(jQuery.cookie)
      .toHaveBeenCalledWith('context-create', expectedStoredContext);
    };
  };

  it('should load stored context data', function () {
    var expectedClassCart = [
      {
        placement_required: true,
        course_no: 'GEN253',
        name: '미분적분학2',
        majors: [
          {
            code: 'H3HADD',
            name: '컴퓨터공학부',
            grade: 1,
            credit: 3.00,
            classes: [
              {
                instructor: null,
                class_no: '13056',
                fixed: false,
                time: [
                  {start_time: 211, end_time: 213, room: 'H05-0103'},
                  {start_time: 514, end_time: 516, room: 'H05-0103'}
                ]
              },
              {
                instructor: '신교일',
                class_no: '13057',
                fixed: true,
                time: [
                  {start_time: 211, end_time: 213, room: 'H05-0202'},
                  {start_time: 514, end_time: 516, room: 'H05-0202'}
                ]
              },
              {
                instructor: '평인수',
                class_no: '10455',
                fixed: false,
                time: [
                  {start_time: 211, end_time: 213, room: 'H05-0203'},
                  {start_time: 514, end_time: 516, room: 'H05-0203'}
                ]
              }
            ]
          }
        ]
      }
    ];

    $httpBackend.flush();

    expect(scope.classCart).toEqualData(expectedClassCart);
    expect(scope.excludedTime).toEqualData(storedContext.excludedTime);
    expect(scope.options).toEqualData(storedContext.options);
  });

  it('should load the list of classes from the server', function () {
    expect(scope.classes).toBe(undefined);
    scope.keyword = '미분적분학';
    scope.search();

    $httpBackend.flush();

    expect(scope.classes).toEqualData(basicSearchResult);
  });
});
