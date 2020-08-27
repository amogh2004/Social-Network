import { Component, OnInit } from '@angular/core';
//http service
import {HttpClient} from '@angular/common/http' ;
import { ThrowStmt } from '@angular/compiler';
import {SharedService} from '../../shared.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 //add http service in constructor component class
  constructor(private http: HttpClient,
              private shared : SharedService,
              private router:Router)
               { 
                 
               }

  ngOnInit() {
  }
  name  : string;
  email : string;
  password : string;
  insta_name : string;
  country : string;
  bio : string;
  user_image : any;
  fileName : string;
  showFileName : boolean = false;

  signUp(){
  
  if(this.name && this.email && this.password && this.insta_name && this.country && this.bio)
    {
      // //call the api
      
      //preparing the req body object to api
     let reqobj={
       name : this.name,
       email : this.email,
       password : this.password,
       insta_name : this.insta_name,
       country : this.country,
       bio : this.bio,
       user_image : this.user_image
      }


      this.http.post('http://localhost:3000/api/auth/signup',reqobj)
      .subscribe((res)=>{
        console.log(res);
        this.shared.isSignIn = true;
        this.router.navigate(['home'])
      })
    }
    else{
      alert("Enter all the fields");
      //inform to user using alert popup
    }

  }
  updateImage(event)
  {
    //console.log(event.target.files[0].name);
    this.fileName=event.target.files[0].name;
    this.showFileName=true;
    //converting file to base64 URL
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader);
    reader.onload = ()=>{
      this.user_image= reader.result.toString()
    }
  }
}
