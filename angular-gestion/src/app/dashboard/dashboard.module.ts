import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {HomeComponent} from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonalComponent } from './profile/personal/personal.component';
import { AddressComponent } from './profile/address/address.component';
import { WorkComponent } from './profile/work/work.component';
import { ResultComponent } from './profile/result/result.component';
import {UserResolver} from "./profile/user.resolver";

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    PersonalComponent,
    AddressComponent,
    WorkComponent,
    ResultComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  providers : [
    UserResolver
  ]
})
export class DashboardModule {
}
