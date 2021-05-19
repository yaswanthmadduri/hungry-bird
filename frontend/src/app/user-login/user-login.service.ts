import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  baseURL: string = "http://localhost:3000/api";
  noAuthHeader = {headers: new HttpHeaders({'NoAuth' : 'True'})};


  constructor(private httpClientRequest: HttpClient) { }


  // HTTP REQUESTS //

  signinTheUser(authCredentials: any){
    return this.httpClientRequest.post<any>(this.baseURL + '/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.httpClientRequest.get(this.baseURL + '/user-profile');
  }


  // HTTP HELPER METHODS
 setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

}
