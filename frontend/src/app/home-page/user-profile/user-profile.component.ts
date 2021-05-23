import { Component, OnInit } from '@angular/core';
import { HomePageComponent } from '../home-page.component';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private homepageComponent : HomePageComponent) { }

  ngOnInit(): void {
  }
userProfile = this.homepageComponent.userProfile;
userName: String = "";
emailId: String = "";
phoneNumber: Number = 0;
DOB: any;
Gender: String = "";
edit: Boolean = true;
save: Boolean = false;

editDetails(){
  this.edit = false;
  this.save = true;
}
saveDetails(){
  this.edit = true;
  this.save = false;
}

}
