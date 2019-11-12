import {Component, OnInit} from '@angular/core';
import {GlobalResponse} from "../../../_models/global-response.model";
import {first} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {DashboardService} from "../../../_services/dashboard/dashboard.service";
import {ProfileService} from "../profile.service";
import {AuthService} from "../../../_services/auth/auth.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  personal: any;
  work: any;
  address: any;
  globalResponse: GlobalResponse = null;

  constructor(private dashboardService: DashboardService,
              private profileService: ProfileService) {}


  ngOnInit(){
    this.personal = this.profileService.personalSubject.subscribe((personal) => {
      this.personal = personal;
    });
    this.work = this.profileService.workSubject.subscribe(work => {
      this.work = work;
    });
    this.address = this.profileService.addressSubject.subscribe(address => {
      this.address = address;
    });
  }

  onSubmit() {
    console.log(this.profileService.setMergedSteps());
    this.dashboardService.saveUserDetails(this.profileService.setMergedSteps())
      .pipe(first())
      .subscribe(
        (res: GlobalResponse) => {
          this.globalResponse = new GlobalResponse();
          this.globalResponse = res;
          this.profileService.resetSteps();
        },
        (error: HttpErrorResponse) => {
          this.globalResponse = new GlobalResponse();
          this.globalResponse.error = true;
          this.globalResponse.status = 400;
          this.globalResponse.message = "Please verify your email address and your Details";
          this.globalResponse.errorType = "danger";
        }
      );
  }

  refresh(): void {
    window.location.reload();
    localStorage.removeItem('details_personal');
    localStorage.removeItem('details_work');
    localStorage.removeItem('details_address');
  }
}
