import { TestBed } from '@angular/core/testing';

import { userLogin } from './login.service';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: userLogin = TestBed.get(userLogin);
    expect(service).toBeTruthy();
  });
});
//saravanan