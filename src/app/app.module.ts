import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BourbonComponent } from './bourbon/bourbon.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { TokenInterceptor } from './token-interceptor';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { ReviewComponent } from './review/review.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { NewReviewComponent } from './new-review/new-review.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewBourbonComponent } from './new-bourbon/new-bourbon.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BourbonComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    InfoComponent,
    ReviewComponent,
    LogoutComponent,
    NewReviewComponent,
    NewBourbonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
