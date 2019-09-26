import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from "./dashboard.component";
import { HomeComponent } from './home/home.component';
import {RouterModule} from "@angular/router";
import {HomeModule} from "./home/home.module";


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot([]),
    SharedModule,
    DashboardRoutingModule,
    HomeModule
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule {
}
