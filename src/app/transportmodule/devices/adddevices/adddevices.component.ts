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
import { AlertifyService } from "app/alertify-service";

@Component({
  selector: 'app-adddevices',
  templateUrl: './adddevices.component.html',
  styleUrls: ['./adddevices.component.scss']
})
export class AdddevicesComponent implements OnInit {
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
  adddriver: adddriver;
  activeloginuser: any;
  canenablebutton: boolean = true;
  result: any;
  tracking_device_id: any;

  popupModel = { year: 2019, month: 1, day: 1 };
  popupModel1 = { year: 2019, month: 1, day: 1 };

  loader = false;

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
    this.adddriver = new adddriver();
    this.listparents = new listparents();
    this.parentdublicate = new parentdublicates();

    this.canenablebutton = true;
  }

  ngOnInit() {

    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "TMCD") {
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

  addstudent() {
    this.schools.adddevices<adddriver>(this.adddriver).subscribe(
      (data: adddriver) => {
        this.loader = false;
      },
      error => {
        this.loader = false;
        if(error.status === 404) {
          this.alertifyService.success('No data found!', document.title);
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
        this.alertifyService.success('Devices has been created successfully', document.title);
        this.router.navigate(["School/listdevices"]);
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
  id: string;
  imei: string;
  adminNo: string;
  make: string;
  model: string;
  type: string;
}

export class listparents {

  imei: string;
  adminNo: string;
  make: string;
  model: string;
  type: string;
}

export class parentdublicates {
  email: string;
}
