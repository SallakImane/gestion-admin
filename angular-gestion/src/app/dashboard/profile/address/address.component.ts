import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserModel} from "../user.model";
import {ActivatedRoute} from "@angular/router";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;
  user: UserModel;

  constructor(private formBuilder :FormBuilder,private route: ActivatedRoute,private profileService :ProfileService) { }

  ngOnInit() {
    // Get user from resolver
    this.user = this.route.snapshot.data.user.user;
    this.addressForm =this.formBuilder.group({
      country: [this.user.address.country ? this.user.address.country : null],
      city: [this.user.address.city ? this.user.address.city : null],
      state: [this.user.address.state ? this.user.address.state : null],
      zipCode: [this.user.address.zipCode ? this.user.address.zipCode : null],
      address: [this.user.address.address ? this.user.address.address : null],
    })
  }
  onSubmit(){
    this.profileService.setAddress(this.addressForm.value);
  }
}
