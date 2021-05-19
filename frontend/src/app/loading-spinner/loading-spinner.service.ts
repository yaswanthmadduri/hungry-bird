import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

  private count = 0;
  private spinnerObservable = new BehaviorSubject<string>('');

  constructor() { }
  getSpinnerObserver(): Observable<string> {
    return this.spinnerObservable.asObservable();
  }

  requestStarted(){
    if(++this.count === 1){
      this.spinnerObservable.next('start'); 
      console.log("spinner started")
    }
  }

  requestEnded(){
    if(this.count === 0 || --this.count === 0){
      this.spinnerObservable.next('stop'); 
      console.log("spinner stopped")
    }
  }

  spinnerReset(){
    this.count = 0;
    this.spinnerObservable.next('stop');
    console.log("spinner resetted")
  }
}
