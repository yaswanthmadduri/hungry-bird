import { TestBed } from '@angular/core/testing';

import { FrontPageSignupService } from './front-page-signup.service';

describe('FrontPageSignupService', () => {
  let service: FrontPageSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrontPageSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
