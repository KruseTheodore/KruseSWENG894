import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { of } from 'rxjs';
import { BourbonService } from '../bourbon.service';

import { NewBourbonComponent } from './new-bourbon.component';

describe('NewBourbonComponent', () => {
  let component: NewBourbonComponent;
  let fixture: ComponentFixture<NewBourbonComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let localstorage: LocalStorageService;
  let bourbonService: BourbonService;
  let routerStub = { navigate: jasmine.createSpy('navigate') };
  const fakeActivatedRoute = {
    snapshot: {
      data: {}
    }
  }as ActivatedRoute;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ {provide: ActivatedRoute, useValue: fakeActivatedRoute},
         LocalStorageService, { provide: ToastrService, useValue: toastrService }, BourbonService, {provide: Router, useValue: routerStub} ],
      declarations: [ NewBourbonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBourbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    bourbonService = TestBed.inject(BourbonService);

    localstorage = TestBed.inject(LocalStorageService);

    let spy = spyOn<LocalStorageService, any>(localstorage, 'retrieve').and.callFake(function(){
      return 'test';
    });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should work', () => {
    expect(component.bourbonForm.valid).toBeFalsy();
    component.bourbonForm.controls['name'].setValue("testName");
    component.bourbonForm.controls['distil'].setValue("testDistil");
    component.bourbonForm.controls['proof'].setValue(3.0);
    expect(component.bourbonForm.valid).toBeTruthy();
  });

  it('should newReview', () => {
    let newSpy = spyOn(bourbonService, 'addBourbon').and.returnValues(of({
      result : {
         httpStatus : 200
      }
    }));
    component.bourbonForm.controls['name'].setValue("testName");
    component.bourbonForm.controls['distil'].setValue("testDistil");
    component.bourbonForm.controls['proof'].setValue(3.0);
    component.newBourbon();
    expect(component.bourbonForm.get('name')?.value).toBe("testName");
    expect(component.bourbonForm.get('distil')?.value).toBe("testDistil");
    expect(component.bourbonForm.get('proof')?.value).toBe(3.0);
  });

});
