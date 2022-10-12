import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowedReviewsComponent } from './followed-reviews.component';

describe('FollowedReviewsComponent', () => {
  let component: FollowedReviewsComponent;
  let fixture: ComponentFixture<FollowedReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowedReviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowedReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
