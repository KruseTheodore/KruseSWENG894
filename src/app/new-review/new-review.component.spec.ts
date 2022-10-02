import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';

import { NewReviewComponent } from './new-review.component';

describe('NewReviewComponent', () => {
  let component: NewReviewComponent;
  let toastrService: ToastrService;
  const fakeActivatedRoute = {
    snapshot: {
      data: {}
    }
  }as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ NewReviewComponent, {provide: ActivatedRoute, useValue: fakeActivatedRoute},
         LocalStorageService, { provide: ToastrService, useValue: toastrService } ]
    })

    component = TestBed.inject(NewReviewComponent);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
