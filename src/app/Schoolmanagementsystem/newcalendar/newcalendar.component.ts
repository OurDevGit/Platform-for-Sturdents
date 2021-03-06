import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { formatDate } from "@angular/common";
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
import * as _ from "lodash";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { flatMap } from "rxjs/operators";

@Component({
  selector: "app-newcalendar",
  templateUrl: "./newcalendar.component.html",
  styleUrls: ["./newcalendar.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewcalendarComponent implements OnInit {

  buttondisable: boolean = true;

  // Model for meridian timepicker
  meridianTime = { hour: 12, minute: 1 };
  meridian = true;

  // Model for meridian timepicker
  meridianTime1 = { hour: 12, minute: 1 };
  meridian1 = true;

  //Model for start date
  popupModel = { year: 2019, month: 1, day: 1 };
  popupModel1 = { year: 2019, month: 1, day: 1 };

  datechecker: number = 0;

  registerForm: FormGroup;
  submitted = false;

  listgrade: listgrade[];
  sclistgrade: listgrade[];
  eclistgrade: listgrade[];
  checkclass: number;
  errorip: boolean = false;
  erroripm: string = "";
  date: any;
  addcalender: addcalender;

  specialcheck: number;
  chartacterchck: number;
  showdisplay: boolean;
  accesslist: any;

  activeloginuser: any;
  is_submitting = true;
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
  validendclass: boolean = false;
  validstartclass: boolean = false;
  validtitle: boolean = false;

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

  ///////////////////////////////////////
  errormsgtime: string;
  errormsgdate: string;

  constructor(
    private cref: ChangeDetectorRef,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar,
    private formBuilder: FormBuilder
  ) {
    this.groupname = "";
    this.startclass = "";
    this.endclass = "";
    this.weekday = "";
    this.starttime = "";
    this.endtime = "";
    this.startdate = "";
    this.enddate = "";
    this.weekdaystart = "";

    let time = formatDate(new Date(), "hh:mm:ss", "en-US", "+0530");

    var splitted = time.split(":", 3);
    let a = { hour: +splitted[0], minute: +splitted[1] };
    var splitted1 = time.split(":", 3);
    let b = { hour: +splitted1[0], minute: +splitted1[1] };
    var start_date = formatDate(new Date(), "yyyy-MM-dd", "en");
    var splitteds = start_date.split("-", 3);
    let c = { year: +splitteds[0], month: +splitteds[1], day: +splitteds[2] };
    var end_date = formatDate(new Date(), "yyyy-MM-dd", "en");
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

    this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
    this.addcalender = new addcalender();

    this.listgrade = [];
    this.sclistgrade = [];
    this.eclistgrade = [];
    this.canenablebutton = true;

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

  ngOnInit() {
    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SACC") {
        this.showdisplay = true;
      }
    }

    let school_id = this.getFromLocal("selected_school_id");
    this.addcalender.isHoliday = false;
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
        this.is_submitting = false;
        this.cref.markForCheck();
      }
    );

    this.registerForm = this.formBuilder.group({
      titles: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9_-s]{3,50}$")]
      ],
      applicableClassStarts: ["", Validators.required],
      applicableClassEnds: ["", Validators.required],
      applicableStartDates: ["", Validators.required],
      applicableEndDates: ["", Validators.required],
      applicableStartTimes: ["", Validators.required],
      applicableEndTimes: ["", Validators.required]
    });
  }

  uploadbulk() {
    //this.router.navigate(['School/rfidbulk'])
    this.router.navigate(["School/studentbulks/Calendar"]);
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      this.addcalendar();
    }
  }

  endclasschangealert() {
    let isstart = false;
    this.eclistgrade = [];
    for (let i = 0; i < this.listgrade.length; i++) {
      if (isstart == false) {
        if (this.addcalender.applicableClassStart == this.listgrade[i].title) {
          isstart = true;
        }
      } else {
        this.eclistgrade.push(this.listgrade[i]);
      }
    }
    if (
      this.eclistgrade.length == 0 &&
      this.listgrade[this.listgrade.length - 1].title !=
      this.addcalender.applicableClassStart
    ) {
      this.eclistgrade = this.listgrade;
    }

    this.cref.markForCheck();
  }

  addcalendar() {
    this.buttondisable = false;
    this.checkclass = 0;
    this.errorip = false;
    if (this.addcalender.title === "") {
    } else {
      this.chartacterchck = 0;
      this.specialcheck = 0;
      let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      let dateformat = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
      if (this.addcalender.title.match(format)) {
        this.specialcheck = 1;
      } else if (this.addcalender.title.length > 50) {
        this.chartacterchck = 1;
      }
      if (this.specialcheck == 1) {
        this.validtitle = true;
      } else if (this.chartacterchck == 1) {
        this.validtitle = true;
      } else {
        if (
          this.addcalender.applicableStartDate.match(dateformat) &&
          this.addcalender.applicableEndDate.match(dateformat)
        ) {
          this.addcalenders();
        } else {
          alert("Check Start and end date format ");
        }
      }
    }
  }

  addcalenders() {
    this.addcalender.applicableStartDate = formatDate(
      this.addcalender.applicableStartDate,
      "yyyy-MM-dd",
      "en"
    );
    this.addcalender.applicableEndDate = formatDate(
      this.addcalender.applicableEndDate,
      "yyyy-MM-dd",
      "en"
    );
    this.datechecker = 0;

    if (
      this.addcalender.applicableStartDate > this.addcalender.applicableEndDate
    ) {
      // cango = false;
      this.datechecker = 1;
      this.errormsgdate = "End date should not be lesser than Start date";
      this.errorstartdate = true;
      this.errorenddate = true;
    }

    this.addcalender.applicableStartDate = formatDate(
      this.addcalender.applicableStartDate,
      "yyyy-MM-dd",
      "en"
    );
    this.addcalender.applicableEndDate = formatDate(
      this.addcalender.applicableEndDate,
      "yyyy-MM-dd",
      "en"
    );
    if (this.addcalender.applicableClassStart === "Select Start Class") {
      this.validstartclass = true;
    } else if (this.addcalender.applicableClassEnd === "Select End Class") {
      this.validendclass = true;
    } else {
      var cango = true;
      if (
        this.addcalender.applicableStartTime !=
        this.addcalender.applicableEndTime
      ) {
        cango = true;
      } else {
        cango = false;
        // alert('Start time and end time should not be same');
        this.errormsgtime = "Start time and end time should not be same";
        this.errorstarttime = true;
        this.errorendtime = true;
      }
      if (cango == true) {
        this.errorstarttime = false;
        this.errorendtime = false;
        if (this.datechecker == 0) {
          this.canenablebutton = false;
          let school_id = +this.getFromLocal("selected_school_id");
          this.addcalender.schoolID = school_id;
          this.addcalender.UpdateID = this.activeloginuser.id;
          this.addcalender.updateName = this.activeloginuser.first_name;
          this.addcalender.updateDate = formatDate(
            new Date(),
            "yyyy-MM-dd",
            "en"
          );
          this.schools.addcalenders<addcalender>(this.addcalender).subscribe(
            (data: addcalender) => {
            },
            error => () => {
              /* can provide allert for error on the api */

              this.canenablebutton = true;
            },
            () => {
              alert("New calendar has been added successfully");
              this.canenablebutton = true;
              this.router.navigate(["School/calendar"]);
            }
          );
        }
      }
    }
  }

  add() {

    this.errorgroupname = false;
    this.errorstartclass = false;
    this.errorendclass = false;
    this.errorstarttime = false;
    this.errorendtime = false;
    this.errorstartdate = false;
    this.errorenddate = false;
    this.validendclass = false;
    this.validtitle = false;
    this.validstartclass = false;

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
    if (this.groupname == "") {
    } else if (this.startclass == "") {
    } else if (this.endclass == "") {
    } else if (this.starttime == "") {
    } else if (this.endtime == "") {
    } else if (this.startdate == "") {
    } else if (this.enddate == "") {
    } else {
      // this.buttondisable = false;
      this.addcalender.title = this.groupname;
      this.addcalender.applicableClassStart = this.startclass;
      this.addcalender.applicableClassEnd = this.endclass;
      this.addcalender.applicableStartTime = this.starttime;
      this.addcalender.applicableEndTime = this.endtime;
      this.addcalender.applicableStartDate = this.startdate;
      this.addcalender.applicableEndDate = this.enddate;
      this.addcalendar();
    }
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }
  getFromLocal(key): any {
    return this.storage.get(key);
  }
}

export class addcalender {
  schoolID: number;
  title: string;
  applicableClassStart: string;
  applicableClassEnd: string;
  applicableStartDate: string;
  applicableEndDate: string;
  applicableStartTime: string;
  applicableEndTime: string;
  updateDate: string;
  isHoliday: boolean;
  UpdateID: number;
  updateName: string;
}

export class listgrade {
  id: number;
  title: string;
  updatedate: string;
}
