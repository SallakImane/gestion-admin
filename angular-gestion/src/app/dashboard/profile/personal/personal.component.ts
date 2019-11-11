import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserModel} from "../user.model";
import {ActivatedRoute} from "@angular/router";
import {DashboardService} from "../../../_services/dashboard/dashboard.service";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  personalForm: FormGroup;
  user: UserModel;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute ,private profileService :ProfileService) {
  }

  ngOnInit() {
    // Get user from resolver
    this.user = this.route.snapshot.data.user.user;
    console.log(this.user);
    // setting form
    this.personalForm = this.formBuilder.group({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      phone: [this.user.phone],
      email: [this.user.email],
    });

  }
  onSubmit() {
    this.user = this.personalForm.value;
    // if(localStorage.getItem('details_personal')!== null){
    //   localStorage.removeItem('details_personal');}
    //localStorage.setItem('details_personal',JSON.stringify(this.personalForm.value));
    this.profileService.setPersonal(this.personalForm.value);
  }
}
