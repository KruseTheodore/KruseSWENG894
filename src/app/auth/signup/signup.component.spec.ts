import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let toastrService: ToastrService;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocalStorageService, { provide: ToastrService, useValue: toastrService }],
      declarations: [ SignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    component.signupForm.controls['username'].setValue("testName");
    component.signupForm.controls['password'].setValue("testPass");
    component.signup();
    expect(component.signupForm.get('username')?.value).toBe("testName");
    expect(component.signupForm.get('password')?.value).toBe("testPass");
  });
});
