'use strict';

describe('Service: ClassCart', function () {

  // load the service's module
  beforeEach(module('dashApp'));

  // load the service's module,
  // inject mocks,
  // and instantiate service
  var $q, $timeout, $httpBackend;
  var Class, ClassCart;
  beforeEach(function () {
    inject(function (_$q_, _$timeout_, _$httpBackend_, _Class_, _ClassCart_) {
      $q = _$q_;
      $timeout = _$timeout_;
      $httpBackend = _$httpBackend_;
      Class = _Class_;
      ClassCart = _ClassCart_;
    });
  });

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

  it('should create a new instance with storedCart', function () {
    var storedCart = [
      {
        placement_required: true,
        course_no: 'GEN253',
        classes: [
          {class_no: '13056', fixed: false},
          {class_no: '13057', fixed: true},
          {class_no: '10455', fixed: false}
        ]
      }
    ];

    var cart = new ClassCart(storedCart, true);
    $httpBackend.flush();

    var expectedScopeCart = [
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

    expect(cart.scopeCart).toEqualData(expectedScopeCart);
    expect(cart.storedCart).toEqualData(storedCart);
  });

  it('should create a new instance with scopeCart', function () {
    var scopeCart = [
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

    var cart = new ClassCart(scopeCart);

    var expectedStoredCart = [
      {
        placement_required: true,
        course_no: 'GEN253',
        classes: [
          {class_no: '13056', fixed: false},
          {class_no: '13057', fixed: true},
          {class_no: '10455', fixed: false}
        ]
      }
    ];

    expect(cart.storedCart).toEqualData(expectedStoredCart);
    expect(cart.scopeCart).toEqualData(scopeCart);
  });

  it('should add a new class ' +
    'of which the course and major is ' +
    'already in the class cart', function () {
    var oldScopeCart = [
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
              }
            ]
          }
        ]
      }
    ];

    var expectedStoredCart = [
      {
        placement_required: true,
        course_no: 'GEN253',
        classes: [
          {class_no: '13056', fixed: false},
          {class_no: '13057', fixed: true},
          {class_no: '10455', fixed: false}
        ]
      }
    ];

    var expectedScopeCart = [
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

    var cart = new ClassCart(oldScopeCart);
    var newClass = Class.get({classNo: '10455'});
    $httpBackend.flush();

    cart.addClass(newClass);

    expect(cart.scopeCart).toEqualData(expectedScopeCart);
    expect(cart.storedCart).toEqualData(expectedStoredCart);
  });

  it('should add a new class ' +
    'of which the course is ' +
    'already in the class cart but ' +
    'the major is not', function () {
    var oldScopeCart = [
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
              }
            ]
          }
        ]
      }
    ];

    var expectedStoredCart = [
      {
        placement_required: true,
        course_no: 'GEN253',
        classes: [
          {class_no: '13056', fixed: false},
          {class_no: '13057', fixed: true},
          {class_no: '10301', fixed: false}
        ]
      }
    ];

    var expectedScopeCart = [
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
              }
            ]
          },
          {
            code: 'H3HADG',
            name: '융합전자공학부',
            grade: 1,
            credit: 3.00,
            classes: [
              {
                instructor: '박영선',
                class_no: '10301',
                fixed: false,
                time: [
                  {start_time: 206, end_time: 208, room: 'H05-0103'},
                  {start_time: 403, end_time: 405, room: 'H05-0103'}
                ]
              }
            ]
          }
        ]
      }
    ];

    var cart = new ClassCart(oldScopeCart);
    var newClass = Class.get({classNo: '10301'});
    $httpBackend.flush();

    cart.addClass(newClass);
    $httpBackend.flush();

    expect(cart.scopeCart).toEqualData(expectedScopeCart);
    expect(cart.storedCart).toEqualData(expectedStoredCart);
  });

  it('should add a new class ' +
    'of which the course and major is ' +
    'not in the class cart', function () {
    var oldScopeCart = [];

    var expectedStoredCart = [
      {
        placement_required: true,
        course_no: 'GEN253',
        classes: [
          {class_no: '10455', fixed: false}
        ]
      }
    ];

    var expectedScopeCart = [
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

    var cart = new ClassCart(oldScopeCart);
    var newClass = Class.get({classNo: '10455'});
    $httpBackend.flush();

    cart.addClass(newClass);
    $httpBackend.flush();

    expect(cart.scopeCart).toEqualData(expectedScopeCart);
    expect(cart.storedCart).toEqualData(expectedStoredCart);
  });

  it('should delete a class from the class cart ' +
    'which the number of classes of the same course and major ' +
    'is more than one', function () {
    var oldScopeCart = [
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
              }
            ]
          }
        ]
      }
    ];

    var expectedStoredCart = [
      {
        placement_required: true,
        course_no: 'GEN253',
        classes: [
          {class_no: '13057', fixed: true}
        ]
      }
    ];

    var expectedScopeCart = [
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
                instructor: '신교일',
                class_no: '13057',
                fixed: true,
                time: [
                  {start_time: 211, end_time: 213, room: 'H05-0202'},
                  {start_time: 514, end_time: 516, room: 'H05-0202'}
                ]
              }
            ]
          }
        ]
      }
    ];

    var cart = new ClassCart(oldScopeCart);

    cart.deleteClass('13056');

    expect(cart.scopeCart).toEqualData(expectedScopeCart);
    expect(cart.storedCart).toEqualData(expectedStoredCart);
  });

  it('should delete a class from the class cart ' +
    'which the number of classes of the same major ' +
    'is one', function () {
    var oldScopeCart = [
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
              }
            ]
          },
          {
            code: 'H3HADG',
            name: '융합전자공학부',
            grade: 1,
            credit: 3.00,
            classes: [
              {
                instructor: '박영선',
                class_no: '10301',
                fixed: false,
                time: [
                  {start_time: 206, end_time: 208, room: 'H05-0103'},
                  {start_time: 403, end_time: 405, room: 'H05-0103'}
                ]
              }
            ]
          }
        ]
      }
    ];

    var expectedStoredCart = [
      {
        placement_required: true,
        course_no: 'GEN253',
        classes: [
          {class_no: '13056', fixed: false}
        ]
      }
    ];

    var expectedScopeCart = [
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
              }
            ]
          }
        ]
      }
    ];

    var cart = new ClassCart(oldScopeCart);

    cart.deleteClass('10301');

    expect(cart.scopeCart).toEqualData(expectedScopeCart);
    expect(cart.storedCart).toEqualData(expectedStoredCart);
  });

  it('should delete a class from the class cart ' +
    'which the number of classes of the same course ' +
    'is one', function () {
    var oldScopeCart = [
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
              }
            ]
          }
        ]
      }
    ];

    var expectedStoredCart = [];

    var expectedScopeCart = [];

    var cart = new ClassCart(oldScopeCart);

    cart.deleteClass('13056');

    expect(cart.scopeCart).toEqualData(expectedScopeCart);
    expect(cart.storedCart).toEqualData(expectedStoredCart);
  });

  it('should delete a major from the class cart ' +
    'which the number of majors of the same course ' +
    'is more than one', function () {
    var oldScopeCart = [
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
              }
            ]
          },
          {
            code: 'H3HADG',
            name: '융합전자공학부',
            grade: 1,
            credit: 3.00,
            classes: [
              {
                instructor: '박영선',
                class_no: '10301',
                fixed: false,
                time: [
                  {start_time: 206, end_time: 208, room: 'H05-0103'},
                  {start_time: 403, end_time: 405, room: 'H05-0103'}
                ]
              }
            ]
          }
        ]
      }
    ];

    var expectedStoredCart = [
      {
        placement_required: true,
        course_no: 'GEN253',
        classes: [
          {class_no: '13056', fixed: false}
        ]
      }
    ];

    var expectedScopeCart = [
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
              }
            ]
          }
        ]
      }
    ];

    var cart = new ClassCart(oldScopeCart);

    cart.deleteMajorInCourse('H3HADG', 'GEN253');

    expect(cart.scopeCart).toEqualData(expectedScopeCart);
    expect(cart.storedCart).toEqualData(expectedStoredCart);
  });

  it('should delete a major from the class cart ' +
    'which the number of majors of the same course ' +
    'is one', function () {
    var oldScopeCart = [
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
              }
            ]
          }
        ]
      }
    ];

    var expectedStoredCart = [];

    var expectedScopeCart = [];

    var cart = new ClassCart(oldScopeCart);

    cart.deleteMajorInCourse('H3HADD', 'GEN253');

    expect(cart.scopeCart).toEqualData(expectedScopeCart);
    expect(cart.storedCart).toEqualData(expectedStoredCart);
  });

  it('should delete a course from the class cart', function () {
    var oldScopeCart = [
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
              }
            ]
          },
          {
            code: 'H3HADG',
            name: '융합전자공학부',
            grade: 1,
            credit: 3.00,
            classes: [
              {
                instructor: '박영선',
                class_no: '10301',
                fixed: false,
                time: [
                  {start_time: 206, end_time: 208, room: 'H05-0103'},
                  {start_time: 403, end_time: 405, room: 'H05-0103'}
                ]
              }
            ]
          }
        ]
      }
    ];

    var expectedStoredCart = [];

    var expectedScopeCart = [];

    var cart = new ClassCart(oldScopeCart);

    cart.deleteCourse('GEN253');

    expect(cart.scopeCart).toEqualData(expectedScopeCart);
    expect(cart.storedCart).toEqualData(expectedStoredCart);
  });

});
