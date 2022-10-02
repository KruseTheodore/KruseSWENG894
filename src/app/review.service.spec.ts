import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from 'ngx-webstorage';
import { ReviewPayload } from './new-review/review.payload';

import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let service: ReviewService;
  let http: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocalStorageService]
    });
    service = TestBed.inject(ReviewService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getReviews', () => {
    service.getReviews().subscribe();
    const req = httpController.expectOne('http://localhost:8080/BourbonCommunityReviews/review');
    expect(req.request.method).toEqual('GET');
  });


  it('should newReview', () => {
    let newReviewPayload: ReviewPayload;
    newReviewPayload = {
      name: 'testName',
      rating: 2.0,
      taste: NaN,
      nose: NaN,
      mouthfeel: NaN,
      value: NaN,
      availability: NaN,
      content: '',
      profile_id: '"test',
      bourbon_id: '',
    };

    service.newReview(newReviewPayload).subscribe();

    const req = httpController.expectOne('http://localhost:8080/BourbonCommunityReviews/review');
    expect(req.request.method).toEqual('POST');
  });


});
