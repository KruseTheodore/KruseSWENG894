import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BourbonService } from './bourbon.service';

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

});
