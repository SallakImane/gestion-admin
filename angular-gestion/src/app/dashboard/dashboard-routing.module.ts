import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ContentComponent} from "../shared/layout/content/content.component";

const routes: Routes = [{
  path: '',
  component: ContentComponent,
  children: [
    {path: '', component: HomeComponent}
  ]
}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
