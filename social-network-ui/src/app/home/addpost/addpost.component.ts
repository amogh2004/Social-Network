import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;
import {SharedService} from '../../shared.service';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  constructor(private http: HttpClient,
    private shared : SharedService,
    private router:Router) { }

  ngOnInit(): void {
  }

  postError:String;
  post_image;
  submitPost(form:NgForm){
  
    //request payload
    
    let loc_name= form.value['locName'];
    let loc_desc = form.value['locDesc'];
    let loc_image  =  this.post_image;
    let email = this.shared.signInEmail;
       
    let obj = {
      loc_name:loc_name,
      loc_desc: loc_desc,
      email:email
    }
        //request payload in formdata not object
        let formData = new FormData();
        formData.append('loc_image',loc_image);
        formData.append('loc_name',loc_name);
        formData.append('loc_desc',loc_desc);
        formData.append('email',email.toString());

        this.http.post('http://localhost:3000/api/post/addpost',formData)
        .subscribe((res)=>{
          console.log(res);
          if(res['status']==200)
          {
            this.postError='';
            this.router.navigate(['home'])
          }
          else{
            this.postError = res['data']['message']
          }
          
        })
      
   
    } 
    updateImage(event)
    {
      this.post_image= event.target.files[0];
    }
}

