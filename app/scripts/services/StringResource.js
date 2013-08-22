'use strict';

angular.module('dashApp')
  .constant('StringResource', {
    ERROR: {
      ACCOUNT: {
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
          INCORRECT_PASSWORD: '잘못된 암호입니다.'
        }
      },
      HTTP_ERROR: {
        PREFIX: '오류가 발생했습니다. HTTP 응답 코드는 ',
        SUFFIX: '입니다.'
      }
    }
  });
