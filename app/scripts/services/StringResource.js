/* jshint -W106 */
'use strict';

angular.module('dashApp')
.constant('StringResource', (function () {
  var pathStatic = ''; //'static/';
  var concat = function () {
    var res = '';

    angular.forEach(arguments, function(arg){
      res += arg;
    });

    return res;
  };

  var getUrlFor = function (path) {
    return function (filename) {
      return concat(pathStatic, path, filename);
    };
  };

  return {
    VIEW: {
      DASH: {
        TIMETABLES: {
          LEFT_COLUMN: {
            urlFor: getUrlFor('views/dash/timetables/left-column/')
          },

          urlFor: getUrlFor('views/dash/timetables/')
        }
      },

      urlFor: getUrlFor('views/')
    },

    ERROR: {
      MAJORINFO: {
        UPDATE_MAJORSINFO: {
          prefix: 'failed to get majors information',
          reasons: [
            { code: 404, reason: ''}
          ]
        }
      },

      ACCOUNT: {
        GET_USERID: {
          prefix: 'failed to retrieve user id: ',
          reasons: [
            { code: 404, reason: 'sign in required' }
          ]
        },

        UPDATE_USERINFO: {
          prefix: 'failed to retrieve new user information: ',
          reasons: [
            { code: 404, reason: 'sign in required' }
          ],
          SIGNIN_REQUIRED: 'sign in required'
        },

        SIGNIN: {
          prefix: 'failed to sign in: ',
          reasons: [
            { code: 401, reason: 'invalid credential information' }
          ]
        },

        SIGNUP: {
          prefix: 'failed to sign up: ',
          reasons: [
            { code: 400, reason: 'invalid user information' }
          ]
        },

        EDIT_USERINFO: {
          prefix: 'failed to edit new user information: ',
          reasons: [
            { code: 400, reason: 'invalid user information' }
          ]
        },

        DELETE_ACCOUNT: {
          prefix: 'failed to delete user account: ',
          reasons: [
            { code: 404, reason: 'invalid credential information' }
          ]
        },

        FIND_PASSWORD: {
          prefix: 'failed to send email: ',
          reasons: [
            { code: 404, reason: 'can\'t find the account with such email address'}
          ]
        }
      },

      TIMETABLE: {
        UPDATETIMETABLEINFO: {
          prefix: 'failed to get timetable information: ',
          reasons: [
            { code: 404, reason: ''}
          ]
        },

        ADDTIMETABLE: {
          prefix: 'faild to add timetable',
          reasons: [
            { code: 404, reason: ''}
          ]
        },

        READTIMETABLEBYID: {
          prefix: 'failed to read timetable by id',
          reasons: [
            { code: 404, reason: 'invalid timetable id' }
          ]
        },

        DELETETIMETABLE: {
          prefix: 'failed to delete timetable',
          resons: [
            { code: 404, reson: 'invalid timetable code' }
          ]
        },

        EDITTIMETABLE: {
          prefix: 'failed to edit timetable',
          reasons: [
            { code: 404, reason: 'invalid timetable code'}
          ]
        }
      }
    },

    UI: {
      EDIT_USERINFO: {
        DONE_BUTTON: '완료',
        PLACEHOLDER: {
          CURR_PASSWORD: '현재 암호',
          PASSWORD: '새 암호',
          CONFIRM_PASSWORD: '새 암호 확인'
        },

        TITLE: {
          EDIT: '회원 정보 수정',
          DELETE: '계정을 삭제하시겠습니까?'
        },

        ERROR: {
          INCORRECT_PASSWORD: '잘못된 암호입니다.',
          INCORRECT_EMAIL: '잘못된 이메일입니다.'
        }
      },

      TIMETABLE: {
        DAYS_OF_WEEK: ['월', '화', '수', '목', '금', '토', '일'],
        COLOR_SWATCH: ['#d8e200', '#f1bdcc', '#e4d198', '#68c7c1', '#86bce3', '#fdb900', '#f08162']
      },

      HTTP_ERROR: {
        PREFIX: '오류가 발생했습니다. HTTP 응답 코드는 ',
        SUFFIX: '입니다.'
      }
    },

    FACEBOOK: {
      APP_ID: '',
      LOGIN_DIALOG: {
        url: 'https://www.facebook.com/dialog/oauth',
        redirect_uri: 'http://localhost:8080/fb_login'
      }
    }
  };
})());
