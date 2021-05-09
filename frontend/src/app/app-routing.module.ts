import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageSignupComponent } from './front-page-signup/front-page-signup.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  { path: 'landing-page', component: FrontPageSignupComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'homepage', component: HomePageComponent},
  { path: '', redirectTo: '/landing-page', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
