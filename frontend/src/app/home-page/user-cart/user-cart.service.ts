import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserCartService {

  constructor(private httpClientRequest: HttpClient) { }

  
  baseURL: string = "http://localhost:3000/api";
  noAuthHeader = {headers: new HttpHeaders({'NoAuth' : 'True'})};
}
