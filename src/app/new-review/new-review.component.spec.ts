import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { of } from 'rxjs';
import { ReviewService } from '../review.service';

import { NewReviewComponent } from './new-review.component';

describe('NewReviewComponent', () => {
  let component: NewReviewComponent;
  let fixture: ComponentFixture<NewReviewComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let localstorage: LocalStorageService;
  let reviewService: ReviewService;
  let routerStub = { navigate: jasmine.createSpy('navigate') };




  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ NewReviewComponent, {provide: ActivatedRoute, useValue: {snapshot: {queryParamMap: convertToParamMap({name: 'Booker'})}}},
         LocalStorageService, { provide: ToastrService, useValue: toastrService }, ReviewService, {provide: Router, useValue: routerStub} ]
    })

    fixture = TestBed.createComponent(NewReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    reviewService = TestBed.inject(ReviewService);

    localstorage = TestBed.inject(LocalStorageService);

    let spy = spyOn<LocalStorageService, any>(localstorage, 'retrieve').and.callFake(function(){
      return 'test';
    });
    
    

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should work', () => {
    expect(component.reviewForm.valid).toBeFalsy();
    component.reviewForm.controls['name'].setValue("testName");
    component.reviewForm.controls['rating'].setValue(3.0);
    expect(component.reviewForm.valid).toBeTruthy();
  });

  it('should newReview', () => {
    let newSpy = spyOn(reviewService, 'newReview').and.returnValues(of({
      result : {
         httpStatus : 200
      }
    }));
    component.reviewForm.controls['name'].setValue("testName");
    component.reviewForm.controls['rating'].setValue(3.0);
    component.reviewForm.controls['taste'].setValue(3.1);
    component.reviewForm.controls['nose'].setValue(3.2);
    component.reviewForm.controls['mouthfeel'].setValue(3.3);
    component.reviewForm.controls['value'].setValue(3.4);
    component.reviewForm.controls['availability'].setValue(3.5);
    component.reviewForm.controls['content'].setValue("testContent");
    component.newReview();
    expect(component.reviewForm.get('name')?.value).toBe("testName");
    expect(component.reviewForm.get('rating')?.value).toBe(3.0);
    expect(component.reviewForm.get('taste')?.value).toBe(3.1);
    expect(component.reviewForm.get('nose')?.value).toBe(3.2);
    expect(component.reviewForm.get('mouthfeel')?.value).toBe(3.3);
    expect(component.reviewForm.get('value')?.value).toBe(3.4);
    expect(component.reviewForm.get('availability')?.value).toBe(3.5);
    expect(component.reviewForm.get('content')?.value).toBe("testContent");
  });
});
