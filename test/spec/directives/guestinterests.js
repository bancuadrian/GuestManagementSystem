'use strict';

describe('Directive: guestInterests', function () {

  // load the directive's module
  beforeEach(module('egmApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<guest-interests></guest-interests>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the guestInterests directive');
  }));
});
