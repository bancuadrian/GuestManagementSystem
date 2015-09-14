'use strict';

describe('Directive: userRegisterWizard', function () {

  // load the directive's module
  beforeEach(module('egmApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<user-register-wizard></user-register-wizard>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the userRegisterWizard directive');
  }));
});
