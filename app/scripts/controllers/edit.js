'use strict';

/**
 * @ngdoc function
 * @name egmApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the egmApp
 */
angular.module('egmApp')
    .controller('EditCtrl', function ($scope, $routeParams) {
        $scope.edit_user_id = $routeParams.index;
    });
