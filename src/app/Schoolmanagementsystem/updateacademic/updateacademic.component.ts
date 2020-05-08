import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { FormControl } from "@angular/forms";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewEncapsulation, Inject } from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { AcadamicGroup } from "../schooldata";
import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { formatDate } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { json } from "d3";

@Component({
  selector: "app-updateacademic",
  templateUrl: "./updateacademic.component.html",
  styleUrls: ["./updateacademic.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateacademicComponent implements OnInit {
  addacademic_id: string;

  // Model for meridian timepicker
  meridianTime = { hour: 12, minute: 1 };
  meridian = true;

  // Model for meridian timepicker
  meridianTime1 = { hour: 12, minute: 1 };
  meridian1 = true;

  //Model for start date
  popupModel = { year: 2019, month: 1, day: 1 };
  popupModel1 = { year: 2019, month: 1, day: 1 };

  registerForm: FormGroup;
  submitted = false;

  addacademic: AcadamicGroups;
  date: any;
  loader: boolean = false;
  fetchdays: fetchdays;
  listgrade: listgrade[];
  sclistgrade: listgrade[];
  eclistgrade: listgrade[];
  showdisplay: boolean;
  accesslist: any;

  startYear: Date = new Date();
  endYear: Date = new Date();

  startYear_s: string = "";
  endYear_s: string = "";
  activeloginuser: any;

  updatestatus: boolean = false;
  canenablebutton: boolean = true;

  ///////errorlogs//////////////////
  errorgroupname: boolean = false;
  errorstartclass: boolean = false;
  errorendclass: boolean = false;
  errorweekday: boolean = false;
  errorstarttime: boolean = false;
  errorendtime: boolean = false;
  errorstartdate: boolean = false;
  errorenddate: boolean = false;
  errorweekdaystart: boolean = false;
  errorgrouplength: boolean = false;

  errormessagetime: string;
  errormessagedate: string;

  /////////////initia/////////////////
  groupname: string;
  startclass: string;
  endclass: string;
  weekday: string;
  starttime: string;
  startdate: string;
  enddate: string;
  endtime: string;
  weekdaystart: string;

  constructor(
    @Inject(ChangeDetectorRef) private ref: ChangeDetectorRef,
    private cref: ChangeDetectorRef,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar,
    private formBuilder: FormBuilder
  ) {
    this.route.params.subscribe(params => {
      this.addacademic_id = "" + params["id"]; // (+) converts string 'id' to a number
    });
    this.fetchdate();
    this.addacademic = new AcadamicGroups();
    this.startclass = "";
    this.endclass = "";
    this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
    this.listgrade = [];
    this.sclistgrade = [];
    this.eclistgrade = [];
    this.fetchdays = new fetchdays();
    this.startYear.setDate(this.startYear.getDate() - 0);
    this.endYear.setDate(this.endYear.getDate() + 0);
    this.startYear_s = moment(this.startYear)
      .subtract(3, "year")
      .format("YYYY-MM-DD");
    this.endYear_s = moment(this.endYear)
      .add(3, "year")
      .format("YYYY-MM-DD");
    this.canenablebutton = true;
  }

  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  fetchdate() {
    ///**fetch class */
    let school_id = this.getFromLocal("selected_school_id");
    this.schools.listgrades<listgrade[]>(school_id).subscribe(
      (data: listgrade[]) => {
        this.listgrade = data;
        this.sclistgrade = data;
        this.eclistgrade = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.schools.fetchdays<fetchdays>().subscribe(
          (data: fetchdays) => {
            this.fetchdays = data;
          },
          error => () => {
            /* can provide allert for error on the api */
          },
          () => {
            this.schools.fetchsingacadamics<any>(this.addacademic_id).subscribe(
              (data: any) => {
                this.groupname = data.academicGrpName;
                this.startclass = data.startClass;
                this.endclass = data.endClass;
                this.weekday = data.numberofWeekDays;
                var splitted = data.startTiming.split(":", 3);
                let a = { hour: +splitted[0], minute: +splitted[1] };
                var splitted1 = data.endTiming.split(":", 3);
                let b = { hour: +splitted1[0], minute: +splitted1[1] };
                var start_date = formatDate(
                  data.academicStartDate,
                  "yyyy-MM-dd",
                  "en"
                );
                var splitteds = start_date.split("-", 3);
                let c = {
                  year: +splitteds[0],
                  month: +splitteds[1],
                  day: +splitteds[2]
                };
                var end_date = formatDate(
                  data.academicEndDate,
                  "yyyy-MM-dd",
                  "en"
                );
                var splitted1s = end_date.split("-", 3);
                let d = {
                  year: +splitted1s[0],
                  month: +splitted1s[1],
                  day: +splitted1s[2]
                };
                this.meridianTime = a;
                this.meridianTime1 = b;
                this.popupModel = c;
                this.popupModel1 = d;
                this.weekdaystart = data.weekdayStart;
                this.startclass = data.startClass;
                this.endclass = data.endClass;
                this.ref.markForCheck();
              },
              error => {
                /* can provide allert for error on the api */
              },
              () => {}
            );
          }
        );
      }
    );
  }
  toggleMeridian1() {
    this.meridian1 = !this.meridian1;
  }

  ngOnInit() {
    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "MAI") {
        this.showdisplay = true;
      }
    }

    this.registerForm = this.formBuilder.group({
      AcademicGrpNames: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9_-s]{3,15}$")]
      ],
      StartClasss: ["", Validators.required],
      EndClasss: ["", Validators.required],
      StartTimings: ["", Validators.required],
      EndTimings: ["", Validators.required],
      AcademicStartDates: ["", Validators.required],
      AcademicEndDates: ["", Validators.required],
      weekdays: ["", Validators.required],
      nowedays: ["", Validators.required]
    });
  }

  endclasschangealert() {
    let isstart = false;
    this.eclistgrade = [];
    for (let i = 0; i < this.listgrade.length; i++) {
      if (isstart == false) {
        if (this.addacademic.startClass == this.listgrade[i].title) {
          isstart = true;
          this.eclistgrade.push(this.listgrade[i]);
        }
      } else {
        this.eclistgrade.push(this.listgrade[i]);
      }
    }
    if (
      this.eclistgrade.length == 0 &&
      this.listgrade[this.listgrade.length - 1].title !=
        this.addacademic.startClass
    ) {
      this.eclistgrade = this.listgrade;
    }
  }

  step1(StartTiming, EndTiming, AcademicStartDate, AcademicEndDate) {
    if (this.addacademic.startClass === "Select Start Class") {
      alert("Invalid Input in Start Class");
    } else if (this.addacademic.endClass === "Select End Class") {
      alert("Invalid Input in End Class");
    } else {
      var acadamic_startdate = moment(AcademicStartDate);
      var acadamic_enddate = moment(AcademicEndDate);
      var acadamic_st_time = moment(StartTiming);
      var acadamic_end_time = moment(EndTiming);
      var cango1 = false;
      var cango = true;
      var a = moment(this.startYear).subtract(5, "year");
      var b = moment(this.endYear).add(5, "year");
      if (a < acadamic_startdate && b > acadamic_startdate) {
        if (a < acadamic_enddate && b > acadamic_enddate) {
          if (acadamic_startdate < acadamic_enddate) {
            if (StartTiming != EndTiming) {
              cango = true;
            } else {
              cango = false;

              this.errorendtime = true;
              this.errorstarttime = true;
              this.errormessagetime =
                "Start time and end time should not be same";
            }
          } else {
            cango = false;
            this.errorstartdate = true;
            this.errorenddate = true;
            this.errormessagedate =
              "Your acadamic start date should be less than acadamic end date";
          }
        } else {
          cango = false;
          this.errorstartdate = true;
          this.errorenddate = true;
          this.errormessagedate =
            "Acadamic End date should be between " +
            a.format("YYYY-MM-DD") +
            " and " +
            b.format("YYYY-MM-DD");
        }
      } else {
        cango = false;
        this.errorstartdate = true;
        this.errorenddate = true;
        this.errormessagedate =
          "Acadamic End date should be between " +
          a.format("YYYY-MM-DD") +
          " and " +
          b.format("YYYY-MM-DD");
      }

      if (cango == true) {
        this.loader = true;
        this.canenablebutton = false;
        this.addacademic.id = +this.addacademic_id;
        this.addacademic.schoolID = this.getFromLocal("selected_school_id");
        this.addacademic.updateID = this.activeloginuser.id;
        this.addacademic.updateName = this.activeloginuser.first_name;
        this.addacademic.updateDate = formatDate(
          new Date(),
          "yyyy-MM-dd",
          "en"
        );
        this.addacademic.academicGrpName = this.groupname;
        this.addacademic.startClass = this.startclass;
        this.addacademic.endClass = this.endclass;
        this.addacademic.startTiming = StartTiming;
        this.addacademic.endTiming = EndTiming;
        this.addacademic.academicStartDate = AcademicStartDate;
        this.addacademic.academicEndDate = AcademicEndDate;
        this.addacademic.numberofWeekDays = +this.weekday;
        this.addacademic.weekdayStart =  +this.weekdaystart ;
        this.addacademic.isActive = true;
        this.schools
          .updateacadamics<AcadamicGroups>(
            this.addacademic.id,
            this.addacademic
          )
          .subscribe(
            (data: any) => {
              alert(
                "Academic Group '" +
                  this.addacademic.academicGrpName +
                  "' has been Updated successfully"
              );
              this.router.navigate(["School/academicgroup"]);
              
            },
            error => {
              /* can provide allert for error on the api */
              this.loader = false;
            },
            () => {
              this.loader = false;
              
            }
          );
      }
    }
  }

  add() {
    this.errorgroupname = false;
    this.errorstartclass = false;
    this.errorendclass = false;
    this.errorweekday = false;
    this.errorstarttime = false;
    this.errorendtime = false;
    this.errorstartdate = false;
    this.errorenddate = false;
    this.errorweekdaystart = false;
    this.errorgrouplength = false;

    this.starttime =
      this.meridianTime.hour + ":" + this.meridianTime.minute + ":00";
    this.endtime =
      this.meridianTime1.hour + ":" + this.meridianTime1.minute + ":00";
    this.startdate =
      this.popupModel.year +
      "-" +
      this.popupModel.month +
      "-" +
      this.popupModel.day;
    this.enddate =
      this.popupModel1.year +
      "-" +
      this.popupModel1.month +
      "-" +
      this.popupModel1.day;
    if (this.groupname == "") {
      this.errorgroupname = true;
    }
    if (this.startclass == "") {
      this.errorstartclass = true;
    }
    if (this.endclass == "") {
      this.errorendclass = true;
    }
    if (this.weekday == "") {
      this.errorweekday = true;
    }
    if (this.starttime == "") {
      this.errorstarttime = true;
    }
    if (this.endtime == "") {
      this.errorendtime = true;
    }
    if (this.startdate == "") {
      this.errorstartdate = true;
    }
    if (this.enddate == "") {
      this.errorenddate = true;
    }
    if (this.weekdaystart == "") {
      this.errorweekdaystart = true;
    }
    if (this.groupname.length > 50) {
      this.errorgrouplength = true;
    }
    if (this.groupname == "") {
    } else if (this.startclass == "") {
    } else if (this.endclass == "") {
    } else if (this.weekday == "") {
    } else if (this.starttime == "") {
    } else if (this.endtime == "") {
    } else if (this.startdate == "") {
    } else if (this.enddate == "") {
    } else if (this.weekdaystart == "") {
    } else {
      this.step1(this.starttime, this.endtime, this.startdate, this.enddate);
    }
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }
  getFromLocal(key): any {
    return this.storage.get(key);
  }
}

export class fetchdays {
  id: number;
  datFullName: string;
  day: string;
}
export class listgrade {
  id: number;
  title: string;
  updatedate: string;
}

export class addacademic {
  schoolID: number;
  applicableClassStart: string;
  applicableClassEnd: string;
  applicableStartDate: Date;
  applicableEndDate: Date;
  applicableStartTime: string;
  applicableEndTime: string;
  updateDate: string;
  AcademicStartDate: string;
  AcademicEndDate: string;
  NumberofWeekDays: string;
  weekdayStart: string;
  updateName: string;
  code: number;
  status: string;
}

export class AcadamicGroups {
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
  updateName: string;
  id: number;
}
