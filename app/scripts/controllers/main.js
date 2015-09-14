'use strict';

/**
 * @ngdoc function
 * @name egmApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the egmApp
 */
angular.module('egmApp')
    .controller('MainCtrl', function ($scope,guests,guestsService,$mdDialog){
        $scope.guests = guests;

        $scope.delete = function(guest)
        {
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete this guest?')
                .ariaLabel('delete guest')
                .ok('Please do it!')
                .cancel('No, thanks.');
            $mdDialog.show(confirm).then(function() {
                guestsService.deleteGuest(guest);
            }, function() {

            });
        }
    });
