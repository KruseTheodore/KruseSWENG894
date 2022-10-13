import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../auth/shared/auth.service';
import { Profile } from '../profile';
import { Role } from '../role';
import { ProfileService } from '../profile.service';

import { FollowedReviewsComponent } from './followed-reviews.component';
import { of } from 'rxjs';
import { Review } from '../review';

describe('FollowedReviewsComponent', () => {
  let component: FollowedReviewsComponent;
  let fixture: ComponentFixture<FollowedReviewsComponent>;
  let profileService: ProfileService;
  const authService = {getUsername: () => 'test'} as AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ ProfileService, {provide: AuthService, useValue: authService}],
      declarations: [ FollowedReviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowedReviewsComponent);
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

  it('should getReviewsOnProfile', () => {
    let reviews: Review[];
    reviews = [
      {id: 'test', name: 'testName', rating: 4.0, taste: 4.5, nose: 3.5, mouthfeel: 3.0,
       value: 2.5, availability: 2.0, content: 'testContent', profile_id: 'testPID', bourbon_id: 'testBID'}
    ]
    let newSpy = spyOn(profileService, 'getReviewsOnProfile').and.returnValues(of(reviews));
    component.followedNames = ['test'];
    fixture.detectChanges();

    component.getReviewsOnProflie();
    expect(newSpy).toHaveBeenCalled();
  });
});
