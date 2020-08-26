import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;
import {SharedService} from '../../shared.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private http: HttpClient,
    private shared : SharedService,
    private router:Router) { 
      this.shared.signInEmail='';
      this.shared.isSignIn=false;
      this.shared.clearAuthUser();
    }

  ngOnInit():void {
  }
  email : string;
  password : string;
  passwordError :string='';
  signIn(){
    if(this.email && this.password)
    {
      // //call the api
      
      //preparing the req body object to api
     let reqobj={
       email : this.email,
       password : this.password,
      }


      this.http.post('http://localhost:3000/api/auth/signin',reqobj)
      .subscribe((res)=>{
        console.log(res);
        if(res['status']==404)
        {
          this.passwordError=res['message']
        }
        if(res['status']==200)
        {
          this.passwordError='';
          this.shared.isSignIn = true;
          this.shared.signInEmail = res['email'];
          this.shared.setAuthUser(res['email']);
          console.log(this.shared.signInEmail);
          this.router.navigate(['home'])
        }
        
        
      })
    }
    else{
      alert("Enter all the fields");
      //inform to user using alert popup
    }

  }

  
}
