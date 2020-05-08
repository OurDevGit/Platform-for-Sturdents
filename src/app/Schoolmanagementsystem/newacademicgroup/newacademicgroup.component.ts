import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
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

@Component({
  selector: "app-newacademicgroup",
  templateUrl: "./newacademicgroup.component.html",
  styleUrls: ["./newacademicgroup.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewacademicgroupComponent implements OnInit {
  errormessagetime: string;
  errormessagedate: string;

  // Model for meridian timepicker
  meridianTime = { hour: 12, minute: 1 };
  meridian = true;

  // Model for meridian timepicker
  meridianTime1 = { hour: 12, minute: 1 };
  meridian1 = true;

  //Model for start date
  popupModel_startdate = { year: 2015, month: 2, day: 26 };
  popupModel1_startdata = { year: 2019, month: 1, day: 1 };

  popupModel = { year: 2019, month: 1, day: 1 };
  popupModel1 = { year: 2019, month: 1, day: 1 };

  registerForm: FormGroup;
  submitted = false;

  addacademic: AcadamicGroup;
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
  errorspecialgroup: boolean = false;
  errorgrouplength: boolean = false;

  errorondata: boolean = false;

  duplication_name: boolean;

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

  disablebutton: boolean = false;
  academic_list: any;

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
    this.listgrade = [];
    this.sclistgrade = [];
    this.eclistgrade = [];
    this.addacademic = new AcadamicGroup();
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

    let school_id = this.getFromLocal("selected_school_id");
    this.schools.acadamisschoollists<AcadamicGroup[]>(school_id).subscribe(
      (data: any[]) => {
        this.academic_list = data;
      },
      error => {},
      () => {}
    );
    //alert("" + this.getFromLocal("selected_school_timezone"));
  }

  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  toggleMeridian1() {
    this.meridian1 = !this.meridian1;
  }

  ngOnInit() {
    this.disablebutton = false;

    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SACAG") {
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
        this.cref.markForCheck();
      }
    );

    this.schools.fetchdays<fetchdays>().subscribe(
      (data: fetchdays) => {
        this.fetchdays = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {}
    );
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

    this.cref.markForCheck();
  }

  step1(StartTiming, EndTiming, AcademicStartDate, AcademicEndDate) {
    console.log('start', StartTiming, EndTiming, AcademicStartDate, AcademicEndDate)
    if (this.addacademic.startClass === "Select Start Class") {
      alert("Invalid Input in Start Class");
      this.disablebutton = false;
    } else if (this.addacademic.endClass === "Select End Class") {
      alert("Invalid Input in End Class");
      this.disablebutton = false;
    } else {
      var acadamic_startdate = moment(AcademicStartDate);
      var acadamic_enddate = moment(AcademicEndDate);
      console.log('xxxx =>', acadamic_startdate, acadamic_enddate)

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
              // alert('Start time and end time should not be same');
              this.errorendtime = true;
              this.errorstarttime = true;
              this.errormessagetime =
                "Start time and end time should not be same";
              this.disablebutton = false;
            }
          } else {
            cango = false;
            // alert('Your acadamic start date should be less than acadamic end date');
            this.errorstartdate = true;
            this.errorenddate = true;
            this.errormessagedate =
              "Your acadamic start date should be less than acadamic end date";
            this.disablebutton = false;
          }
        } else {
          cango = false;
          // alert('Acadamic End date should be between '+a.format("YYYY-MM-DD")+' and '+ b.format("YYYY-MM-DD"));
          this.errorstartdate = true;
          this.errorenddate = true;
          this.errormessagedate =
            "Acadamic End date should be between " +
            a.format("YYYY-MM-DD") +
            " and " +
            b.format("YYYY-MM-DD");
          this.disablebutton = false;
        }
      } else {

        cango = false;
        // alert('Acadamic Start date should be between '+a.format("YYYY-MM-DD")+' and '+ b.format("YYYY-MM-DD"));
        this.errorstartdate = true;
        this.errorenddate = true;
        this.errormessagedate =
          "Acadamic Start date should be between " +
          a.format("YYYY-MM-DD") +
          " and " +
          b.format("YYYY-MM-DD");
        this.disablebutton = false;
      }



      if (cango == true) {
        this.loader = true;
        this.canenablebutton = false;

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

        console.log('popupModel1_startdata =>', this.popupModel1_startdata)
        this.addacademic.academicStartDate = AcademicStartDate;
        this.addacademic.academicEndDate = AcademicEndDate;
        this.addacademic.numberofWeekDays = +this.weekday;
        this.addacademic.weekdayStart = +this.weekdaystart;
        this.addacademic.isActive = true;

        this.schools
          .addaddAcadamicGroup<AcadamicGroup>(this.addacademic)
          .subscribe(
            (data: any) => {
              console.log('response data =>', data)
              if (data.code != null && data.code == 401) {
                alert(data.status);
                this.updatestatus = false;
                this.canenablebutton = true;
                this.loader = false;
                this.loader = false;
              } else {
                this.updatestatus = true;
                this.canenablebutton = true;
                alert(
                  "Academic Group '" +
                    this.addacademic.academicGrpName +
                    "' has been created successfully"
                );
                this.router.navigate(["School/academicgroup"]);
                this.loader = false;
                this.updatestatus = false;
                this.canenablebutton = true;
              }
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
    console.log('ddd', this.popupModel1_startdata)
    this.academic_list.forEach(element => {
      if (element.academicGrpName === this.groupname) {
        this.duplication_name = true;
      }
    });
    this.disablebutton = true;
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    let muru = 0;
    if (this.groupname.match(format)) {
      muru = 1;
    }

    this.errorgroupname = false;
    this.errorstartclass = false;
    this.errorendclass = false;
    this.errorweekday = false;
    this.errorstarttime = false;
    this.errorendtime = false;
    this.errorstartdate = false;
    this.errorenddate = false;
    this.errorweekdaystart = false;
    this.errorspecialgroup = false;
    this.errorgrouplength = false;

    this.starttime =
      this.meridianTime.hour + ":" + this.meridianTime.minute + ":00";
    this.endtime =
      this.meridianTime1.hour + ":" + this.meridianTime1.minute + ":00";
    this.startdate =
      this.popupModel_startdate.year +
      "-" +
      this.popupModel_startdate.month +
      "-" +
      this.popupModel_startdate.day;
    this.enddate =
      this.popupModel1_startdata.year +
      "-" +
      this.popupModel1_startdata.month +
      "-" +
      this.popupModel1_startdata.day;
    if (this.groupname == "") {
      this.errorgroupname = true;
      this.disablebutton = false;
    }
    if (this.startclass == "") {
      this.errorstartclass = true;
      this.disablebutton = false;
    }
    if (this.endclass == "") {
      this.disablebutton = false;
      this.errorendclass = true;
      this.disablebutton = false;
    }
    if (this.weekday == "") {
      this.disablebutton = false;
      this.errorweekday = true;
      this.disablebutton = false;
    }
    if (this.starttime == "") {
      this.disablebutton = false;
      this.errorstarttime = true;
      this.disablebutton = false;
    }
    if (this.endtime == "") {
      this.errorendtime = true;
      this.disablebutton = false;
    }
    // if (this.startdate == "") {
    //   this.errorstartdate = true;
    //   this.disablebutton = false;
    // }
    // if (this.enddate == "") {
    //   this.errorenddate = true;
    //   this.disablebutton = false;
    // }
    if (this.weekdaystart == "") {
      this.errorweekdaystart = true;
      this.disablebutton = false;
    }
    if (this.groupname.length > 15) {
      this.errorgrouplength = true;
      this.disablebutton = false;
    }
    if (muru == 1) {
      this.errorspecialgroup = true;
      this.disablebutton = false;
    }
    if (this.groupname == "") {
      this.disablebutton = false;
    } else if (this.startclass == "") {
      this.disablebutton = false;
    } else if (this.endclass == "") {
      this.disablebutton = false;
    } else if (this.weekday == "") {
      this.disablebutton = false;
    } else if (this.starttime == "") {
      this.disablebutton = false;
    } else if (this.endtime == "") {
      this.disablebutton = false;
    } else if (this.startdate == "") {
      this.disablebutton = false;
    } else if (this.enddate == "") {
      this.disablebutton = false;
    } else if (this.weekdaystart == "") {
      this.disablebutton = false;
    } else if (muru == 1) {
      this.disablebutton = false;
    } else if (this.groupname.length > 15) {
      this.disablebutton = false;
    } else if (this.duplication_name === true) {
      alert("This Academic Group Name " + this.groupname + " is already Used");
      this.disablebutton = false;
      this.duplication_name = false;
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
