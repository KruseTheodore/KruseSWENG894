import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BourbonService } from './bourbon.service';
import { BourbonPayload } from './new-bourbon/bourbon.payload';

describe('BourbonService', () => {
  let service: BourbonService;
  let http: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BourbonService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getBourbons', () => {
    service.getBourbons().subscribe();
    const req = httpController.expectOne('http://localhost:8080/BourbonCommunityReviews/bourbon');
    expect(req.request.method).toEqual('GET');
  });

  it('should addBourbon', () => {
    let newBourbonPayload: BourbonPayload;
    newBourbonPayload = {
      name: 'testName',
      distil: 'testDistil',
      proof: 100.0,
    };
    service.addBourbon(newBourbonPayload).subscribe();
    const req = httpController.expectOne('http://localhost:8080/BourbonCommunityReviews/bourbon');
    expect(req.request.method).toEqual('POST');
  });

});
