import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { formatDate } from "@angular/common";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { FormControl } from "@angular/forms";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewEncapsulation, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomDateParserFormatter } from '../../../utils/dateformat';
import { AlertifyService } from "app/alertify-service";


@Component({
  selector: 'app-updatevehicles',
  templateUrl: './updatevehicles.component.html',
  styleUrls: ['./updatevehicles.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class UpdatevehiclesComponent implements OnInit {

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
  registrationExpiry: any;
  insuranceExpiry: any;
  loader = false;
  gpsDevice: any;
  DriverName: any;
  RouteName: any;

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
        this.pgpsdetails = data;
        this.addvehicle = data;
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

  }

  ngOnInit() {

    var end_date = formatDate(new Date(), "yyyy-MM-dd", "en");
    var splitted1s = end_date.split("-", 3);
    let d = {
      year: +splitted1s[0],
      month: +splitted1s[1],
      day: +splitted1s[2]
    };

    let school_id = this.getFromLocal("selected_school_id");
    this.registerForm = this.formBuilder.group({
      owners: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,30}$")]
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
       
      ],
      routeIds: [
        "",      
        [Validators.required]
      ],
      routes: [
        "",
      
      ]

    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.updateVehicle();
    }
  }

  devicedetails(id) {
    this.pgpsdetails = [];
    this.addvehicle.GPSDeviceId = parseInt(id);
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
    this.pdrivedetails = [];
    this.addvehicle.DriverId = id;
    this.schools.fetchsingledrivers<any>(id).subscribe(
      (data: any) => {
        this.pdrivedetails = data;
        this.addvehicle.Driver = this.pdrivedetails
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
      }
    );
  }

  routedetails(id) {
    this.proutes = [];
    this.addvehicle.RouteId = id;
    this.schools.fetchroutes<any>(id).subscribe(
      (data: any) => {
        this.proutes = data;
        this.addvehicle.Route = this.proutes
        
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
      }
    );
  }

  changeDateRegistration(date : any) {
    this.addvehicle.RegistrationExpiry = date?date.year+"-"+('0'+date.month).slice(-2)+"-"+('0'+date.day).slice(-2):null
  }

  changeInsuranceExpire(date : any) {
    this.addvehicle.InsuranceExpiry = date?date.year+"-"+('0'+date.month).slice(-2)+"-"+('0'+date.day).slice(-2):null
  }

  updateVehicle() {

    this.schools.updatevehicle<addvehicle>(this.addvehicle.Id, this.addvehicle).subscribe(
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
        this.alertifyService.success('Vehicle has been updated successfully', document.title);

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
  Owner: string;
  RegistrationNumber: string;
  RegistrationExpiry: any;
  InsuranceNumber: string;
  Insurer: string;
  InsuranceExpiry: any;
  EngineNumber: string;
  ChasisNumber: string;
  ManYear: number;
  Cap: string;
  CapX: string;
  AdditionalInfo1: string;
  AdditionalInfo2: string;
  GPSDeviceId: number;
  GPSDevice: any; 
  DriverId: number;
  Driver: any;
  RouteId: string;
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
