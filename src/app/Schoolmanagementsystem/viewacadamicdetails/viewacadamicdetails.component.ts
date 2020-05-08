import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
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

const now = new Date();
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one &&
  two &&
  two.year === one.year &&
  two.month === one.month &&
  two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two
    ? false
    : one.year === two.year
    ? one.month === two.month
      ? one.day === two.day
        ? false
        : one.day < two.day
      : one.month < two.month
    : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two
    ? false
    : one.year === two.year
    ? one.month === two.month
      ? one.day === two.day
        ? false
        : one.day > two.day
      : one.month > two.month
    : one.year > two.year;

@Component({
  selector: "app-viewacadamicdetails",
  templateUrl: "./viewacadamicdetails.component.html",
  styleUrls: ["./viewacadamicdetails.component.scss"]
})
export class ViewacadamicdetailsComponent implements OnInit {
  @ViewChild("keywords-input", { static: false }) keywordsInput;

  fetchdayss: any;
  public UpdateAcadamicGroup: updateAcadamicGroup;
  addacademic_id: string;
  date: any;
  fetchdays: fetchdays;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  public dateTimeRange: Date[];
  public dateTime1: Date;
  public dateTime2: Date;

  public dateTime3: Date;
  // Model for basic timepicker
  basicTime = { hour: 13, minute: 30 };
  // Model for meridian timepicker
  meridianTime = { hour: 13, minute: 30 };
  meridian = true;
  // Model for seconds timepicker
  secondsTime: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };
  seconds = true;
  // Model for spinners timepicker
  spinnersTime = { hour: 13, minute: 30 };
  spinners = true;
  // Model for custom steps timepicker
  customStepsTime: NgbTimeStruct = { hour: 13, minute: 30, second: 0 };
  hourStep = 1;
  minuteStep = 15;
  secondStep = 30;
  // Model for custom validation timepicker
  time;
  ctrl = new FormControl("", (control: FormControl) => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (value.hour < 12) {
      return { tooEarly: true };
    }
    if (value.hour > 13) {
      return { tooLate: true };
    }
    return null;
  });

  // Model for basic datepicker
  basicModel: NgbDateStruct;
  basicDate: { year: number; month: number };
  // Model for datepicker with popup
  popupModel;
  // Model for multi month datepicker
  displayMonths = 1;
  navigation = "select";
  // Model for range selection
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  // Model for disabled datepiker
  disabledModel: NgbDateStruct = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };
  disabled = true;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar
  ) {
    this.route.params.subscribe(params => {
      this.addacademic_id = params["id"]; // (+) converts string 'id' to a number
    });
    this.fetchdays = new fetchdays();
    this.UpdateAcadamicGroup = new updateAcadamicGroup();
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
  }

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: "Mumbai" },
      { item_id: 2, item_text: "Bangaluru" },
      { item_id: 3, item_text: "Pune" },
      { item_id: 4, item_text: "Navsari" },
      { item_id: 5, item_text: "New Delhi" }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: "Pune" },
      { item_id: 4, item_text: "Navsari" }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.schools.fetchdays<fetchdays>().subscribe(
      (data: fetchdays) => {
        this.fetchdayss = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
      }
    );

    this.schools
      .fetchsingacadamics<updateAcadamicGroup>(this.addacademic_id)
      .subscribe(
        (data: updateAcadamicGroup) => {
          this.UpdateAcadamicGroup = data;

          var splitted = this.UpdateAcadamicGroup.startTiming.split(":", 2);
          let startTime = splitted[0] + ":" + splitted[1];
          var splitted1 = this.UpdateAcadamicGroup.endTiming.split(":", 2);
          let endtime = splitted1[0] + ":" + splitted1[1];
          this.UpdateAcadamicGroup.startTiming = startTime;
          this.UpdateAcadamicGroup.endTiming = endtime;
        },

        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
        }
      );
  }
  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  toggleSeconds() {
    this.seconds = !this.seconds;
  }

  toggleSpinners() {
    this.spinners = !this.spinners;
  }
  selectToday() {
    this.basicModel = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
  }

  // Methods for range selection
  isHovered = date =>
    this.fromDate &&
    !this.toDate &&
    this.hoveredDate &&
    after(date, this.fromDate) &&
    before(date, this.hoveredDate);

  isInside = date => after(date, this.fromDate) && before(date, this.toDate);

  isFrom = date => equals(date, this.fromDate);

  isTo = date => equals(date, this.toDate);

  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }
  onItemSelect(item: any) {
  }
  onSelectAll(items: any) {
  }

  addaacadamicgroup(StartTiming, EndTiming) {
    this.UpdateAcadamicGroup.academicEndDate = this.UpdateAcadamicGroup.academicStartDate[1];
    this.UpdateAcadamicGroup.endTiming = EndTiming;
    this.UpdateAcadamicGroup.startTiming = StartTiming;
    this.UpdateAcadamicGroup.numberofWeekDays = +this.UpdateAcadamicGroup
      .numberofWeekDays;
    this.UpdateAcadamicGroup.weekdayStart = +this.UpdateAcadamicGroup
      .weekdayStart;
    this.UpdateAcadamicGroup.academicStartDate = this.UpdateAcadamicGroup.academicStartDate[0];
    this.UpdateAcadamicGroup.updateID = 1;
    this.UpdateAcadamicGroup.updateDate = formatDate(
      new Date(),
      "yyyy-MM-dd",
      "en"
    );
    this.UpdateAcadamicGroup.schoolID = this.getFromLocal("selected_school_id");
    this.schools
      .updateacadamics<updateAcadamicGroup>(
        this.UpdateAcadamicGroup.id,
        this.UpdateAcadamicGroup
      )
      .subscribe(
        () => {},
        error => () => {
          alert("Some thing went wrong, please try again");
        },
        () => {
          alert("Updated Successfully");
          this.router.navigate(["School/academicgroup"]);
        }
      );
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }

  Disable() {
    if (this.UpdateAcadamicGroup.isActive == true)
      this.UpdateAcadamicGroup.isActive = false;
    else this.UpdateAcadamicGroup.isActive = true;
    this.schools
      .updateacadamics<updateAcadamicGroup>(
        this.UpdateAcadamicGroup.id,
        this.UpdateAcadamicGroup
      )
      .subscribe(
        () => {},
        error => () => {
          alert("Some thing went wrong, please try again");
        },
        () => {
          // this.router.navigate(['School/academicgroup'])
          this.ngOnInit();
        }
      );
  }
}

export class updateAcadamicGroup {
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
  updateName: string;
}

export class fetchdays {
  id: number;
  datFullName: string;
  day: string;
}
