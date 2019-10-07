import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../_models/User";
import {GlobalResponse} from "../../_models/global-response.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post<GlobalResponse>(
      this.baseUrl + "/auth/registerForm", user);
  }
}
