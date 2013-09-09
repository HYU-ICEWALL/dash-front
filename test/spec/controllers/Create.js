'use strict';

describe('Controller: CreateCtrl', function () {

  // load the controller's module
  beforeEach(module('dashApp'));

  var $q, $timeout;
  var CreateCtrl,
    scope;

  var majorsInfo = [
    {name: '컴퓨터공학부', code: 'H3HADD'},
    {name: '컴퓨터전공', code: 'H3HADDA'},
    {name: '소프트웨어전공', code: 'H3HADDB'},
    {name: '융합전자공학부', code: 'H3HADG'}
  ];

  var MajorInfo = {
    getMajorsInfo: function () {return $q.when(majorsInfo);},
    getNameByCode: function (code) {
      var deferred = $q.defer();
      var hasFoundName = false;

      angular.forEach(majorsInfo, function (major) {
        if (major.code === code) {
          deferred.resolve(major.name);
          hasFoundName = true;
          return false;
        }
      });

      if (!hasFoundName) {
        deferred.reject('cannot find name for major code ' + code);
      }

      return deferred.promise;
    }
  };

  var Class = {
    query: function (parameters, success, error) {
      var result;

      if (parameters && parameters.name && parameters.name === '미분적분학') {
        result = [
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
        ]

        if (parameters.major && parameters.major === 'H3HADD') {
          result = result.slice(0, 3);

          if (parameters.class_no && parameters.class_no === '10455') {
            result = result.slice(2, 3);
          }
        } else if (parameters.class_no && parameters.class_no === '10455') {
          result = result.slice(2, 3);
        }
      }

      $timeout(function () {
        success(result);
      }, 0);
      return result;
    },

    get: function (parameters, success, error) {
      var classNo = parameters.classNo;
      var result;

      switch (classNo) {
      case '13056':
        result = {
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
        };
        break;

      case '13057':
        result = {
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
        };
        break;

      case '10455':
        result = {
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
        };
        break;

      case '10303':
        result = {
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
        };
        break;

      case '10301':
        result = {
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
        };
        break;

      case '10302':
        result = {
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
        };
        break;
      }

      $timeout(function () {
        success(result);
      }, 0);
      return result;
    }
  };

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

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$q_, _$timeout_) {
    $q = _$q_;
    $timeout = _$timeout_;
    scope = $rootScope.$new();
    CreateCtrl = $controller('CreateCtrl', {
      $scope: scope,
      storedContext: storedContext,
      MajorInfo: MajorInfo,
      Class: Class
    });
  }));

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
              {instructor: null, class_no: '13056', fixed: false},
              {instructor: '신교일', class_no: '13057', fixed: true},
              {instructor: '평인수', class_no: '10455', fixed: false}
            ]
          }
        ]
      }
    ];

    $timeout.flush();

    expect(scope.classCart).toEqualData(expectedClassCart);
    expect(scope.excludedTime).toEqualData(storedContext.excludedTime);
    expect(scope.options).toEqualData(storedContext.options);
  });

  it('should delete a class entity from class cart and store the class cart into cookie', function () {
    var scopeClassCart = [
      {
        placement_required: true,
        course_no: 'CSE406',
        name: '소프트웨어공학',
        majors: [
          {
            code: 'H3HADD',
            name: '컴퓨터공학부',
            grade: 3,
            credit: 3.00,
            classes: [
              {instructor: '유민수', class_no: '10406', fixed: false},
              {instructor: '유인경', class_no: '10407', fixed: true}
            ]
          }
        ]
      },
      {
        placement_required: true,
        course_no: 'ITE316',
        name: '데이터베이스시스템',
        majors: [
          {
            code: 'H3HADD',
            name: '컴퓨터공학부',
            grade: 3,
            credit: 3.00,
            classes: [
              {instructor: '김상욱', class_no: '10415', fixed: true},
              {instructor: '김영훈', class_no: '10414', fixed: false}
            ]
          }
        ]
      }
    ];

    var expectedScopeClassCart = [
      {
        placement_required: true,
        course_no: 'CSE406',
        name: '소프트웨어공학',
        majors: [
          {
            code: 'H3HADD',
            name: '컴퓨터공학부',
            grade: 3,
            credit: 3.00,
            classes: [
              {instructor: '유인경', class_no: '10407', fixed: true}
            ]
          }
        ]
      },
      {
        placement_required: true,
        course_no: 'ITE316',
        name: '데이터베이스시스템',
        majors: [
          {
            code: 'H3HADD',
            name: '컴퓨터공학부',
            grade: 3,
            credit: 3.00,
            classes: [
              {instructor: '김상욱', class_no: '10415', fixed: true},
              {instructor: '김영훈', class_no: '10414', fixed: false}
            ]
          }
        ]
      }
    ];

    var expectedStoredClassCart = [
      {
        placement_required: true,
        course_no: 'CSE406',
        classes: [
          {class_no: '10407', fixed: true}
        ]
      },
      {
        placement_required: true,
        course_no: 'ITE316',
        classes: [
          {class_no: '10415', fixed: true},
          {class_no: '10414', fixed: false}
        ]
      }
    ];

    spyOn(jQuery, 'cookie').andCallThrough();

    scope.classCart = scopeClassCart;
    scope.deleteClass('10406');

    expect(scope.classCart).toBeEqual(expectedScopeClassCart);
    expect(jQuery.cookie)
    .toHaveBeenCalledWith('context-create', expectedStoredClassCart);
  });

  it('should load the list of classes from the server', function () {
    expect(scope.classes).toBe(undefined);
    scope.keyword = '미분적분학';
    scope.search();

    $timeout.flush();

    expect(scope.classes).toEqualData(basicSearchResult);
  });
});
