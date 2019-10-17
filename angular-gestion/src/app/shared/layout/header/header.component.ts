import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../_services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: '.app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
    // this.individualService.resetCurrentSession();
    // this.entityService.resetCurrentSession();
    this.router.navigate(['/auth/login']);
  }
}
