import { TestBed } from '@angular/core/testing';

import { ChangePasswordDataService } from './change-password-data.service';

describe('ChangePasswordDataService', () => {
  let service: ChangePasswordDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangePasswordDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
