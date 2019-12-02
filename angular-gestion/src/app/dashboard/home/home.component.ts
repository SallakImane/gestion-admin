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
  EditUserForm : FormGroup;
  globalResponse: GlobalResponse = null;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  workName : string ='';
  indexUser :number =null;
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
    });

    this.EditUserForm =this.formBuilder.group({
      firstName :['',Validators.required],
      lastName :['',Validators.required],
      email :['',[Validators.required,Validators.email]],
      oldPassword :[''],
      password :[''],
      confirmPassword :[''],
      phone :['',[Validators.required,Validators.minLength(10)]],
      work: [''],
      country: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      address: [''],
    },{
      validators :MustMatch('password','confirmPassword')
    });

  }
  openModal(content) {
    this.modalRef = this.modalService.open(content);
  }
  closeModalAdd() {
   this.addUserForm.reset();
    this.modalRef.close();
  }
  closeModalEdit() {
    this.EditUserForm.reset();
    this.EditUserForm.get('password').clearValidators();
    this.EditUserForm.get('confirmPassword').clearValidators();
    this.EditUserForm.get('password').updateValueAndValidity();
    this.EditUserForm.get('confirmPassword').updateValueAndValidity();
    this.modalRef.close();
  }
  openEditModal(id,content){
    this.indexUser =id;
    this.modalRef = this.modalService.open(content);
    this.dashboardService.getUserByEmail(id)
      .pipe(first())
      .subscribe(data =>{
        this.EditUserForm.get('firstName').setValue(data.firstName);
        this.EditUserForm.get('lastName').setValue(data.lastName);
        this.EditUserForm.get('phone').setValue(data.phone);
        this.EditUserForm.get('email').setValue(data.email);
        this.EditUserForm.get('work').setValue(data.work);
        this.EditUserForm.get('country').setValue(data.country);
        this.EditUserForm.get('city').setValue(data.city);
        this.EditUserForm.get('state').setValue(data.state);
        this.EditUserForm.get('zipCode').setValue(data.zipCode);
        this.EditUserForm.get('address').setValue(data.address)
      });
    this.setPasswordValidators();
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
            this.closeModalAdd();
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
  setPasswordValidators() {
    const oldPasswordControl = this.EditUserForm.get('oldPassword');
    const passwordControl = this.EditUserForm.get('password');
    const comfirmPasswordControl = this.EditUserForm.get('confirmPassword');
    /*le Cas ou old Password not null */
    oldPasswordControl.valueChanges
      .subscribe(oldPassword => {
        if (oldPassword || oldPasswordControl.value!== '' ) {

          passwordControl.setValidators([Validators.required]);
          comfirmPasswordControl.setValidators([Validators.required]);
        }
        passwordControl.updateValueAndValidity();
        comfirmPasswordControl.updateValueAndValidity();
      });
  }
  editUser(){
    this.dashboardService.updateUser(this.EditUserForm.value, this.indexUser)
      .subscribe((res :GlobalResponse)=>{
          this.globalResponse = new GlobalResponse();
          this.globalResponse = res;
          this.closeModalEdit();
        },
        (error :GlobalResponse)=>{
          if (error.status === 409){
            console.log(error.message);
            this.EditUserForm.get('email').setErrors({'incorrectEmail': true});
          } if (error.status === 400) {
            console.log(error.message);
            this.EditUserForm.get('oldPassword').setErrors({'incorrectPassword': true});
          }
        }
      )
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
