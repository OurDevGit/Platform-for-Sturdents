import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
// import { AcadamicGroup } from "../schooldata";
import { ExportExcellService } from "../../export-excell.service";
// import { from } from "zen-observable";
import { ViewEncapsulation, Inject } from "@angular/core";
import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import * as _ from "lodash";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"]
})
export class StudentComponent implements OnInit {
  showdisplay: boolean;
  showEdit: boolean;

  showDelete: boolean;
  accesslist: any;
  deletecheck: boolean;
  datas_exp: any;
  users: any[];
  userFilter: any;

  studentlist: studentlist;
  datas: any;
  myForm: FormGroup;
  delete;
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
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.studentlist = new studentlist();
    this.showEdit = false;
    this.showDelete = false;
    this.delete = [];
    this.listgrade = new listgrade();
    this.userFilter = { schoolStudentID: "" };

    let school_id = this.getFromLocal("selected_school_id");
    ///**fetch class */
    this.schools.listgrades<listgrade>(school_id).subscribe(
      (data: listgrade) => {
        this.listgrade = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
      }
    );
  }
  exportasExcell() {
    this.exportExcell.exportAsExcelFile(this.datas_exp, "Student");
  }
  ngOnInit() {
    this.deletebutton = "false";
    this.enablebutton = "false";
    this.disablebutton = "false";

    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SAVS") {
        this.showdisplay = true;
      } 
    }

    this.delete = [];
    this.myForm = this.fb.group({
      useremail: this.fb.array([])
    });
    let school_id = this.getFromLocal("selected_school_id");

    this.schools.liststudent<studentlist[]>(school_id).subscribe(
      (data: any[]) => {
        let result = [];
        data.forEach(datas => {
          let a = {
            acadamicYear: datas.acadamicYear,
            address: datas.address,
            fullName: datas.fullName,
            geoLocation: datas.geoLocation,
            grade: datas.gradeName,
            id: datas.id,
            isActive: datas.isActive,
            pMobile: datas.pMobile,
            pcountrycode: datas.pcountrycode,
            sMobile: datas.sMobile,
            schoolID: datas.schoolID,
            schoolStudentID: datas.schoolStudentID,
            scountrycode: datas.scountrycode,
            shortName: datas.shortName,
            updateDate: datas.updateDate,
            updateID: datas.updateID,
            updateName: datas.updateName,
            isSelected: false
          };
          result.push(a);
        });
        this.checklist = result;
        this.datas_exp = _.cloneDeep(result);
        this.datas = result;
        this.totalcount = this.datas.length;
        this.collsize = this.datas.length;
        this.userFilter = { schoolStudentID: "" };
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.newsync();
      }
    );
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

  update(event, item) {
    this.deletecheck = false;
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SAES") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      this.router.navigate(["School/updatestudent/" + item.id]);
    } else {
      alert("!You Don't Have the Access To Edit");
    }
  }

  view(event, item) {
    this.router.navigate(["School/viewstudent/" + item.id]);
  }

  parent($event, item) {
    this.router.navigate(["School/addstudentparent/" + item.id]);
  }

  enablelist() {
    for (let i = 0; i < this.checkedList.length; i++) {
      this.schools
        .fetchsinglestudents<studentlist>(this.checkedList[i])
        .subscribe(
          (data: studentlist) => {
            this.studentlist = data;
          },
          error => () => {
            /* can provide allert for error on the api */
          },
          () => {
            this.studentlist.isActive = true;
            this.schools
              .updatestudents<studentlist>(
                this.studentlist.id,
                this.studentlist
              )
              .subscribe(
                () => { },
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
      if (this.accesslist[i].code == "SADS") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      for (let i = 0; i < this.checkedList.length; i++) {
        this.schools
          .deletestudents<studentlist[]>(this.checkedList[i])
          .subscribe(
            (data: any) => { },
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

  disablelist() {
    for (let i = 0; i < this.checkedList.length; i++) {
      this.schools
        .fetchsinglestudents<studentlist>(this.checkedList[i])
        .subscribe(
          (data: studentlist) => {
            this.studentlist = data;
          },
          error => () => {
            /* can provide allert for error on the api */
          },
          () => {
            this.studentlist.isActive = false;
            this.schools
              .updatestudents<studentlist>(
                this.studentlist.id,
                this.studentlist
              )
              .subscribe(
                () => { },
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
      this.schools.fetchsinglestudents<studentlist>(data.id).subscribe(
        (data: studentlist) => {
          this.studentlist = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.studentlist.isActive = true;
          this.schools
            .updatestudents<studentlist>(this.studentlist.id, this.studentlist)
            .subscribe(
              () => { },
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
      this.schools.fetchsinglestudents<studentlist>(data.id).subscribe(
        (data: studentlist) => {
          this.studentlist = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.studentlist.isActive = false;
          this.schools
            .updatestudents<studentlist>(this.studentlist.id, this.studentlist)
            .subscribe(
              () => { },
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

    this.schools.deletestudents<studentlist[]>(item.id).subscribe(
      (data: any) => { },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        alert("deleted");
        this.ngOnInit();
      }
    );
  }

  search(StartClass, EndClass) {
    let school_id = this.getFromLocal("selected_school_id");
    this.schools
      .filterstudents<studentlist[]>(school_id, StartClass, EndClass)
      .subscribe(
        (data: studentlist[]) => {

          this.datas = data;
          this.totalcount = this.datas.length;
          this.collsize = this.datas.length;
          this.userFilter = { schoolStudentID: "" };
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.newsync();
        }
      );
  }

  uploadbulk() {
    this.router.navigate(["School/studentbulks/Student"]);
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }
}

export class studentlist {
  id: number;
  schoolID: number;
  fullName: string;
  shortName: string;
  address: string;
  grade: string;
  updateDate: string;
  updateID: number;
  isActive: boolean;
}

export class listgrade {
  id: number;
  title: string;
  updatedate: string;
}
