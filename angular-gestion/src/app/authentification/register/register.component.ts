import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "./must-match.validator";

import {AuthService} from "../../_services/auth/auth.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import {GlobalResponse} from "../../_models/global-response.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  globalResponse: GlobalResponse = null;

  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName :['',Validators.required],
      lastName :['',Validators.required],
      email :['',[Validators.required,Validators.email]],
      phone :['',[Validators.required,Validators.minLength(10)]],
      password :['',Validators.required],
      confirmPassword :['',Validators.required],
    },{
      validators :MustMatch('password','confirmPassword')
    });
  }

  register() {
    this.authService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (res: GlobalResponse) => {
          this.globalResponse = new GlobalResponse();
          this.globalResponse = res;
          this.registerForm.reset();
          this.router.navigate(["/auth/login"]);
        },
        (error: HttpErrorResponse) => {
          this.globalResponse = new GlobalResponse();
          this.globalResponse.error = true;
          this.globalResponse.status = 400;
          this.globalResponse.message = "Please verify your email address and password";
          this.globalResponse.errorType = "danger";
        }
      );
  }
}
