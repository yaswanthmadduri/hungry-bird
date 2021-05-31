import { Component, OnInit } from '@angular/core';
import { UserCartService } from './user-cart.service';
import { UserLoginService } from '../../user-login/user-login.service';
import { Router } from '@angular/router';
import { HomePageComponent } from '../home-page.component';
@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  constructor(private homepageComponent : HomePageComponent, private router: Router, private userLoginService: UserLoginService, private userCartService : UserCartService) { }

  ngOnInit(): void {
    this.getCart();
  }

  cartItems : any;
  userCart : any = this.homepageComponent.usercart;
  userprofile = this.homepageComponent.userProfile;
  getCart() {
    if (this.userLoginService.isLoggedIn()) {
      this.userCartService.getcartService(this.homepageComponent.userDetails.email).subscribe(
        (response: any) => {
          this.cartItems = response;
          console.log(this.cartItems);
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
}
