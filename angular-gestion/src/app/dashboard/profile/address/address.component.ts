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
      country :[this.user.country],
      city :[this.user.city],
      state :[this.user.state],
      zipCode :[this.user.zipCode],
      address :[this.user.address]
    })
  }
  onSubmit(){
    // if(localStorage.getItem('details_address')!== null){
    //   localStorage.removeItem('details_address');}
    // localStorage.setItem('details_address',JSON.stringify(this.addressForm.value))
    this.profileService.setAddress(this.addressForm.value);
  }
}
