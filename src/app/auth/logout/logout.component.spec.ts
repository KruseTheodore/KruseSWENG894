import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { HeaderComponent } from 'src/app/header/header.component';
import { AuthService } from '../shared/auth.service';

import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let fixture: ComponentFixture<LogoutComponent>;
  let authService: AuthService;
  let localstorage: LocalStorageService;
  let httpController: HttpTestingController;
  let routerStub = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocalStorageService, HeaderComponent, AuthService,
       { provide: ToastrService, useValue: toastrService }, {provide: Router, useValue: routerStub}],
      declarations: [ LogoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutComponent);
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

  it('should logout', () => {
    let newSpy = spyOn(authService, 'logout').and.returnValues(of({
      result : {
         httpStatus : 200
      }
    }));
    component.logout();
    expect(newSpy).toHaveBeenCalled();
  });

});
