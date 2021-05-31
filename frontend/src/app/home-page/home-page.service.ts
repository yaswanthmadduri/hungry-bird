import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private httpClientRequest: HttpClient) { }

  baseURL: string = "http://localhost:3000/api/";
  noAuthHeader = {headers: new HttpHeaders({'NoAuth' : 'True'})};


  getUserProfile() {
    return this.httpClientRequest.get(this.baseURL + '/user-profile');
  }


  getCartItemsService(){
    return this.httpClientRequest.get(this.baseURL+ '/user/cart/foodincart');
  }

  getUserProfilePicService(userEmailId : String){
    return this.httpClientRequest.get(this.baseURL + '/user-info/get-profile-pic/'+userEmailId)
  }

  getItemsInRestaurantService(){
    return this.httpClientRequest.get(this.baseURL + '/restaurant/available-food-items')
  }

  additemtocartService(itemdetails: any, userEmailId : String){
    console.log(JSON.stringify(itemdetails)+"in service")
    
    return this.httpClientRequest.put<any>("http://localhost:3000/api/user/"+userEmailId+"/addtocart", JSON.stringify(itemdetails), {'headers': { 'content-type': 'application/json'}  });
  }


}
