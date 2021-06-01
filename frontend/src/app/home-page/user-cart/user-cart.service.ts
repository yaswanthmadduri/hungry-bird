import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserCartService {

  constructor(private httpClientRequest: HttpClient) { }


  baseURL: string = "http://localhost:3000/api";
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  getUserProfile() {
    return this.httpClientRequest.get(this.baseURL + '/user-profile');
  }

  getcartService(userEmailId: any) {
    return this.httpClientRequest.get(this.baseURL + '/user-info/get-cart/' + userEmailId)
  }

  deleteItemService(userEmailId: String, itemName: any) {
    console.log(userEmailId, itemName)
    return this.httpClientRequest.put<any>("http://localhost:3000/api/user/deletefromcart/"+userEmailId, itemName);
  }
  increaseQuantityService(userEmailId: String, itemName: any) {
    return this.httpClientRequest.put<any>("http://localhost:3000/api/user/increasequantity/"+userEmailId, itemName);
  }
  decreaseQuantityService(userEmailId: String, itemName: any) {
    return this.httpClientRequest.put<any>("http://localhost:3000/api/user/decreasequantity/"+userEmailId, itemName);
  }


}
