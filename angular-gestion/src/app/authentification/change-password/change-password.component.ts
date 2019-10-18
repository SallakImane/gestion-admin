import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../_services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MustMatch} from "../register/must-match.validator";
import {GlobalResponse} from "../../_models/global-response.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  globalResponse: GlobalResponse = null;
  token: string = null;
  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router,private route: ActivatedRoute,) { }


  ngOnInit() {
    /** An observable of the query parameters shared by all the routes.
     * getting the token for request params if is not present we redirect to login page*/
    this.route.queryParams.subscribe(params => {
      if (params.hasOwnProperty('token')) {
        this.token = params['token'];
      } else {
        this.router.navigate(['/auth/login']);
      }
    });

    this.changePasswordForm = this.formBuilder.group({
      password :['',Validators.required],
      confirmPassword :['',Validators.required],
    },{
      validators :MustMatch('password','confirmPassword')
    });
  }
  onChangePassword(){
    this.authService.changePassword(this.token, this.changePasswordForm.get('password').value)
      .subscribe(
        (res: GlobalResponse) => {
          this.globalResponse = new GlobalResponse();
          this.globalResponse = res;
          this.changePasswordForm.reset();
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
