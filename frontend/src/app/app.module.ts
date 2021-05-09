import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrontPageSignupComponent } from './front-page-signup/front-page-signup.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import{ MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog'




import { TermsAndconditionsComponent } from './front-page-signup/terms-andconditions/terms-andconditions.component';
import { AboutUsComponent } from './front-page-signup/about-us/about-us.component'


@NgModule({
  declarations: [
    AppComponent,
    FrontPageSignupComponent,
    UserLoginComponent,
    HomePageComponent,
    UserCartComponent,
    FoodListComponent,
    TermsAndconditionsComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
