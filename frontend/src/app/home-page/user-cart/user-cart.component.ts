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

  constructor(private homepageComponent : HomePageComponent) { }

  ngOnInit(): void {

    this.justafunction();
  }

  userCart : any = this.homepageComponent.usercart;

  justafunction(){
    for(let i = 0; i< this.userCart.length; i++){
      console.log(i, this.userCart[i])
    }
  }
}
