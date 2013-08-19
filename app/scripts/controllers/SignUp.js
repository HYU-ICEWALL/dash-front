'use strict';

angular.module('dashApp')
.controller('SignupCtrl', function ($scope) {
  $scope.majors = [
    {text: '컴퓨터공학부', value: 'H3HADD'},
    {text: '컴퓨터전공', value: 'H3HADDA'},
    {text: '소프트웨어전공', value: 'H3HADDB'}
  ];
  
});
