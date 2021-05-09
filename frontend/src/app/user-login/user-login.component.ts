import { Component, OnInit } from '@angular/core';
import { AboutUsComponent } from '../front-page-signup/about-us/about-us.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogforAboutUs(){
    this.dialog.open(AboutUsComponent);
  }


}
