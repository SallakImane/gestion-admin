import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../_services/dashboard/dashboard.service";
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  // this trigger is used to tell angular datatables
  // that the json is ready and u can display the table
  // The trigger needed to re-render the table
  dtTrigger: Subject<any> = new Subject<any>();
  users = [];

  constructor(private dashboardService: DashboardService,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
    };
    // Get user from resolver
    this.users = this.route.snapshot.data.users;
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
