import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { formatDate } from "@angular/common";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { FormControl } from "@angular/forms";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewEncapsulation, Inject } from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-viewvehicles',
  templateUrl: './viewvehicles.component.html',
  styleUrls: ['./viewvehicles.component.scss']
})
export class ViewvehiclesComponent implements OnInit {

  vehicle_id: string;

  pgpsdetails: any[];
  pdrivedetails: any[];
  proutes: any[];

  driverslistss: any;
  routess: any;
  deviceslistss: any;

  showdisplay: boolean;
  parentdublicate: any;
  accesslist: any;
  registerForm: FormGroup;
  submitted = false;
  listparents: listparents;
  datas: any;
  check: number;
  countrylist: any;
  date: any;
  addvehicle: addvehicle;
  activeloginuser: any;
  canenablebutton: boolean = true;
  result: any;

  popupModel = { year: 2019, month: 1, day: 1 };
  popupModel1 = { year: 2019, month: 1, day: 1 };

  loader = false;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar,
    private formBuilder: FormBuilder
  ) {
    this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
    this.addvehicle = new addvehicle();
    this.listparents = new listparents();
    this.parentdublicate = new parentdublicates();
    this.canenablebutton = true;
    this.route.params.subscribe(params => {
      this.vehicle_id = params["id"]; // (+) converts string 'id' to a number
    });

    this.schools
      .driverslist<any[]>()
      .subscribe(
        (data: any) => {
          this.driverslistss = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {

        }
      );

    this.schools
      .routeslists<any[]>()
      .subscribe(
        (data: any) => {
          this.routess = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
        }
      );

    this.schools
      .deviceslists<any[]>()
      .subscribe(
        (data: any) => {
          this.deviceslistss = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {

        }
      );

    this.schools.fetchvehicle<any>(this.vehicle_id).subscribe(
      (data: any) => {
        this.addvehicle.id = data.Id;
        if (data.Route == null) {
          this.addvehicle.route = "";
        } else {
          this.addvehicle.route = data.Route.RouteName;
        }
        this.addvehicle.routeId = data.RouteId;
        if (data.Driver == null) {
          this.addvehicle.driver = "";
        } else {
          this.addvehicle.driver = data.Driver.FirstName;
        }
        this.addvehicle.driverId = data.DriverId;
        if (data.GPSDevice == null) {
          this.addvehicle.gpsDevice = "";
        } else {
          this.addvehicle.gpsDevice = data.GPSDevice.IMEI;
        }
        this.addvehicle.gpsDeviceId = data.GPSDeviceId;
        this.addvehicle.additionalInfo2 = data.AdditionalInfo1;
        this.addvehicle.additionalInfo1 = data.AdditionalInfo2;
        this.addvehicle.capX = data.CapX;
        this.addvehicle.cap = data.Cap;
        this.addvehicle.manYear = data.ManYear;
        this.addvehicle.chasisNumber = data.ChasisNumber;
        this.addvehicle.engineNumber = data.EngineNumber;
        this.addvehicle.insuranceExpiry = data.InsuranceExpiry;
        this.addvehicle.insurer = data.Insurer;
        this.addvehicle.insuranceNumber = data.InsuranceNumber;
        this.addvehicle.owner = data.Owner;
        this.addvehicle.registrationNumber = data.RegistrationNumber;
        this.addvehicle.registrationExpiry = data.RegistrationExpiry;

      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {

      }
    );
  }

  ngOnInit() {

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
      owners: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,50}$")]
      ],
      registrationNumbers: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,30}$")]
      ],
      registrationExpirys: [
        "",
        [Validators.required]
      ],
      insuranceNumbers: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,30}$")]
      ],
      insurers: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,30}$")]
      ],
      insuranceExpirys: [
        "",
        [Validators.required]
      ],
      engineNumbers: [
        "",
        [Validators.required]
      ],
      chasisNumbers: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,30}$")]
      ],
      manYears: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,30}$")]
      ],
      caps: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,15}$")]
      ],
      capXs: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,15}$")]
      ],
      additionalInfo1s: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,30}$")]
      ],
      additionalInfo2s: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,30}$")]
      ],
      gpsDevices: [
        "",
        [Validators.required]
      ],
      gpsids: [
        "",
        [Validators.required]
      ],
      driverIds: [
        "",
        [Validators.required]
      ],
      drivers: [
        "",
        [Validators.required]
      ],
      routeIds: [
        "",
        [Validators.required]
      ],
      routes: [
        "",
        [Validators.required]
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
      this.addstudent();
    }
  }
  uploadbulk() {
    this.router.navigate(["School/studentbulks/Parent"]);
  }


  devicedetails(id) {
    this.addvehicle.gpsDeviceId = id;
    this.schools.fetchdevices<any>(id).subscribe(
      (data: any) => {
        this.pgpsdetails = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {

      }
    );
  }

  driverdetails(id) {
    this.addvehicle.driverId = id;
    this.schools.fetchsingledrivers<any>(id).subscribe(
      (data: any) => {
        this.pdrivedetails = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {

      }
    );

  }

  routedetails(id) {
    this.addvehicle.routeId = id;
    this.schools.fetchroutes<any>(id).subscribe(
      (data: any) => {
        this.proutes = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {

      }
    );
  }

  addstudent() {
    this.addvehicle.gpsDevice = this.pgpsdetails;
    this.addvehicle.route = this.proutes;
    this.addvehicle.driver = this.pdrivedetails;
    this.schools.addvehicle<addvehicle>(this.addvehicle).subscribe(
      (data: addvehicle) => {
        this.loader = false;
      },
      error => () => {
        /* can provide allert for error on the api */
        this.loader = false;
      },
      () => {
        this.loader = false;
        alert("Vehicles has been created successfully");
        this.router.navigate(["School/listvehicles"]);
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

export class addvehicle {
  owner: string;
  registrationNumber: string;
  registrationExpiry: string;
  insuranceNumber: string;
  insurer: string;
  insuranceExpiry: string;
  engineNumber: string;
  chasisNumber: string;
  manYear: string;
  cap: string;
  capX: string;
  additionalInfo1: string;
  additionalInfo2: string;
  gpsDeviceId: string;
  gpsDevice: any;
  driverId: string;
  driver: any;
  routeId: string;
  route: any;
  id: number;
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
