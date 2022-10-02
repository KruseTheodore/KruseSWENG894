import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from '../auth/shared/auth.service';
import { LocalStorageService } from 'ngx-webstorage';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let authService: AuthService;
  let http: HttpClient;
  let httpController: HttpClientTestingModule;
  let httpHandler: HttpHandler;
  let LSS = LocalStorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, HeaderComponent, LocalStorageService]
    })

    component = TestBed.inject(HeaderComponent);
    authService = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpClientTestingModule);
  });


  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should resetHeader', () => {
    component.resetHeader();
    expect(component).toBeDefined();
  });
});
