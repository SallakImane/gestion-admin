import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './layout/footer/footer.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {HeaderComponent} from './layout/header/header.component';
import {RouterModule} from "@angular/router";
import {AuthComponent} from './layout/auth/auth.component';
import {DashboardComponent} from './layout/dashboard/dashboard.component';


@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    AuthComponent,
    DashboardComponent
  ],

  imports: [
    CommonModule,
    RouterModule
  ],

  exports: [
    DashboardComponent,
    AuthComponent
  ],


})
export class SharedModule {
}
