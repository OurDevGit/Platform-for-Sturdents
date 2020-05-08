
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import {Inject } from "@angular/core";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";

import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { formatDate } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-viewdrivers',
  templateUrl: './viewdrivers.component.html',
  styleUrls: ['./viewdrivers.component.scss']
})
export class ViewdriversComponent implements OnInit {
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
    this.schools.fetchsingledrivers<any>(this.driver_id).subscribe(
      (data: any) => {
        this.adddriver.id = data.Id;
        this.adddriver.firstName = data.FirstName;
        this.adddriver.lastName = data.LastName;
        this.adddriver.nameInVernacular = data.NameInVernacular;
        var start_date = formatDate(
          data.DOB,
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
          data.LicenseExpiry,
          "yyyy-MM-dd",
          "en"
        );
        var splitted1s = end_date.split("-", 3);
        let d = {
          year: +splitted1s[0],
          month: +splitted1s[1],
          day: +splitted1s[2]
        };
        this.popupModel = c,
          this.popupModel1 = d,
          this.adddriver.licenseNumber = data.LicenseNumber;
        this.adddriver.nationality = data.Nationality;
        this.adddriver.gender = data.Gender;
        this.adddriver.address = data.Address;
        this.adddriver.contactNumber = data.ContactNumber;
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
      firstNames: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,50}$")]
      ],
      lastNames: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,30}$")]
      ],
      nameInVernaculars: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]
      ],
      licenseNumbers: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,30}$")]
      ],
      licenseExpirys: [
        "",
        [Validators.required]
      ],
      nationalitys: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,30}$")]
      ],
      dobs: [
        "",
        [Validators.required]
      ],
      genders: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,30}$")]
      ],
      addresss: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,30}$")]
      ],
      contactNumbers: [
        "",
        [Validators.required, Validators.pattern("^[0-9+-]{6,15}$")]
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
  firstName: string;
  lastName: string;
  nameInVernacular: string;
  licenseNumber: string;
  licenseExpiry: string;
  nationality: string;
  dob: string;
  gender: string;
  address: string;
  contactNumber: string;
  id: number;
}

