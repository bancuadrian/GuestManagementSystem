'use strict';

/**
 * @ngdoc directive
 * @name egmApp.directive:guestInterests
 * @description
 * # guestInterests
 */
angular.module('egmApp')
  .directive('guestInterests', function () {
    return {
      templateUrl: 'views/directives/guest-interests.html',
      restrict: 'E',
      scope : {
        user :'='
      },
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function preLink(scope, iElement, iAttrs, controller) {

          },
          post: function postLink(scope, element, iAttrs, controller) {

          }
        }
      },
      controller: function ($scope) {

      }
    };
  });
