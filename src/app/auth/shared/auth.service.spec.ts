import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from 'ngx-webstorage';
import { SignupPayload } from '../signup/signup.payload';


import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocalStorageService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getJwtToken', () => {
    service.getJwtToken();
  });

  it('should getRefreshToken', () => {
    service.getRefreshToken();
  });
  
  it('should signup', () => {
    let newSignupPayload: SignupPayload;
    newSignupPayload = {
      username: 'testName',
      password: 'testPass'
    };

    service.signup(newSignupPayload).subscribe();

    const req = httpController.expectOne('http://localhost:8080/BourbonCommunityReviews/profile/new');
    expect(req.request.method).toEqual('POST');
  });

  it('should checkUser', () => {
    let newSignupPayload: SignupPayload;
    newSignupPayload = {
      username: 'testName',
      password: 'testPass'
    };

    service.checkUser(newSignupPayload).subscribe();

    const req = httpController.expectOne('http://localhost:8080/BourbonCommunityReviews/profile/check/testName');
    expect(req.request.method).toEqual('GET');
  });
});
