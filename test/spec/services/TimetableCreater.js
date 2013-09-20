'use strict';

describe('Service: TimetableCreater', function () {

  // load the service's module
  beforeEach(module('dashApp'));

  // instantiate service
  var $httpBackend, $timeout, $rootScope;
  var ClassCart, TimetableCreater;
  beforeEach(inject(function (_$httpBackend_,
                              _$timeout_,
                              _$rootScope_,
                              _ClassCart_,
                              _TimetableCreater_) {
    $httpBackend = _$httpBackend_;
    $timeout = _$timeout_;
    $rootScope = _$rootScope_;
    ClassCart = _ClassCart_;
    TimetableCreater = _TimetableCreater_;

    cart = new ClassCart(scopeClassCart);
  }));

  // test data
  var scopeClassCart = [
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
              instructor: '평인수',
              class_no: '10455',
              time: [
                {start_time: 211, end_time: 213, room: 'H05-0203'},
                {start_time: 514, end_time: 516, room: 'H05-0203'}
              ]
            }
          ]
        }
      ]
    },
    {
      placement_required: true,
      course_no: 'ITE109',
      name: 'C프로그래밍',
      majors: [
        {
          code: 'H3HADD',
          name: '컴퓨터공학부',
          grade: 1,
          credit: 3.00,
          classes: [
            {
              instructor: '임을규',
              class_no: '13834',
              fixed: true,
              time: [
                {start_time: 103, end_time: 106, room: 'H77-0813'},
                {start_time: 510, end_time: 513, room: 'H77-0607'}
              ]
            }
          ]
        }
      ]
    },
    {
      placement_required: true,
      course_no: 'GEN255',
      name: '생물학',
      majors: [
        {
          code: 'H3HADD',
          name: '컴퓨터공학부',
          grade: 1,
          credit: 3.00,
          classes: [
            {
              instructor: '김백호',
              class_no: '10457',
              fixed: true,
              time: [
                {start_time: 116, end_time: 118, room: 'H77-0202'},
                {start_time: 216, end_time: 218, room: 'H77-0507'}
              ]
            }
          ]
        }
      ]
    },
    {
      placement_required: false,
      course_no: 'MAT203',
      name: '선형대수',
      majors: [
        {
          code: 'H3HADD',
          name: '컴퓨터공학부',
          grade: 1,
          credit: 3.00,
          classes: [
            {
              instructor: '이상화',
              class_no: '10459',
              fixed: false,
              time: [
                {start_time: 203, end_time: 205, room: 'H77-0203'},
                {start_time: 406, end_time: 408, room: 'H77-0207'}
              ]
            },
            {
              instructor: '이상화',
              class_no: '10460',
              fixed: false,
              time: [
                {start_time: 214, end_time: 216, room: 'H77-0203'},
                {start_time: 411, end_time: 413, room: 'H77-0207'}
              ]
            },
            {
              instructor: '최윤성',
              class_no: '13905',
              fixed: false,
              time: [
                {start_time: 119, end_time: 121, room: 'H77-0813'},
                {start_time: 418, end_time: 420, room: 'H77-0813'}
              ]
            }
          ]
        }
      ]
    },
    {
      placement_required: false,
      course_no: 'MAT220',
      name: '이산수학',
      majors: [
        {
          code: 'H3HADD',
          name: '컴퓨터공학부',
          grade: 1,
          credit: 3.00,
          classes: [
            {
              instructor: '정임영',
              class_no: '13835',
              fixed: false,
              time: [
                {start_time: 107, end_time: 109, room: 'H77-0507'},
                {start_time: 307, end_time: 309, room: 'H77-0507'}
              ]
            },
            {
              instructor: '정임영',
              class_no: '10452',
              fixed: false,
              time: [
                {start_time: 111, end_time: 113, room: 'H77-0507'},
                {start_time: 311, end_time: 313, room: 'H77-0507'}
              ]
            },
            {
              instructor: '정임영',
              class_no: '10451',
              fixed: false,
              time: [
                {start_time: 104, end_time: 106, room: 'H77-0507'},
                {start_time: 304, end_time: 306, room: 'H77-0507'}
              ]
            }
          ]
        }
      ]
    },
    {
      placement_required: false,
      course_no: 'CUL312',
      name: '일반물리학및실험2',
      majors: [
        {
          code: 'H3HADD',
          name: '컴퓨터공학부',
          grade: 1,
          credit: 3.00,
          classes: [
            {
              instructor: '김성원',
              class_no: '13067',
              fixed: false,
              time: [
                {start_time: 206, end_time: 208, room: 'H05-0101'},
                {start_time: 315, end_time: 318, room: 'H36-0212'},
                {start_time: 403, end_time: 405, room: 'H05-0101'}
              ]
            },
            {
              instructor: '윤승언',
              class_no: '10453',
              fixed: false,
              time: [
                {start_time: 206, end_time: 208, room: 'H77-0501'},
                {start_time: 315, end_time: 318, room: 'H36-0214'},
                {start_time: 403, end_time: 405, room: 'H77-0501'}
              ]
            },
            {
              instructor: '조진호',
              class_no: '10454',
              fixed: false,
              time: [
                {start_time: 106, end_time: 108, room: 'H77-0501'},
                {start_time: 303, end_time: 305, room: 'H77-0501'},
                {start_time: 507, end_time: 510, room: 'H36-0214'}
              ]
            }
          ]
        }
      ]
    }
  ];
  var cart;

  // mock server data
  beforeEach(function() {
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
    $httpBackend.whenGET('api/classes/13834')
    .respond(200, {
      class_no: '13834',
      course_no: 'ITE109',
      name: 'C프로그래밍',
      major: 'H3HADD',
      time: [
        {start_time: 103, end_time: 106, room: 'H77-0813'},
        {start_time: 510, end_time: 513, room: 'H77-0607'}
      ],
      credit: 3.00,
      grade: 1,
      instructor: '임을규',
      category: '전공핵심'
    });
    $httpBackend.whenGET('api/classes/10457')
    .respond(200, {
      class_no: '10457',
      course_no: 'GEN255',
      name: '생물학',
      major: 'H3HADD',
      time: [
        {start_time: 116, end_time: 118, room: 'H77-0202'},
        {start_time: 216, end_time: 218, room: 'H77-0507'}
      ],
      credit: 3.00,
      grade: 1,
      instructor: '김백호',
      category: '기초필수'
    });
    $httpBackend.whenGET('api/classes/10459')
    .respond(200, {
      class_no: '10459',
      course_no: 'MAT203',
      name: '선형대수',
      major: 'H3HADD',
      time: [
        {start_time: 203, end_time: 205, room: 'H77-0203'},
        {start_time: 406, end_time: 408, room: 'H77-0207'}
      ],
      credit: 3.00,
      grade: 1,
      instructor: '이상화',
      category: '기초필수'
    });
    $httpBackend.whenGET('api/classes/10460')
    .respond(200, {
      class_no: '10460',
      course_no: 'MAT203',
      name: '선형대수',
      major: 'H3HADD',
      time: [
        {start_time: 214, end_time: 216, room: 'H77-0203'},
        {start_time: 411, end_time: 413, room: 'H77-0207'}
      ],
      credit: 3.00,
      grade: 1,
      instructor: '이상화',
      category: '기초필수'
    });
    $httpBackend.whenGET('api/classes/13905')
    .respond(200, {
      class_no: '13905',
      course_no: 'MAT203',
      name: '선형대수',
      major: 'H3HADD',
      time: [
        {start_time: 119, end_time: 121, room: 'H77-0813'},
        {start_time: 418, end_time: 420, room: 'H77-0813'}
      ],
      credit: 3.00,
      grade: 1,
      instructor: '최윤성',
      category: '기초필수'
    });
    $httpBackend.whenGET('api/classes/13835')
    .respond(200, {
      class_no: '13835',
      course_no: 'MAT220',
      name: '이산수학',
      major: 'H3HADD',
      time: [
        {start_time: 107, end_time: 109, room: 'H77-0507'},
        {start_time: 307, end_time: 309, room: 'H77-0507'}
      ],
      credit: 3.00,
      grade: 1,
      instructor: '정임영',
      category: '전공핵심'
    });
    $httpBackend.whenGET('api/classes/10452')
    .respond(200, {
      class_no: '10452',
      course_no: 'MAT220',
      name: '이산수학',
      major: 'H3HADD',
      time: [
        {start_time: 111, end_time: 113, room: 'H77-0507'},
        {start_time: 311, end_time: 313, room: 'H77-0507'}
      ],
      credit: 3.00,
      grade: 1,
      instructor: '정임영',
      category: '전공핵심'
    });
    $httpBackend.whenGET('api/classes/10451')
    .respond(200, {
      class_no: '10451',
      course_no: 'MAT220',
      name: '이산수학',
      major: 'H3HADD',
      time: [
        {start_time: 104, end_time: 106, room: 'H77-0507'},
        {start_time: 304, end_time: 306, room: 'H77-0507'}
      ],
      credit: 3.00,
      grade: 1,
      instructor: '정임영',
      category: '전공핵심'
    });
    $httpBackend.whenGET('api/classes/13067')
    .respond(200, {
      class_no: '13067',
      course_no: 'CUL312',
      name: '일반물리학및실험2',
      major: 'H3HADD',
      time: [
        {start_time: 206, end_time: 208, room: 'H05-0101'},
        {start_time: 315, end_time: 318, room: 'H36-0212'},
        {start_time: 403, end_time: 405, room: 'H05-0101'}
      ],
      credit: 3.00,
      grade: 1,
      instructor: '김성원',
      category: '기초필수'
    });
    $httpBackend.whenGET('api/classes/10453')
    .respond(200, {
      class_no: '10453',
      course_no: 'CUL312',
      name: '일반물리학및실험2',
      major: 'H3HADD',
      time: [
        {start_time: 206, end_time: 208, room: 'H77-0501'},
        {start_time: 315, end_time: 318, room: 'H36-0214'},
        {start_time: 403, end_time: 405, room: 'H77-0501'}
      ],
      credit: 3.00,
      grade: 1,
      instructor: '윤승언',
      category: '기초필수'
    });
    $httpBackend.whenGET('api/classes/10454')
    .respond(200, {
      class_no: '10454',
      course_no: 'CUL312',
      name: '일반물리학및실험2',
      major: 'H3HADD',
      time: [
        {start_time: 106, end_time: 108, room: 'H77-0501'},
        {start_time: 303, end_time: 305, room: 'H77-0501'},
        {start_time: 507, end_time: 510, room: 'H36-0214'}
      ],
      credit: 3.00,
      grade: 1,
      instructor: '조진호',
      category: '기초필수'
    });
  });

  var possibleTimetables = [
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT203',
          'class_no': '10459',
          'major': 'H3HADD',
          'name': '선형대수',
          'instructor': '이상화',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 203, 'end_time': 205, 'room': 'H77-0203'},
            {'start_time': 406, 'end_time': 408, 'room': 'H77-0207'}
          ]
        },
        {
          'course_no': 'MAT220',
          'class_no': '13835',
          'major': 'H3HADD',
          'name': '이산수학',
          'instructor': '정임영',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 107, 'end_time': 109, 'room': 'H77-0507'},
            {'start_time': 307, 'end_time': 309, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'CUL312',
          'class_no': '13067',
          'major': 'H3HADD',
          'name': '일반물리학및실험2',
          'instructor': '김성원',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 206, 'end_time': 208, 'room': 'H05-0101'},
            {'start_time': 315, 'end_time': 318, 'room': 'H36-0212'},
            {'start_time': 403, 'end_time': 405, 'room': 'H05-0101'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT203',
          'class_no': '10459',
          'major': 'H3HADD',
          'name': '선형대수',
          'instructor': '이상화',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 203, 'end_time': 205, 'room': 'H77-0203'},
            {'start_time': 406, 'end_time': 408, 'room': 'H77-0207'}
          ]
        },
        {
          'course_no': 'MAT220',
          'class_no': '13835',
          'major': 'H3HADD',
          'name': '이산수학',
          'instructor': '정임영',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 107, 'end_time': 109, 'room': 'H77-0507'},
            {'start_time': 307, 'end_time': 309, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'CUL312',
          'class_no': '10453',
          'major': 'H3HADD',
          'name': '일반물리학및실험2',
          'instructor': '윤승언',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 206, 'end_time': 208, 'room': 'H77-0501'},
            {'start_time': 315, 'end_time': 318, 'room': 'H36-0214'},
            {'start_time': 403, 'end_time': 405, 'room': 'H77-0501'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT203',
          'class_no': '10459',
          'major': 'H3HADD',
          'name': '선형대수',
          'instructor': '이상화',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 203, 'end_time': 205, 'room': 'H77-0203'},
            {'start_time': 406, 'end_time': 408, 'room': 'H77-0207'}
          ]
        },
        {
          'course_no': 'MAT220',
          'class_no': '13835',
          'major': 'H3HADD',
          'name': '이산수학',
          'instructor': '정임영',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 107, 'end_time': 109, 'room': 'H77-0507'},
            {'start_time': 307, 'end_time': 309, 'room': 'H77-0507'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT203',
          'class_no': '10459',
          'major': 'H3HADD',
          'name': '선형대수',
          'instructor': '이상화',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 203, 'end_time': 205, 'room': 'H77-0203'},
            {'start_time': 406, 'end_time': 408, 'room': 'H77-0207'}
          ]
        },
        {
          'course_no': 'MAT220',
          'class_no': '10452',
          'major': 'H3HADD',
          'name': '이산수학',
          'instructor': '정임영',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 111, 'end_time': 113, 'room': 'H77-0507'},
            {'start_time': 311, 'end_time': 313, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'CUL312',
          'class_no': '13067',
          'major': 'H3HADD',
          'name': '일반물리학및실험2',
          'instructor': '김성원',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 206, 'end_time': 208, 'room': 'H05-0101'},
            {'start_time': 315, 'end_time': 318, 'room': 'H36-0212'},
            {'start_time': 403, 'end_time': 405, 'room': 'H05-0101'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT203',
          'class_no': '10459',
          'major': 'H3HADD',
          'name': '선형대수',
          'instructor': '이상화',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 203, 'end_time': 205, 'room': 'H77-0203'},
            {'start_time': 406, 'end_time': 408, 'room': 'H77-0207'}
          ]
        },
        {
          'course_no': 'MAT220',
          'class_no': '10452',
          'major': 'H3HADD',
          'name': '이산수학',
          'instructor': '정임영',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 111, 'end_time': 113, 'room': 'H77-0507'},
            {'start_time': 311, 'end_time': 313, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'CUL312',
          'class_no': '10453',
          'major': 'H3HADD',
          'name': '일반물리학및실험2',
          'instructor': '윤승언',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 206, 'end_time': 208, 'room': 'H77-0501'},
            {'start_time': 315, 'end_time': 318, 'room': 'H36-0214'},
            {'start_time': 403, 'end_time': 405, 'room': 'H77-0501'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT203',
          'class_no': '10459',
          'major': 'H3HADD',
          'name': '선형대수',
          'instructor': '이상화',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 203, 'end_time': 205, 'room': 'H77-0203'},
            {'start_time': 406, 'end_time': 408, 'room': 'H77-0207'}
          ]
        },
        {
          'course_no': 'MAT220',
          'class_no': '10452',
          'major': 'H3HADD',
          'name': '이산수학',
          'instructor': '정임영',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 111, 'end_time': 113, 'room': 'H77-0507'},
            {'start_time': 311, 'end_time': 313, 'room': 'H77-0507'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT203',
          'class_no': '10459',
          'major': 'H3HADD',
          'name': '선형대수',
          'instructor': '이상화',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 203, 'end_time': 205, 'room': 'H77-0203'},
            {'start_time': 406, 'end_time': 408, 'room': 'H77-0207'}
          ]
        },
        {
          'course_no': 'CUL312',
          'class_no': '13067',
          'major': 'H3HADD',
          'name': '일반물리학및실험2',
          'instructor': '김성원',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 206, 'end_time': 208, 'room': 'H05-0101'},
            {'start_time': 315, 'end_time': 318, 'room': 'H36-0212'},
            {'start_time': 403, 'end_time': 405, 'room': 'H05-0101'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT203',
          'class_no': '10459',
          'major': 'H3HADD',
          'name': '선형대수',
          'instructor': '이상화',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 203, 'end_time': 205, 'room': 'H77-0203'},
            {'start_time': 406, 'end_time': 408, 'room': 'H77-0207'}
          ]
        },
        {
          'course_no': 'CUL312',
          'class_no': '10453',
          'major': 'H3HADD',
          'name': '일반물리학및실험2',
          'instructor': '윤승언',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 206, 'end_time': 208, 'room': 'H77-0501'},
            {'start_time': 315, 'end_time': 318, 'room': 'H36-0214'},
            {'start_time': 403, 'end_time': 405, 'room': 'H77-0501'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT203',
          'class_no': '10459',
          'major': 'H3HADD',
          'name': '선형대수',
          'instructor': '이상화',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 203, 'end_time': 205, 'room': 'H77-0203'},
            {'start_time': 406, 'end_time': 408, 'room': 'H77-0207'}
          ]
        }
      ]
    },

    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT203',
          'class_no': '13905',
          'major': 'H3HADD',
          'name': '선형대수',
          'instructor': '최윤성',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 119, 'end_time': 121, 'room': 'H77-0813'},
            {'start_time': 418, 'end_time': 420, 'room': 'H77-0813'}
          ]
        },
        {
          'course_no': 'MAT220',
          'class_no': '13835',
          'major': 'H3HADD',
          'name': '이산수학',
          'instructor': '정임영',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 107, 'end_time': 109, 'room': 'H77-0507'},
            {'start_time': 307, 'end_time': 309, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'CUL312',
          'class_no': '13067',
          'major': 'H3HADD',
          'name': '일반물리학및실험2',
          'instructor': '김성원',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 206, 'end_time': 208, 'room': 'H05-0101'},
            {'start_time': 315, 'end_time': 318, 'room': 'H36-0212'},
            {'start_time': 403, 'end_time': 405, 'room': 'H05-0101'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT203',
          'class_no': '13905',
          'major': 'H3HADD',
          'name': '선형대수',
          'instructor': '최윤성',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 119, 'end_time': 121, 'room': 'H77-0813'},
            {'start_time': 418, 'end_time': 420, 'room': 'H77-0813'}
          ]
        },
        {
          'course_no': 'MAT220',
          'class_no': '13835',
          'major': 'H3HADD',
          'name': '이산수학',
          'instructor': '정임영',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 107, 'end_time': 109, 'room': 'H77-0507'},
            {'start_time': 307, 'end_time': 309, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'CUL312',
          'class_no': '10453',
          'major': 'H3HADD',
          'name': '일반물리학및실험2',
          'instructor': '윤승언',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 206, 'end_time': 208, 'room': 'H77-0501'},
            {'start_time': 315, 'end_time': 318, 'room': 'H36-0214'},
            {'start_time': 403, 'end_time': 405, 'room': 'H77-0501'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT203',
          'class_no': '13905',
          'major': 'H3HADD',
          'name': '선형대수',
          'instructor': '최윤성',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 119, 'end_time': 121, 'room': 'H77-0813'},
            {'start_time': 418, 'end_time': 420, 'room': 'H77-0813'}
          ]
        },
        {
          'course_no': 'MAT220',
          'class_no': '13835',
          'major': 'H3HADD',
          'name': '이산수학',
          'instructor': '정임영',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 107, 'end_time': 109, 'room': 'H77-0507'},
            {'start_time': 307, 'end_time': 309, 'room': 'H77-0507'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT203',
          'class_no': '13905',
          'major': 'H3HADD',
          'name': '선형대수',
          'instructor': '최윤성',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 119, 'end_time': 121, 'room': 'H77-0813'},
            {'start_time': 418, 'end_time': 420, 'room': 'H77-0813'}
          ]
        },
        {
          'course_no': 'MAT220',
          'class_no': '10452',
          'major': 'H3HADD',
          'name': '이산수학',
          'instructor': '정임영',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 111, 'end_time': 113, 'room': 'H77-0507'},
            {'start_time': 311, 'end_time': 313, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'CUL312',
          'class_no': '13067',
          'major': 'H3HADD',
          'name': '일반물리학및실험2',
          'instructor': '김성원',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 206, 'end_time': 208, 'room': 'H05-0101'},
            {'start_time': 315, 'end_time': 318, 'room': 'H36-0212'},
            {'start_time': 403, 'end_time': 405, 'room': 'H05-0101'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT203',
          'class_no': '13905',
          'major': 'H3HADD',
          'name': '선형대수',
          'instructor': '최윤성',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 119, 'end_time': 121, 'room': 'H77-0813'},
            {'start_time': 418, 'end_time': 420, 'room': 'H77-0813'}
          ]
        },
        {
          'course_no': 'MAT220',
          'class_no': '10452',
          'major': 'H3HADD',
          'name': '이산수학',
          'instructor': '정임영',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 111, 'end_time': 113, 'room': 'H77-0507'},
            {'start_time': 311, 'end_time': 313, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'CUL312',
          'class_no': '10453',
          'major': 'H3HADD',
          'name': '일반물리학및실험2',
          'instructor': '윤승언',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 206, 'end_time': 208, 'room': 'H77-0501'},
            {'start_time': 315, 'end_time': 318, 'room': 'H36-0214'},
            {'start_time': 403, 'end_time': 405, 'room': 'H77-0501'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT203',
          'class_no': '13905',
          'major': 'H3HADD',
          'name': '선형대수',
          'instructor': '최윤성',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 119, 'end_time': 121, 'room': 'H77-0813'},
            {'start_time': 418, 'end_time': 420, 'room': 'H77-0813'}
          ]
        },
        {
          'course_no': 'MAT220',
          'class_no': '10452',
          'major': 'H3HADD',
          'name': '이산수학',
          'instructor': '정임영',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 111, 'end_time': 113, 'room': 'H77-0507'},
            {'start_time': 311, 'end_time': 313, 'room': 'H77-0507'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT203',
          'class_no': '13905',
          'major': 'H3HADD',
          'name': '선형대수',
          'instructor': '최윤성',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 119, 'end_time': 121, 'room': 'H77-0813'},
            {'start_time': 418, 'end_time': 420, 'room': 'H77-0813'}
          ]
        },
        {
          'course_no': 'CUL312',
          'class_no': '13067',
          'major': 'H3HADD',
          'name': '일반물리학및실험2',
          'instructor': '김성원',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 206, 'end_time': 208, 'room': 'H05-0101'},
            {'start_time': 315, 'end_time': 318, 'room': 'H36-0212'},
            {'start_time': 403, 'end_time': 405, 'room': 'H05-0101'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT203',
          'class_no': '13905',
          'major': 'H3HADD',
          'name': '선형대수',
          'instructor': '최윤성',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 119, 'end_time': 121, 'room': 'H77-0813'},
            {'start_time': 418, 'end_time': 420, 'room': 'H77-0813'}
          ]
        },
        {
          'course_no': 'CUL312',
          'class_no': '10453',
          'major': 'H3HADD',
          'name': '일반물리학및실험2',
          'instructor': '윤승언',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 206, 'end_time': 208, 'room': 'H77-0501'},
            {'start_time': 315, 'end_time': 318, 'room': 'H36-0214'},
            {'start_time': 403, 'end_time': 405, 'room': 'H77-0501'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT203',
          'class_no': '13905',
          'major': 'H3HADD',
          'name': '선형대수',
          'instructor': '최윤성',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 119, 'end_time': 121, 'room': 'H77-0813'},
            {'start_time': 418, 'end_time': 420, 'room': 'H77-0813'}
          ]
        }
      ]
    },

    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT220',
          'class_no': '13835',
          'major': 'H3HADD',
          'name': '이산수학',
          'instructor': '정임영',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 107, 'end_time': 109, 'room': 'H77-0507'},
            {'start_time': 307, 'end_time': 309, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'CUL312',
          'class_no': '13067',
          'major': 'H3HADD',
          'name': '일반물리학및실험2',
          'instructor': '김성원',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 206, 'end_time': 208, 'room': 'H05-0101'},
            {'start_time': 315, 'end_time': 318, 'room': 'H36-0212'},
            {'start_time': 403, 'end_time': 405, 'room': 'H05-0101'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT220',
          'class_no': '13835',
          'major': 'H3HADD',
          'name': '이산수학',
          'instructor': '정임영',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 107, 'end_time': 109, 'room': 'H77-0507'},
            {'start_time': 307, 'end_time': 309, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'CUL312',
          'class_no': '10453',
          'major': 'H3HADD',
          'name': '일반물리학및실험2',
          'instructor': '윤승언',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 206, 'end_time': 208, 'room': 'H77-0501'},
            {'start_time': 315, 'end_time': 318, 'room': 'H36-0214'},
            {'start_time': 403, 'end_time': 405, 'room': 'H77-0501'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT220',
          'class_no': '13835',
          'major': 'H3HADD',
          'name': '이산수학',
          'instructor': '정임영',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 107, 'end_time': 109, 'room': 'H77-0507'},
            {'start_time': 307, 'end_time': 309, 'room': 'H77-0507'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT220',
          'class_no': '10452',
          'major': 'H3HADD',
          'name': '이산수학',
          'instructor': '정임영',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 111, 'end_time': 113, 'room': 'H77-0507'},
            {'start_time': 311, 'end_time': 313, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'CUL312',
          'class_no': '13067',
          'major': 'H3HADD',
          'name': '일반물리학및실험2',
          'instructor': '김성원',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 206, 'end_time': 208, 'room': 'H05-0101'},
            {'start_time': 315, 'end_time': 318, 'room': 'H36-0212'},
            {'start_time': 403, 'end_time': 405, 'room': 'H05-0101'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT220',
          'class_no': '10452',
          'major': 'H3HADD',
          'name': '이산수학',
          'instructor': '정임영',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 111, 'end_time': 113, 'room': 'H77-0507'},
            {'start_time': 311, 'end_time': 313, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'CUL312',
          'class_no': '10453',
          'major': 'H3HADD',
          'name': '일반물리학및실험2',
          'instructor': '윤승언',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 206, 'end_time': 208, 'room': 'H77-0501'},
            {'start_time': 315, 'end_time': 318, 'room': 'H36-0214'},
            {'start_time': 403, 'end_time': 405, 'room': 'H77-0501'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'MAT220',
          'class_no': '10452',
          'major': 'H3HADD',
          'name': '이산수학',
          'instructor': '정임영',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 111, 'end_time': 113, 'room': 'H77-0507'},
            {'start_time': 311, 'end_time': 313, 'room': 'H77-0507'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'CUL312',
          'class_no': '13067',
          'major': 'H3HADD',
          'name': '일반물리학및실험2',
          'instructor': '김성원',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 206, 'end_time': 208, 'room': 'H05-0101'},
            {'start_time': 315, 'end_time': 318, 'room': 'H36-0212'},
            {'start_time': 403, 'end_time': 405, 'room': 'H05-0101'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        },
        {
          'course_no': 'CUL312',
          'class_no': '10453',
          'major': 'H3HADD',
          'name': '일반물리학및실험2',
          'instructor': '윤승언',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 206, 'end_time': 208, 'room': 'H77-0501'},
            {'start_time': 315, 'end_time': 318, 'room': 'H36-0214'},
            {'start_time': 403, 'end_time': 405, 'room': 'H77-0501'}
          ]
        }
      ]
    },
    {
      'classes': [
        {
          'course_no': 'GEN253',
          'class_no': '10455',
          'major': 'H3HADD',
          'name': '미분적분학2',
          'instructor': '평인수',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 211, 'end_time': 213, 'room': 'H05-0203'},
            {'start_time': 514, 'end_time': 516, 'room': 'H05-0203'}
          ]
        },
        {
          'course_no': 'ITE109',
          'class_no': '13834',
          'major': 'H3HADD',
          'name': 'C프로그래밍',
          'instructor': '임을규',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 103, 'end_time': 106, 'room': 'H77-0813'},
            {'start_time': 510, 'end_time': 513, 'room': 'H77-0607'}
          ]
        },
        {
          'course_no': 'GEN255',
          'class_no': '10457',
          'major': 'H3HADD',
          'name': '생물학',
          'instructor': '김백호',
          'credit': 3.00,
          'grade': 1,
          'time': [
            {'start_time': 116, 'end_time': 118, 'room': 'H77-0202'},
            {'start_time': 216, 'end_time': 218, 'room': 'H77-0507'}
          ]
        }
      ]
    }
  ];

  var pickFromArray = function (indices, arr) {
    var result = [];
    angular.forEach(indices, function (i) {
      result.push(arr[i]);
    });

    return result;
  };

  describe('without excludedPeriods', function () {
    it('should return the array of timetables which can be created ' +
      'with class cart and no option', function () {
        var expectedTimetables = possibleTimetables;
        TimetableCreater.createTimetablesFrom(cart)
        .then(function (timetable) {
          expect(timetable).toEqualData(expectedTimetables);
        });

        $httpBackend.flush();
    });

    it('should return the array of timetables which can be created ' +
      'with class cart and max. credit option', function () {
        var expectedTimetables = possibleTimetables.slice(0, 26);
        var options = {
          creditRange: {min: 12, max: 18}
        };
        TimetableCreater.createTimetablesFrom(cart, options)
        .then(function (timetable) {
          expect(timetable).toEqualData(expectedTimetables);
        });

        $httpBackend.flush();
    });

    it('should return the array of timetables which can be created ' +
      'with class cart and the number of class days option', function () {
        var expectedTimetables = pickFromArray(
            [8, 17, 20, 23],
            possibleTimetables);
        var options = {
          nClassDays: [4]
        };
        TimetableCreater.createTimetablesFrom(cart, options)
        .then(function (timetable) {
          expect(timetable).toEqualData(expectedTimetables);
        });

        $httpBackend.flush();
    });

    it('should return the array of timetables which can be created ' +
      'with class cart and max. number of classes per day option', function () {
        var expectedTimetables = pickFromArray(
            [2, 5, 8, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
            possibleTimetables);
        var options = {
          nMaxClassesPerDay: 3
        };
        TimetableCreater.createTimetablesFrom(cart, options)
        .then(function (timetable) {
          expect(timetable).toEqualData(expectedTimetables);
        });

        $httpBackend.flush();
    });

    it('should return the array of timetables which can be created ' +
      'with class cart, ' +
      'max. credit option, ' +
      'and the number of class days option', function () {
        var expectedTimetables = pickFromArray(
            [8, 17, 20, 23],
            possibleTimetables);
        var options = {
          creditRange: {min: 12, max: 18},
          nClassDays: [4]
        };
        TimetableCreater.createTimetablesFrom(cart, options)
        .then(function (timetable) {
          expect(timetable).toEqualData(expectedTimetables);
        });

        $httpBackend.flush();
    });

    it('should return the array of timetables which can be created ' +
      'with class cart, ' +
      'max. credit option, ' +
      'and max. number of classes per day option', function () {
        var expectedTimetables = pickFromArray(
            [2, 5, 8, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
            possibleTimetables);
        var options = {
          creditRange: {min: 12, max: 18},
          nMaxClassesPerDay: 3
        };
        TimetableCreater.createTimetablesFrom(cart, options)
        .then(function (timetable) {
          expect(timetable).toEqualData(expectedTimetables);
        });

        $httpBackend.flush();
    });

    it('should return the array of timetables which can be created ' +
      'with class cart, ' +
      'the number of class days option, ' +
      'and max. number of classes per day option', function () {
        var expectedTimetables = pickFromArray(
            [8, 17, 20, 23],
            possibleTimetables);
        var options = {
          nClassDays: [4],
          nMaxClassesPerDay: 3
        };
        TimetableCreater.createTimetablesFrom(cart, options)
        .then(function (timetable) {
          expect(timetable).toEqualData(expectedTimetables);
        });

        $httpBackend.flush();
    });

    it('should return the array of timetables which can be created ' +
      'with class cart, ' +
      'max. credit option, ' +
      'the number of class days option, ' +
      'and max. number of classes per day option', function () {
        var expectedTimetables = pickFromArray(
            [8, 17, 20, 23],
            possibleTimetables);
        var options = {
          creditRange: {min: 12, max: 18},
          nClassDays: [4],
          nMaxClassesPerDay: 3
        };
        TimetableCreater.createTimetablesFrom(cart, options)
        .then(function (timetable) {
          expect(timetable).toEqualData(expectedTimetables);
        });

        $httpBackend.flush();
    });
  });

  describe('with excludedPeriods', function () {
    var excludedPeriods = [303, 304, 403, 404, 503, 504];

    var addExcludedPeriods = function (expectedTimetables) {
      angular.forEach(expectedTimetables, function (timetable) {
        timetable.excludedPeriods = excludedPeriods;
      });
    };

    it('should return the array of timetables which can be created ' +
      'with class cart, ' +
      'and excludedPeriods option', function () {
        var expectedTimetables = pickFromArray(
            [2, 5, 8, 11, 14, 17, 20, 23, 26],
            possibleTimetables);
        var options = {
          excludedPeriods: excludedPeriods
        };
        addExcludedPeriods(expectedTimetables);
        TimetableCreater.createTimetablesFrom(cart, options)
        .then(function (timetable) {
          expect(timetable).toEqualData(expectedTimetables);
        });

        $httpBackend.flush();
    });

    it('should return the array of timetables which can be created ' +
      'with class cart, ' +
      'excludedPeriods option, ' +
      'and max. credit option', function () {
        var expectedTimetables = pickFromArray(
            [2, 5, 8, 11, 14, 17, 20, 23],
            possibleTimetables);
        var options = {
          excludedPeriods: excludedPeriods,
          creditRange: {min: 12, max: 18}
        };
        addExcludedPeriods(expectedTimetables);
        TimetableCreater.createTimetablesFrom(cart, options)
        .then(function (timetable) {
          expect(timetable).toEqualData(expectedTimetables);
        });

        $httpBackend.flush();
    });

    it('should return the array of timetables which can be created ' +
      'with class cart, ' +
      'excludedPeriods option, ' +
      'and the number of class days option', function () {
        var expectedTimetables = pickFromArray(
            [8, 17, 20, 23],
            possibleTimetables);
        var options = {
          excludedPeriods: excludedPeriods,
          nClassDays: [4]
        };
        addExcludedPeriods(expectedTimetables);
        TimetableCreater.createTimetablesFrom(cart, options)
        .then(function (timetable) {
          expect(timetable).toEqualData(expectedTimetables);
        });

        $httpBackend.flush();
    });

    it('should return the array of timetables which can be created ' +
      'with class cart, ' +
      'excludedPeriods option, ' +
      'and max. number of classes per day option', function () {
        var expectedTimetables = pickFromArray(
            [2, 5, 8, 17, 20, 23, 26],
            possibleTimetables);
        var options = {
          excludedPeriods: excludedPeriods,
          nMaxClassesPerDay: 3
        };
        addExcludedPeriods(expectedTimetables);
        TimetableCreater.createTimetablesFrom(cart, options)
        .then(function (timetable) {
          expect(timetable).toEqualData(expectedTimetables);
        });

        $httpBackend.flush();
    });

    it('should return the array of timetables which can be created ' +
      'with class cart, ' +
      'excludedPeriods option, ' +
      'max. credit option ' +
      'and the number of class days option', function () {
        var expectedTimetables = pickFromArray(
            [8, 17, 20, 23],
            possibleTimetables);
        var options = {
          excludedPeriods: excludedPeriods,
          creditRange: {min: 12, max: 18},
          nClassDays: [4]
        };
        addExcludedPeriods(expectedTimetables);
        TimetableCreater.createTimetablesFrom(cart, options)
        .then(function (timetable) {
          expect(timetable).toEqualData(expectedTimetables);
        });

        $httpBackend.flush();
    });

    it('should return the array of timetables which can be created ' +
      'with class cart, ' +
      'excludedPeriods option, ' +
      'max. credit option ' +
      'and max. number of classes per day option', function () {
        var expectedTimetables = pickFromArray(
            [2, 5, 8, 17, 20, 23],
            possibleTimetables);
        var options = {
          excludedPeriods: excludedPeriods,
          creditRange: {min: 12, max: 18},
          nMaxClassesPerDay: 3
        };
        addExcludedPeriods(expectedTimetables);
        TimetableCreater.createTimetablesFrom(cart, options)
        .then(function (timetable) {
          expect(timetable).toEqualData(expectedTimetables);
        });

        $httpBackend.flush();
    });

    it('should return the array of timetables which can be created ' +
      'with class cart, ' +
      'excludedPeriods option, ' +
      'the number of class days option ' +
      'and max. number of classes per day option', function () {
        var expectedTimetables = pickFromArray(
            [8, 17, 20, 23],
            possibleTimetables);
        var options = {
          excludedPeriods: excludedPeriods,
          nClassDays: [4],
          nMaxClassesPerDay: 3
        };
        addExcludedPeriods(expectedTimetables);
        TimetableCreater.createTimetablesFrom(cart, options)
        .then(function (timetable) {
          expect(timetable).toEqualData(expectedTimetables);
        });

        $httpBackend.flush();
    });

    it('should return the array of timetables which can be created ' +
      'with class cart, ' +
      'and all the four options', function () {
        var expectedTimetables = pickFromArray(
            [8, 17, 20, 23],
            possibleTimetables);
        var options = {
          excludedPeriods: excludedPeriods,
          creditRange: {min: 12, max: 18},
          nClassDays: [4],
          nMaxClassesPerDay: 3
        };
        addExcludedPeriods(expectedTimetables);
        TimetableCreater.createTimetablesFrom(cart, options)
        .then(function (timetable) {
          expect(timetable).toEqualData(expectedTimetables);
        });

        $httpBackend.flush();
    });
  });

  it('should reject if no timetable can be created', function () {
      var options = {
        creditRange: {min: 18, max: 20},
        nClassDays: [4]
      };
      TimetableCreater.createTimetablesFrom(cart, options)
      .then(null, function (reason) {
        expect(reason instanceof NoTimetableError).toBe(true);
      });

      $httpBackend.flush();
  });
});
