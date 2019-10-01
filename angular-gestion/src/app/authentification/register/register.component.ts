import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "./must-match.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName :['',Validators.required],
      lastName :['',Validators.required],
      email :['',[Validators.required,Validators.email]],
      phone :['',[Validators.required,Validators.minLength(6)]],
      password :['',Validators.required],
      confirmPassword :['',Validators.required],
    },{
      validators :MustMatch('password','confirmPassword')
    });
  }

  register() {
    console.log(JSON.stringify(this.registerForm.value))
  }
}
