import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FrontPageSignupComponent } from './front-page-signup.component';

@Injectable({
  providedIn: 'root'
})
export class FrontPageSignupService {


  baseURL: string = "http://localhost:3000/";


  constructor( private http: HttpClient ) { }

  


}
