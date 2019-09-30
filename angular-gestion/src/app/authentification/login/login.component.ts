import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted :boolean =false;

  constructor( private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signin() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log("form Invalid");
      return;
    }
    console.log("form " + JSON.stringify(this.loginForm.value));
    this.router.navigate(['/dashboard']);
  }
}
