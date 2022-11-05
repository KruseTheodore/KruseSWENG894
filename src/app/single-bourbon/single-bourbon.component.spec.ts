import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Bourbon } from '../bourbon';
import { BourbonService } from '../bourbon.service';
import { Review } from '../review';

import { SingleBourbonComponent } from './single-bourbon.component';

describe('SingleBourbonComponent', () => {
  let component: SingleBourbonComponent;
  let fixture: ComponentFixture<SingleBourbonComponent>;
  let bourbonService: BourbonService;
  let routerStub = { navigate: jasmine.createSpy('navigate') };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: ActivatedRoute, useValue: {snapshot: {queryParamMap: convertToParamMap({name: 'test'})}}},
       BourbonService, {provide: Router, useValue: routerStub}],
      declarations: [ SingleBourbonComponent ]
    })

    fixture = TestBed.createComponent(SingleBourbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    bourbonService = TestBed.inject(BourbonService);


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getBourbon', () => {
    let bourbon: Bourbon= {
      name: "test",
      distil: "testDistil",
      proof: 100.1,
      rating: 4.5
    };
    let newSpy = spyOn(bourbonService, 'getBourbonByName').and.returnValues(of(bourbon));

    component.getBourbon();
    expect(newSpy).toHaveBeenCalled;
    expect(component.bourbon).toEqual(bourbon);
  });

  it('should not getBourbon', () => {

    let newSpy = spyOn(bourbonService, 'getBourbonByName').and.returnValues(throwError(() => new Error("test")));

    component.getBourbon();
    expect(newSpy).toHaveBeenCalled;
  });

  it('should getBourbonReviews', () => {
    let reviews: Review [] = [
      {id: 'test', name: 'testName', rating: 4.0, taste: 4.5, nose: 3.5, mouthfeel: 3.0,
       value: 2.5, availability: 2.0, content: 'testContent', profile_id: 'testPID', bourbon_id: 'testBID'}
    ]
    let newSpy = spyOn(bourbonService, 'getReviewsOnBourbon').and.returnValues(of(reviews));

    component.getReviewsForBourbon();
    expect(newSpy).toHaveBeenCalled;
    expect(component.reviews).toEqual(reviews);
  });

  it('should not getBourbonReviews', () => {
    let newSpy = spyOn(bourbonService, 'getReviewsOnBourbon').and.returnValues(throwError(() => new Error("test")));

    component.getReviewsForBourbon();
    expect(newSpy).toHaveBeenCalled;
  });


});
