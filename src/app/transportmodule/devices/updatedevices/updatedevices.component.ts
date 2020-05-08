import {
  Component,
  OnInit,
  ChangeDetectorRef
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Inject } from "@angular/core";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";

import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertifyService } from "app/alertify-service";

@Component({
  selector: 'app-updatedevices',
  templateUrl: './updatedevices.component.html',
  styleUrls: ['./updatedevices.component.scss']
})
export class UpdatedevicesComponent implements OnInit {

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

  adddevice: adddevice;
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
    this.fetchdate()

    this.adddevice = new adddevice();

  }

  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  fetchdate() {
    this.schools.fetchdevices<any>(this.driver_id).subscribe(
      (data: any) => {
        this.adddevice.id = data.Id
        this.adddevice.imei = data.IMEI
        this.adddevice.adminNo = data.AdminNo
        this.adddevice.make = data.Make
        this.adddevice.model = data.Model
        this.adddevice.type = data.Type
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
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,20}$")]
      ],
      adminNos: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9_-]{1,20}$")]
      ],
      makes: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,20}$")]
      ],
      models: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,20}$")]
      ],
      types: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,20}$")]
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
    if (this.registerForm.invalid) {
      return;
    } else {
      this.addstudent();
    }
  }

  addstudent() {
    this.schools.updatedevices<adddevice>(this.adddevice.id, this.adddevice).subscribe(
      (data: adddevice) => {
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
        this.alertifyService.success('Device has been updated successfully', document.title);
        this.router.navigate(["School/listdevices"]);
        this.canenablebutton = true;
      }
    );
  }
}

export class adddevice {
  imei: string;
  adminNo: string;
  make: string;
  model: string;
  type: string;
  id: number;
}

