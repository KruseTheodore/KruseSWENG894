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
  let localstorage: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocalStorageService]
    });
    service = TestBed.inject(AuthService);
    localstorage = TestBed.inject(LocalStorageService);
    httpController = TestBed.inject(HttpTestingController);

    let spy = spyOn<LocalStorageService, any>(localstorage, 'retrieve').and.callFake(function(){
      return 'test';
    });

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getJwtToken', () => {
    service.getJwtToken();
    expect(service.getJwtToken()).toBe('test');
  });

  it('should getRefreshToken', () => {
    service.getRefreshToken();
    expect(service.getRefreshToken()).toBe('test');
  });
  
  it('should signup', () => {
    let newSignupPayload: SignupPayload;
    newSignupPayload = {
      username: 'testName',
      password: 'testPass'
    };

    service.signup(newSignupPayload).subscribe();

    const req = httpController.expectOne({url: 'http://localhost:8080/BourbonCommunityReviews/profile/new'});
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

  it('should logout', () => {
    service.logout().subscribe();
    const req = httpController.expectOne('http://localhost:8080/BourbonCommunityReviews/profile/logout');
    expect(req.request.method).toEqual('GET');
  });

  it('should refreshToken', () => {
    service.refreshToken().subscribe();
    const req = httpController.expectOne('http://localhost:8080/BourbonCommunityReviews/profile/refresh');
    expect(req.request.method).toEqual('GET');
  });

  it('should check logged in', () => {
    service.isLoggedIn();
    expect(service.isLoggedIn()).toBe(true);

  });

});
