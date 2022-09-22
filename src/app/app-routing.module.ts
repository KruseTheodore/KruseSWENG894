import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BourbonComponent } from './bourbon/bourbon.component';

const routes: Routes = [
  {path: 'bourbon', component: BourbonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
