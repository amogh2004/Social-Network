import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home/home.component';
import { SigninComponent } from './home/signin/signin.component';
import { SignupComponent } from './home/signup/signup.component';
import { AddpostComponent } from './home/addpost/addpost.component';
import { ReadpostComponent } from './home/readpost/readpost.component';
import { UserdetailsComponent } from './home/userdetails/userdetails.component';
import {HttpClientModule} from '@angular/common/http';
<<<<<<< HEAD
import { UserinfoComponent } from './home/userinfo/userinfo.component';
=======
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
>>>>>>> 4ac50134f40aa759401b9788878a11e3ec12e926
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    AddpostComponent,
    ReadpostComponent,
    UserdetailsComponent,
<<<<<<< HEAD
    UserinfoComponent
=======
    NotFoundComponentComponent
>>>>>>> 4ac50134f40aa759401b9788878a11e3ec12e926
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
