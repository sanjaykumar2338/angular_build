import { TestBed } from '@angular/core/testing';

import { ListservService } from './listserv.service';

describe('ListservService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListservService = TestBed.get(ListservService);
    expect(service).toBeTruthy();
  });
});
