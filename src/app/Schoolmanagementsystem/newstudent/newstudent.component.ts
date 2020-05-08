import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { formatDate } from "@angular/common";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewEncapsulation, Inject } from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-newstudent",
  templateUrl: "./newstudent.component.html",
  styleUrls: ["./newstudent.component.scss"]
})
export class NewstudentComponent implements OnInit {

  // Model for meridian timepicker
  meridianTime = { hour: 12, minute: 1 };
  meridian = true;

  // Model for meridian timepicker
  meridianTime1 = { hour: 12, minute: 1 };
  meridian1 = true;

  //Model for start date
  popupModel = { year: 2019, month: 1, day: 1 };
  popupModel1 = { year: 2019, month: 1, day: 1 };

  private years: string[] = [];
  private yy: string;
  private nyy: number;

  showdisplay: boolean;
  accesslist: any;
  listgrade: listgrade;

  listgrades:any;

  date: any;
  addstudents: addstudent;
  countrylist: any;
  loader: boolean = false;
  result: any;
  studentdublicates: any;
  registerForm: FormGroup;
  submitted = false;
  activeloginuser: any;

  ///////errorlogs//////////////////
  errorschostuid: boolean = false;
  errorschostuidlength: boolean = false;
  errorfullname: boolean = false;
  errorshortname: boolean = false;
  errorcountcode1: boolean = false;
  errorprimarynum: boolean = false;
  errorcountrycode2: boolean = false;
  errorsecondarynumber: boolean = false;
  errorgeoloc: boolean = false;
  erroracadmicyear: boolean = false;
  errorgrade: boolean = false;
  erroraddress: boolean = false;

  errormobilenumber1: boolean = false;
  errormobilenumber2: boolean = false;

  errorfullnamelength: boolean = false;
  errorshortnamelength: boolean = false;
  erroraddressnamelength: boolean = false;

  errorfullnamespecial: boolean = false;
  errorshortnamespecial: boolean = false;
  erroraddressnamespeical: boolean = false;

  /////////////initia/////////////////
  schoolstuid: string;
  fullname: string;
  shortname: string;
  countrycode1: string;
  primarynumber: string;
  countrycode2: string;
  secondarynumber: string;
  geolocation: string;
  academicyear: string;
  grade: string;
  addresss: string;
  routes:string;

  ////////////specialchar///////////////
  errorschostuid1: boolean = false;
  errorgeoloc1: boolean = false;

