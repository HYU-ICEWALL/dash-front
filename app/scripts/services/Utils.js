/**
 * @ngdoc object
 * @name dashApp.factory:Utils
 * @requires $q
 *
 * @description
 * Dash app 모듈 내부에서 쓰이는 유틸리티 메서드들의 모음.
 *
 */
'use strict';

angular.module('dashApp')
.factory('Utils', ['$q', 'StringResource', function ($q, StringResource) {
  var regexHttpCodeFromErrorReason = /[\w\s]HTTP\s(\d{3})/;
  var UI = StringResource.UI;

  return {
    /**
     * @ngdoc method
     * @methodOf dashApp.factory:Utils
     * @name dashApp.factory:Utils#handlerHttpSuccess
     * @description `$http` 서비스를 사용하여 통신에 성공했을 때 사용할 수 있는
     *              콜백 함수를 생성하는 메서드. 다음과 같이 사용한다.
     *
     * <pre>
     * $http.get('/url')
     * .when(Utils.handlerHttpSuccess);
     * </pre>
     *
     * @return {function} `true` 값을 반환하는 함수.
     */
    handlerHttpSuccess: function () {
      return function () { return true; };
    },

    /**
     * @ngdoc method
     * @methodOf dashApp.factory:Utils
     * @name dashApp.factory:Utils#handlerHttpError
     * @description `$http` 서비스를 사용하여 통신에 실패했을 때 적절한
     *              오류 사유를 작성하여 reject하는 콜백 함수를 생성하는 메서드.
     *              통신에 실패했음을 정하는 기준은 `$http`와 같다.
     *              다음과 같이 사용한다.
     *
     * <pre>
     * $http.get('/url')
     * .when(
     *   Utils.handlerHttpSuccess(),
     *   Utils.handlerHttpError(errorSpec)
     * );
     * </pre>
     * @param  {object} errorSpec 오류 사유를 작성하기 위한 정보가 담긴 객체.
     *                            이 객체는 다음과 같은 속성과 값을 가지고 있어야 한다.
     *
     *    - **prefix** – `{string}` – 오류 사유의 접두 문장.
     *    - **reasons** – `{Array}` – 오류 사유들의 배열.
     *        이 배열은 다음과 같은 형태의 객체들로 이루어져 있어야 한다.
     *        <table>
     *          <thead>
     *            <tr>
     *              <td>키</td>
     *              <td>타입</td>
     *              <td>설명</td>
     *            </tr>
     *          </thead>
     *          <tbody>
     *            <tr>
     *              <td>code</td>
     *              <td>`{integer}`</td>
     *              <td>오류 발생 시 HTTP 응답 코드.</td>
     *            </tr>
     *            <tr>
     *              <td>reason</td>
     *              <td>`{string}`</td>
     *              <td>오류 사유.</td>
     *            </tr>
     *          </tbody>
     *        </table>
     *
     * @return {function} 응답 객체(response object: `$http` 참조)를 매개변수로
     *                    받는 함수를 반환한다. 반환된 함수는 응답 객체의 상태 코드를
     *                    `errorSpec`에 정의된 오류 사유들과 비교하여, 일치하는
     *                    코드를 찾으면 `[접두 문장][오류 사유]` 형태의 사유로,
     *                    그렇지 않으면 `[접두 문장]HTTP [상태 코드]` 형태의 사유로
     *                    reject한다.
     */
    handlerHttpError: function (errorSpec) {
      return function (response) {
        var reason;
        var status = response.status;

        angular.forEach(errorSpec.reasons, function(value){
          if (status == value.code) {
            reason = value.reason;
          }
        });

        if (typeof reason === 'undefined') {
          reason = 'HTTP ' + status;
        }

        reason = errorSpec.prefix + reason;
        return $q.reject(reason);
      }
    },

    /**
     * @ngdoc method
     * @methodOf dashApp.factory:Utils
     * @name dashApp.factory:Utils#getHttpCodeFromErrorReason
     * @description {@link dashApp.factory:Utils#handlerHttpError
     *              Utils.handlerHttpError}로 생성한 콜백 함수가 reject한
     *              오류 사유가 HTTP 코드를 포함하는 경우, 이를 찾아서 반환하는 함수이다.
     *
     * @param  {string} reason 오류 사유.
     *
     * @return {integer|null} 오류 사유에서 찾아낸 HTTP 코드.
     *                        찾아내지 못 했다면 `null`을 반환한다.
     */
    getHttpCodeFromErrorReason: function (reason) {
      var result = regexHttpCodeFromErrorReason.exec(reason);

      if (result && result.length >= 2) {
        return parseInt(result[1]);
      } else {
        return null;
      }
    },

    /**
     * @ngdoc method
     * @methodOf dashApp.factory:Utils
     * @name dashApp.factory:Utils#reasonHttpError
     * @description HTTP 코드를 포함하여 UI에 노출시킬 에러 메시지를 작성하여
     *              반환하는 메서드.
     *
     * @param  {integer} code HTTP 코드.
     *
     * @return {string} UI에 노출시킬 에러 메시지.
     */
    reasonHttpError: function (code) {
      return UI.HTTP_ERROR.PREFIX + code + UI.HTTP_ERROR.SUFFIX;
    }
  };
}]);
