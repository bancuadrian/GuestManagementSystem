'use strict';

/**
 * @ngdoc service
 * @name egmApp.formsService
 * @description
 * # formsService
 * Service in the egmApp.
 */
angular.module('egmApp')
    .service('formsService', function () {
        var forms = [];

        this.addForm = function(form,index)
        {
            forms[index] = form;
        }

        this.validateForm = function(index)
        {
            if(!forms[index]) return true;

            return !forms[index].$invalid;
        }

        this.getForms = function()
        {
            return forms;
        }

    });
