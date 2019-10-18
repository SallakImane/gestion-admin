import { NgModule } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {SharedModule} from "../shared/shared.module";
import {AuthentificationRoutingModule} from "./authentification-routing.module";
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
  ],
  imports: [
    SharedModule,
    AuthentificationRoutingModule
  ]
})
export class AuthentificationModule { }
