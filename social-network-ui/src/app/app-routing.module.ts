import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { SigninComponent } from './home/signin/signin.component';
import { SignupComponent } from './home/signup/signup.component';
import { AddpostComponent } from './home/addpost/addpost.component';
import { UserinfoComponent} from './home/userinfo/userinfo.component';
<<<<<<< HEAD
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
=======
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuard } from './guards/auth-guard.service';
>>>>>>> b1d90bf7c04ff89801ab6a1c3c06d652fc80c972

const routes: Routes = [
{path:'',redirectTo:'home',pathMatch:'full'},
{path:'home',component:HomeComponent},
{path:'signin',component:SigninComponent},
{path:'signup',component:SignupComponent},
{path:'addpost',component:AddpostComponent},
<<<<<<< HEAD
{path:'userinfo',component:UserinfoComponent},

=======
{path:'userinfo',component:UserinfoComponent}
>>>>>>> b1d90bf7c04ff89801ab6a1c3c06d652fc80c972
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule]
})

export class AppRoutingModule { canActivate: [AuthGuard]}
