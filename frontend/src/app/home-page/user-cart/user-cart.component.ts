import { Component, OnInit } from '@angular/core';
import { UserCartService } from './user-cart.service';
import { UserLoginService } from '../../user-login/user-login.service';
import { Router } from '@angular/router';
import { HomePageComponent } from '../home-page.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  constructor(private homepageComponent: HomePageComponent, private router: Router, private userLoginService: UserLoginService, private userCartService: UserCartService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userCartService.getUserProfile().subscribe(
      (res: any) => {
        this.userDetails = res['user'];
        this.loadCartItems();
      },
      err => {
        console.log(err);
      }
    );
  }

  cartItems: any;
  userCart: any = this.homepageComponent.usercart;
  userprofile = this.homepageComponent.userProfile;
  itemDetails: any;
  userDetails: any;
  cartItemsExist : boolean = false;



  ///load user details
  loadUserDetails() {
    this.userCartService.getUserProfile().subscribe(
      (res: any) => {
        this.userDetails = res['user'];
        console.log('loaded cart')
      },
      err => {
        console.log(err);
      }
    );
  }



  ///load cart
  loadCartItems() {
    if (this.userLoginService.isLoggedIn()) {
      this.userCartService.getcartService(this.userDetails.email).subscribe(
        (response: any) => {
          this.cartItems = response;
          if(this.cartItems.length == 0){
            this.cartItemsExist = false
          }
          else{
            this.cartItemsExist = true;
          }
        },
        (error) => {
          console.log("Some error occured while getting your pic", error.error.message);
        }
      )
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }



  ///delete item from user cart
  deleteItemFromCart(item: any) {
    console.log(item);
    if (this.userLoginService.isLoggedIn()) {

      this.userCartService.deleteItemService(this.userDetails.email, item).subscribe(
        (response) => {
          this._snackBar.open(item.itemName + ' is deleted from your cart successfully ' +' 🚮 ' , '', { duration: 6000 });
          this.ngOnInit();/// calling the on init function, hence, reloading the page
        },
        (error) => {
          console.log("Some error occured", error);
          this._snackBar.open('Some error occured. Perhaps item is not deleted from the cart!', '', {
            duration: 5000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
          });

        }
      )
    }
  }


  increaseQuantity(item: any) {
    console.log(item);
    if (this.userLoginService.isLoggedIn()) {

      this.userCartService.increaseQuantityService(this.userDetails.email, item).subscribe(
        (response) => {
          this.ngOnInit();/// calling the on init function, hence, reloading the page
          this._snackBar.open(item.itemName + ' quantity increased by 1', '', { duration: 6000 });
        },
        (error) => {
          console.log("Some error occured", error);
          this._snackBar.open('Some error occured. Perhaps quantity is not increased!', '', {
            duration: 5000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
          });

        }
      )
    }
  }

  decreaseQuantity(item: any) {
    if (this.userLoginService.isLoggedIn()) {

      this.userCartService.decreaseQuantityService(this.userDetails.email, item).subscribe(
        (response) => {
          this.ngOnInit();/// calling the on init function, hence, reloading the page
          this._snackBar.open(item.itemName + ' quantity decreased by 1', '', { duration: 6000 });
        },
        (error) => {
          console.log("Some error occured", error);
          this._snackBar.open('Some error occured. Perhaps quantity is not decreased!', '', {
            duration: 5000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
          });

        }
      )
    }
    
  }

  onLogout() {
    this.userLoginService.deleteToken();
    this.router.navigateByUrl('/login');
  }
  
  goToHomePage(){
    this.router.navigateByUrl('/home-page');
  }

















}
