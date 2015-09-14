'use strict';

describe('Service: guestsService', function () {

  // load the service's module
  beforeEach(module('egmApp'));

  // instantiate service
  var guestsService;
  beforeEach(inject(function (_guestsService_) {
    guestsService = _guestsService_;
  }));

  it('should do something', function () {
    expect(!!guestsService).toBe(true);
  });

});
