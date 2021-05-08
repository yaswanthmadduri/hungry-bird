import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-front-page-signup',
  templateUrl: './front-page-signup.component.html',
  styleUrls: ['./front-page-signup.component.css']
})
export class FrontPageSignupComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  userProfileForm = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(4)]],
    emailId: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.min(10), Validators.max(10)]],
    password: ['', [Validators.minLength(6), Validators.maxLength(15)]]
  });

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  onClickingSignup() {
    console.log(this.userProfileForm.value, this.emailFormControl.value);
  }

}
