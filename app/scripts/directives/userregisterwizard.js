'use strict';

/**
 * @ngdoc directive
 * @name egmApp.directive:userRegisterWizard
 * @description
 * # userRegisterWizard
 */
angular.module('egmApp')
    .directive('userRegisterWizard', function (formsService,$mdDialog,$location,guestsService,$filter) {
        return {
            templateUrl: 'views/directives/user-register-wizard.html',
            restrict: 'E',
            scope : {
                editUserId : '='
            },
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {
                        scope.user = {};
                        scope.user.gender = 'male';
                        scope.user.interests = [];

                        if(scope.editUserId)
                        {
                            var user = guestsService.getUserById(scope.editUserId);
                            if(!user)
                            {
                                $location.path('/');
                            }
                            scope.user = angular.copy(user);
                            scope.action = 'edit';
                        }
                    },
                    post: function postLink(scope, element, iAttrs, controller) {

                    }
                }
            },
            controller: function ($scope) {

                $scope.$watch('selectedIndex',function(n,o){
                    if(!formsService.validateForm(o)) $scope.selectedIndex = o;
                });

                $scope.goBack = function()
                {
                    if($scope.selectedIndex == 0) return;

                    if(!formsService.validateForm($scope.selectedIndex)) return;

                    $scope.selectedIndex--;
                }

                $scope.goForward = function()
                {
                    if($scope.selectedIndex == 3) return;

                    if(!formsService.validateForm($scope.selectedIndex)) return;

                    $scope.selectedIndex++;
                }

                $scope.save = function()
                {
                    if($scope.action =='edit')
                    {
                        $scope.update();
                        return;
                    }

                    guestsService.add($scope.user);

                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(false)
                            .title($filter('translate')('New Guest has been registered succesfully.'))
                            .ok($filter('translate')('Ok'))
                        ).then(function(){
                            $location.path('/');
                        });
                }

                $scope.update = function()
                {
                    guestsService.update($scope.user);

                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(false)
                            .title($filter('translate')('Saved'))
                            .content($filter('translate')('Guest details for ') + $scope.user.name + ' ' + $filter('translate')('have been saved.'))
                            .ok('Ok')
                    ).then(function(){
                            $location.path('/');
                        });
                }
            }
        };
    });