  routeslist:any;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar,
    private formBuilder: FormBuilder
  ) {
    this.schoolstuid = "";
    this.fullname = "";
    this.shortname = "";
    this.countrycode1 = "";
    this.primarynumber = "";
    this.countrycode2 = "";
    this.secondarynumber = "";
    this.geolocation = "";
    this.academicyear = "";
    this.grade = "";
    this.addresss = "";
    this.routes = "";

    this.countrycode1 = "";
    this.countrycode2 = "";

    this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
    this.addstudents = new addstudent();
    this.studentdublicates = new studentdublicates();
    this.listgrade = new listgrade();

    this.httpService.get("./assets/data/CountryCodes.json").subscribe(
      data => {
        this.countrylist = data as string[]; // FILL THE ARRAY WITH DATA.
      },
      (err: HttpErrorResponse) => {
      }
    );

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

    this.schools.routeslists<any[]>().subscribe(
      (data:any) => {
        this.routeslist = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
      }
    );

  }

  onChange(id){
    for (let a = 0 ; a < this.routeslist.length ; a ++){
      if(this.routeslist[a].RouteId == id){
        this.addstudents.routeId =  this.routeslist[a].RouteId;
        this.addstudents.routeName =  this.routeslist[a].RouteName
      }
    }

  }
  
  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  toggleMeridian1() {
    this.meridian1 = !this.meridian1;
  }

  getYear() {
    var today = new Date();
    if (today.getMonth() < 5) {
      this.yy = "" + today.getFullYear();
    } else this.yy = "" + today.getFullYear();
    this.nyy = today.getFullYear();

    this.addstudents.acadamicYear = "" + this.yy;
    let y = this.nyy;
    let x = this.nyy + 5;
    for (let i = y; i < this.nyy; i++) {
      this.years.push(i - 1 + " - " + i);
    }
    for (let j = this.nyy; j < x; j++) {
      this.years.push(j - 1 + " - " + j);
    }
    this.academicyear = this.years[0];
  }

  ngOnInit() {
    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SACS") {
        this.showdisplay = true;
      }
    }

    this.getYear();
    let school_id = this.getFromLocal("selected_school_id");
    ///**fetch class */
    this.schools.listgrades<listgrade>(school_id).subscribe(
      (data: listgrade) => {
        this.listgrade = data;
        this.listgrades = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
      }
    );
    this.registerForm = this.formBuilder.group({
      FullNames: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9_-s]{3,25}$")]
      ],
      ShortNames: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,25}$")]
      ],
      Addresss: [
        "",
        [
          Validators.required,
          Validators.pattern("^[ _,-./@a-zA-Z_-s0-9_-s]{15,250}$")
        ]
      ],
      GeoLocations: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9_-s]{10,25}$")]
      ],
      GeoLocation2: new FormControl("", Validators.required),
      GeoLocation3: new FormControl("", Validators.required),
      SchoolStudentIDs: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9_-s]{1,25}$")]
      ],
      PMobiles: [
        "",
        [Validators.required, Validators.pattern("^[0-9+-]{6,15}$")]
      ],
      SMobiles: [
        "",
        [Validators.required, Validators.pattern("^[0-9+-]{6,15}$")]
      ],
      AcadamicYears: ["", Validators.required]
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
      this.addstudent1();
    }
  }

  uploadbulk() {
    this.router.navigate(["School/studentbulks/Student"]);
  }

  uploadbulk2() {
    this.router.navigate(["School/studentbulks/StudentPromote"]);
  }

  gradefetch(gradeid){
    for(let b  = 0 ; b < this.listgrades.length ; b++){
      if(this.listgrades[b].id == gradeid )
             {
               this.addstudents.gradeName = this.listgrades[b].title;
               this.addstudents.gradeId = +gradeid
             }
    }
  }

  addstudent1() {
    this.studentdublicates = [];
    let a = {
      schoolStudentID: this.addstudents.schoolStudentID
    };
    this.studentdublicates.push(a);
    let school_id = this.getFromLocal("selected_school_id");
    this.schools
      .checkuploads2<studentdublicates[]>(this.studentdublicates, +school_id)
      .subscribe(
        (data: studentdublicates[]) => {
          this.result = data;
        },
        error => () => {
          alert("Some thing went wrong, please try again");
        },
        () => {
          if (this.result.length == 0) {
            this.loader = true;
            this.addstudents.schoolID = +this.getFromLocal(
              "selected_school_id"
            );
            this.addstudents.updateDate = formatDate(
              new Date(),
              "dd MMM yyyy",
              "en-US"
            );
            let month = new Date().getMonth();
            this.addstudents.updateID = this.activeloginuser.id;
            this.addstudents.updateName = this.activeloginuser.first_name;
            this.addstudents.isActive = true;
            this.addstudents.pMobile = "" + this.addstudents.pMobile;
            this.addstudents.sMobile = "" + this.addstudents.sMobile;
            this.addstudents.acadamicMonth = +month + 1 ;
            this.addstudents.rfid = 0 ;
            this.addstudents.rfidName = "Not Registered";
            this.schools.addstudents<addstudent>(this.addstudents).subscribe(
              (data: addstudent) => {
              },
              error => () => {
                this.loader = false;
                /* can provide allert for error on the api */
              },
              () => {
                this.loader = false;
                alert("Student has been created successfully");
                this.router.navigate(["School/student"]);
              }
            );
          } else {
            alert("This SchoolStudent-id is Already Exists");
          }
        }
      );

    ////////////////////////////////////////
  }
  /////////////////////////////////////

  getFromLocal(key): any {
    return this.storage.get(key);
  }

  add() {
    this.errorschostuid = false;
    this.errorfullname = false;
    this.errorshortname = false;
    this.errorcountcode1 = false;
    this.errorprimarynum = false;
    this.errorcountrycode2 = false;
    this.errorsecondarynumber = false;
    this.errorgeoloc = false;
    this.erroracadmicyear = false;
    this.errorgrade = false;
    this.erroraddress = false;
    this.errorschostuidlength = false;

    this.errorgeoloc1 = false;
    this.errorschostuid1 = false;
    this.errormobilenumber1 = false;
    this.errormobilenumber2 = false;

    this.errorfullnamelength = false;
    this.errorshortnamelength = false;
    this.erroraddressnamelength = false;

    this.errorfullnamespecial = false;
    this.errorshortnamespecial = false;
    this.erroraddressnamespeical = false;

    if (this.schoolstuid.length > 25) {
      this.errorschostuidlength = true;
    }
    if (this.schoolstuid == "") {
      this.errorschostuid = true;
    }
    if (this.fullname == "") {
      this.errorfullname = true;
    }
    if (this.shortname == "") {
      this.errorshortname = true;
    }
    if (this.countrycode1 == "") {
      this.errorcountcode1 = true;
    }
    if (this.primarynumber == "") {
      this.errorprimarynum = true;
    }
    if (this.countrycode2 == "") {
      this.errorcountrycode2 = true;
    }
    if (this.secondarynumber == "") {
      this.errorsecondarynumber = true;
    }
    if (this.geolocation == "") {
      this.errorgeoloc = true;
    }
    if (this.academicyear == "") {
      this.erroracadmicyear = true;
    }
    if (this.grade == "") {
      this.errorgrade = true;
    }
    if (this.addresss == "") {
      this.erroraddress = true;
    }
    let a = 0;
    let format = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]/;
    if (this.schoolstuid.match(format)) {
      a = 1;
    }
    if (a === 1) {
      this.errorschostuid1 = true;
    }
    let b = 0;
    const format1 = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]/;
    if (this.schoolstuid.match(format1)) {
      b = 1;
    }
    if (b === 1) {
      this.errorgeoloc1 = true;
    }
    let c = 0;
    const format2 = /([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])/;
    if (this.schoolstuid.match(format2)) {
      c = 1;
    }
    let d = 0;
    const format3 = /([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])/;
    if (this.schoolstuid.match(format3)) {
      d = 1;
    }
    if (this.fullname.length > 25) {
      this.errorfullnamelength = true;
    }
    if (this.shortname.length > 25) {
      this.errorshortnamelength = true;
    }
    if (this.addresss.length > 250) {
      this.erroraddressnamelength = true;
    }

    let h = 0;
    let format7 = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (this.fullname.match(format7)) {
      h = 1;
    }
    if (h === 1) {
      this.errorfullnamespecial = true;
    }
    let i = 0;
    let format8 = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (this.shortname.match(format8)) {
      i = 1;
    }
    if (i === 1) {
      this.errorshortnamespecial = true;
    }
    let j = 0;
    let format9 = /[!@#$%^&*_+\=\[\]{};'"\\|<>\?]/;
    if (this.addresss.match(format9)) {
      j = 1;
    }
    if (j === 1) {
      this.erroraddressnamespeical = true;
    }

    if (this.schoolstuid == "") {
    } else if (this.fullname == "") {
    } else if (this.shortname == "") {
    } else if (this.countrycode1 == "") {
    } else if (this.primarynumber == "") {
    } else if (this.countrycode2 == "") {
    } else if (this.secondarynumber == "") {
    } else if (this.geolocation == "") {
    } else if (this.academicyear == "") {
    } else if (this.grade == "") {
    } else if (this.addresss == "") {
    } else if (this.errorfullnamelength == true) {
    } else if (this.errorshortnamelength == true) {
    } else if (this.erroraddressnamelength == true) {
    } else if (this.errorfullnamespecial == true) {
    } else if (this.errorshortnamespecial == true) {
    } else if (this.erroraddressnamespeical == true) {
    } else {
      this.addstudents.schoolStudentID = this.schoolstuid;
      this.addstudents.fullName = this.fullname;
      this.addstudents.shortName = this.shortname;
      this.addstudents.scountrycode = this.countrycode2;
      this.addstudents.sMobile = this.secondarynumber;
      this.addstudents.pcountrycode = this.countrycode1;
      this.addstudents.pMobile = this.primarynumber;
      this.addstudents.geoLocation = this.geolocation;
      this.addstudents.acadamicYear = this.academicyear;
      this.addstudents.address = this.addresss;
      this.addstudent1();
    }
  }
}

export class addstudent {

  schoolID: number;
  schoolStudentID: string;
  fullName: string;
  shortName: string;
  address: string;
  geoLocation: string;
  gradeId:number;
  gradeName: string;
  pMobile: string;
  pcountrycode: string;
  sMobile: string;
  scountrycode: string;
  acadamicMonth:number;
  acadamicYear: string;
  updateDate: string;
  isActive: boolean;
  updateID: number;
  updateName: string;
  rfid : number;
  rfidName:string;
  routeId:number;
  routeName:string;

}

export class listgrade {
  id: number;
  title: string;
  updatedate: string;
}

export class studentdublicates {
  schoolStudentID: string;
}
