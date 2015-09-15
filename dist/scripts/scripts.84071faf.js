"use strict";angular.module("egmApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial","LocalStorageModule","pascalprecht.translate"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main",resolve:{guests:["guestsService",function(a){return a.initGuests(),a.getGuests()}]}}).when("/register",{templateUrl:"views/register.html",controller:"RegisterCtrl",controllerAs:"register",resolve:{guests:["guestsService",function(a){return a.initGuests(),a.getGuests()}]}}).when("/edit/:index",{templateUrl:"views/edit.html",controller:"EditCtrl",controllerAs:"edit",resolve:{guests:["guestsService",function(a){return a.initGuests(),a.getGuests()}]}}).otherwise({redirectTo:"/"})}]).config(["$translateProvider","localStorageServiceProvider",function(a,b){a.useStaticFilesLoader({prefix:"l10n/",suffix:".json"}),a.preferredLanguage("en"),a.useLocalStorage(),a.useSanitizeValueStrategy("escaped"),b.setPrefix("egm")}]).run(["$rootScope","$translate",function(a,b){a.language=b.preferredLanguage(),a.$watch("language",function(a){b.use(a)})}]),angular.module("egmApp").controller("MainCtrl",["$scope","guests","guestsService","$mdDialog",function(a,b,c,d){a.guests=b,a["delete"]=function(a){var b=d.confirm().title("Would you like to delete this guest?").ariaLabel("delete guest").ok("Please do it!").cancel("No, thanks.");d.show(b).then(function(){c.deleteGuest(a)},function(){})}}]),angular.module("egmApp").controller("RegisterCtrl",function(){}),angular.module("egmApp").directive("userRegisterWizard",["formsService","$mdDialog","$location","guestsService","$filter",function(a,b,c,d,e){return{templateUrl:"views/directives/user-register-wizard.html",restrict:"E",scope:{editUserId:"="},compile:function(a,b,e){return{pre:function(a,b,e,f){if(a.user={},a.user.gender="male",a.user.interests=[],a.editUserId){var g=d.getUserById(a.editUserId);g||c.path("/"),a.user=angular.copy(g),a.action="edit"}},post:function(a,b,c,d){}}},controller:["$scope",function(f){f.$watch("selectedIndex",function(b,c){a.validateForm(c)||(f.selectedIndex=c)}),f.goBack=function(){0!=f.selectedIndex&&a.validateForm(f.selectedIndex)&&f.selectedIndex--},f.goForward=function(){3!=f.selectedIndex&&a.validateForm(f.selectedIndex)&&f.selectedIndex++},f.save=function(){return"edit"==f.action?void f.update():(d.add(f.user),void b.show(b.alert().clickOutsideToClose(!1).title(e("translate")("New Guest has been registered succesfully.")).ok(e("translate")("Ok"))).then(function(){c.path("/")}))},f.update=function(){d.update(f.user),b.show(b.alert().clickOutsideToClose(!1).title(e("translate")("Saved")).content(e("translate")("Guest details for ")+f.user.name+" "+e("translate")("have been saved.")).ok("Ok")).then(function(){c.path("/")})}}]}}]),angular.module("egmApp").directive("guestPersonalInfo",["formsService",function(a){return{templateUrl:"views/directives/guest-personal-info.html",scope:{user:"=",index:"="},restrict:"E",compile:function(b,c,d){return{pre:function(a,b,c,d){},post:function(b,c,d,e){angular.element("#user_name").focus(),a.addForm(b.personalInfoForm,b.index)}}},controller:["$scope",function(a){}]}}]),angular.module("egmApp").directive("guestSocialInfo",["formsService",function(a){return{templateUrl:"views/directives/guest-social-info.html",restrict:"E",scope:{user:"=",index:"="},compile:function(b,c,d){return{pre:function(a,b,c,d){},post:function(b,c,d,e){a.addForm(b.socialNetworksForm,b.index)}}},controller:["$scope",function(a){a.reset=function(b){a.user["has_"+b]||delete a.user.social[b]}}]}}]),angular.module("egmApp").directive("guestInterests",function(){return{templateUrl:"views/directives/guest-interests.html",restrict:"E",scope:{user:"="},compile:function(a,b,c){return{pre:function(a,b,c,d){},post:function(a,b,c,d){}}},controller:["$scope",function(a){}]}}),angular.module("egmApp").service("formsService",function(){var a=[];this.addForm=function(b,c){a[c]=b},this.validateForm=function(b){return a[b]?!a[b].$invalid:!0},this.getForms=function(){return a}}),angular.module("egmApp").directive("guestReviewData",function(){return{templateUrl:"views/directives/guest-review-data.html",restrict:"E",scope:{user:"=",index:"="},compile:function(a,b,c){return{pre:function(a,b,c,d){},post:function(a,b,c,d){}}},controller:["$scope",function(a){}]}}),angular.module("egmApp").service("guestsService",["localStorageService",function(a){var b,c=function(){a.set("guestsInStore",b)};this.add=function(a){a.id=b.length+1,b.push(a),c()},this.initGuests=function(){b&&b.length||(b=a.get("guestsInStore")||[])},this.setGuests=function(a){b=a},this.getUserById=function(a){for(var c in b)if(b[c].id==a)return b[c];return null},this.update=function(a){for(var d in b)if(b[d].id==a.id){b[d]=angular.copy(a),c();break}},this.deleteGuest=function(a){b.splice(b.indexOf(a),1),c()},this.getGuests=function(){return b}}]),angular.module("egmApp").controller("EditCtrl",["$scope","$routeParams",function(a,b){a.edit_user_id=b.index}]),angular.module("egmApp").run(["$templateCache",function(a){a.put("views/directives/guest-interests.html",'<md-content class="md-padding register-tab"> <div layout="row" layout-align="center" flex> <h1 class="md-display-2" translate="Interests">Interests</h1> </div> <div layout="column"> <md-chips ng-model="user.interests" placeholder="{{ \'add more interests\' | translate}}" secondary-placeholder="+{{ \'Interest\' | translate }}"></md-chips> </div> </md-content>'),a.put("views/directives/guest-personal-info.html",'<md-content class="md-padding register-tab"> <div layout="row" layout-align="center" flex> <h1 class="md-display-2" translate="Guest Personal Information">Guest Personal Information</h1> </div> <div layout="column"> <form name="personalInfoForm"> <div layout="row"> <div flex="5" layout="column" layout-align="left center"> <md-icon md-font-set="material-icons">account_circle</md-icon> </div> <div flex="80" layout="column" layout-align="left center"> <md-input-container> <label translate="Name">Name</label> <input ng-model="user.name" name="user_name" id="user_name" required> <div ng-messages="personalInfoForm.user_name.$error"> <div ng-message="required">{{ \'Please type the guest\\\'s name\' | translate }}</div> </div> </md-input-container> </div> </div> <div layout="row"> <div flex="5" layout="column" layout-align="left center"> <md-icon md-font-set="material-icons">email</md-icon> </div> <div flex="80" layout="column" layout-align="left center"> <md-input-container> <label translate="E-mail">E-mail</label> <input type="email" ng-model="user.email" name="user_email" id="user_email" required> <div ng-messages="personalInfoForm.user_email.$error"> <div ng-message="required">{{ \'Please type the guest\\\'s email\' | translate}}</div> <div ng-message="email">{{ \'This is not a valid email address\' | translate }}</div> </div> </md-input-container> </div> </div> <div layout="row"> <div flex="5" layout="center center"> <md-icon md-font-set="material-icons">business</md-icon> </div> <div flex="80"> <md-input-container> <label translate="Company">Company</label> <input ng-model="user.company" name="user_company" id="company" required> <div ng-messages="personalInfoForm.user_company.$error"> <div ng-message="required"> {{ \'Please type the guest\\\'s company\' | translate }}</div> </div> </md-input-container> </div> </div> <div layout="row"> <div flex="5" layout="center center"> <md-icon md-font-set="material-icons">people_outline</md-icon> </div> <div flex="80"> <md-radio-group ng-model="user.gender"> <md-radio-button value="male" translate="Male">Male</md-radio-button> <md-radio-button value="female" translate="Female">Female</md-radio-button> </md-radio-group> </div> </div> <div layout="row"> <div flex="5" layout="center center"> <md-icon md-font-set="material-icons">comment</md-icon> </div> <div flex="80"> <md-input-container> <label translate="Remarks">Remarks</label> <textarea ng-model="user.remarks" columns="3" md-maxlength="150" name="remarks" ng-maxlength="150"></textarea> <div ng-messages="personalInfoForm.remarks.$error"> <div ng-message="maxlength">{{ \'Max length for remarks is 150 characters\' | translate }} </div> </div> </md-input-container> </div> </div> </form> </div> </md-content>'),a.put("views/directives/guest-review-data.html",'<md-content class="md-padding register-tab"> <div layout="row" layout-align="center" flex> <h1 class="md-display-2" translate="Review Guest Info">Review Guest Info</h1> </div> <div layout="column"> <md-card> <md-card-content> <h2 class="md-title" translate="Guest Personal Information">Guest Personal Information</h2> <div layout="row"> <p>{{ \'Name\' | translate }}: {{ user.name }}</p> </div> <div layout="row"> <p>{{ \'Gender\' | translate }} : {{ user.gender }}</p> </div> <div layout="row"> <p>{{ \'E-mail\' | translate }} : {{ user.email }}</p> </div> <div layout="row"> <p>{{ \'Company\' | translate }}: {{ user.company }}</p> </div> <div layout="row"> <p>{{ \'Remarks\' | translate }} : {{ user.remarks }}</p> </div> </md-card-content> </md-card> <md-card> <md-card-content> <h2 class="md-title" translate="Guest Social Networks">Guest Social Networks</h2> <div layout="row" ng-repeat="(key,value) in user.social"> <p><span style="text-transform: capitalize">{{ key }}</span> : {{ value }}</p> </div> </md-card-content> </md-card> <md-card> <md-card-content> <h2 class="md-title" translate="Interests">Interests</h2> <div layout="row"> <md-chips> <md-chip ng-repeat="interest in user.interests">{{ interest }}</md-chip> </md-chips> </div> </md-card-content> </md-card> </div> </md-content>'),a.put("views/directives/guest-social-info.html",'<md-content class="md-padding register-tab"> <div layout="row" layout-align="center" flex> <h1 class="md-display-2" translate="Social Networks">Social Networks</h1> </div> <div layout="column"> <form name="socialNetworksForm"> <div layout="row"> <div flex="5" layout="column" layout-align="center center"> <md-checkbox ng-model="user.has_facebook" aria-label="facebook" ng-change="reset(\'facebook\')"></md-checkbox> </div> <div flex="95" layout="column"> <md-input-container> <label>facebook</label> <input ng-model="user.social[\'facebook\']" name="facebook" ng-disabled="!user.has_facebook" ng-required="user.has_facebook"> <div ng-messages="socialNetworksForm.facebook.$error"> <div ng-message="required">{{ \'Please type the guest\\\'s facebook profile address\' | translate }}</div> </div> </md-input-container> </div> </div> <div layout="row"> <div flex="5" layout="column" layout-align="center center"> <md-checkbox ng-model="user.has_linkedin" aria-label="linkedin" ng-change="reset(\'linkedin\')"></md-checkbox> </div> <div flex="95" layout="column"> <md-input-container> <label>linkedin</label> <input ng-model="user.social[\'linkedin\']" name="linkedin" ng-disabled="!user.has_linkedin" ng-required="user.has_linkedin"> <div ng-messages="socialNetworksForm.linkedin.$error"> <div ng-message="required">{{ \'Please type the guest\\\'s linkedin profile address\' | translate }}</div> </div> </md-input-container> </div> </div> <div layout="row"> <div flex="5" layout="column" layout-align="center center"> <md-checkbox ng-model="user.has_twitter" aria-label="twitter" ng-change="reset(\'twitter\')"></md-checkbox> </div> <div flex="95" layout="column"> <md-input-container> <label>twitter</label> <input ng-model="user.social[\'twitter\']" name="twitter" ng-disabled="!user.has_twitter" ng-required="user.has_twitter"> <div ng-messages="socialNetworksForm.twitter.$error"> <div ng-message="required">{{ \'Please type the guest\\\'s twitter profile address\' | translate }} </div> </div> </md-input-container> </div> </div> </form> </div> </md-content>'),a.put("views/directives/user-register-wizard.html",'<md-tabs md-dynamic-height md-border-bottom md-selected="selectedIndex"> <md-tab label="{{ \'Personal Info\' | translate }}"> <guest-personal-info user="user" index="0"></guest-personal-info> </md-tab> <md-tab label="{{ \'Social Networks\' | translate }}"> <guest-social-info user="user" index="1"></guest-social-info> </md-tab> <md-tab label="{{ \'Interests\' | translate }}"> <guest-interests user="user" index="2"></guest-interests> </md-tab> <md-tab label="{{ \'Review/Save\' | translate }}"> <guest-review-data user="user" index="3"></guest-review-data> </md-tab> </md-tabs> <div layout="row" flex="100" layout-align="end"> <md-button class="md-icon-button" aria-label="Go Back" ng-click="goBack()"> <md-icon md-font-set="material-icons">arrow_back</md-icon> </md-button> <md-button class="md-icon-button" aria-label="Next" ng-click="goForward()" ng-show="selectedIndex != 3"> <md-icon md-font-set="material-icons">arrow_forward</md-icon> </md-button> <md-button class="md-icon-button" aria-label="Save" ng-click="save()" ng-show="selectedIndex == 3"> <md-icon md-font-set="material-icons">save</md-icon> </md-button> </div>'),a.put("views/edit.html",'<div layout="row"> <user-register-wizard edit-user-id="edit_user_id"></user-register-wizard> </div>'),a.put("views/main.html",'<div layout="row" flex="100" layout-align="center"> <h3 translate="Guest List">Guest List</h3> </div> <div layout="row" flex="100"> <table class="table table-striped"> <thead> <tr> <th>#</th> <th> <span ng-show="!showSearch"> <span translate="Guest Name">Guest Name</span> <md-icon md-font-set="material-icons" ng-click="showSearch = true">search</md-icon> </span> <span ng-show="showSearch"> <div layout="row"> <div flex="40"> <input class="form-control input-sm" ng-model="searchGuest.name" placeholder="{{ \'filter guests\' | translate }}"> </div> <div flex="20"> <md-icon md-font-set="material-icons" ng-click="showSearch = false">close</md-icon> </div> </div> </span> </th> <th translate="Email">Email</th> <th translate="Actions">Actions</th> </tr> </thead> <tbody> <tr ng-repeat="guest in guests | filter:searchGuest"> <th scope="row"> {{ ($index+1) }} </th> <td>{{ guest.name }}</td> <td>{{ guest.email }}</td> <td> <div layout="row"> <div flex="50"> <md-button class="md-icon-button" aria-label="edit" href="#/edit/{{ guest.id }}"> <md-icon md-font-set="material-icons">edit</md-icon> </md-button> </div> <div flex="50"> <md-button class="md-icon-button" aria-label="delete" ng-click="delete(guest)"> <md-icon md-font-set="material-icons">delete</md-icon> </md-button> </div> </div> </td> </tr> </tbody> </table> </div>'),a.put("views/register.html",'<div layout="row"> <user-register-wizard></user-register-wizard> </div>')}]);