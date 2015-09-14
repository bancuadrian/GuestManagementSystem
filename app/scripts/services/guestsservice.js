'use strict';

/**
 * @ngdoc service
 * @name egmApp.guestsService
 * @description
 * # guestsService
 * Service in the egmApp.
 */

angular.module('egmApp')
    .service('guestsService', function (localStorageService) {
        var guests;

        var updateStore = function()
        {
            localStorageService.set('guestsInStore', guests);
        }

        this.add = function (guest) {
            guest.id = guests.length + 1;
            guests.push(guest);
            updateStore();
        }

        this.initGuests = function()
        {
            if(!guests || !guests.length)
                guests = localStorageService.get('guestsInStore') || [];
        }

        this.setGuests = function(g)
        {
            guests = g;
        }

        this.getUserById = function(id)
        {
            for(var k in guests)
            {
                if(guests[k].id == id) return guests[k];
            }

            return null;
        }

        this.update = function(guest)
        {
            for(var k in guests)
            {
                if(guests[k].id == guest.id)
                {
                    guests[k] = angular.copy(guest);
                    updateStore();
                    break;
                }
            }
        }

        this.deleteGuest = function(guest)
        {
            guests.splice(guests.indexOf(guest),1);
            updateStore();
        }

        this.getGuests = function()
        {
            return guests;
        }
    });
