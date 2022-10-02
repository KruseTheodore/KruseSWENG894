import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ReviewService } from '../review.service';
import { Review } from '../review';

import { ReviewComponent } from './review.component';

describe('ReviewComponent', () => {
  
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReviewComponent, ReviewService, LocalStorageService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getReviews', () => {
    spyOn(component, "getReviews");
    component.getReviews();
    expect(component.getReviews).toHaveBeenCalled();
  });


});
