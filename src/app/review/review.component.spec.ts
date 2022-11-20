import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ReviewService } from '../review.service';
import { Review } from '../review';

import { ReviewComponent } from './review.component';
import { of } from 'rxjs';

describe('ReviewComponent', () => {
  
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  let reviewService: ReviewService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReviewComponent, ReviewService, LocalStorageService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    reviewService = TestBed.inject(ReviewService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getReviews', () => {
    let reviews: Review[];
    reviews = [
      {id: 'test', name: 'testName', rating: 4.0, taste: 4.5, nose: 3.5, mouthfeel: 3.0,
       value: 2.5, availability: 2.0, content: 'testContent', profile_id: 'testPID', bourbon_id: 'testBID'}
    ]
    let newSpy = spyOn(reviewService, 'getReviews').and.returnValues(of(reviews));
    component.getReviews();
    expect(newSpy).toHaveBeenCalled();
  });

  it('should sort by rating', () => {
    let reviews: Review[];
    reviews = [
      {id: 'testID', name: 'testName', rating: 1.0, taste: 1.0, nose: 1.0, mouthfeel: 1.0, value: 1.0, availability: 1.0, content: 'testContent', profile_id: 'testProfile', bourbon_id: 'testBourbon'},
      {id: 'testID1', name: 'testName1', rating: 2.0, taste: 2.0, nose: 2.0, mouthfeel: 2.0, value: 2.0, availability: 2.0, content: 'testContent1', profile_id: 'testProfile1', bourbon_id: 'testBourbon1'},
      {id: 'testID2', name: 'testName2', rating: 3.0, taste: 3.0, nose: 3.0, mouthfeel: 3.0, value: 3.0, availability: 3.0, content: 'testContent2', profile_id: 'testProfile2', bourbon_id: 'testBourbon2'}
    ]
    component.reviews = reviews;
    component.sortReviewsRating();
    expect(component.reviews).toEqual([
      {id: 'testID2', name: 'testName2', rating: 3.0, taste: 3.0, nose: 3.0, mouthfeel: 3.0, value: 3.0, availability: 3.0, content: 'testContent2', profile_id: 'testProfile2', bourbon_id: 'testBourbon2'},
      {id: 'testID1', name: 'testName1', rating: 2.0, taste: 2.0, nose: 2.0, mouthfeel: 2.0, value: 2.0, availability: 2.0, content: 'testContent1', profile_id: 'testProfile1', bourbon_id: 'testBourbon1'},
      {id: 'testID', name: 'testName', rating: 1.0, taste: 1.0, nose: 1.0, mouthfeel: 1.0, value: 1.0, availability: 1.0, content: 'testContent', profile_id: 'testProfile', bourbon_id: 'testBourbon'}      
    ])
  });

  it('should sort by taste', () => {
    let reviews: Review[];
    reviews = [
      {id: 'testID', name: 'testName', rating: 1.0, taste: 1.0, nose: 1.0, mouthfeel: 1.0, value: 1.0, availability: 1.0, content: 'testContent', profile_id: 'testProfile', bourbon_id: 'testBourbon'},
      {id: 'testID1', name: 'testName1', rating: 2.0, taste: 2.0, nose: 2.0, mouthfeel: 2.0, value: 2.0, availability: 2.0, content: 'testContent1', profile_id: 'testProfile1', bourbon_id: 'testBourbon1'},
      {id: 'testID2', name: 'testName2', rating: 3.0, taste: 3.0, nose: 3.0, mouthfeel: 3.0, value: 3.0, availability: 3.0, content: 'testContent2', profile_id: 'testProfile2', bourbon_id: 'testBourbon2'}
    ]
    component.reviews = reviews;
    component.sortReviewsTaste();
    expect(component.reviews).toEqual([
      {id: 'testID2', name: 'testName2', rating: 3.0, taste: 3.0, nose: 3.0, mouthfeel: 3.0, value: 3.0, availability: 3.0, content: 'testContent2', profile_id: 'testProfile2', bourbon_id: 'testBourbon2'},
      {id: 'testID1', name: 'testName1', rating: 2.0, taste: 2.0, nose: 2.0, mouthfeel: 2.0, value: 2.0, availability: 2.0, content: 'testContent1', profile_id: 'testProfile1', bourbon_id: 'testBourbon1'},
      {id: 'testID', name: 'testName', rating: 1.0, taste: 1.0, nose: 1.0, mouthfeel: 1.0, value: 1.0, availability: 1.0, content: 'testContent', profile_id: 'testProfile', bourbon_id: 'testBourbon'}      
    ])
  });

  it('should sort by nose', () => {
    let reviews: Review[];
    reviews = [
      {id: 'testID', name: 'testName', rating: 1.0, taste: 1.0, nose: 1.0, mouthfeel: 1.0, value: 1.0, availability: 1.0, content: 'testContent', profile_id: 'testProfile', bourbon_id: 'testBourbon'},
      {id: 'testID1', name: 'testName1', rating: 2.0, taste: 2.0, nose: 2.0, mouthfeel: 2.0, value: 2.0, availability: 2.0, content: 'testContent1', profile_id: 'testProfile1', bourbon_id: 'testBourbon1'},
      {id: 'testID2', name: 'testName2', rating: 3.0, taste: 3.0, nose: 3.0, mouthfeel: 3.0, value: 3.0, availability: 3.0, content: 'testContent2', profile_id: 'testProfile2', bourbon_id: 'testBourbon2'}
    ]
    component.reviews = reviews;
    component.sortReviewsNose();
    expect(component.reviews).toEqual([
      {id: 'testID2', name: 'testName2', rating: 3.0, taste: 3.0, nose: 3.0, mouthfeel: 3.0, value: 3.0, availability: 3.0, content: 'testContent2', profile_id: 'testProfile2', bourbon_id: 'testBourbon2'},
      {id: 'testID1', name: 'testName1', rating: 2.0, taste: 2.0, nose: 2.0, mouthfeel: 2.0, value: 2.0, availability: 2.0, content: 'testContent1', profile_id: 'testProfile1', bourbon_id: 'testBourbon1'},
      {id: 'testID', name: 'testName', rating: 1.0, taste: 1.0, nose: 1.0, mouthfeel: 1.0, value: 1.0, availability: 1.0, content: 'testContent', profile_id: 'testProfile', bourbon_id: 'testBourbon'}      
    ])
  });

  it('should sort by mouthfeel', () => {
    let reviews: Review[];
    reviews = [
      {id: 'testID', name: 'testName', rating: 1.0, taste: 1.0, nose: 1.0, mouthfeel: 1.0, value: 1.0, availability: 1.0, content: 'testContent', profile_id: 'testProfile', bourbon_id: 'testBourbon'},
      {id: 'testID1', name: 'testName1', rating: 2.0, taste: 2.0, nose: 2.0, mouthfeel: 2.0, value: 2.0, availability: 2.0, content: 'testContent1', profile_id: 'testProfile1', bourbon_id: 'testBourbon1'},
      {id: 'testID2', name: 'testName2', rating: 3.0, taste: 3.0, nose: 3.0, mouthfeel: 3.0, value: 3.0, availability: 3.0, content: 'testContent2', profile_id: 'testProfile2', bourbon_id: 'testBourbon2'}
    ]
    component.reviews = reviews;
    component.sortReviewsMouthfeel();
    expect(component.reviews).toEqual([
      {id: 'testID2', name: 'testName2', rating: 3.0, taste: 3.0, nose: 3.0, mouthfeel: 3.0, value: 3.0, availability: 3.0, content: 'testContent2', profile_id: 'testProfile2', bourbon_id: 'testBourbon2'},
      {id: 'testID1', name: 'testName1', rating: 2.0, taste: 2.0, nose: 2.0, mouthfeel: 2.0, value: 2.0, availability: 2.0, content: 'testContent1', profile_id: 'testProfile1', bourbon_id: 'testBourbon1'},
      {id: 'testID', name: 'testName', rating: 1.0, taste: 1.0, nose: 1.0, mouthfeel: 1.0, value: 1.0, availability: 1.0, content: 'testContent', profile_id: 'testProfile', bourbon_id: 'testBourbon'}      
    ])
  });

  it('should sort by value', () => {
    let reviews: Review[];
    reviews = [
      {id: 'testID', name: 'testName', rating: 1.0, taste: 1.0, nose: 1.0, mouthfeel: 1.0, value: 1.0, availability: 1.0, content: 'testContent', profile_id: 'testProfile', bourbon_id: 'testBourbon'},
      {id: 'testID1', name: 'testName1', rating: 2.0, taste: 2.0, nose: 2.0, mouthfeel: 2.0, value: 2.0, availability: 2.0, content: 'testContent1', profile_id: 'testProfile1', bourbon_id: 'testBourbon1'},
      {id: 'testID2', name: 'testName2', rating: 3.0, taste: 3.0, nose: 3.0, mouthfeel: 3.0, value: 3.0, availability: 3.0, content: 'testContent2', profile_id: 'testProfile2', bourbon_id: 'testBourbon2'}
    ]
    component.reviews = reviews;
    component.sortReviewsValue();
    expect(component.reviews).toEqual([
      {id: 'testID2', name: 'testName2', rating: 3.0, taste: 3.0, nose: 3.0, mouthfeel: 3.0, value: 3.0, availability: 3.0, content: 'testContent2', profile_id: 'testProfile2', bourbon_id: 'testBourbon2'},
      {id: 'testID1', name: 'testName1', rating: 2.0, taste: 2.0, nose: 2.0, mouthfeel: 2.0, value: 2.0, availability: 2.0, content: 'testContent1', profile_id: 'testProfile1', bourbon_id: 'testBourbon1'},
      {id: 'testID', name: 'testName', rating: 1.0, taste: 1.0, nose: 1.0, mouthfeel: 1.0, value: 1.0, availability: 1.0, content: 'testContent', profile_id: 'testProfile', bourbon_id: 'testBourbon'}      
    ])
  });

  it('should sort by availability', () => {
    let reviews: Review[];
    reviews = [
      {id: 'testID', name: 'testName', rating: 1.0, taste: 1.0, nose: 1.0, mouthfeel: 1.0, value: 1.0, availability: 1.0, content: 'testContent', profile_id: 'testProfile', bourbon_id: 'testBourbon'},
      {id: 'testID1', name: 'testName1', rating: 2.0, taste: 2.0, nose: 2.0, mouthfeel: 2.0, value: 2.0, availability: 2.0, content: 'testContent1', profile_id: 'testProfile1', bourbon_id: 'testBourbon1'},
      {id: 'testID2', name: 'testName2', rating: 3.0, taste: 3.0, nose: 3.0, mouthfeel: 3.0, value: 3.0, availability: 3.0, content: 'testContent2', profile_id: 'testProfile2', bourbon_id: 'testBourbon2'}
    ]
    component.reviews = reviews;
    component.sortReviewsAvail();
    expect(component.reviews).toEqual([
      {id: 'testID2', name: 'testName2', rating: 3.0, taste: 3.0, nose: 3.0, mouthfeel: 3.0, value: 3.0, availability: 3.0, content: 'testContent2', profile_id: 'testProfile2', bourbon_id: 'testBourbon2'},
      {id: 'testID1', name: 'testName1', rating: 2.0, taste: 2.0, nose: 2.0, mouthfeel: 2.0, value: 2.0, availability: 2.0, content: 'testContent1', profile_id: 'testProfile1', bourbon_id: 'testBourbon1'},
      {id: 'testID', name: 'testName', rating: 1.0, taste: 1.0, nose: 1.0, mouthfeel: 1.0, value: 1.0, availability: 1.0, content: 'testContent', profile_id: 'testProfile', bourbon_id: 'testBourbon'}      
    ])
  });



});
