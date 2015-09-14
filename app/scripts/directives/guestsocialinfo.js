'use strict';

/**
 * @ngdoc directive
 * @name egmApp.directive:guestSocialInfo
 * @description
 * # guestSocialInfo
 */
angular.module('egmApp')
  .directive('guestSocialInfo', function (formsService) {
    return {
      templateUrl: 'views/directives/guest-social-info.html',
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
              formsService.addForm(scope.socialNetworksForm,scope.index);
          }
        }
      },
      controller: function ($scope) {
          $scope.reset = function(account)
          {
              if(!$scope.user['has_' + account])
              {
                  delete($scope.user.social[account]);
              }
          }
      }
    };
  });
