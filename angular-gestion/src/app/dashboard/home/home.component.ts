import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {DashboardService} from "../../_services/dashboard/dashboard.service";
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {NgbModal, NgbModalConfig,NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {GlobalResponse} from "../../_models/global-response.model";
import {HttpErrorResponse} from "@angular/common/http";
import {MustMatch} from "../../authentification/register/must-match.validator";
import {DataTableDirective} from "angular-datatables";
import {UserModel} from "../profile/user.model";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal,NgbActiveModal]
})
export class HomeComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  // this trigger is used to tell angular datatables
  // that the json is ready and u can display the table
  // The trigger needed to re-render the table
  dtTrigger: Subject<any> = new Subject<any>();
  users = [];
  user :UserModel;
  addUserForm : FormGroup;
  globalResponse: GlobalResponse = null;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  workName : string ='';
  constructor(private dashboardService: DashboardService,private formBuilder :FormBuilder,
              private route: ActivatedRoute,config: NgbModalConfig,
              private modalService: NgbModal,private modalRef: NgbActiveModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    // Get users from resolver
    this.users = this.route.snapshot.data.users;
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
    };
    this.addUserForm =this.formBuilder.group({
      firstName :['',Validators.required],
      lastName :['',Validators.required],
      email :['',[Validators.required,Validators.email]],
      password :['',Validators.required],
      confirmPassword :['',Validators.required],
      phone :['',[Validators.required,Validators.minLength(10)]],
      work: [''],
      country: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      address: [''],
    },{
      validators :MustMatch('password','confirmPassword')
    })
  }
  openModal(content) {
    this.modalRef = this.modalService.open(content);
  }
  closeModal() {
   this.addUserForm.reset();
    this.modalRef.close();
  }
  adduser() {
    this.dashboardService.addNewUser(this.addUserForm.value)
      .pipe(first())
      .subscribe(
        (res: GlobalResponse) => {
          this.globalResponse = res;
          if(res.status !== 202){
            this.workName = this.addUserForm.get('work').value;
            this.users.push(this.addUserForm.value);
            this.globalResponse = new GlobalResponse();
            this.globalResponse = res;
            this.closeModal();
          }
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
  deleteUser(user : any , index :number){
    this.dashboardService.deleteUser(user.id)
      .pipe(first())
      .subscribe(
        (res :GlobalResponse) => {
          this.globalResponse = res;
          if(res.status !== 202){
            this.users.splice(index, 1);
          }
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
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first

      dtInstance.destroy();


      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
