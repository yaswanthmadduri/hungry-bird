import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrontPageSignupService {


  baseURL: string = "http://localhost:3000/users";


  constructor( private httpClientRequest: HttpClient ) { }


signupTheUser(signupFormData: any){
  return this.httpClientRequest.post<any>(this.baseURL, signupFormData);
}

}
