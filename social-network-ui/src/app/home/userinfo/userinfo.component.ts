import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;
import {SharedService} from '../../shared.service';
import {Router} from '@angular/router';
import { HttpParams } from "@angular/common/http";
@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  readUserArr=[]
  user_image:any;
  constructor(private http: HttpClient,
    private shared : SharedService,
    private router:Router,) {

    const params=new HttpParams()
    .set('email',this.shared.signInEmail);
    let link= 'http://localhost:3000/api/auth/'
    this.http.get(link,{params})
    .subscribe((res)=>{
      if(res['status']==200)
      {
        this.readUserArr= res['data'];
        console.log(this.readUserArr[0]);
        console.log(this.shared.user_image);
        
      }
      
    })
    
     
    }
    

  ngOnInit() {

    

  }

}
