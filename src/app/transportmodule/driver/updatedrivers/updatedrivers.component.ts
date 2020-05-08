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
import { AlertifyService } from "app/alertify-service";


@Component({
  selector: 'app-updatedrivers',
  templateUrl: './updatedrivers.component.html',
  styleUrls: ['./updatedrivers.component.scss']
})
export class UpdatedriversComponent {
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
  contactLists: any;

  adddriver: adddriver;
  date: any;
  loader: boolean = false;

  showdisplay: boolean;
  accesslist: any;
  countrylist: any;

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
    public alertifyService: AlertifyService,

    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar,
    private formBuilder: FormBuilder
  ) {
    this.route.params.subscribe(params => {
      this.driver_id = "" + params["id"]; // (+) converts string 'id' to a number
    });
    this.adddriver = new adddriver();
    this.fetchdate()
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

     //get contry code with india top record
     let countries = require('country-data').countries;
     let country_codes = [];
     Object.keys(countries).map(function (key, index) {
       country_codes.push(key);
       if (key == 'IND') {
         country_codes.unshift(key)
       }
     });
     country_codes.splice(3, 1);
 
     this.contactLists = country_codes;

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
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,30}$")]
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
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_^\\\/&-s]{1,50}$")]
      ],
      countyCodes: [
        "",
        []
      ],
      contactNumbers: [
        "",
        [Validators.required, Validators.pattern("^[0-9_+-]{1,20}$")]
      ]
    });

    const nationality_list = ["India", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas"
      , "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands"
      , "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica"
      , "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea"
      , "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana"
      , "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland",
      , "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia"
      , "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania"
      , "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia"
      , "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal"
      , "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles"
      , "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan"
      , "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia"
      , "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay"
      , "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

    this.countrylist = nationality_list;

  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.updateDriver();
    }
  }

  updateDriver() {
    this.adddriver.dob = "" + this.popupModel.year + "-" + this.popupModel.month + "-" + this.popupModel.day;
    this.adddriver.licenseExpiry = "" + this.popupModel1.year + "-" + this.popupModel1.month + "-" + this.popupModel1.day;
    this.schools.updatedrivers<any>(this.adddriver.id, this.adddriver).subscribe(
      (data: any) => {
        this.loader = false;
      },
      error => {
        /* can provide allert for error on the api */
        this.loader = false;
        if(error.status === 404) {
          this.alertifyService.success('No data found', document.title);

        }
        if(error.status === 500) {
          this.alertifyService.success('Unexpected error.', document.title);
        }
        if(error.status === 400) {
          this.alertifyService.success('Bad input, please check input again', document.title);
        }
      },
      () => {
        this.loader = false;
        this.alertifyService.success('Driver has been Update successfully', document.title);
        this.router.navigate(["School/listdrives"]);
        this.canenablebutton = true;
      }
    );
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
  countyCode: string;
  id: number;
}

