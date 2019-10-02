import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "./must-match.validator";

import {AuthService} from "../../_services/auth/auth.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import {User} from "../../_models/User";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

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
        data => {
          //this.router.navigate(["/auth/login"]);
          console.log(JSON.stringify(this.registerForm.value));
        },
        error => {
          console.log("error");
        }
      )

  }
}
