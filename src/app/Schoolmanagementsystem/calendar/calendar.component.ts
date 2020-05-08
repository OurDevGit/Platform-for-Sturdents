import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject
} from "@angular/core";
import { ExportExcellService } from "../../export-excell.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import * as _ from "lodash";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit {
  showdisplay: boolean;
  accesslist: any;
  deletecheck: boolean;

  datas_exp: any;
  users: any[];
  userFilter: any;
  listgrade: listgrade;
  listcalender: listcalender;
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

  constructor(
    private cref: ChangeDetectorRef,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    // private storage: WebStorageService,
    private exportExcell: ExportExcellService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.listcalender = new listcalender();
    this.listgrade = new listgrade();
    this.deletebutton = "false";
    this.enablebutton = "false";
    this.disablebutton = "false";
  }
  exportasExcell() {
    let datas_details = [];
    this.datas_exp.forEach(element => {
      if (element.isHoliday === true) {
        let a = {
          schoolID: element.schoolID,
          applicableClassStart: element.applicableClassStart,
          applicableClassEnd: element.applicableClassEnd,
          applicableStartDate: element.applicableStartDate,
          applicableEndDate: element.applicableEndDate,
          applicableStartTime: element.applicableStartTime,
          applicableEndTime: element.applicableEndTime,
          updateDate: element.updateDate,
          id: element.id,
          isActive: element.isActive,
          isHoliday: "Holiday",
          UpdateID: element.updateID
        };
        datas_details.push(a);
      } else {
        let a = {
          schoolID: element.schoolID,
          applicableClassStart: element.applicableClassStart,
          applicableClassEnd: element.applicableClassEnd,
          applicableStartDate: element.applicableStartDate,
          applicableEndDate: element.applicableEndDate,
          applicableStartTime: element.applicableStartTime,
          applicableEndTime: element.applicableEndTime,
          updateDate: element.updateDate,
          id: element.id,
          isActive: element.isActive,
          isHoliday: "Working Day",
          UpdateID: element.updateID
        };
        datas_details.push(a);
      }
    });

    this.exportExcell.exportAsExcelFile(datas_details, "Calendar");
  }
  ngOnInit() {
    this.deletebutton = "false";
    this.enablebutton = "false";
    this.disablebutton = "false";

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
    this.schools.listcalenders<any>(school_id).subscribe(
      (data: any) => {
        this.datas = [];
        data.forEach(element => {
          var splitted = element.applicableStartTime.split(":", 2);
          let startTime = splitted[0] + ":" + splitted[1];
          var splitted1 = element.applicableEndTime.split(":", 2);
          let endtime = splitted1[0] + ":" + splitted1[1];
          let a = {
            title: element.title,
            schoolID: element.schoolID,
            applicableClassStart: element.applicableClassStart,
            applicableClassEnd: element.applicableClassEnd,
            applicableStartDate: element.applicableStartDate,
            applicableEndDate: element.applicableEndDate,
            applicableStartTime: startTime,
            applicableEndTime: endtime,
            updateDate: element.updateDate,
            id: element.id,
            isActive: element.isActive,
            isHoliday: element.isHoliday,
            UpdateID: element.updateID,
            updateName: element.updateName
          }
          this.datas.push(a);
        });
        this.datas_exp = _.cloneDeep(data);
        this.totalcount = this.datas.length;
        this.collsize = this.datas.length;
        this.userFilter = { title: "" };
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.newsync();
        this.cref.markForCheck();
      }
    );

    this.delete = [];
    this.myForm = this.fb.group({
      useremail: this.fb.array([])
    });

    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SAVC") {
        this.showdisplay = true;
      } 
    }
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
      this.cref.markForCheck();
      this.pagedata.push(this.datas[index]);
    }

    console.log('dddd =>', this.pagedata)
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
      if (this.accesslist[i].code == "SADC") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      for (let i = 0; i < this.delete.length; i++) {
        this.schools.deletecalenders<listcalender[]>(this.delete[i]).subscribe(
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
    for (let i = 0; i < this.delete.length; i++) {
      this.schools.fetchsinglecalenders<listcalender>(this.delete[i]).subscribe(
        (data: listcalender) => {
          this.listcalender = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.listcalender.isActive = false;
          this.schools
            .updatecalenders<listcalender>(
              this.listcalender.id,
              this.listcalender
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

  Enablelist() {
    for (let i = 0; i < this.delete.length; i++) {
      this.schools.fetchsinglecalenders<listcalender>(this.delete[i]).subscribe(
        (data: listcalender) => {
          this.listcalender = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.listcalender.isActive = true;
          this.schools
            .updatecalenders<listcalender>(
              this.listcalender.id,
              this.listcalender
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
  search(StartClass, EndClass) { }
  uploadbulk() {
    //this.router.navigate(['School/rfidbulk'])
    this.router.navigate(["School/studentbulks/Calendar"]);
  }

  Disable($event, data) {
    if (data.isActive == false) {
      this.schools.fetchsinglecalenders<listcalender>(data.id).subscribe(
        (data: listcalender) => {
          this.listcalender = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.listcalender.isActive = true;
          this.schools
            .updatecalenders<listcalender>(
              this.listcalender.id,
              this.listcalender
            )
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
      this.schools.fetchsinglecalenders<listcalender>(data.id).subscribe(
        (data: listcalender) => {
          this.listcalender = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.schools
            .updatecalenders<listcalender>(
              this.listcalender.id,
              this.listcalender
            )
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

  edit($event, data) {
    this.deletecheck = false;
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SAEC") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      this.router.navigate(["School/updatecalendar/" + data.id]);
    } else {
      alert("!You Don't Have the Access To Edit");
    }
  }

  deleteacadamic(event, item) {

    this.schools.deletecalenders<listcalender[]>(item.id).subscribe(
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

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }
}
export class listcalender {
  schoolID: string;
  applicableClassStart: string;
  applicableClassEnd: string;
  applicableStartDate: string;
  applicableEndDate: string;
  applicableStartTime: string;
  applicableEndTime: string;
  updateDate: string;
  id: number;
  isActive: boolean;
  isHoliday: boolean;
  UpdateID: number;
}

export class listgrade {
  id: number;
  title: string;
  updatedate: string;
}
