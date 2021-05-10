import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TermsAndconditionsComponent } from './terms-andconditions/terms-andconditions.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HttpClient } from '@angular/common/http';
import { FrontPageSignupService } from './front-page-signup.service'
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-front-page-signup',
  templateUrl: './front-page-signup.component.html',
  styleUrls: ['./front-page-signup.component.css']
})
export class FrontPageSignupComponent implements OnInit {

  userProfileForm: any;
  hidePassword: boolean = true;
  signedupSuccessfully: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private signupService: FrontPageSignupService, private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userProfileForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      termsCheckbox: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });


  }

  /* Opens terms and conditions dialog box */
  openDialogforTermsAndConditions() {
    this.dialog.open(TermsAndconditionsComponent);
  }

  openDialogforAboutUs() {
    this.dialog.open(AboutUsComponent);
  }

  onClickingSignup() {
    this.signedupSuccessfully = false;
    if(this.userProfileForm.value){
      this.signupService.signupTheUser(this.userProfileForm.value).subscribe(
        (response) => {
          console.log("Success, signed up",response);
          this.signedupSuccessfully = true;
          this._snackBar.open('Wow! You are signed up now. You can login to your Hungry Bird account at any time :)','', { duration: 5000 });
        },
        (error) =>{
           console.log("Some error occured", error);
        }
      )
    }
  }
}
