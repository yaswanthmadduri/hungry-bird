import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrontPageSignupService {


  baseURL: string = "http://localhost:3000/";//try firebase
  signupUser: string = "api/usersignup/signup";

  constructor( private httpClientRequest: HttpClient ) { }


signupTheUser(signupFormData: any){
  return this.httpClientRequest.post<any>(this.baseURL + this.signupUser, signupFormData);
}

}
