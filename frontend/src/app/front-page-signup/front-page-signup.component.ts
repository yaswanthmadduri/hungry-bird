import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TermsAndconditionsComponent } from './terms-andconditions/terms-andconditions.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-front-page-signup',
  templateUrl: './front-page-signup.component.html',
  styleUrls: ['./front-page-signup.component.css']
})
export class FrontPageSignupComponent implements OnInit {

  userProfileForm: any;
  hidePassword: boolean = true;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private httpClientRequest: HttpClient
  ) { }

  ngOnInit(): void {
    this.userProfileForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      termsCheckbox: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.maxLength(15)]],
    });


  }



  onClickingSignup() {
    console.log(this.userProfileForm.value, this.userProfileForm.get('fullName').value);
    var signupFormData: any = new FormData();
    signupFormData.append("Name", this.userProfileForm.get('fullName').value);
    signupFormData.append("Email ID", this.userProfileForm.get('emailId').value);
    this.httpClientRequest.post('http://localhost:3000/users', signupFormData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
    console.log(signupFormData)
  }

  /* Opens terms and conditions dialog box */
  openDialogforTermsAndConditions() {
    this.dialog.open(TermsAndconditionsComponent);
  }

  openDialogforAboutUs() {
    this.dialog.open(AboutUsComponent);
  }

}
