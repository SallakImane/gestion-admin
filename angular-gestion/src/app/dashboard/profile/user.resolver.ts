import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {DashboardService} from "../../_services/dashboard/dashboard.service";
import {UserModel} from "./user.model";

@Injectable()
export class UserResolver implements Resolve<UserModel>{
  constructor(private dashboardService: DashboardService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel> | Promise<UserModel> | UserModel {
    return this.dashboardService.getUser();
  }
}
