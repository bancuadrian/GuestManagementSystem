'use strict';

describe('Directive: guestReviewData', function () {

  // load the directive's module
  beforeEach(module('egmApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<guest-review-data></guest-review-data>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the guestReviewData directive');
  }));
});
