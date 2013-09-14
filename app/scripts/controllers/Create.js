/* jshint -W106 */
'use strict';

angular.module('dashApp')
.controller('CreateCtrl',
['$scope', '$q', 'StringResource', 'Utils',
'storedContext', 'MajorInfo', 'Class',
function ($scope, $q, StringResource, Utils, storedContext, MajorInfo, Class) {
  var addClassToClassCart = function (classObj, classCart) {
    var course_no = classObj.course_no;
    var major = classObj.major;
    var hasFoundCartEntity = false;

    var addToClasses = function (classObj, classes) {
      var fixed;
      if (typeof classObj.fixed !== 'undefined') {
        fixed = classObj.fixed;
      } else {
        fixed = false;
      }
      var classEntity = {
        instructor: classObj.instructor,
        class_no: classObj.class_no,
        fixed: fixed
      };
      classes.push(classEntity);
    };

    var addToMajors = function (classObj, majors) {
      var majorEntity = {
        code: major,
        grade: classObj.grade,
        credit: classObj.credit,
        classes: []
      };

      MajorInfo.getNameByCode(major).then(function (name) {
        majorEntity.name = name;
      });

      addToClasses(classObj, majorEntity.classes);

      majors.push(majorEntity);
    };

    var addToCart = function (classObj, cart) {
      var placement_required;
      if (typeof classObj.placement_required !== 'undefined') {
        placement_required = classObj.placement_required;
      } else {
        placement_required = isPlacementRequired(classObj);
      }

      var cartEntity = {
        placement_required: placement_required,
        course_no: course_no,
        name: classObj.name,
        majors: []
      };

      addToMajors(classObj, cartEntity.majors);
      cart.push(cartEntity);
    };

    angular.forEach(classCart, function (cartEntity) {
      if (cartEntity.course_no === course_no) {
        hasFoundCartEntity = true;
      }

      var hasFoundMajorEntity = false;

      angular.forEach(cartEntity.majors, function (majorEntity) {
        if (majorEntity.code === major) {
          addToClasses(classObj, majorEntity.classes);
          hasFoundMajorEntity = true;
          return false;
        }
      });

      if (hasFoundMajorEntity) {
        return false;
      }
      if (hasFoundCartEntity) {
        addToMajors(classObj, cartEntity.majors);
      }
    });

    if (!hasFoundCartEntity) {
      addToCart(classObj, classCart);
    }
  };

  var convertStoredClassCart = function (classCart) {
    var newClassCart = [];

    angular.forEach(classCart, function (cartEntity) {
      var newEntity = angular.copy(cartEntity);

      angular.forEach(newEntity.classes, function (classEntity) {
        var deferredClass = $q.defer();

        var classObj = Class.get({classNo: classEntity.class_no}, function () {
          deferredClass.resolve(true);
        });

        classObj.placement_required = cartEntity.placement_required;
        classObj.fixed = classEntity.fixed;

        deferredClass.promise.then(function () {
          addClassToClassCart(classObj, newClassCart);
        });
      });
    });

    return newClassCart;
  };

  var storedClassCart = angular.copy(storedContext.classCart);
  var classCart = convertStoredClassCart(storedClassCart);

  $scope.classCart = classCart;
  $scope.excludedTime = storedContext.excludedTime;
  $scope.options = storedContext.options;

  var groupByCourseMajorGrade = function (classes) {
    var newClasses = [];
    var coursesMap = {};

    angular.forEach(classes, function (c) {
      var classObj = angular.copy(c);
      var course_no = classObj.course_no;
      var coursesMapEntity = coursesMap[course_no];
      if (!coursesMapEntity) {
        coursesMap[course_no] = {
          course_no: course_no,
          majorsMap: {}
        };

        coursesMapEntity = coursesMap[course_no];
      }

      var major = classObj.major;
      var majorsMap = coursesMapEntity.majorsMap;
      var majorsMapEntity = majorsMap[major];
      if (!majorsMapEntity) {
        majorsMap[major] = {
          major: major,
          gradesMap: {}
        };

        majorsMapEntity = majorsMap[major];
      }

      var grade = classObj.grade;
      var gradesMap = majorsMapEntity.gradesMap;
      var gradesMapEntity = gradesMap[grade];
      if (!gradesMapEntity) {
        var resultEntity = {
          name: classObj.name,
          course_no: course_no,
          major: major,
          grade: grade,
          credit: classObj.credit,
          classes: []
        };

        newClasses.push(resultEntity);

        gradesMap[grade] = {
          grade: grade,
          resultEntity: resultEntity
        };

        gradesMapEntity = gradesMap[grade];
      }

      var subsetOfClass = {
        instructor: classObj.instructor,
        class_no: classObj.class_no,
        time: classObj.time
      };
      gradesMapEntity.resultEntity.classes.push(subsetOfClass);
    });

    return newClasses;
  };

  var ClassNotFoundError = function (classNo) {
    this.value = classNo;
    this.message = StringResource.ERROR.CREATE.CLASS_NOT_FOUND.prefix;
    this.toString = function () {
      return this.message + this.value;
    };
  };
  Utils.extendErrorType(ClassNotFoundError, RangeError);

  var tidyArray = function (arr, taskFn, checkFn) {
    taskFn.apply(arr);

    var i = 0, len = arr.length;
    while (i < len) {
      if (checkFn.apply(arr[i])) {
        ++i;
        continue;
      }

      arr[i] = null;
      arr.splice(i, 1);
      --len;
    }
  };

  var isPropertyNotEmptyArray = function (property) {
    return function () {
      var arr = this[property];
      return arr && angular.isArray(arr) && arr.length > 0;
    };
  };

  var eachThis = function (callback) {
    return function () {
      jQuery.each(this, callback);
    };
  };

  var saveStoredClassCart = function () {
    storedContext.classCart = storedClassCart;
    jQuery.cookie('context-create', storedContext);
  };

  var deleteClassFromClasses = function (index, classes) {
    classes[index] = null;
    classes.splice(index, 1);
  };

  var deleteClassFromClassesWithClassNo = function (classNo, classes) {
    var hasFoundClassEntity = false;

    jQuery.each(classes, function (classIndex, classEntity) {
      if (classEntity.class_no === classNo) {
        deleteClassFromClasses(classIndex, classes);
        hasFoundClassEntity = true;
        return false;
      }
    });

    return hasFoundClassEntity;
  };

  var deleteClass = function (classNo) {
    var hasFoundClassEntity = false;
    tidyArray(classCart, eachThis(function (cartIndex, cartEntity) {
      tidyArray(cartEntity.majors, eachThis(
        function (majorIndex, majorEntity) {
          var classes = majorEntity.classes;
          hasFoundClassEntity =
              deleteClassFromClassesWithClassNo(classNo, classes);

          return !hasFoundClassEntity;
        }
      ), isPropertyNotEmptyArray('classes'));

      return !hasFoundClassEntity;
    }), isPropertyNotEmptyArray('majors'));

    if (!hasFoundClassEntity) {
      throw new ClassNotFoundError(classNo);
    }

    tidyArray(storedClassCart, eachThis(function (cartIndex, cartEntity) {
      var classes = cartEntity.classes;
      var hasFoundClassEntity =
          deleteClassFromClassesWithClassNo(classNo, classes);

      return !hasFoundClassEntity;
    }), isPropertyNotEmptyArray('classes'));

    saveStoredClassCart();
  };

  var MajorInCourseNotFoundError = function (majorCode, courseNo) {
    this.value = {majorCode: majorCode, courseNo: courseNo};
    this.message =
        StringResource.ERROR.CREATE.MAJOR_IN_COURSE_NOT_FOUND.prefix;
    this.toString = function () {
      return this.message + angular.toJson(this.value);
    };
  };
  Utils.extendErrorType(MajorInCourseNotFoundError, RangeError);

  var CourseNotFoundError = function (courseNo) {
    this.value = courseNo;
    this.message =
        StringResource.ERROR.CREATE.COURSE_NOT_FOUND.prefix;
    this.toString = function () {
      return this.message + this.value;
    };
  };
  Utils.extendErrorType(MajorInCourseNotFoundError, RangeError);

  var deleteMajorFromMajors = function (index, majors) {
    var classes = majors[index].classes;
    var classesToRemove = [];

    for (var i = 0, len = classes.length; i < len; ++i) {
      classesToRemove.push(classes[0].class_no);
      classes[0] = null;
      classes.splice(0, 1);
    }

    majors.splice(index, 1);

    return classesToRemove;
  };

  var deleteMajorInCourse = function (majorCode, courseNo) {
    var hasFoundMajorEntity = false;
    var classesToRemove;
    tidyArray(classCart, eachThis(function (cartIndex, cartEntity) {
      if (cartEntity.course_no !== courseNo) {
        return true;
      }

      var majors = cartEntity.majors;
      jQuery.each(majors, function (majorIndex, majorEntity) {
        if (majorEntity.code !== majorCode) {
          return true;
        }

        classesToRemove = deleteMajorFromMajors(majorIndex, majors);
        hasFoundMajorEntity = true;
        return false;
      });

      return !hasFoundMajorEntity;
    }), isPropertyNotEmptyArray('majors'));

    if (!hasFoundMajorEntity) {
      throw new MajorInCourseNotFoundError(majorCode, courseNo);
    }

    tidyArray(storedClassCart, eachThis(function (cartIndex, cartEntity) {
      if (cartEntity.course_no !== courseNo) {
        return true;
      }

      var classes = cartEntity.classes;
      jQuery.each(classesToRemove, function (classIndex, classNo) {
        deleteClassFromClassesWithClassNo(classNo, classes);
      });

      return false;
    }), isPropertyNotEmptyArray('classes'));

    saveStoredClassCart();
  };

  var deleteCourse = function (courseNo) {
    var hasFoundCourseEntity = false;

    jQuery.each(classCart, function (cartIndex, cartEntity) {
      if (cartEntity.course_no !== courseNo) {
        return true;
      }

      var majors = cartEntity.majors;

      for (var i = 0, len = majors.length; i < len; ++i) {
        deleteMajorFromMajors(0, majors);
        majors.splice(0, 1);
      }

      hasFoundCourseEntity = true;
      return false;
    });

    if (!hasFoundCourseEntity) {
      throw new CourseNotFoundError(courseNo);
    }

    tidyArray(storedClassCart, eachThis(function (cartIndex, cartEntity) {
      if (cartEntity.course_no !== courseNo) {
        return true;
      }

      var classes = cartEntity.classes;
      for (var i = 0, len = classes.length; i < len; ++i) {
        deleteClassFromClasses(0, classes);
      }

      return false;
    }), isPropertyNotEmptyArray('classes'));

    saveStoredClassCart();
  };

  $scope.search = function () {
    var classes = Class.query(
      {name: $scope.keyword},
      function () {
        $scope.classes = groupByCourseMajorGrade(classes);
      }
    );
  };

  $scope.deleteClass = deleteClass;
  $scope.deleteMajorInCourse = deleteMajorInCourse;
  $scope.deleteCourse = deleteCourse;
}]);
