/* jshint -W106 */
'use strict';

angular.module('dashApp')
.controller('CreateCtrl',
['$scope', 'StringResource', 'storedContext',
'MajorInfo', 'Class', 'ClassCart',
function ($scope, StringResource, storedContext,
  MajorInfo, Class, ClassCart) {
  var classCart = new ClassCart(storedContext.classCart, true);

  $scope.classCart = classCart.scopeCart;
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

  var saveStoredClassCart = function () {
    storedContext.classCart = classCart.storedCart;
    jQuery.cookie('context-create', storedContext);
  };

  $scope.search = function () {
    var classes = Class.query(
      {name: $scope.keyword},
      function () {
        $scope.classes = groupByCourseMajorGrade(classes);
      }
    );
  };

  $scope.deleteClass = function (classNo) {
    classCart.deleteClass(classNo);
    saveStoredClassCart();
  };

  $scope.deleteMajorInCourse = function (majorCode, courseNo) {
    classCart.deleteMajorInCourse(majorCode, courseNo);
    saveStoredClassCart();
  };

  $scope.deleteCourse = function (courseNo) {
    classCart.deleteCourse(courseNo);
    saveStoredClassCart();
  };
}]);
