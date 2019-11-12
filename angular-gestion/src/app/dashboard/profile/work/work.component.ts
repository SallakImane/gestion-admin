import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserModel} from "../user.model";
import {ActivatedRoute} from "@angular/router";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  workForm :FormGroup;
  user: UserModel;

  constructor( private formBuilder: FormBuilder,private route: ActivatedRoute,private profileService :ProfileService) { }

  ngOnInit() {
    // Get user from resolver
    this.user = this.route.snapshot.data.user.user;
    console.log(this.user);
    this.workForm=this.formBuilder.group({
      work: [this.user.work.name ? this.user.work.name : null],
    })
  }
  onSubmit(){
    this.profileService.setWorkType(this.workForm.value);
  }
}
