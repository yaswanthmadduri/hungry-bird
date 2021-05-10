import { Component, OnInit } from '@angular/core';
import { AboutUsComponent } from '../front-page-signup/about-us/about-us.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { UserLoginService } from './user-login.service'
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {


  userLoginForm: any;  
  hidePassword: boolean = true;
  loggedinSuccessfully: boolean = false;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private userloginservice: UserLoginService) { }

  ngOnInit(): void {
    this.userLoginForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  }

  openDialogforAboutUs(){
    this.dialog.open(AboutUsComponent);
  }

  onClickingLogin() {
    this.loggedinSuccessfully = false;
    if(this.userLoginForm.value){
      this.userloginservice.signinTheUser(this.userLoginForm.value).subscribe(
        (response) => {console.log("Success, signed in",response)},
        (error) =>{
           console.log("Some error occured", error);
        }
      )
    }
  }


}
