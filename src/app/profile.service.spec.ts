import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let http: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProfileService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getProfiles', () => {
    service.getProfiles().subscribe();
    const req = httpController.expectOne('http://localhost:8080/BourbonCommunityReviews/profile');
    expect(req.request.method).toEqual('GET');
  });

  it('should getProfileByName', () => {
    service.getProfileByName('test').subscribe();
    const req = httpController.expectOne('http://localhost:8080/BourbonCommunityReviews/profile/byname/test');
    expect(req.request.method).toEqual('GET');
  });

  it('should getReviewsOnProfile', () => {
    service.getReviewsOnProfile('test').subscribe();
    const req = httpController.expectOne('http://localhost:8080/BourbonCommunityReviews/review/profiles/test');
    expect(req.request.method).toEqual('GET');
  });

  it('should followUser', () => {
    service.followUser('test', 'test2').subscribe();
    const req = httpController.expectOne('http://localhost:8080/BourbonCommunityReviews/profile/follow/test/test2');
    expect(req.request.method).toEqual('POST');
  });

  it('should unfollowUser', () => {
    service.unfollowUser('test', 'test2').subscribe();
    const req = httpController.expectOne('http://localhost:8080/BourbonCommunityReviews/profile/unfollow/test/test2');
    expect(req.request.method).toEqual('DELETE');
  });
});
