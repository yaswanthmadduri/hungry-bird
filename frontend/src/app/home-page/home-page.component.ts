import { Component, OnInit } from '@angular/core';
import { UserLoginService } from '../user-login/user-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  userDetails: any;
  showUserProfile: boolean = false;
  showCart: boolean = false;

  constructor(private userLoginService: UserLoginService, private router: Router) { }

  ngOnInit(): void {
    this.userLoginService.getUserProfile().subscribe(
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

  onClickingProfile() {
    if (this.userLoginService.isLoggedIn()) {

      this.showCart = false;
      this.showUserProfile = true;
    }
    else {
      this.showUserProfile = false;
    }
  }

  onClickingCart() {
    if (this.userLoginService.isLoggedIn()) {

      this.showUserProfile = false;
      this.showCart = true;
    }
    else {
      this.showCart = false;
    }
  }



}
