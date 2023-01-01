import { TestBed } from '@angular/core/testing';

import { AddlistingService } from './addlisting.service';

describe('AddlistingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddlistingService = TestBed.get(AddlistingService);
    expect(service).toBeTruthy();
  });
});
