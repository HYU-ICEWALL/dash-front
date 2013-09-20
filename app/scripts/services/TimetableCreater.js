/*jshint bitwise: false*/
'use strict';

angular.module('dashApp')
.factory('TimetableCreater', ['$q', 'config', 'Class',
function ($q, config, Class) {
  /**
   * Calculates the number of class days from bits.
   * @param  {number} bits 8-bit binary to calculate
   *                       the number of class days from.
   *                       A bit of bits is set if the corresponding day
   *                       of week is class day. The LSB is for Monday,
   *                       the second one is for Tuesday, and so on.
   *
   * @return {number}      The number of class days.
   * @private
   */
  var nClassDaysFromBits = function (bits) {
    var x = bits;
    var m1 = 0x55;
    var m2 = 0x33;
    var m4 = 0x0f;

    x -= (x >> 1) & m1;
    x = (x & m2) + ((x >> 2) & m2);
    x = (x + (x >> 4)) & m4;

    return x & 0x7f;
  };

  var bitsFromClass = function (classObj) {
    var bits = 0x00;
    angular.forEach(classObj.time, function (timeEntity) {
      // The LSB is for Monday, therefore minus one.
      bits |= 1 << (parseInt(timeEntity.start_time / 100, 10) - 1);
    });

    return bits;
  };

  var createTimetablesFrom = function (classCart, options) {
    var timetables = [],

        storedCart = classCart.storedCart,
        cart,
        nCourses,
        conflictMap = {},

        nMaxClassDays;

    var isClassInExcludedPeriods = function (classObj, excludedPeriods) {
      var isInExcludedPeriods = false;

      jQuery.each(classObj.time, function (timeIndex, timeEntity) {
        jQuery.each(excludedPeriods, function (periodIndex, period) {
          if (period >= timeEntity.start_time &&
              period <= timeEntity.end_time) {
            isInExcludedPeriods = true;
          }

          return !isInExcludedPeriods;
        });

        return !isInExcludedPeriods;
      });

      return isInExcludedPeriods;
    };

    var isClassesConflicting = function (c1, c2) {
      var isConflicting = false;

      jQuery.each(c1.time, function (i1, time1) {
        jQuery.each(c2.time, function (i2, time2) {
          if (parseInt(time1.start_time / 100, 10) !==
              parseInt(time2.start_time / 100, 10)) {
            return true;
          }

          if ((time1.start_time <= time2.start_time &&
               time1.end_time >= time2.start_time) ||
              (time2.start_time <= time1.start_time &&
               time2.end_time >= time1.start_time)) {
            isConflicting = true;
          }

          return !isConflicting;
        });

        return !isConflicting;
      });

      return isConflicting;
    };

    var isPlaceableTo = function (classEntity, classes) {
      var newClassNo = classEntity.class_no;
      var isPlaceable = true;

      jQuery.each(classes, function (i, c) {
        var oldClassNo = c.class_no;
        var smallerNo, biggerNo;

        if (oldClassNo < newClassNo) {
          smallerNo = oldClassNo;
          biggerNo = newClassNo;
        } else {
          smallerNo = newClassNo;
          biggerNo = oldClassNo;
        }

        if (typeof conflictMap[smallerNo] !== 'undefined') {
          if (typeof conflictMap[smallerNo][biggerNo] !== 'undefined') {
            isPlaceable = !conflictMap[smallerNo][biggerNo];
            return isPlaceable;
          }
        } else {
          conflictMap[smallerNo] = {};
        }

        conflictMap[smallerNo][biggerNo] =
            isClassesConflicting(c, classEntity);
        isPlaceable = !conflictMap[smallerNo][biggerNo];
        return isPlaceable;
      });

      return isPlaceable;
    };

    var timetableFromStack = function (classStack) {
      var timetable = {};

      timetable.classes = [];
      angular.forEach(classStack.classes, function (classObj) {
        var classEntity = {
          course_no: classObj.course_no,
          class_no: classObj.class_no,
          major: classObj.major,
          name: classObj.name,
          instructor: classObj.instructor,
          credit: classObj.credit,
          grade: classObj.grade,
          time: angular.copy(classObj.time)
        };

        timetable.classes.push(classEntity);
      });

      if (options && options.excludedPeriods) {
        timetable.excludedPeriods = angular.copy(options.excludedPeriods);
      }

      return timetable;
    };

    var forEachClass = function (cartEntity, iterator) {
      angular.forEach(cartEntity.classes, function () {
        iterator.apply(this, arguments);
      });
    };

    var nClassesOfDaysWithNewClass = function (oldNClassesOfDays, classObj) {
      var newNClassesOfDays = angular.copy(oldNClassesOfDays);

      angular.forEach(classObj.time, function (timeEntity) {
        var dayOfWeek = parseInt(timeEntity.start_time / 100, 10);
        ++newNClassesOfDays[dayOfWeek];
      });

      return newNClassesOfDays;
    };

    var isNClassesExceeding = function (nClassesOfDays, maxNClassesPerDay) {
      for (var i = 1; i <= config.DAYS_PER_WEEK; ++i) {
        if (nClassesOfDays[i] > maxNClassesPerDay) {
          return true;
        }
      }

      return false;
    };

    var isValidNClassDaysFromBits = function (bits) {
      return (jQuery.inArray(
          nClassDaysFromBits(bits),
          options.nClassDays) >= 0);
    };

    var placeClass = function (classStack, courseIndex) {
      if (courseIndex === nCourses) {
        /*if (!options || (!options.creditRange && !options.nClassDays) ||

            (options.creditRange &&
             classStack.totalCredit >= options.creditRange.min) ||

            (options.nClassDays &&
             isValidNClassDaysFromBits(classStack.daysOfWeekBits))) {
          timetables.push(timetableFromStack(classStack));
        }*/

        if (options) {
          if (options.creditRange &&
              classStack.totalCredit < options.creditRange.min) {
            return;
          }

          if (options.nClassDays &&
              !isValidNClassDaysFromBits(classStack.daysOfWeekBits)) {
            return;
          }
        }

        timetables.push(timetableFromStack(classStack));
        return;
      }

      var totalCredit = classStack.totalCredit;
      var daysOfWeekBits = classStack.daysOfWeekBits;
      var nClassesOfDays = classStack.nClassesOfDays;

      forEachClass(cart[courseIndex], function (classObj) {
        if (options && options.excludedPeriods &&
            isClassInExcludedPeriods(classObj, options.excludedPeriods)) {
          return;
        }

        if (!isPlaceableTo(classObj, classStack.classes)) {
          return;
        }

        if (options && options.creditRange) {
          var newTotalCredit = totalCredit + classObj.credit;

          if (newTotalCredit > options.creditRange.max) {
            return;
          }

          classStack.totalCredit = newTotalCredit;
        }

        if (options && options.nClassDays) {
          var newDaysOfWeekBits =
            daysOfWeekBits | bitsFromClass(classObj);

          if (nClassDaysFromBits(newDaysOfWeekBits) > nMaxClassDays) {
            return;
          }

          classStack.daysOfWeekBits = newDaysOfWeekBits;
        }

        if (options && options.nMaxClassesPerDay) {
          var newNClassesOfDays =
              nClassesOfDaysWithNewClass(nClassesOfDays, classObj);

          if (isNClassesExceeding(newNClassesOfDays,
                options.nMaxClassesPerDay)) {
            return;
          }

          classStack.nClassesOfDays = newNClassesOfDays;
        }

        classStack.classes.push(classObj);

        placeClass(classStack, courseIndex + 1);

        classStack.totalCredit = totalCredit;
        classStack.daysOfWeekBits = daysOfWeekBits;
        classStack.nClassesOfDays = nClassesOfDays;

        classStack.classes.splice(classStack.classes.length - 1);
      });

      if (!cart[courseIndex].placement_required) {
        placeClass(classStack, courseIndex + 1);
      }
    };

    var createClassStack = function () {
      var classStack = {
        classes: [],
        totalCredit: 0,
        daysOfWeekBits: 0x00,
        nClassesOfDays: []
      };

      for (var i = 1; i <= config.DAYS_PER_WEEK; ++i) {
        classStack.nClassesOfDays[i] = 0;
      }

      return classStack;
    };

    var convertStoredCart = function (storedCart) {
      var deferredArray = [];
      var convertedCart = [];

      angular.forEach(storedCart, function (cartEntity) {
        var newCartEntity = angular.copy(cartEntity);
        var newClasses = [];

        angular.forEach(newCartEntity.classes, function (classEntity) {
          var deferred = $q.defer();
          deferredArray.push(deferred.promise);

          var classObj =
              Class.get({classNo: classEntity.class_no}, function () {
                deferred.resolve(classObj);
              });

          newClasses.push(classObj);
        });

        newCartEntity.classes = newClasses;
        convertedCart.push(newCartEntity);
      });

      return $q.all(deferredArray).then(function () {
        return convertedCart;
      });
    };

    if (options && options.nClassDays) {
      nMaxClassDays = Math.max.apply(null, options.nClassDays);
    }

    return convertStoredCart(storedCart)
           .then(function (convertedCart) {
              cart = convertedCart;
              nCourses = cart.length
              placeClass(createClassStack(), 0);

              return timetables;
            });
  };

  return {
    createTimetablesFrom: createTimetablesFrom
  };
}]);
