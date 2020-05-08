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
import { NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomDateParserFormatter } from '../../../utils/dateformat';
import { AlertifyService } from "app/alertify-service";


@Component({
  selector: 'app-addvehicles',
  templateUrl: './addvehicles.component.html',
  styleUrls: ['./addvehicles.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class AddvehiclesComponent implements OnInit {

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

  insuranceExpiry: any;
  registrationExpiry: any;
  currentVehicleId: number;

  GPSDevice: any;
  Driver: any;
  Route: any;

  loader = false;
  popupModel: any;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    public alertifyService: AlertifyService,

    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar,
    private formBuilder: FormBuilder
  ) {
    this.showdisplay = false;
    this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
    this.addvehicle = new addvehicle();
    this.listparents = new listparents();
    this.parentdublicate = new parentdublicates();
    this.canenablebutton = true;
    this.popupModel = {year: 2007, month: 3, day: 3}
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

      this.schools
      .vehiclelist<any[]>()
      .subscribe(
        (data: any) => {
          let vehicleIds = [];
          data.map(cur => {
            vehicleIds.push(cur.Id)
          })
          if(data.length == 0) {
            this.currentVehicleId = 1
          } else {
            this.currentVehicleId = Math.max.apply(null, vehicleIds) + 1;
          }
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {

        }
      );
  }

  ngOnInit() {

    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "TMCV") {
        this.showdisplay = true;
      } 
    }

    let school_id = this.getFromLocal("selected_school_id");
    this.registerForm = this.formBuilder.group({
      owners: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,50}$")]
      ],
      registrationNumbers: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,30}$")]
      ],
      registrationExpirys: [
        "",
        [Validators.required]
      ],
      insuranceNumbers: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,30}$")]
      ],
      insurers: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,30}$")]
      ],
      insuranceExpirys: [
        "",
        [Validators.required]
      ],
      engineNumbers: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,20}$")]
      ],
      chasisNumbers: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,30}$")]
      ],
      caps: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,15}$")]
      ],
      capXs: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,15}$")]
      ],
      gpsDevices: [
        "",
        []
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
        []
      ],
      routeIds: [
        "",
        [Validators.required]
      ],
      routes: [
        "",
        []
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
      this.addVehicle();
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

  devicedetails(id) {
    this.addvehicle.gpsDeviceId = id;
    this.schools.fetchdevices<any>(id).subscribe(
      (data: any) => {
        this.pgpsdetails = data;
      },
      error => {
        /* can provide allert for error on the api */
        
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

      }
    );
  }

  driverdetails(id) {
    this.addvehicle.driverId = id;
    this.schools.fetchsingledrivers<any>(id).subscribe(
      (data: any) => {
        this.pdrivedetails = data;
      },
      error => {
        /* can provide allert for error on the api */
       
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

      }
    );

  }

  routedetails(id) {
    this.addvehicle.routeId = id;
    this.schools.fetchroutes<any>(id).subscribe(
      (data: any) => {
        this.proutes = data;
      },
      error => {
        /* can provide allert for error on the api */
        
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

      }
    );
  }

  changeDateRegistration(date : any) {
    this.addvehicle.registrationExpiry = date?date.year+"-"+('0'+date.month).slice(-2)+"-"+('0'+date.day).slice(-2):null
    
  }

  changeDateInsuranceExpiry(date : any) {
    this.addvehicle.insuranceExpiry = date?date.year+"-"+('0'+date.month).slice(-2)+"-"+('0'+date.day).slice(-2):null
  }

  addVehicle() {

    this.addvehicle.Id = this.currentVehicleId;
    // this.addvehicle.GPSDevice = this.pgpsdetails;
    // this.addvehicle.Route = this.proutes;
    // this.addvehicle.Driver = this.pdrivedetails;
    // this.addvehicle.ManYear = null;

    this.addvehicle.additionalInfo1 = null;
    this.addvehicle.additionalInfo2 = null

    this.schools.addvehicle<addvehicle>(this.addvehicle).subscribe(
      (data: addvehicle) => {
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
        this.alertifyService.success('Vehicles has been created successfully', document.title);
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
  Id: number;
  owner: string;
  registrationNumber: string;
  registrationExpiry: string;
  insuranceNumber: string;
  insurer: string;
  insuranceExpiry: string;
  engineNumber: string;
  chasisNumber: string;
  manYear: 2017;
  cap: string;
  capX: string;
  additionalInfo1: string;
  additionalInfo2: string;
  gpsDeviceId: string;
  driverId: string;
  routeId: string;
  Route: any;
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
