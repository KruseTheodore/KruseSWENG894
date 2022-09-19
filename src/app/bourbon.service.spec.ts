import { TestBed } from '@angular/core/testing';

import { BourbonService } from './bourbon.service';

describe('BourbonService', () => {
  let service: BourbonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BourbonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
