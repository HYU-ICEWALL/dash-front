'use strict' ;

angular.module('dashApp')
  .factory('Timetable', ['$http', 'Utils', 'StringResource',
  function ($http, Utils, StringResource) {
    // Service logic
    // ...

    var ERROR = StringResource.ERROR;
    var timetable;
    var user_id;

    updatesTimeTablebyId = function () {
      var tt_id = ti;
      return $http.get('api/users/' + user_id + '/timetables', {responseType: 'json' })
      .then(function (response) {
        timetable = response;
      },
        Utils.handlerHttpError(ERROR.TIMETABLE.UPDATETIMETABLEINFO))
    }

    // Public API here
    return {
      updatesTimeTablelist : function (ui) {
        var user_id = ui;
        return $http.get('api/users/' + user_id + '/timetables',{responseType: 'json' })
        .then(function (response) {
          timetable = response;
        },
          Utils.handlerHttpError(ERROR.TIMETABLE.UPDATETIMETABLEINFO))
      },

      addTimeTable : function (ui, data) {
        var id = data.tt_id;
        var user_id = ui;
        return $http.post('api/users/' + user_id + 'timetables', data)
        .then(
          updatesTimeTable(),
          Utils.handlerHttpError(ERROR.TIMETABLE.ADDTIMETABLE))
      },

      readTimeTablebyId : function (ti, ui) {
        var tt_id = ti;
        var user_id = ui;
        if(user_id!==undefined){
          return $http.get('api/users/' + user_id + 'timetables/' + tt_id, {responseType: 'json' })
          .then(function (response) {
            var timetable = response;
            return timetable;
          }.
            Utils.handlerHttpError(ERROR.TIMETABLE.READTIMETABLEBYID))
        } else {
          return $http.get('api/users/' + 'timetables/' + tt_id)
        }
      },

      deleteTimeTable : function (ui, ti, from_list) {
        var user_id = ui;
        var tt_id = ti;
        var from_list = from_list;
        return $http.delete('api/users/' + user_id + 'timetables/' + ti + '?from_list' + from_list)
        .then(function (response) {
          updatesTimeTable();
        },
          Utils.handlerHttpError(ERROR.TIMETABLE.DELETETIMETABLE))
      },

      editTimeTable : function (ui, ti, data) {
        var user_id = ui;
        var tt_id = ti;
        var timetable = data;
        return $http.put('api/users/' + user_id + 'timetables/' + ti, timetable)
        .then(
          updatesTimeTable(),
          Utils.handlerHttpError(ERROR.TIMETABLE,EDITTIMETABLE))
      }
    };
  }]);
