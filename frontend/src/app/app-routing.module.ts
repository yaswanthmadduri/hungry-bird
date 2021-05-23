import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageSignupComponent } from './front-page-signup/front-page-signup.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './auth/auth.guard';
import { UserProfileComponent } from './home-page/user-profile/user-profile.component';
import { UserCartComponent } from './home-page/user-cart/user-cart.component';
const routes: Routes = [
  { path: 'signup', component: FrontPageSignupComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'home-page', component: HomePageComponent, canActivate:[AuthGuard]},
  { path: 'home-page/user-profile', component: UserProfileComponent, canActivate:[AuthGuard]},
  { path: 'home-page/cart', component: UserCartComponent, canActivate:[AuthGuard]},
  
  { path: '', redirectTo: 'signup', pathMatch:'full'},
  {path: 'page-not-found', component: NotfoundComponent},
  {path: '**', redirectTo: '/page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
