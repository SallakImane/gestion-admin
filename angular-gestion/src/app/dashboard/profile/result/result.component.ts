import {Component, OnInit} from '@angular/core';
import {GlobalResponse} from "../../../_models/global-response.model";
import {first} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {DashboardService} from "../../../_services/dashboard/dashboard.service";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  personal: [];
  work: [];
  address: [];
  globalResponse: GlobalResponse = null;
  isLoogedIn: boolean = true;

  constructor(private dashboardService: DashboardService, private profileService: ProfileService) {
  }

  ngOnInit() {
    if (localStorage.getItem("details_personal") &&
      localStorage.getItem("details_work") &&
      localStorage.getItem("details_address") !== null) {
      // this.personal = this.profileService.getPersonal();
      // this.work = this.profileService.getWorkType();
      // this.address = this.profileService.getAddress() ;
      this.isLoogedIn = true;
    }
    this.profileService.personalSubject.subscribe(personal => {
      this.personal = personal;
    })
  }

  onSubmit() {
    let merged = Object.assign(this.personal, this.work, this.address);
    console.log(merged);
    this.dashboardService.saveUserDetails(this.profileService.setMergedSteps())
      .pipe(first())
      .subscribe(
        (res: GlobalResponse) => {
          this.globalResponse = new GlobalResponse();
          this.globalResponse = res;
          this.profileService.resetSteps();
          this.isLoogedIn = false;
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
