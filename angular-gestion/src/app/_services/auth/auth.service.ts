import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../_models/User";
import {GlobalResponse} from "../../_models/global-response.model";
import {environment} from "../../../environments/environment";
import {Token} from "../../_models/token";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;
  public currentUser: Observable<User>;
  private readonly currentUserSubject: BehaviorSubject<User>;

  constructor(private readonly http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(user: User) {
    return this.http.post<GlobalResponse>(
      this.baseUrl + "/public/auth/registerForm", user);
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/authenticate`, {username, password}, {observe: 'response'})
      .pipe(map(response => {
        const claims: Token = jwt_decode(response.headers.get('Authorization'));
        claims.authorization = response.headers.get('Authorization');
        const user: User = {token: claims};
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log(localStorage);
        this.currentUserSubject.next(user);
        console.log(user);
        return user;
      }));
  }
}
