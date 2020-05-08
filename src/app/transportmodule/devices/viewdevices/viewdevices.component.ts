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

import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { formatDate } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { json } from "d3";
@Component({
  selector: 'app-viewdevices',
  templateUrl: './viewdevices.component.html',
  styleUrls: ['./viewdevices.component.scss']
})
export class ViewdevicesComponent implements OnInit {

  driver_id: string;

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

  adddriver: adddriver;
  date: any;
  loader: boolean = false;

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
      this.driver_id = "" + params["id"]; // (+) converts string 'id' to a number
    });
    this.fetchdate()

    this.adddriver = new adddriver();

  }

  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  fetchdate() {
    this.schools.fetchdevices<any>(this.driver_id).subscribe(
      (data: any) => {
        this.adddriver.id = data.Id
        this.adddriver.imei = data.IMEI
        this.adddriver.adminNo = data.AdminNo
        this.adddriver.make = data.Make
        this.adddriver.model = data.Model
        this.adddriver.type = data.Type
        this.ref.markForCheck();
      },
      error => {
        /* can provide allert for error on the api */
      },
      () => {

      }
    );
  }
  toggleMeridian1() {
    this.meridian1 = !this.meridian1;
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      imeis: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,50}$")]
      ],
      adminNos: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,30}$")]
      ],
      makes: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,30}$")]
      ],
      models: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,30}$")]
      ],
      types: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,30}$")]
      ],
      TdeviceIds: [
        "", 
        [Validators.required, Validators.pattern("^[ 0-9]{1,20}$")]
      ]
    });

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

    }
  }

}

export class adddriver {
  imei: string;
  adminNo: string;
  make: string;
  model: string;
  type: string;
  id: number;
}

