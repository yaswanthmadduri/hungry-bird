import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private httpClientRequest: HttpClient) { }


  baseURL = "http://localhost:3000/api";
  
}
