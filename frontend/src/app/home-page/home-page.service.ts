import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private httpClientRequest: HttpClient) { }

  baseURL: string = "/api";
  noAuthHeader = {headers: new HttpHeaders({'NoAuth' : 'True'})};


  getUserProfile() {
    return this.httpClientRequest.get(this.baseURL + '/user-profile');
  }


  getCartItemsService(){
    return this.httpClientRequest.get(this.baseURL+ '/user/cart/foodincart');
  }



}
