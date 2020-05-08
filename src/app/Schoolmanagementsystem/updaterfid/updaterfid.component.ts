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
  selector: "app-updaterfid",
  templateUrl: "./updaterfid.component.html",
  styleUrls: ["./updaterfid.component.scss"]
})
export class UpdaterfidComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  schoolstudentid: studentlist[];

  public updaterfid: Updaterfid;
  addacademic_id: string;
  date: any;
  activeloginuser: any;

  loader: boolean = true;
  showdisplay: boolean;
  accesslist: any;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar,
    private formBuilder: FormBuilder
  ) {
    this.updaterfid = new Updaterfid();
    this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
    this.route.params.subscribe(params => {
      this.addacademic_id = params["id"]; // (+) converts string 'id' to a number
    });
    this.showdisplay = false;

    this.schoolstudentid = [];
    this.getsudentlist();
  }

  getsudentlist() {
    let school_id = this.getFromLocal("selected_school_id");
    this.schools.liststudent<studentlist[]>(school_id).subscribe(
      (data: studentlist[]) => {
        this.schoolstudentid = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => { }
    );
  }

  ngOnInit() {

    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SAER") {
        this.showdisplay = true;
      } 
    }


    this.registerForm = this.formBuilder.group({
      rfiddatas: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9\\-.;,/:_-s]{3,15}$")
        ]
      ],
      SchoolStudentIDs: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9\\-.;,/:_-s]{1,15}$")
        ]
      ],
      uniquenumbers: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9\\-.;,/:_-s]{3,15}$")
        ]
      ],
      types: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9\\-.;,/:_-s]{3,15}$")
        ]
      ],
      freequencys: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9\\-.;,/:_-s]{3,15}$")
        ]
      ],
      capacitys: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9\\-.;,/:_-s]{3,15}$")
        ]
      ],
      statuss: ["", Validators.required],
      driver_ids: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9\\-.;,/:_-s]{3,15}$")
        ]
      ]
    });
    this.schools.fetchsingleRFIDs<Updaterfid>(this.addacademic_id).subscribe(
      (data: Updaterfid) => {
        this.updaterfid = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.loader = false;
      }
    );
  }

  getFromLocal(key): any {
    return this.storage.get(key);
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

  addstudent() {
    this.loader = true;
    this.updaterfid.updateID = this.activeloginuser.id;
    this.updaterfid.updateName = this.activeloginuser.first_name;
    this.schools
      .updateRFIDs<Updaterfid>(this.updaterfid.id, this.updaterfid)
      .subscribe(
        () => { },
        error => () => {
          alert("Some thing went wrong, please try again");
        },
        () => {
          this.loader = false;
          alert("RFID has been updated Successfully");
          this.router.navigate(["School/rfid"]);
        }
      );
  }
}

export class Updaterfid {
  id: number;
  schoolID: number;
  schoolStudentID: string;
  isActive: boolean;
  rfiddata: string;
  updateID: number;
  updateName: string;
  UpdateDate: string;
  uniquenumber: string;
  type: string;
  freequency: string;
  capacity: string;
  status: string;
  driver_id: string;
}

export class studentlist {
  id: number;
  schoolID: number;
  fullName: string;
  shortName: string;
  address: string;
  schoolStudentID: string;
  grade: string;
  updateDate: string;
  updateID: number;
  isActive: boolean;
}
