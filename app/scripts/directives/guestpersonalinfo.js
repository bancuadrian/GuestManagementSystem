'use strict';

/**
 * @ngdoc directive
 * @name egmApp.directive:guestPersonalInfo
 * @description
 * # guestPersonalInfo
 */
angular.module('egmApp')
    .directive('guestPersonalInfo', function (formsService) {
        return {
            templateUrl: 'views/directives/guest-personal-info.html',
            scope: {
                user: '=',
                index: '='
            },
            restrict: 'E',
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {

                    },
                    post: function postLink(scope, element, iAttrs, controller) {
                        angular.element('#user_name').focus();
                        formsService.addForm(scope.personalInfoForm,scope.index);
                    }
                }
            },
            controller: function ($scope) {

            }
        };
    });
