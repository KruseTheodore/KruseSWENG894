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


});
