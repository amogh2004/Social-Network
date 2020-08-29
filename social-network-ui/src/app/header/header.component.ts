import { Component, OnInit } from '@angular/core';
import {SharedService} from './../shared.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isSignIn = this.shared.isSignIn;
  email  : string;
  user_image : any;
  constructor(private shared:SharedService) {
    console.log("header component constructor")
  
    this.shared.getAuthUser()
    .subscribe((user)=>{
      if(user){
          this.email =  user.auth;
          console.log(this.email);
          
          if(this.email){
            this.isSignIn = true;
          }
      }
      else{
        this.isSignIn = false;
      }
    })
    this.shared.getUserImage()
    .subscribe((image)=>{
    if(image){
          this.user_image=image.authh;
          console.log(this.user_image);
              }
          })
    
   }

  ngOnInit() {
  }

}
