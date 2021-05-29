import { Component, OnInit } from '@angular/core';
import { HomePageComponent } from '../home-page.component';
import { UserProfileService } from './user-profile.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserLoginService } from 'src/app/user-login/user-login.service';
import { HttpEventType } from '@angular/common/http'
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private homepageComponent: HomePageComponent, private userProfileService: UserProfileService, private _snackBar: MatSnackBar,
    private router: Router, private userLoginService: UserLoginService) { }

  ngOnInit(): void {
    this.getProfilePic();
  }


  userProfile = this.homepageComponent.userProfile;
  userName: String = "";
  emailId: String = "";
  phoneNumber: Number = 0;
  DOB: any;
  Gender: String = "";
  edit: Boolean = true;
  userGender: string = "";
  genders: string[] = ['Male', 'Female', 'Non-Binary'];
  selectedImage: any;
  uploadpercentage: any;
  progressbar: Boolean = false;
  profilepic: any;
  profilepiclink:any;
  editDetails() {
    this.edit = false;
  }



  //// displaying the profile picture

  getProfilePic() {
    if (this.userLoginService.isLoggedIn()) {
      this.userProfileService.getUserProfilePicService(this.userProfile.email).subscribe(
        (response: any) => {
          this.profilepic = response.PictureLink;
          this.profilepiclink = 'http://localhost:3000/'+this.profilepic;
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

  ///updating the profile picture
  onImageSelected(event: any) {
    this.selectedImage = <File>event.target.files[0];
    const fd = new FormData();
    fd.append('profilePicture', this.selectedImage);
    if (this.userLoginService.isLoggedIn()) {
      this.userProfileService.postProfilePicService(fd, this.userProfile.email).subscribe(
        (events: any) => {
          if (events.type === HttpEventType.UploadProgress) {
            this.progressbar = true;
            console.log("Uploaded percentage = " + Math.round(events.loaded / events.total * 100) + "%")
            this.uploadpercentage = (events.loaded / events.total * 100);
            this._snackBar.open('Your profile pic updated 😀😀😀', 'Great', {
              duration: 5000,
              horizontalPosition: 'left',
              verticalPosition: 'bottom'
            });
            this.progressbar = false;
            //getting the pic back from the backend
            this.getProfilePic();
          }
          else if (events.type = HttpEventType.Response) {
            console.log(events);
          }

        },
        (error) => {
          console.log("Some error occured", error);
          this._snackBar.open('🙄🙄😶 Upload a pic of size below 3MB ', 'It\'s okay', {
            duration: 5000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
          });

        }
      )
      this.profilepic = this.homepageComponent.profilepicInfo;
      console.log(this.profilepic)
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

}
