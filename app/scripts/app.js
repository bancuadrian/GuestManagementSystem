'use strict';

/**
 * @ngdoc overview
 * @name egmApp
 * @description
 * # egmApp
 *
 * Main module of the application.
 */
angular
  .module('egmApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'LocalStorageModule',
    'pascalprecht.translate'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
            resolve : {
                guests : function(guestsService)
                {
                    guestsService.initGuests();
                    return guestsService.getGuests();
                }
            }
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register',
            resolve : {
                guests : function(guestsService)
                {
                    guestsService.initGuests();
                    return guestsService.getGuests();
                }
            }
      })
      .when('/edit/:index', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl',
        controllerAs: 'edit',
            resolve : {
                guests : function(guestsService)
                {
                    guestsService.initGuests();
                    return guestsService.getGuests();
                }
            }

      })
      .otherwise({
        redirectTo: '/'
      });
  })
    .config(['$translateProvider','localStorageServiceProvider', function($translateProvider,localStorageServiceProvider){
        // Register a loader for the static files
        // So, the module will search missing translation tables under the specified urls.
        // Those urls are [prefix][langKey][suffix].
        $translateProvider.useStaticFilesLoader({
            prefix: 'l10n/',
            suffix: '.json'
        });
        // Tell the module what language to use by default
        $translateProvider.preferredLanguage('en');
        // Tell the module to store the language in the local storage
        $translateProvider.useLocalStorage();

        $translateProvider.useSanitizeValueStrategy('escaped');

        localStorageServiceProvider.setPrefix('egm');
    }])
    .run(function($rootScope,$translate){
        $rootScope.language = $translate.preferredLanguage();

        $rootScope.$watch('language',function(n){
            $translate.use(n);
        });
    });
