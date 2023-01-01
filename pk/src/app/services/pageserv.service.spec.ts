import { TestBed } from '@angular/core/testing';

import { PageservService } from './pageserv.service';

describe('PageservService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageservService = TestBed.get(PageservService);
    expect(service).toBeTruthy();
  });
});
