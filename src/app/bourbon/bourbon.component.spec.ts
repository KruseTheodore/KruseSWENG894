import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from '../auth/shared/auth.service';
import { Bourbon } from '../bourbon';
import { BourbonService } from '../bourbon.service';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { Review } from '../review';
import { Role } from '../role';

import { BourbonComponent } from './bourbon.component';

describe('BourbonComponent', () => {
  let component: BourbonComponent;
  let fixture: ComponentFixture<BourbonComponent>;
  let bourbonService: BourbonService
  let profileService: ProfileService;
  const authService = {getUsername: () => 'test'} as AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[BourbonService, ProfileService, {provide: AuthService, useValue: authService}],
      declarations: [ BourbonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BourbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    bourbonService = TestBed.inject(BourbonService);
    profileService = TestBed.inject(ProfileService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get bourbons', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0}
    ]
    let newSpy = spyOn(bourbonService, 'getBourbons').and.returnValues(of(bourbons));
    component.getBourbons();
    expect(newSpy).toHaveBeenCalled();
  });

  it('should sort by rating', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 1.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 101.0, rating: 3.0},
      {name: 'tastName2', distil: 'testDistil2', proof: 102.0, rating: 4.0}
    ]
    component.bourbons = bourbons;
    component.sortBourbonsRating();
    expect(component.bourbons).toEqual([
      {name: 'tastName2', distil: 'testDistil2', proof: 102.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 101.0, rating: 3.0},
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 1.0}
    ])
  });

  it('should sort by proof', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 101.0, rating: 3.0},
      {name: 'tastName2', distil: 'testDistil2', proof: 102.0, rating: 2.0}
    ]
    component.bourbons = bourbons;
    component.sortBourbonsProof();
    expect(component.bourbons).toEqual([
      {name: 'tastName2', distil: 'testDistil2', proof: 102.0, rating: 2.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 101.0, rating: 3.0},
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0}
    ])
  });

  it('should sort by name', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'btastName1', distil: 'testDistil1', proof: 101.0, rating: 3.0},
      {name: 'atastName2', distil: 'testDistil2', proof: 102.0, rating: 2.0}
    ]
    component.bourbons = bourbons;
    component.sortBourbonsName();
    expect(component.bourbons).toEqual([
      {name: 'atastName2', distil: 'testDistil2', proof: 102.0, rating: 2.0},
      {name: 'btastName1', distil: 'testDistil1', proof: 101.0, rating: 3.0},
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0}
    ])
  });

  it('should sort by distillery', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'btestDistil1', proof: 101.0, rating: 3.0},
      {name: 'tastName2', distil: 'atestDistil2', proof: 102.0, rating: 2.0}
    ]
    component.bourbons = bourbons;
    component.sortBourbonsDistil();
    expect(component.bourbons).toEqual([
      {name: 'tastName2', distil: 'atestDistil2', proof: 102.0, rating: 2.0},
      {name: 'tastName1', distil: 'btestDistil1', proof: 101.0, rating: 3.0},
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0}
    ])
  });

  it('should createSearchForm', () => {
    component.createSearchForm();
    expect(component.createSearchForm).toBeTruthy();
  });

  it('should searchBourbons proof range', () => {
    component.createSearchForm();
    let newSpy = spyOn(component, 'getProofRange');
    component.searchForm.controls['proof1'].setValue(100.0);
    component.searchForm.controls['proof2'].setValue(101.0);
    component.searchBourbons();
    expect(newSpy).toHaveBeenCalledWith(100.0, 101.0);
  });

  it('should searchBourbons matches', () => {
    component.createSearchForm();
    let newSpy = spyOn(component, 'getMatches');
    component.searchForm.controls['text1'].setValue("Blantons");
    component.searchBourbons();
    expect(newSpy).toHaveBeenCalledWith("Blantons");
  });

  it('should searchBourbons closest match', () => {
    component.createSearchForm();
    let newSpy = spyOn(component, 'getClosestMatch');
    let newSpy1 = spyOn(component, 'getMatches').and.returnValue(true);
    component.searchForm.controls['text1'].setValue("test");
    component.searchBourbons();
    expect(newSpy).toHaveBeenCalledWith("test");
  });

  it('should getProofRange', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 95.0, rating: 3.0},
      {name: 'tastName2', distil: 'testDistil2', proof: 110.0, rating: 2.0}
    ]
    component.bourbons = bourbons;
    component.getProofRange(96.0, 101.0);
    expect(component.bourbons).toEqual([
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0}
    ])
  });

  it('should getMatches', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 95.0, rating: 3.0},
      {name: 'tastName2', distil: 'testDistil2', proof: 110.0, rating: 2.0}
    ]
    component.bourbons = bourbons;
    let test = component.getMatches("tastName1");
    expect(component.bourbons).toEqual([
      {name: 'tastName1', distil: 'testDistil1', proof: 95.0, rating: 3.0}
    ])
    expect(test).toEqual(false);
  });

  it('should getNoMatches', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 95.0, rating: 3.0},
      {name: 'tastName2', distil: 'testDistil2', proof: 110.0, rating: 2.0}
    ]
    component.bourbons = bourbons;
    let test = component.getMatches("tastName10");
    expect(test).toEqual(true);
  });

  it('should createMatrix', () => {
    let test = component.createMatrix("tast", "Name");
    expect(test).toEqual([[0, 0, 0, 0, 0,], [0, 0, 0, 0, 0,], [0, 0, 0, 0, 0,], [0, 0, 0, 0, 0,], [0, 0, 0, 0, 0,]]);
  });

  it('should getClosestMatches', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 95.0, rating: 3.0},
      {name: 'tastName20', distil: 'testDistil2', proof: 110.0, rating: 2.0},
      {name: 'tastName2099', distil: 'testDistil2', proof: 110.0, rating: 2.0},
      {name: 'tastName209999', distil: 'testDistil2', proof: 110.0, rating: 2.0},
      {name: 'notevenclosebaby', distil: 'testDistil2', proof: 110.0, rating: 2.0}
    ]
    component.bourbons = bourbons;
    let newSpy1 = spyOn(component, 'getMatches').and.returnValue(true);
    component.getClosestMatch("test");
    expect(component.bourbons).toEqual([
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 95.0, rating: 3.0},
      {name: 'tastName20', distil: 'testDistil2', proof: 110.0, rating: 2.0},
      {name: 'tastName2099', distil: 'testDistil2', proof: 110.0, rating: 2.0},
      {name: 'tastName209999', distil: 'testDistil2', proof: 110.0, rating: 2.0}
    ])
  });

  it('should getReccomended', () => {
    let newSpy = spyOn(component, 'getOwned');
    component.getRecommended();
    expect(newSpy).toHaveBeenCalled();
  });

  it('should getOwned', () => {
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
    component.getOwned();
    expect(newSpy).toHaveBeenCalled();
  });

  /** 
  it('should getReviewed', () => {
    let reviews: Review[];
    reviews = [
      {id: 'test', name: 'testName', rating: 4.0, taste: 4.5, nose: 3.5, mouthfeel: 3.0,
       value: 2.5, availability: 2.0, content: 'testContent', profile_id: 'testPID', bourbon_id: 'testBID'}
    ]
    let newSpy = spyOn(profileService, 'getReviewsOnProfile').and.returnValues(of(reviews));
    let newSpy2 = spyOn(component, 'modifyRatings');

    component.getReviewed();
    expect(newSpy).toHaveBeenCalled();
    expect(newSpy2).toHaveBeenCalled();
  });
  */
  

  it('should removeOwned', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 95.0, rating: 3.0},
      {name: 'tastName2', distil: 'testDistil2', proof: 110.0, rating: 2.0}
    ]
    let toRemove: string[];
    toRemove = ["tastName"]
    component.bourbons = bourbons;
    component.toRemove = toRemove;
    component.removeOwned();
    expect(component.bourbons).toEqual([
      {name: 'tastName1', distil: 'testDistil1', proof: 95.0, rating: 3.0},
      {name: 'tastName2', distil: 'testDistil2', proof: 110.0, rating: 2.0}
    ])
  });

  it('should getHighRatings', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 95.0, rating: 3.0},
      {name: 'tastName2', distil: 'testDistil2', proof: 110.0, rating: 2.0}
    ]
    let newreviews: Review[];
    newreviews = [
      {id: 'test', name: 'tastName', rating: 4.0, taste: 4.5, nose: 3.5, mouthfeel: 3.0,
       value: 2.5, availability: 2.0, content: 'testContent', profile_id: 'testPID', bourbon_id: 'tastName'}
    ]
    let toIncrease: string[];
    toIncrease = ["tastName"]
    component.reviews = newreviews;
    component.bourbons = bourbons;
    component.getHighRatings();
    expect(component.toDistilIncrease).toEqual([
      "testDistil"
    ])
  });

  it('should getLowRatings', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 95.0, rating: 3.0},
      {name: 'tastName2', distil: 'testDistil2', proof: 110.0, rating: 2.0}
    ]
    let newreviews: Review[];
    newreviews = [
      {id: 'test', name: 'tastName', rating: 2.0, taste: 4.5, nose: 3.5, mouthfeel: 3.0,
       value: 2.5, availability: 2.0, content: 'testContent', profile_id: 'testPID', bourbon_id: 'tastName'}
    ]
    let toIncrease: string[];
    toIncrease = ["tastName"]
    component.reviews = newreviews;
    component.bourbons = bourbons;
    component.getLowRatings();
    expect(component.dislikedBourbon).toEqual([
      "tastName"
    ])
  });

  it('should topTen', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 95.0, rating: 3.0},
      {name: 'tastName2', distil: 'testDistil2', proof: 110.0, rating: 2.0},
      {name: 'tastName3', distil: 'testDistil2', proof: 110.0, rating: 2.0},
      {name: 'tastName4', distil: 'testDistil2', proof: 110.0, rating: 2.0},
      {name: 'tastName5', distil: 'testDistil2', proof: 110.0, rating: 2.0},
      {name: 'tastName6', distil: 'testDistil2', proof: 110.0, rating: 2.0}
    ]
    component.bourbons = bourbons;
    component.topTen();
    expect(component.bourbons).toEqual([
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 95.0, rating: 3.0},
      {name: 'tastName2', distil: 'testDistil2', proof: 110.0, rating: 2.0},
      {name: 'tastName3', distil: 'testDistil2', proof: 110.0, rating: 2.0},
      {name: 'tastName4', distil: 'testDistil2', proof: 110.0, rating: 2.0}
    ])
  });

  /** 
  it('should getProfilesWhoDisliked', () => {
        let newreviews: Review[];
    newreviews = [
      {id: 'test', name: 'tastName', rating: 2.0, taste: 4.5, nose: 3.5, mouthfeel: 3.0,
       value: 2.5, availability: 2.0, content: 'testContent', profile_id: 'testPID', bourbon_id: 'tastName'}
    ]
    let newSpy = spyOn(bourbonService, 'getReviewsOnBourbon').and.returnValues(of(newreviews));

    let toIncrease: string[] = [];
    component.similarProfiles = toIncrease;
    component.getProfilesWhoDisliked("test");
    expect(component.similarProfiles).toEqual([
      "testPID"
    ])
  });

  it('should getReviewsFromSimilar', () => {
        let newreviews: Review[];
    newreviews = [
      {id: 'test', name: 'tastName', rating: 4.0, taste: 4.5, nose: 3.5, mouthfeel: 3.0,
       value: 2.5, availability: 2.0, content: 'testContent', profile_id: 'testPID', bourbon_id: 'tastName'}
    ]
    let newSpy = spyOn(profileService, 'getReviewsOnProfile').and.returnValues(of(newreviews));

    let toIncrease: string[] = [];
    component.toBourbonIncrease = toIncrease;
    component.getReviewsFromSimilar("test");
    expect(component.toBourbonIncrease).toEqual([
      "tastName"
    ])
  });
  */

  

  

});
