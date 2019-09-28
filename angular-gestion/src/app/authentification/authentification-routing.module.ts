import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {RegisterComponent} from "./register/register.component";
import {AuthComponent} from "../shared/layout/auth/auth.component";


const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule {
}
