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
  selector: 'app-listroutes',
  templateUrl: './listroutes.component.html',
  styleUrls: ['./listroutes.component.scss']
})
export class ListroutesComponent implements OnInit {
  filter: any;

  deletecheck: boolean;
  showdisplay: boolean;
  accesslist: any;
  users: any[];
  userFilter: any;
  public UpdateAcadamicGroup: UpdateAcadamicGroup;

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

    this.UpdateAcadamicGroup = new UpdateAcadamicGroup();
    this.listgrade = new listgrade();
    this.delete = [];
    this.deletebutton = "false";
    this.enablebutton = "false";
    this.disablebutton = "false";
  }

  exportasExcell() {
    this.exportExcell.exportAsExcelFile(this.datas_exp, "Routes");
  }

  ngOnInit() {
    this.deletebutton = "false";
    this.enablebutton = "false";
    this.disablebutton = "false";

    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "TMVR") {
        this.showdisplay = true;
      } 
    }
    this.delete = [];
    this.myForm = this.fb.group({
      useremail: this.fb.array([])
    });
    let school_id = this.getFromLocal("selected_school_id");
    this.schools.routeslists<any[]>().subscribe(
      (data: any) => {
        
        let result = [];
        data.forEach(datas => {
          let a = {
            RouteId: datas.RouteId,
            RouteName: datas.RouteName,
            SchoolID: datas.SchoolID,
            AreasCovered: datas.AreasCovered,
            StartPoint: datas.StartPoint,
            EndPoint: datas.EndPoint,
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
      if (this.accesslist[i].code == "TMER") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      this.router.navigate(["School/updateroutes/" + item.RouteId]);
    } else {
      this.alertifyService.success("!You Don't Have the Access to Edit", document.title);
    }
  }

  view(event, item) {
    this.router.navigate(["School/viewroutes/" + item.RouteId]);
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
        this.checkedList.push(this.checklist[i].RouteId);
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
      if (this.accesslist[i].code == "TMDR") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      for (let i = 0; i < this.checkedList.length; i++) {
        this.schools
          .deleteroutes<any[]>(this.checkedList[i])
          .subscribe(
            (data: any) => { },
            error =>  {
              if(error.status == 500) {
                this.alertifyService.success('Route cannot be deleted due to associated trip', document.title);
              }
            },
            () => {
              this.alertifyService.success('Route has been successfully deleted', document.title);

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
        .fetchsingacadamics<UpdateAcadamicGroup>(this.checkedList[i])
        .subscribe(
          (data: UpdateAcadamicGroup) => {
            this.UpdateAcadamicGroup = data;
          },
          error => () => {
            /* can provide allert for error on the api */
          },
          () => {
            this.UpdateAcadamicGroup.isActive = false;
            this.schools
              .updateacadamics<UpdateAcadamicGroup>(
                this.UpdateAcadamicGroup.id,
                this.UpdateAcadamicGroup
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
        .fetchsingacadamics<UpdateAcadamicGroup>(this.checkedList[i])
        .subscribe(
          (data: UpdateAcadamicGroup) => {
            this.UpdateAcadamicGroup = data;
          },
          error => () => {
            /* can provide allert for error on the api */
          },
          () => {
            this.UpdateAcadamicGroup.isActive = true;
            this.schools
              .updateacadamics<UpdateAcadamicGroup>(
                this.UpdateAcadamicGroup.id,
                this.UpdateAcadamicGroup
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
      this.schools.fetchsingacadamics<UpdateAcadamicGroup>(data.id).subscribe(
        (data: UpdateAcadamicGroup) => {
          this.UpdateAcadamicGroup = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.UpdateAcadamicGroup.isActive = true;
          this.schools
            .updateacadamics<UpdateAcadamicGroup>(
              this.UpdateAcadamicGroup.id,
              this.UpdateAcadamicGroup
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
      this.schools.fetchsingacadamics<UpdateAcadamicGroup>(data.id).subscribe(
        (data: UpdateAcadamicGroup) => {
          this.UpdateAcadamicGroup = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.UpdateAcadamicGroup.isActive = false;
          this.schools
            .updateacadamics<UpdateAcadamicGroup>(
              this.UpdateAcadamicGroup.id,
              this.UpdateAcadamicGroup
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

  adddevice() {
    this.router.navigate(["School/addroutues"]);
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

export class UpdateAcadamicGroup {
  id: number;
  schoolID: number;
  academicGrpName: string;
  startClass: string;
  endClass: string;
  startTiming: string;
  endTiming: string;
  academicStartDate: string;
  academicEndDate: string;
  weekdayStart: number;
  numberofWeekDays: number;
  updateDate: string;
  updateID: number;
  isActive: boolean;
}

export class listgrade {
  id: number;
  title: string;
  updatedate: string;
}
