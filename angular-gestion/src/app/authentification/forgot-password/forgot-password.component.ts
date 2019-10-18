import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../_services/auth/auth.service";
import {Router} from "@angular/router";
import {GlobalResponse} from "../../_models/global-response.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  globalResponse: GlobalResponse = new GlobalResponse();

  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
    });
  }

  onReset() {
    this.authService.forgotPassword(this.resetPasswordForm.get("username").value)
      .subscribe(
        (res: GlobalResponse) => {
          this.globalResponse = new GlobalResponse();
          this.globalResponse = res;
          this.resetPasswordForm.reset();
        },
        (error: HttpErrorResponse) => {
          this.globalResponse = new GlobalResponse();
          this.globalResponse.error = true;
          this.globalResponse.status = 400;
          this.globalResponse.message = "Please verify your username address";
          this.globalResponse.errorType = "danger";
        }
      );
  }
}
