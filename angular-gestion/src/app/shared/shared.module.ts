import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import {RouterModule} from "@angular/router";



@NgModule({
  imports: [
    CommonModule,RouterModule
  ],
  exports : [
    FooterComponent,
    SidebarComponent,
    HeaderComponent
  ],
  declarations: [
    FooterComponent,
    SidebarComponent,
    HeaderComponent
  ],


})
export class SharedModule { }
