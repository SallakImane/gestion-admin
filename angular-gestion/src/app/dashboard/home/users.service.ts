import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {DashboardService} from "../../_services/dashboard/dashboard.service";
import {User} from "../../_models/User";

@Injectable()
export class UsersService implements Resolve<User[]>{
  constructor(private dashboardService: DashboardService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> | Promise<User[]> | User[] {
    return this.dashboardService.getAllUsers();
  }
}
