import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../_services/dashboard/dashboard.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users = [];

  constructor( private dashboardService :DashboardService) { }

  ngOnInit() {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.dashboardService.getAllUsers()
      .pipe(first())
      .subscribe(users => this.users = users);
  }
}
