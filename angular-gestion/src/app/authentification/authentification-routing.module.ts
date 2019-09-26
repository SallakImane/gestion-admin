import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {RegisterComponent} from "./register/register.component";



const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: '/forgot-password', component: ForgotPasswordComponent},
  { path: '/register', component: RegisterComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule { }
