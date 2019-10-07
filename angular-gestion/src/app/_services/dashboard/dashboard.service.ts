import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../../_models/User";

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<User[]>(
      this.baseUrl + "/dashboard/users");
  }
}
