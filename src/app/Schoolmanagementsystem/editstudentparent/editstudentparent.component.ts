import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import {
  Component,
  OnInit,
  ViewChild
} from "@angular/core";
import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { FormControl } from "@angular/forms";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewEncapsulation, Inject } from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";

@Component({
  selector: "app-editstudentparent",
  templateUrl: "./editstudentparent.component.html",
  styleUrls: ["./editstudentparent.component.scss"]
})
export class EditstudentparentComponent implements OnInit {
  @ViewChild("keywords-input", { static: false }) keywordsInput;

  public updatestudentparent: updatestudentparent;
  addacademic_id: string;
  date: any;
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
    this.updatestudentparent = new updatestudentparent();
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

    this.schools
      .fetchsinglestudentParents<updatestudentparent>(this.addacademic_id)
      .subscribe(
        (data: updatestudentparent) => {
          this.updatestudentparent = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
        }
      );
  }

  updateparents() {
    this.schools
      .updatestudentParents<updatestudentparent>(
        this.updatestudentparent.id,
        this.updatestudentparent
      )
      .subscribe(
        () => {},
        error => () => {
          alert("Some thing went wrong, please try again");
        },
        () => {
          alert("Updated Successfully");
          this.router.navigate(["School/studentparentlist"]);
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

export class updatestudentparent {
  id: number;
  studentID: number;
  parentEmail: string;
}
