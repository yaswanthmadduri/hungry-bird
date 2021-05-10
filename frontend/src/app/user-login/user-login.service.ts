import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  baseURL: string = "http://localhost:3000/users";


  constructor(private httpClientRequest: HttpClient) { }

  signinTheUser(loginFormData: any){
    return this.httpClientRequest.post<any>(this.baseURL, loginFormData);
  }
}
