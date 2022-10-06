import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { of } from 'rxjs';
import { HeaderComponent } from 'src/app/header/header.component';
import { AuthService } from '../shared/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let routerStub = { navigate: jasmine.createSpy('navigate') };
  let localstorage: LocalStorageService;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocalStorageService, HeaderComponent, { provide: ToastrService, useValue: toastrService },
      {provide: Router, useValue: routerStub}],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
    localstorage = TestBed.inject(LocalStorageService);

    let spy = spyOn<LocalStorageService, any>(localstorage, 'retrieve').and.callFake(function(){
      return 'test';
    });

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

  it('should login', () => {
    let newSpy = spyOn(authService, 'login').and.returnValues(of({
      result : {
         httpStatus : 200
      }
    }));
    component.login();
    expect(newSpy).toHaveBeenCalled();
  });
});
