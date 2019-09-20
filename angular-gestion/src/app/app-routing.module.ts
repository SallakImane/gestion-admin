import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ContentComponent} from "./shared/layout/content/content.component";

const routes: Routes = [
  { path:'/dashboard' ,redirectTo :'ContentComponent' ,pathMatch :'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
