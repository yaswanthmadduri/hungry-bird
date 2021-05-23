import { Component, OnInit } from '@angular/core';
import { UserLoginService } from '../user-login/user-login.service';
import { Router } from '@angular/router';
import { HomePageService } from './home-page.service'
import { UserCartComponent } from './user-cart/user-cart.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  userDetails: any;
  userProfile: any;
  usercart: any;
  showUserProfile: boolean = false;
  showCart: boolean = false;

  constructor(private userLoginService: UserLoginService, private router: Router, private homePageService : HomePageService) { }


  ngOnInit(): void {
    this.homePageService.getUserProfile().subscribe(
      (res: any) => {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);
      }
    );

  }

  onLogout() {
    this.userLoginService.deleteToken();
    this.router.navigateByUrl('/signup');
  }

  getProfile() {
    if (this.userLoginService.isLoggedIn()) {

      this.showCart = false;

      this.homePageService.getUserProfile().subscribe(
        (response : any)=>{

          this.showUserProfile = true;
          console.log(response);
          this.userProfile = response.user;
        },
        (error)=>{
          console.log("Some error occured", error.error.message);
        }
      )
    }
    else {
      this.showUserProfile = false;
      this.router.navigateByUrl('/signup');
    }
/*     if (this.userLoginService.isLoggedIn()) {
      this.router.navigateByUrl('/home-page/user-profile');
    }
    else{
      this.router.navigateByUrl('/signup');
    } */

  }

  getCartItems(){

   /*  if (this.userLoginService.isLoggedIn()) {
      this.router.navigateByUrl('/home-page/cart');
    }
    else{
      this.router.navigateByUrl('/signup');
    } */
    if (this.userLoginService.isLoggedIn()) {
      this.showUserProfile = false;
      this.homePageService.getCartItemsService().subscribe(
        (response : any)=>{
          this.showCart = true;
          console.log(response);
          this.usercart = response;
        },
        (error)=>{
          console.log("Some error occured", error.error.message);
        }
      )
    }
    else {
      this.showCart = false;
      this.router.navigateByUrl('/signup');
    }
  }
}
