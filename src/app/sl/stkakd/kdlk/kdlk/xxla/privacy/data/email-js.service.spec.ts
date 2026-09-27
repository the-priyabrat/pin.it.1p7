import { TestBed } from '@angular/core/testing';

import { EmailJSService } from './email-js.service';

describe('EmailJSService', () => {
  let service: EmailJSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailJSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
