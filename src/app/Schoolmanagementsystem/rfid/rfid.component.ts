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
  selector: "app-rfid",
  templateUrl: "./rfid.component.html",
  styleUrls: ["./rfid.component.scss"]
})
export class RFIDComponent implements OnInit {
  showdisplay: boolean;
  showDelete: boolean;
  schoolstudentid: studentlist[];
  accesslist: any;
  deletecheck: boolean;
  users: any[];
  datas_exp: any;
  userFilter: any;
  listRFIDs: listRFIDs;
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
  datass: any;
  listgrade: listgrade;
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
    this.showDelete = false;
    this.masterSelected = false;
    this.listRFIDs = new listRFIDs();
    this.delete = [];
    this.userFilter = "";
    this.listgrade = new listgrade();
    this.getsudentlist();
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
    this.exportExcell.exportAsExcelFile(this.datas_exp, "RFID");
  }
  ngOnInit() {
    this.deletebutton = "false";
    this.enablebutton = "false";
    this.disablebutton = "false";

    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SAVR") {
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "SADR") {
        this.showdisplay = true;
        this.showDelete = true;
      } 
    }

    this.delete = [];
    this.myForm = this.fb.group({
      useremail: this.fb.array([])
    });
    let school_id = this.getFromLocal("selected_school_id");
    this.schools.getAllRFIDs<listRFIDs[]>().subscribe(
      (data: any[]) => {
        console.log('data =>', data)
        let result = [];
        data.forEach(datas => {
          let data = {
            capacity: datas.capacity,
            driver_id: datas.driver_id,
            freequency: datas.freequency,
            id: datas.id,
            isActive: datas.isActive,
            rfiddata: datas.rfiddata,
            schoolID: datas.schoolID,
            schoolStudentID: datas.schoolStudentID,
            status: datas.status,
            type: datas.type,
            uniquenumber: datas.uniquenumber,
            updateDate: datas.updateDate,
            updateID: datas.updateID,
            updateName: datas.updateName,
            studentName: datas.studentName,
            isSelected: false
          };
          result.push(data);
        });
        this.checklist = result;
        this.datas = result;
        this.datas_exp = _.cloneDeep(result);
        this.totalcount = this.datas.length;
        this.collsize = this.datas.length;
        this.userFilter = { schoolStudentID: "" };
        this.getCheckedItemList(data);
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
    //this.router.navigate(['School/rfidbulk'])
    this.router.navigate(["School/studentbulks/RFID"]);
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
      if (this.accesslist[i].code == "SAER") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      this.router.navigate(["School/updaterfid/" + item.id]);
    } else {
      alert("!You Don't Have the Access To Edit");
    }
  }

  view(event, item) {
    this.router.navigate(["School/rfidview/" + item.id]);
  }

  checkUncheckAll(data) {
    for (var i = 0; i < this.datas.length; i++) {
      this.datas[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList(data);
  }
  isAllSelected(data) {
    this.masterSelected = this.datas.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList(data);
  }

  getCheckedItemList(data) {
    let status = data;
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i].isSelected) {
        let a = { id: this.checklist[i].id, status: this.checklist[i].status };
        this.checkedList.push(a);
      }
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
  }

  deletelist() {
    let a = 0;
    this.checkedList.forEach(element => {
      if (element.status === "Active") {
        a = a + 1;
      }
    });

    this.deletecheck = false;
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SADR") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      for (let i = 0; i < this.checkedList.length; i++) {
        if (this.checkedList[i].status !== "Active") {
          this.schools
            .deleteRFIDs<listRFIDs[]>(this.checkedList[i].id)
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
      }
      if (a > 0) {
        alert(
          "There are " + a + " Active RFID in the Selection. Unable to Delete"
        );
      }
    } else {
      alert("!You Don't Have the Access To Edit");
    }
  }

  disablelist() {
    for (let i = 0; i < this.checkedList.length; i++) {
      this.schools
        .fetchsingleRFIDs<listRFIDs>(this.checkedList[i].id)
        .subscribe(
          (data: listRFIDs) => {
            this.listRFIDs = data;
          },
          error => () => {
            /* can provide allert for error on the api */
          },
          () => {
            this.listRFIDs.isActive = false;
            this.schools
              .updateRFIDs<listRFIDs>(this.listRFIDs.id, this.listRFIDs)
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

  enablelist() {
    for (let i = 0; i < this.checkedList.length; i++) {
      this.schools
        .fetchsingleRFIDs<listRFIDs>(this.checkedList[i].id)
        .subscribe(
          (data: listRFIDs) => {
            this.listRFIDs = data;
          },
          error => () => {
            /* can provide allert for error on the api */
          },
          () => {
            this.listRFIDs.isActive = true;
            this.schools
              .updateRFIDs<listRFIDs>(this.listRFIDs.id, this.listRFIDs)
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
      this.schools.fetchsingleRFIDs<listRFIDs>(data.id).subscribe(
        (data: listRFIDs) => {
          this.listRFIDs = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.listRFIDs.isActive = true;
          this.schools
            .updateRFIDs<listRFIDs>(this.listRFIDs.id, this.listRFIDs)
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
      this.schools.fetchsingleRFIDs<listRFIDs>(data.id).subscribe(
        (data: listRFIDs) => {
          this.listRFIDs = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.listRFIDs.isActive = false;
          this.schools
            .updateRFIDs<listRFIDs>(this.listRFIDs.id, this.listRFIDs)
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

  getsudentlist() {
    let school_id = this.getFromLocal("selected_school_id");
    this.schools.liststudent<studentlist[]>(school_id).subscribe(
      (data: studentlist[]) => {
        this.schoolstudentid = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => { }
    );
  }

  deleteRFIDs(event, item) {

    this.schools.deleteRFIDs<listRFIDs[]>(item.id).subscribe(
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
      .filterrfids<listRFIDs[]>(school_id, StartClass, EndClass)
      .subscribe(
        (data: listRFIDs[]) => {
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

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }
}

export class listRFIDs {
  schoolID: number;
  schoolStudentID: string;
  rfiddata: string;
  id: number;
  isActive: boolean;
}

export class listgrade {
  id: number;
  title: string;
  updatedate: string;
}

export class studentlist {
  id: number;
  schoolID: number;
  fullName: string;
  shortName: string;
  address: string;
  schoolStudentID: string;
  grade: string;
  updateDate: string;
  updateID: number;
  isActive: boolean;
}
