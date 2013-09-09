'use strict';

angular.module('dashApp')
.controller('CreateCtrl', ['$scope', '$q', 'storedContext', 'MajorInfo', 'Class',
function ($scope, $q, storedContext, MajorInfo, Class) {
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

  $scope.classCart = convertStoredClassCart(storedClassCart);
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

  $scope.search = function () {
    var classes = Class.query(
      {name: $scope.keyword},
      function () {
        $scope.classes = groupByCourseMajorGrade(classes);
      }
    );
  };
}]);
