import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { formatDate } from "@angular/common";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { Component, OnInit, ChangeDetectionStrategy, Injectable } from "@angular/core";
import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { FormControl } from "@angular/forms";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewEncapsulation, Inject } from "@angular/core";
import { NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomDateParserFormatter } from '../../../utils/dateformat';
import { AlertifyService } from "app/alertify-service";


@Component({
  selector: 'app-adddrivers',
  templateUrl: './adddrivers.component.html',
  styleUrls: ['./adddrivers.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})

@Injectable()


export class AdddriversComponent implements OnInit {

  private headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    // 'Access-Control-Allow-Credentials': true 
  });

  showdisplay: boolean;
  parentdublicate: any;
  accesslist: any;
  registerForm: FormGroup;
  submitted = false;
  listparents: listparents;
  datas: any;
  contactLists: any;
  check: number;
  countrylist: any;
  date: any;
  adddriver: adddriver;
  activeloginuser: any;
  canenablebutton: boolean = true;
  result: any;

  popupModel = { year: 2019, month: 1, day: 1 };
  popupModel1 = { year: 2019, month: 1, day: 1 };
  expiry_data: any;

  loader = false;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    public alertifyService: AlertifyService,
    private http: HttpClient,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar,
    private formBuilder: FormBuilder
  ) {
    this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
    this.adddriver = new adddriver();
    this.listparents = new listparents();
    this.parentdublicate = new parentdublicates();

    this.canenablebutton = true;
    this.showdisplay = false;
  }

  ngOnInit() {
    // var current_year = new Date().getFullYear();
    // var current_month = new Date().getMonth() + 1;
    // var current_date = new Date().getDate();

    // this.expiry_data = {year: current_year, month: current_month, day: current_date};

    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "TMCDR") {
        this.showdisplay = true;
      } 
    }

    var end_date = formatDate(new Date(), "yyyy-MM-dd", "en");
    var splitted1s = end_date.split("-", 3);
    let d = {
      year: +splitted1s[0],
      month: +splitted1s[1],
      day: +splitted1s[2]
    };


    this.popupModel = d;
    this.popupModel1 = d;

    let school_id = this.getFromLocal("selected_school_id");

    this.registerForm = this.formBuilder.group({
      firstNames: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,15}$")]
      ],
      lastNames: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,15}$")]
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
      this.addDriver();
    }
  }
  uploadbulk() {
    this.router.navigate(["School/studentbulks/Parent"]);
  }

  onChange(email) {
    this.check = 0;
    for (let i = 0; i < this.datas.length; i++) {
      if (this.datas[i].email == email) {
        this.datas[i].email;
        this.check = 1;
      }
    }
  }

  addDriver() {
    this.adddriver.dob = "" + this.popupModel.year + "-" + this.popupModel.month + "-" + this.popupModel.day;
    this.adddriver.licenseExpiry = "" + this.popupModel1.year + "-" + this.popupModel1.month + "-" + this.popupModel1.day;
    this.schools.adddrivers<adddriver>(this.adddriver).subscribe(
      (data: adddriver) => {
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
        this.alertifyService.success('Driver has been created successfully"', document.title);
        this.router.navigate(["School/listdrives"]);
        this.canenablebutton = true;
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
}

export class listparents {
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
}

export class parentdublicates {
  email: string;
}
