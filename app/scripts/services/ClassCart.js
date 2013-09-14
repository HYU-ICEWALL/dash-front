/* jshint -W106 */
'use strict';

angular.module('dashApp')
.factory('ClassCart', ['$q', 'config', 'StringResource',
  'Utils', 'MajorInfo', 'Class',
  function ($q, config, StringResource,
    Utils, MajorInfo, Class) {
  var isPlacementRequired = config.isPlacementRequired;

  var ClassCartFactory = function (cart, isStoredCart) {
    var ClassCart = function (cart, isStoredCart) {
      if (cart && !angular.isArray(cart)) {
        throw new TypeError('cart should be an array');
      }

      var classCart = this;

      var addClassToScopeCart = function (classObj) {
        var scopeCart = classCart.scopeCart;
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
            fixed: fixed,
            time: classObj.time
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

        angular.forEach(scopeCart, function (cartEntity) {
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
          addToCart(classObj, scopeCart);
        }
      };

      var addClassToStoredCart = function (classObj) {
        var storedCart = classCart.storedCart;
        var course_no = classObj.course_no;
        var hasFoundCartEntity = false;

        var addToClasses = function (classObj, classes) {
          var fixed;
          if (typeof classObj.fixed !== 'undefined') {
            fixed = classObj.fixed;
          } else {
            fixed = false;
          }
          var classEntity = {
            class_no: classObj.class_no,
            fixed: fixed
          };
          classes.push(classEntity);
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
            classes: []
          };

          addToClasses(classObj, cartEntity.classes);
          cart.push(cartEntity);
        };

        jQuery.each(storedCart, function (cartIndex, cartEntity) {
          if (cartEntity.course_no !== course_no) {
            return true;
          }

          addToClasses(classObj, cartEntity.classes);
          hasFoundCartEntity = true;
        });

        if (!hasFoundCartEntity) {
          addToCart(classObj, storedCart);
        }
      };

      var convertStoredCart = function (storedCart) {
        var scopeCart = [];
        var majorsMap = {};

        angular.forEach(storedCart, function (cartEntity) {
          var newCartEntity = {
            placement_required: cartEntity.placement_required,
            course_no: cartEntity.course_no,
            majors: []
          };

          scopeCart.push(newCartEntity);

          angular.forEach(cartEntity.classes, function (classEntity) {
            var deferredClass = $q.defer();
            var classObj = Class.get({classNo: classEntity.class_no}, function () {
              deferredClass.resolve(true);
            });

            deferredClass.promise.then(function () {
              if (!newCartEntity.name) {
                newCartEntity.name = classObj.name;
              }

              var major = classObj.major;
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
                var majorEntity = {
                  code: major,
                  grade: grade,
                  credit: classObj.credit,
                  classes: []
                };

                MajorInfo.getNameByCode(major).then(function (name) {
                  majorEntity.name = name;
                });

                var newMajors = newCartEntity.majors;
                newMajors.push(majorEntity);

                gradesMap[grade] = {
                  grade: grade,
                  majorEntity: majorEntity
                };

                gradesMapEntity = gradesMap[grade];
              }

              var subsetOfClass = {
                instructor: classObj.instructor,
                class_no: classEntity.class_no,
                fixed: classEntity.fixed,
                time: classObj.time
              };
              gradesMapEntity.majorEntity.classes.push(subsetOfClass);
            });
          });
        });

        return scopeCart;
      };

      var convertScopeCart = function (scopeCart) {
        var storedCart = [];

        jQuery.each(scopeCart, function (cartIndex, cartEntity) {
          var newCourseEntity = {
            placement_required: cartEntity.placement_required,
            course_no: cartEntity.course_no,
            classes: []
          };

          storedCart.push(newCourseEntity);

          jQuery.each(cartEntity.majors, function (majorIndex, majorEntity) {
            jQuery.each(majorEntity.classes, function (classIndex, classEntity) {
              var newClassEntity = {
                class_no: classEntity.class_no,
                fixed: classEntity.fixed
              };
              newCourseEntity.classes.push(newClassEntity);
            });
          });
        });

        return storedCart;
      };

      var duplicatedCart = cart ? angular.copy(cart) : [];

      if (isStoredCart) {
        this.storedCart = duplicatedCart;
        this.scopeCart = convertStoredCart(this.storedCart);
      } else {
        this.scopeCart = duplicatedCart;
        this.storedCart = convertScopeCart(this.scopeCart);
      }

      this.addClass = function (classObj) {
        addClassToScopeCart(classObj);
        addClassToStoredCart(classObj);
      };
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

    var deleteFromArray = function (index, arr) {
      arr[index] = null;
      arr.splice(index, 1);
    };

    var deleteClassOfNoFromClasses = function (classNo, classes) {
      var hasFoundClassEntity = false;

      jQuery.each(classes, function (classIndex, classEntity) {
        if (classEntity.class_no === classNo) {
          deleteFromArray(classIndex, classes);
          hasFoundClassEntity = true;
          return false;
        }
      });

      return hasFoundClassEntity;
    };

    ClassCart.prototype.deleteClass = function (classNo) {
      var hasFoundClassEntity = false;
      var scopeCart = this.scopeCart;
      var storedCart = this.storedCart;

      tidyArray(scopeCart, eachThis(function (cartIndex, cartEntity) {
        tidyArray(cartEntity.majors, eachThis(
          function (majorIndex, majorEntity) {
            var classes = majorEntity.classes;
            hasFoundClassEntity =
                deleteClassOfNoFromClasses(classNo, classes);

            return !hasFoundClassEntity;
          }
        ), isPropertyNotEmptyArray('classes'));

        return !hasFoundClassEntity;
      }), isPropertyNotEmptyArray('majors'));

      if (!hasFoundClassEntity) {
        throw new ClassNotFoundError(classNo);
      }

      tidyArray(storedCart, eachThis(function (cartIndex, cartEntity) {
        var classes = cartEntity.classes;
        var hasFoundClassEntity =
            deleteClassOfNoFromClasses(classNo, classes);

        return !hasFoundClassEntity;
      }), isPropertyNotEmptyArray('classes'));
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

      majors[index] = null;
      majors.splice(index, 1);

      return classesToRemove;
    };

    ClassCart.prototype.deleteMajorInCourse = function (majorCode, courseNo) {
      var scopeCart = this.scopeCart;
      var storedCart = this.storedCart;
      var hasFoundMajorEntity = false;
      var classesToRemove;
      tidyArray(scopeCart, eachThis(function (cartIndex, cartEntity) {
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

      tidyArray(storedCart, eachThis(function (cartIndex, cartEntity) {
        if (cartEntity.course_no !== courseNo) {
          return true;
        }

        var classes = cartEntity.classes;
        jQuery.each(classesToRemove, function (classIndex, classNo) {
          deleteClassOfNoFromClasses(classNo, classes);
        });

        return false;
      }), isPropertyNotEmptyArray('classes'));
    };

    ClassCart.prototype.deleteCourse = function (courseNo) {
      var scopeCart = this.scopeCart;
      var storedCart = this.storedCart;
      var hasFoundCourseEntity = false;

      tidyArray(scopeCart, eachThis(function (cartIndex, cartEntity) {
        if (cartEntity.course_no !== courseNo) {
          return true;
        }

        var majors = cartEntity.majors;

        for (var i = 0, len = majors.length; i < len; ++i) {
          deleteMajorFromMajors(0, majors);
        }

        hasFoundCourseEntity = true;
        return false;
      }), isPropertyNotEmptyArray('majors'));

      if (!hasFoundCourseEntity) {
        throw new CourseNotFoundError(courseNo);
      }

      tidyArray(storedCart, eachThis(function (cartIndex, cartEntity) {
        if (cartEntity.course_no !== courseNo) {
          return true;
        }

        var classes = cartEntity.classes;
        for (var i = 0, len = classes.length; i < len; ++i) {
          deleteFromArray(0, classes);
        }

        return false;
      }), isPropertyNotEmptyArray('classes'));
    };

    return new ClassCart(cart, isStoredCart);
  };

  return ClassCartFactory;
}]);
