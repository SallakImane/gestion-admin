import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "../shared/layout/dashboard/dashboard.component";
import {ProfileComponent} from "./profile/profile.component";
import {UserResolver} from "./profile/user.resolver";
import {AuthentificationGuardService} from "../authentification/authentification-guard.service";

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent,canActivate :[AuthentificationGuardService]},
      {path: 'profile', component: ProfileComponent, resolve: {user: UserResolver} ,canActivate :[AuthentificationGuardService]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
