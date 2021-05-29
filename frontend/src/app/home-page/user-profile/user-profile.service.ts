import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private httpClientRequest: HttpClient) { }

  baseURL: string = "http://localhost:3000/api/";
  updateProfilePic : String = "user-info/update-profile-picture/"

  postProfilePicService(ImageFormData: FormData, email : String){
    return this.httpClientRequest.put<any>(this.baseURL + this.updateProfilePic + email, ImageFormData,{
      reportProgress: true,
      observe: 'events'
    });
  }
  getUserProfilePicService(userEmailId : String){
    return this.httpClientRequest.get(this.baseURL + '/user-info/get-profile-pic/'+userEmailId)
  }

}
