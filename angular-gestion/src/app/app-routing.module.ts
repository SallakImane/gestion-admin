import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './authentification/authentification.module#AuthentificationModule'},
  //{ path: 'home', loadChildren: './dashboard/dashboard.module#DashboardModule'},
  { path: 'home', loadChildren: './dashboard/home/home.module#HomeModule'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
