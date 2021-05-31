import { Component, OnInit, Input } from '@angular/core';
import { UserLoginService } from '../user-login/user-login.service';
import { Router } from '@angular/router';
import { HomePageService } from './home-page.service'
import { UserCartComponent } from './user-cart/user-cart.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

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
  profilepicInfo: any;
  restaurantItems: any;
  showHomePage: boolean = true;
  itemdetails: String= "";
  addtocartitem: any;

  constructor(private formBuilder: FormBuilder, private userLoginService: UserLoginService, private router: Router, private homePageService: HomePageService, private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.homePageService.getUserProfile().subscribe(
      (res: any) => {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);
      }
    );
    this.getItemsFromRestaurant();
    this.showHomePage = true;

  }

  onLogout() {
    this.userLoginService.deleteToken();
    this.router.navigateByUrl('/signup');
  }
  ///// get items from restaurant
  getItemsFromRestaurant() {
    if (this.userLoginService.isLoggedIn()) {
      this.homePageService.getItemsInRestaurantService().subscribe(
        (response: any) => {
          this.restaurantItems = response; ////contains data from restaurant
          console.log(this.restaurantItems);
        },
        (error) => {
          console.log("Some error occured while getting items from restaurant", error.error.message);
        }
      )
    }
    else {
      this.showUserProfile = false;
      this.router.navigateByUrl('/login');
    }
  }


  getProfilePic() {
    if (this.userLoginService.isLoggedIn()) {
      this.homePageService.getUserProfilePicService(this.userDetails.email).subscribe(
        (response: any) => {
          this.profilepicInfo = response;
          console.log(this.profilepicInfo);
        },
        (error) => {
          console.log("Some error occured while getting your pic", error.error.message);
        }
      )
    }
    else {
      this.showUserProfile = false;
      this.router.navigateByUrl('/login');
    }
  }
  getProfile() {
    if (this.userLoginService.isLoggedIn()) {

      this.showCart = false;

      this.homePageService.getUserProfile().subscribe(
        (response: any) => {

          this.showUserProfile = true;
          this.showHomePage = false;
          console.log(response);
          this.userProfile = response.user;
        },
        (error) => {
          console.log("Some error occured", error.error.message);
        }
      )
    }
    else {
      this.showUserProfile = false;
      this.showHomePage = true;
      this.router.navigateByUrl('/login');
    }

  }


  addthisitemtocart(item : any) {
    console.log(item);
    this.itemdetails = item;
    if (this.userLoginService.isLoggedIn()) {

      this.homePageService.additemtocartService(this.itemdetails, this.userDetails.email).subscribe(
        (response) => {
          this._snackBar.open('Added successfully 😊', 'Okay', { duration: 5000 });
        },
        (error) => {
          console.log("Some error occured", error);
          this._snackBar.open('Some error occured. Perhaps item is not added to the cart!', 'Okay', {
            duration: 5000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
          });

        }
      )
    }
  }

  getCartItems() {

    /*  if (this.userLoginService.isLoggedIn()) {
       this.router.navigateByUrl('/home-page/cart');
     }
     else{
       this.router.navigateByUrl('/signup');
     } */
    if (this.userLoginService.isLoggedIn()) {
      this.showUserProfile = false;
      this.homePageService.getCartItemsService().subscribe(
        (response: any) => {
          this.showCart = true;
          this.showHomePage = false;
          console.log(response);
          this.usercart = response;
        },
        (error) => {
          console.log("Some error occured", error.error.message);
        }
      )
    }
    else {
      this.showCart = false;
      this.showHomePage = true;
      this.router.navigateByUrl('/signup');
    }
  }





}
