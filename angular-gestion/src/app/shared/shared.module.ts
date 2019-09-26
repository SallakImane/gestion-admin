import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import {RouterModule} from "@angular/router";
import { AuthComponent } from './layout/auth/auth.component';



@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    AuthComponent
  ],

  imports: [
    CommonModule,
    RouterModule
  ],

  exports : [
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    AuthComponent
  ],



})
export class SharedModule { }
