import { Component, OnInit } from "@angular/core";
import { ExportExcellService } from "app/export-excell.service";
import {  HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

import { Inject } from "@angular/core";
import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { FormGroup, FormBuilder } from "@angular/forms";
import * as _ from "lodash";
import { AlertifyService } from "app/alertify-service";


@Component({
  selector: 'app-listdevices',
  templateUrl: './listdevices.component.html',
  styleUrls: ['./listdevices.component.scss']
})
export class ListdevicesComponent implements OnInit {
  filter: any;
  deletecheck: boolean;
  showdisplay: boolean;
  showDelete: boolean;
  accesslist: any;
  users: any[];
  userFilter: any;
  public gpsdevice: GpsDevice;

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

    this.gpsdevice = new GpsDevice();
    this.listgrade = new listgrade();
    this.delete = [];
    this.deletebutton = "false";
    this.enablebutton = "false";
    this.disablebutton = "false";
  }

  exportasExcell() {
    var current_url = this.route.snapshot.url.join().split(',')
    if(current_url[0] == "listdevices") {
      var excel_name = 'Devices';
      this.exportExcell.exportAsExcelFile(this.datas_exp, excel_name);
    } else {
       this.exportExcell.exportAsExcelFile(this.datas_exp, "Devices");
    }
   
  }

  ngOnInit() {
    this.deletebutton = "false";
    this.enablebutton = "false";
    this.disablebutton = "false";

    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "TMVD") {
        this.showdisplay = true;
      } 
    }
    this.delete = [];
    this.myForm = this.fb.group({
      useremail: this.fb.array([])
    });

    let school_id = this.getFromLocal("selected_school_id");
    this.schools.deviceslists<any[]>().subscribe(
      (data: any) => {
        let result = [];
        data.forEach(datas => {
          let a = {
            id: datas.Id,
            imei: datas.IMEI,
            adminNo: datas.AdminNo,
            make: datas.Make,
            model: datas.Model,
            type: datas.Type,
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

  //Action Page router

  update(event, item) {
    this.deletecheck = false;
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "TMED") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      this.router.navigate(["School/updatedevices/" + item.id]);
    } else {
      this.alertifyService.success("!You Don't Have the Access to Edit", document.title);

    }
  }

  view(event, item) {
    this.router.navigate(["School/viewdevices/" + item.id]);
  }

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
        this.checkedList.push(this.checklist[i].id);
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
      if (this.accesslist[i].code == "TMDD") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      for (let i = 0; i < this.checkedList.length; i++) {
        this.schools
          .deletedevices<any[]>(this.checkedList[i])
          .subscribe(
            (data: any) => {
             },
            error => {
              this.alertifyService.success(error.message, document.title);
            },
            () => {
              this.alertifyService.success('Device has been deleted successfully', document.title);
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
        .fetchdevices<GpsDevice>(this.checkedList[i])
        .subscribe(
          (data: GpsDevice) => {
            this.gpsdevice = data;
          },
          error => () => {
            /* can provide allert for error on the api */
          },
          () => {
            this.gpsdevice.isActive = false;
            this.schools
              .updatedevices<GpsDevice>(
                this.gpsdevice.id,
                this.gpsdevice
              )
              .subscribe(
                () => { },
                error => () => {
                  this.alertifyService.success('Some thing went wrong, please try again', document.title);
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
        .fetchdevices<GpsDevice>(this.checkedList[i])
        .subscribe(
          (data: GpsDevice) => {
            this.gpsdevice = data;
          },
          error => () => {
            /* can provide allert for error on the api */
          },
          () => {
            this.gpsdevice.isActive = true;
            this.schools
              .updatedevices<GpsDevice>(
                this.gpsdevice.id,
                this.gpsdevice
              )
              .subscribe(
                () => { },
                error =>  {
                  this.alertifyService.success('Some thing went wrong, please try again', document.title);
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
      this.schools.fetchdevices<GpsDevice>(data.id).subscribe(
        (data: GpsDevice) => {
          this.gpsdevice = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.gpsdevice.isActive = true;
          this.schools
            .updatedevices<GpsDevice>(
              this.gpsdevice.id,
              this.gpsdevice
            )
            .subscribe(
              () => { },
              error => () => {
                this.alertifyService.success('Some thing went wrong, please try again', document.title);
              },
              () => {
                this.alertifyService.success('Enable Successfully', document.title);
                this.ngOnInit();
              }
            );
        }
      );
    } else {
      this.schools.fetchdevices<GpsDevice>(data.id).subscribe(
        (data: GpsDevice) => {
          this.gpsdevice = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.gpsdevice.isActive = false;
          this.schools
            .updatedevices<GpsDevice>(
              this.gpsdevice.id,
              this.gpsdevice
            )
            .subscribe(
              () => { },
              error => () => {
                this.alertifyService.success('Some thing went wrong, please try again', document.title);
              },
              () => {
                this.alertifyService.success('Disable Successfully', document.title);
                this.ngOnInit();
              }
            );
        }
      );
    }
  }

  adddevice() {
    this.router.navigate(["School/adddevices"]);
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

export class GpsDevice {
  id: number;
  imei: string;
  adminNo: number;
  make: string;
  model: string;
  type: string;
  isActive: boolean;
}

export class listgrade {
  id: number;
  title: string;
  updatedate: string;
}
