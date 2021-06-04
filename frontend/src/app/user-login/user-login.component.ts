import { Component, OnInit } from '@angular/core';
import { AboutUsComponent } from '../front-page-signup/about-us/about-us.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { UserLoginService } from './user-login.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {


  userLoginForm: any;
  hidePassword: boolean = true;
  loggedinSuccessfully: boolean = false;
  serverErrorMessage : String = "";

  constructor(public dialog: MatDialog,private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private userloginservice: UserLoginService, private router: Router) { }

  ngOnInit(): void {
    this.userLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });


    if(this.userloginservice.isLoggedIn()){
      this.router.navigateByUrl('/home-page');
    }
  }

  openDialogforAboutUs() {
    this.dialog.open(AboutUsComponent);
  }

  onClickingLogin() {
    this.loggedinSuccessfully = false;
    if (this.userLoginForm.value) {
      this.userloginservice.signinTheUser(this.userLoginForm.value).subscribe(
        (response : any) => {
          this.loggedinSuccessfully = true;
          this.userloginservice.setToken(response['token']);
          this.router.navigateByUrl('/home-page');
        },
        (error) => {
          this.loggedinSuccessfully = false;
          this.serverErrorMessage = error.error.message;
          this._snackBar.open('This e-mail is not registered with HungryBird!! Please Signup 😑😑😐', '', {
            duration: 5000
          });
          this.router.navigateByUrl('/signup');
          console.log("Some error occured", this.serverErrorMessage);
        }
      )
    }
  }


}
