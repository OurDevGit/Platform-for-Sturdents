import { Component, OnInit } from "@angular/core";
import { ExportExcellService } from "app/export-excell.service";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

import { ViewEncapsulation, Inject } from "@angular/core";
import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import * as _ from "lodash";
import { AlertifyService } from "app/alertify-service";


@Component({
  selector: 'app-list-drivers',
  templateUrl: './list-drivers.component.html',
  styleUrls: ['./list-drivers.component.scss']
})
export class ListDriversComponent implements OnInit {
  filter: any;

  deletecheck: boolean;
  showdisplay: boolean;
  accesslist: any;
  users: any[];
  userFilter: any;
  public driver: Driver;

  datas: any;
  myForm: FormGroup;
  delete;
  isDisable = false;
  datas_exp: any;
  advancedPage = 1;
  sizePage = 10;
  pagedata: any;
  totalcount: number;
  collsize: number;
  listgrade: listgrade;

  disablebutton: string;
  enablebutton: string;
  deletebutton: string;

  masterSelected: boolean;
  checklist: any;
  checkedList: any;

  //sorting
  key: string = "name";
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private exportExcell: ExportExcellService,
    public schools: SchoolsService,
    public alertifyService: AlertifyService,

    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.driver = new Driver();
    this.listgrade = new listgrade();
    this.delete = [];
    this.deletebutton = "false";
    this.enablebutton = "false";
    this.disablebutton = "false";
  }

  exportasExcell() {
    this.datas_exp.map(cursor => {
      cursor.DOB = cursor.DOB.split('T')[0];
      cursor.LicenseExpiry = cursor.LicenseExpiry.split('T')[0];
    })
    this.exportExcell.exportAsExcelFile(this.datas_exp, "Driver");
  }

  ngOnInit() {
    this.deletebutton = "false";
    this.enablebutton = "false";
    this.disablebutton = "false";

    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "TMVDR") {
        this.showdisplay = true;
      } 
    }
    this.delete = [];
    this.myForm = this.fb.group({
      useremail: this.fb.array([])
    });

    let school_id = this.getFromLocal("selected_school_id");

    this.schools.driverslist<any[]>().subscribe(
      (data: any[]) => {
        console.log('datas =>', data)
        let result = [];
        data.forEach(datas => {
          let a = {
            Id: datas.Id,
            FirstName: datas.FirstName,
            LastName: datas.LastName,
            NameInVernacular: datas.NameInVernacular,
            LicenseNumber: datas.LicenseNumber,
            LicenseExpiry: this.formatDate(datas.LicenseExpiry),
            Nationality: datas.Nationality,
            DOB: datas.DOB,
            Gender: datas.Gender,
            Address: datas.Address,
            ContactNumber: datas.ContactNumber,
            isSelected: false
          };
          result.push(a);
        });
        this.checklist = result;
        this.datas = result;
        this.totalcount = this.datas.length;
        this.collsize = this.datas.length;
        this.datas_exp = _.cloneDeep(result);
        this.userFilter = { academicGrpName: "" };
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.newsync();
      }
    );
  }

  newsync() { }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
  }

  //Action Page router

  update(event, item) {
    this.deletecheck = false;
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "TMEDR") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      this.router.navigate(["School/updatedrives/" + item.Id]);
    } else {
      this.alertifyService.success("!You Don't Have the Access to Edit", document.title);
    }
  }

  view(event, item) {
    this.router.navigate(["School/viewdrives/" + item.Id]);
  }

  //Checker action

  checkUncheckAll() {
    for (var i = 0; i < this.datas.length; i++) {
      this.datas[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.datas.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i].isSelected)
        this.checkedList.push(this.checklist[i].Id);
    }
    if (this.checkedList.length === 0) {
      this.deletebutton = "false";
      this.enablebutton = "false";
      this.disablebutton = "false";
    } else {
      this.deletebutton = "true";
      this.enablebutton = "true";
      this.disablebutton = "true";
    }
  }

  //Delete List Action
  deletelist() {
    this.deletecheck = false;
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "TMDDR") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      for (let i = 0; i < this.checkedList.length; i++) {
        this.schools
          .deletedrivers<any[]>(this.checkedList[i])
          .subscribe(
            (data: any) => { },
            error => () => {
              /* can provide allert for error on the api */
            },
            () => {
              this.alertifyService.success("Driver has been deleted successfully", document.title);
              this.ngOnInit();
            }
          );
      }
    } else {
      this.alertifyService.success("!You Don't Have the Access to Delete", document.title);
    }
  }

  //Disable List Action

  disablelist() {
    for (let i = 0; i < this.checkedList.length; i++) {
      this.schools
        .fetchsingacadamics<Driver>(this.checkedList[i])
        .subscribe(
          (data: Driver) => {
            this.driver = data;
          },
          error => () => {
            /* can provide allert for error on the api */
          },
          () => {
            // this.driver.isActive = false;
            this.schools
              .updateacadamics<Driver>(
                this.driver.Id,
                this.driver
              )
              .subscribe(
                () => { },
                error => () => {
                  this.alertifyService.success("Some thing went wrong, please try again", document.title);
                },
                () => {
                  this.ngOnInit();
                }
              );
          }
        );
    }
  }

  //Enable List Action

  Enablelist() {
    for (let i = 0; i < this.checkedList.length; i++) {
      this.schools
        .fetchsingacadamics<Driver>(this.checkedList[i])
        .subscribe(
          (data: Driver) => {
            this.driver = data;
          },
          error => () => {
            /* can provide allert for error on the api */
          },
          () => {
            // this.driver.isActive = true;
            this.schools
              .updateacadamics<Driver>(
                this.driver.Id,
                this.driver
              )
              .subscribe(
                () => { },
                error => () => {
                  this.alertifyService.success("Some thing went wrong, please try again", document.title);
                },
                () => {
                  this.ngOnInit();
                }
              );
          }
        );
    }
  }

  //Single Disable/Enable Action

  Disable($event, data) {
    if (data.isActive == false) {
      this.schools.fetchsingacadamics<Driver>(data.id).subscribe(
        (data: Driver) => {
          this.driver = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          // this.UpdateAcadamicGroup.isActive = true;
          this.schools
            .updateacadamics<Driver>(
              this.driver.Id,
              this.driver
            )
            .subscribe(
              () => { },
              error => () => {
                this.alertifyService.success("Some thing went wrong, please try again", document.title);

              },
              () => {
                this.alertifyService.success("Enable Successfully", document.title);

                this.ngOnInit();
              }
            );
        }
      );
    } else {
      this.schools.fetchsingacadamics<Driver>(data.id).subscribe(
        (data: Driver) => {
          this.driver = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          // this.driver.isActive = false;
          this.schools
            .updateacadamics<Driver>(
              this.driver.Id,
              this.driver
            )
            .subscribe(
              () => { },
              error => () => {
                this.alertifyService.success("Some thing went wrong, please try again", document.title);

              },
              () => {
                this.alertifyService.success("Disable Successfully", document.title);

                this.ngOnInit();
              }
            );
        }
      );
    }
  }

  adddrivers() {
    this.router.navigate(["School/adddrives"]);
  }

  //Single Delete Actions

  deleteacadamic(event, item) {

    this.schools.deleteacadamics<any[]>(item.id).subscribe(
      (data: any) => { },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.alertifyService.success("deleted", document.title);

        this.ngOnInit();
      }
    );
  }

  //Local Storage Get and Post

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }
  getFromLocal(key): any {
    return this.storage.get(key);
  }
}

//Class Declarations

export class Driver {
  Id: number;
  FirstName: string;
  LastName: string;
  NameInVernacular: string;
  LicenseNumber: string;
  LicenseExpiry: string;
  Nationality: string;
  Address: string;
  DOB: string;
  ContactNumber: string;
  Gender: string;
  isSelected: false;
}

export class listgrade {
  id: number;
  title: string;
  updatedate: string;
}
