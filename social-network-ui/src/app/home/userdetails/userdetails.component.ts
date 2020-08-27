import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {SharedService} from '../../shared.service';
@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit,OnChanges {
  @Input()
  readUserInput
  userArr=[]

  constructor(private shared : SharedService) { }
  

  ngOnInit() {
    // this.userArr = [
    //   {
    //     id:'1',
    //     image:'../../../assets/person.svg',
    //     userName:'Sid',
    //     userBio:'This is my bio' 
    //   },

    //   {
    //     id:'1',
    //     image:'../../../assets/person.svg',
    //     userName:'Sam',
    //     userBio:'This is my bio' 
    //   },

    // ]
  }
  ngOnChanges()
  {
    this.userArr = this.readUserInput;
    console.log("user details component");
    console.log( this.userArr );
  }
}
