import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BourbonComponent } from './bourbon/bourbon.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  {path: 'bourbon', component: BourbonComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'info', component: InfoComponent},
  {path: 'review', component: ReviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
