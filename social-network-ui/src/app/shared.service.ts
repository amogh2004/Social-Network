import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isSignIn:boolean=false;
  signInEmail : string;
  allPost : any;
  allUser:any;

  
  private subject = new Subject<any>();
  
  setAuthUser(email:string){

    this.subject.next({auth:email})

  }

  getAuthUser(){
    return this.subject.asObservable();
  }

  clearAuthUser(){
    this.subject.next();
  }
  constructor() { }
  
}
