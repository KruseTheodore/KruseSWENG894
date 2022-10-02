import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { HeaderComponent } from 'src/app/header/header.component';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let toastrService: ToastrService;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocalStorageService, HeaderComponent, { provide: ToastrService, useValue: toastrService }],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should work', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['username'].setValue("testName");
    component.loginForm.controls['password'].setValue("testPass");
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should login', () => {
    component.loginForm.controls['username'].setValue("testName");
    component.loginForm.controls['password'].setValue("testPass");
    component.login();
    expect(component.loginForm.get('username')?.value).toBe("testName");
    expect(component.loginForm.get('password')?.value).toBe("testPass");
  });
});
