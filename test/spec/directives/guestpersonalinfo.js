'use strict';

describe('Directive: guestPersonalInfo', function () {

  // load the directive's module
  beforeEach(module('egmApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<guest-personal-info></guest-personal-info>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the guestPersonalInfo directive');
  }));
});
