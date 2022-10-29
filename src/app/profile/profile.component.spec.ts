import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { of, throwError } from 'rxjs';
import { AuthService } from '../auth/shared/auth.service';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { Review } from '../review';
import { Role } from '../role';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let localstorage: LocalStorageService;
  let profileService: ProfileService;
  let routerStub = { navigate: jasmine.createSpy('navigate') };
  const authService = {getUsername: () => 'test'} as AuthService;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ToastrService, useValue: toastrService },  {provide: ActivatedRoute, useValue: {snapshot: {queryParamMap: convertToParamMap({name: 'test'})}}},
        {provide: AuthService, useValue: authService}, {provide: Router, useValue: routerStub}, ProfileService],
      declarations: [ ProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    profileService = TestBed.inject(ProfileService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getProfile', () => {
    let role: Role;
    role = {
      id: 'test',
      name: 'testRole'
    }
    let profile: Profile;
    profile = {
      id: 'testId',
      name: 'testName',
      password: 'testPass',
      bourbon_ids: ["test", 'test2'],
      roles: [role],
      followed_names: ["test", 'test2'],
    }
    let newSpy = spyOn(profileService, 'getProfileByName').and.returnValues(of(profile));
    component.getProfile();
    expect(newSpy).toHaveBeenCalled();
  });

  it('should get anothers Profile', () => {
    let role: Role;
    role = {
      id: 'test',
      name: 'testRole'
    }
    let profile: Profile;
    profile = {
      id: 'testId',
      name: 'testName',
      password: 'testPass',
      bourbon_ids: ["test", 'test2'],
      roles: [role],
      followed_names: ["test", 'test2'],
    }
    component.yourProfile = false;
    component.storedProfile = "test";
    let newSpy = spyOn(profileService, 'getProfileByName').and.returnValue(of(profile));
    component.getProfile();
    expect(newSpy).toHaveBeenCalled();
  });

  it('should not getProfile', () => {
    let newSpy = spyOn(profileService, 'getProfileByName').and.returnValues(throwError(() => new Error("test")));
    component.getProfile();
    expect(newSpy).toHaveBeenCalled();
  });

  it('should getProfile no bourbons or profiles', () => {
    let role: Role;
    role = {
      id: 'test',
      name: 'testRole'
    }
    let profile: Profile;
    profile = {
      id: 'testId',
      name: 'testName',
      password: 'testPass',
      bourbon_ids: [],
      roles: [role],
      followed_names: [],
    }
    let newSpy = spyOn(profileService, 'getProfileByName').and.returnValues(of(profile));
    component.getProfile();
    expect(newSpy).toHaveBeenCalled();
  });
  
  it('should getReviewsOnProfile', () => {
    let reviews: Review[];
    reviews = [
      {id: 'test', name: 'testName', rating: 4.0, taste: 4.5, nose: 3.5, mouthfeel: 3.0,
       value: 2.5, availability: 2.0, content: 'testContent', profile_id: 'testPID', bourbon_id: 'testBID'}
    ]
    let newSpy = spyOn(profileService, 'getReviewsOnProfile').and.returnValues(of(reviews));

    component.getReviewsOnProflie();
    expect(newSpy).toHaveBeenCalled();
  });

  it('should not getReviewsOnProfile', () => {
    let newSpy = spyOn(profileService, 'getReviewsOnProfile').and.returnValues(throwError(() => new Error("test")));

    component.getReviewsOnProflie();
    expect(newSpy).toHaveBeenCalled();
  });

  it('should getReviewsOnProfile no reviews', () => {
    let reviews: Review[];
    reviews = [
      
    ]
    let newSpy = spyOn(profileService, 'getReviewsOnProfile').and.returnValues(of(reviews));

    component.getReviewsOnProflie();
    expect(newSpy).toHaveBeenCalled();
  });

  it('should followUser', () => {
    let newSpy = spyOn(profileService, 'followUser').and.returnValues(of({
      result : {
         httpStatus : 200
      }
    }));
    component.followUser();
    expect(newSpy).toHaveBeenCalled();
  });

  it('should unfollowUser', () => {
    let newSpy = spyOn(profileService, 'unfollowUser').and.returnValues(of({
      result : {
         httpStatus : 200
      }
    }));
    component.unfollowUser();
    expect(newSpy).toHaveBeenCalled();
  });

  it('should not unfollowUser', () => {
    let newSpy = spyOn(profileService, 'unfollowUser').and.returnValues(throwError(() => new Error("test")));
    component.unfollowUser();
    expect(newSpy).toHaveBeenCalled();
  });

  it('should not followUser', () => {
    let newSpy = spyOn(profileService, 'followUser').and.returnValues(throwError(() => new Error("test")));
    component.followUser();
    expect(newSpy).toHaveBeenCalled();
  });

});
