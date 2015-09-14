'use strict';

/**
 * @ngdoc directive
 * @name egmApp.directive:guestReviewData
 * @description
 * # guestReviewData
 */
angular.module('egmApp')
  .directive('guestReviewData', function () {
    return {
      templateUrl: 'views/directives/guest-review-data.html',
      restrict: 'E',
      scope : {
        user : '=',
        index : '='
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
