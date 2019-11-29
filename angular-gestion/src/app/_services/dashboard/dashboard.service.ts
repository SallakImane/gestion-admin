import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../../_models/User";
import {UserModel} from "../../dashboard/profile/user.model";
import {GlobalResponse} from "../../_models/global-response.model";

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<User[]>(
      this.baseUrl + "/secured/dashboard/users");
  }

  getUser() {
    return this.http.get<UserModel>(
      this.baseUrl + "/secured/user/details"
    );
  }

  saveUserDetails(user :any){
    return this.http.put<GlobalResponse>(
      this.baseUrl + "/secured/save/detailsUser", user
    )
  }

  addNewUser(user :any){
    return this.http.put<GlobalResponse>(
      this.baseUrl + "/secured/save/newUser", user
    )
  }

  deleteUser(id : any){
    return this.http.delete<GlobalResponse>(
      this.baseUrl + "/secured/delete/user/" + id
    )
  }
  getUserByEmail(id: number){
    return this.http.get<UserModel>(
      this.baseUrl + "/secured/user/" + id
    );
  }
  updateUser(user: any, id :number) {
    return this.http.put<GlobalResponse>(
      this.baseUrl + "/secured/update/user/" + id,user
    )
  }
}
