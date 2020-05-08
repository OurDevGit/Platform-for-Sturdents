import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
// import { AcadamicGroup } from "../schooldata";
// import { from } from "zen-observable";
import { ExportExcellService } from "../../export-excell.service";
import { ViewEncapsulation, Inject } from "@angular/core";
import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import * as _ from "lodash";

@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.scss"]
})
export class ParentComponent implements OnInit {
  showdisplay: boolean;
  showEdit: boolean;
  showDelete: boolean;
  accesslist: any;
  deletecheck: boolean;
  users: any[];
  userFilter: any;
  datas_exp: any;
  listparents: listparents;
  datas: any;
  myForm: FormGroup;
  delete;

  advancedPage = 1;
  sizePage = 10;
  pagedata: any;
  totalcount: number;
  collsize: number;

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
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.showEdit = false;
    this.showDelete = false;
    this.listparents = new listparents();
    this.delete = [];
    let schoolID = this.getFromLocal("selected_school_id");
    this.schools.gradeandmonths<any>(schoolID).subscribe(
      (data: any) => {
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
      }
    );
  }
  exportasExcell() {
    this.exportExcell.exportAsExcelFile(this.datas_exp, "Parents");
  }
  ngOnInit() {
    this.deletebutton = "false";
    this.enablebutton = "false";
    this.disablebutton = "false";

    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SAVP") {
        this.showdisplay = true;
      } 
    }

    this.delete = [];
    this.myForm = this.fb.group({
      useremail: this.fb.array([])
    });
    let school_id = this.getFromLocal("selected_school_id");
    this.schools.listparents<listparents[]>(school_id).subscribe(
      (data: any[]) => {
        let result = [];
        data.forEach(datas => {
          let a = {
            altEmailId: datas.altEmailId,
            altMobile: datas.altMobile,
            altcountrycode: datas.altcountrycode,
            attribute: datas.attribute,
            email: datas.email,
            fullName: datas.fullName,
            grade: datas.grade,
            id: datas.id,
            isActive: datas.isActive,
            pcountrycode: datas.pcountrycode,
            primaryMobile: datas.primaryMobile,
            schoolID: datas.schoolID,
            shortName: datas.shortName,
            updateDate: datas.updateDate,
            updateID: datas.updateID,
            updateName: datas.updateName,
            isSelected: false
          };
          result.push(a);
        });
        this.checklist = result;
        this.datas = result;
        this.datas_exp = _.cloneDeep(result);
        this.totalcount = this.datas.length;
        this.collsize = this.datas.length;
        this.userFilter = { fullName: "" };
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.newsync();
      }
    );
  }

  update(event, item) {
    this.deletecheck = false;
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SAEP") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      this.router.navigate(["School/updateparent/" + item.id]);
    } else {
      alert("!You Don't Have the Access To Update");
    }
  }

  view(event, item) {
    this.router.navigate(["School/viewparent/" + item.id]);
  }

  newsync() {
    const startval = (this.advancedPage - 1) * this.sizePage;
    let endval = this.advancedPage * this.sizePage;
    if (this.datas.length > endval) {
    } else {
      endval = this.datas.length;
    }
    this.pagedata = [];
    for (let index = startval; index < endval; index++) {
      this.pagedata.push(this.datas[index]);
    }
  }

  checkUncheckAll() {
    for (var i = 0; i < this.datas.length; i++) {
      this.datas[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.datas.every(function(item: any) {
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

  onChange(id: string, isChecked: boolean) {
    const emailFormArray = <FormArray>this.myForm.controls.useremail;
    if (isChecked) {
      emailFormArray.push(new FormControl(id));
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == id);
      emailFormArray.removeAt(index);
    }
    this.delete = emailFormArray.value;
    if (this.delete.length === 0) {
      this.deletebutton = "false";
      this.enablebutton = "false";
      this.disablebutton = "false";
    } else {
      this.deletebutton = "true";
      this.enablebutton = "true";
      this.disablebutton = "true";
    }
  }

  deletelist() {
    this.deletecheck = false;
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SADP") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      for (let i = 0; i < this.checkedList.length; i++) {
        this.schools
          .deleteparents<listparents[]>(this.checkedList[i])
          .subscribe(
            (data: any) => {},
            error => () => {
              /* can provide allert for error on the api */
            },
            () => {
              this.ngOnInit();
            }
          );
      }
    } else {
      alert("!You Don't Have the Access To Delete");
    }
  }

  uploadbulk() {
    //this.router.navigate(['School/parentbulk'])
    this.router.navigate(["School/studentbulks/Parent"]);
  }

  disablelist() {
    for (let i = 0; i < this.checkedList.length; i++) {
      this.schools
        .fetchsingleparents<listparents>(this.checkedList[i])
        .subscribe(
          (data: listparents) => {
            this.listparents = data;
          },
          error => () => {
            /* can provide allert for error on the api */
          },
          () => {
            this.listparents.isActive = false;
            this.schools
              .updateparents<listparents>(this.listparents.id, this.listparents)
              .subscribe(
                () => {},
                error => () => {
                  alert("Some thing went wrong, please try again");
                },
                () => {
                  this.ngOnInit();
                }
              );
          }
        );
    }
  }

  enablelist() {
    for (let i = 0; i < this.checkedList.length; i++) {
      this.schools
        .fetchsingleparents<listparents>(this.checkedList[i])
        .subscribe(
          (data: listparents) => {
            this.listparents = data;
          },
          error => () => {
            /* can provide allert for error on the api */
          },
          () => {
            this.listparents.isActive = true;
            this.schools
              .updateparents<listparents>(this.listparents.id, this.listparents)
              .subscribe(
                () => {},
                error => () => {
                  alert("Some thing went wrong, please try again");
                },
                () => {
                  this.ngOnInit();
                }
              );
          }
        );
    }
  }

  Disable($event, data) {
    if (data.isActive == false) {
      this.schools.fetchsingleparents<listparents>(data.id).subscribe(
        (data: listparents) => {
          this.listparents = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.listparents.isActive = true;
          this.schools
            .updateparents<listparents>(this.listparents.id, this.listparents)
            .subscribe(
              () => {},
              error => () => {
                alert("Some thing went wrong, please try again");
              },
              () => {
                alert("Enable Successfully");
                this.ngOnInit();
              }
            );
        }
      );
    } else {
      this.schools.fetchsingleparents<listparents>(data.id).subscribe(
        (data: listparents) => {
          this.listparents = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.listparents.isActive = false;
          this.schools
            .updateparents<listparents>(this.listparents.id, this.listparents)
            .subscribe(
              () => {},
              error => () => {
                alert("Some thing went wrong, please try again");
              },
              () => {
                alert("Disable Successfully");
                this.ngOnInit();
              }
            );
        }
      );
    }
  }

  deleteacadamic(event, item) {

    this.schools.deleteparents<listparents[]>(item.id).subscribe(
      (data: any) => {},
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        alert("deleted");
        this.ngOnInit();
      }
    );
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }
}

export class listparents {
  fullName: string;
  shortName: string;
  grade: string;
  email: string;
  UpdateDate: string;
  UpdateID: number;
  id: number;
  isActive: boolean;
}
