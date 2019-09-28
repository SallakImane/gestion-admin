import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./authentification/authentification.module').then(mod => mod.AuthentificationModule)},
  {path: 'dashboard',  loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
