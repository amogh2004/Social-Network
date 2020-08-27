import { Component, OnInit, Input, OnChanges, ɵɵNgOnChangesFeature } from '@angular/core';
import {SharedService} from '../../shared.service';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-readpost',
  templateUrl: './readpost.component.html',
  styleUrls: ['./readpost.component.css']
})
export class ReadpostComponent implements OnInit,OnChanges {
  @Input()
  readPostInput
  readPostArr = []

  constructor(private shared:SharedService,
              private http: HttpClient) { }
  postimage='../../../assets/him.jpg';
  ngOnInit() {
    
    // this.readPostArr = [
    //   {
    //     id:'1',
    //     postimage:'../../../assets/him.jpg',
    //     postTitle:'A Trip to Himalayas',
    //     postDecs:'Himalayas is beautiful',
    //     postUser:'Sid',
    //     postLikes:'150',
    //     postDislikes:'10'
    //   },

    //   {
    //     id:'1',
    //     postimage:'../../../assets/him.jpg',
    //     postTitle:'A Trip to Himalayas',
    //     postDecs:'Himalayas is beautiful',
    //     postUser:'Sid',
    //     postLikes:'150',
    //     postDislikes:'10'
    //   },

    //   {
    //     id:'1',
    //     postimage:'../../../assets/him.jpg',
    //     postTitle:'A Trip to Himalayas',
    //     postDecs:'Himalayas is beautiful',
    //     postUser:'Sid',
    //     postLikes:'150',
    //     postDislikes:'10'
    //   },
      

    // ]
  }

  ngOnChanges(){
    this.readPostArr =this.readPostInput;
    console.log("read post component");
    console.log(this.readPostArr);
  }
  addvote(vote:boolean,post_id:any){

    let reqobj={
      post_id : post_id,
      email : this.shared.signInEmail,
      vote : vote
    }
    //like or dislike the post
    this.http.post('http://localhost:3000/api/vote/add',reqobj)
    .subscribe((res)=>{
      if(res['status']==200){
        //get all post
        this.http.get('http://localhost:3000/api/post/')
        .subscribe((res)=>{
          if(res['status']==200)
          {
            console.log(res);
            this.readPostArr= res['data']
    
          }
          
        })
      }

    })


  }
}
