import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../_services/auth/auth.service";
import {GlobalResponse} from "../../_models/global-response.model";
import {first} from "rxjs/operators";
import {User} from "../../_models/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  globalResponse: GlobalResponse = new GlobalResponse();


  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  signin(){
    console.log(JSON.stringify(this.loginForm.value));
    this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .pipe(first())
      .subscribe((data: User) => {
          if (data.token.rol.includes('ROLE_USER')) {
            this.router.navigate(['/dashboard/home']);
          }
        },
        error => {
          if (error.status === 401) {
            this.globalResponse = new GlobalResponse();
            this.globalResponse.error = true;
            this.globalResponse.status = 400;
            this.loginForm.reset();
            this.globalResponse.message = "Email ou mot de password incorrect";
            this.globalResponse.errorType = "danger";
          }
        });
  }
}
