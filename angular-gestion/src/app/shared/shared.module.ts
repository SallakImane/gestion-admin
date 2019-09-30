import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './layout/footer/footer.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {HeaderComponent} from './layout/header/header.component';
import {RouterModule} from "@angular/router";
import {AuthComponent} from './layout/auth/auth.component';
import {DashboardComponent} from './layout/dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    AuthComponent,
    DashboardComponent
  ],

  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],

  exports: [
    DashboardComponent,
    AuthComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],


})
export class SharedModule {
}
