import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { of } from 'rxjs';
import { AuthService } from '../shared/auth.service';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: AuthService;
  let routerStub = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocalStorageService, AuthService, { provide: ToastrService, useValue: toastrService },
        {provide: Router, useValue: routerStub}],
      declarations: [ SignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should work', () => {
    expect(component.signupForm.valid).toBeFalsy();
    component.signupForm.controls['username'].setValue("testName");
    component.signupForm.controls['password'].setValue("testPass");
    expect(component.signupForm.valid).toBeTruthy();
  });

  it('should signup', () => {
    let newSpy = spyOn(authService, 'checkUser').and.returnValues(of(true));
    let newSpy2 = spyOn(authService, 'signup').and.returnValues(of({
      result : {
         httpStatus : 200
      }
    }));
    component.signupForm.controls['username'].setValue("testName");
    component.signupForm.controls['password'].setValue("testPass");
    component.signup();
    expect(component.signupForm.get('username')?.value).toBe("testName");
    expect(component.signupForm.get('password')?.value).toBe("testPass");
  });

  it('should fail signup username taken', () => {
    let newSpy = spyOn(authService, 'checkUser').and.returnValues(of(false));
    let newSpy2 = spyOn(authService, 'signup').and.returnValues(of({
      result : {
         httpStatus : 200
      }
    }));
    component.signupForm.controls['username'].setValue("testName");
    component.signupForm.controls['password'].setValue("testPass");
    component.signup();
    expect(component.signupForm.get('username')?.value).toBe("testName");
    expect(component.signupForm.get('password')?.value).toBe("testPass");
  });


});
