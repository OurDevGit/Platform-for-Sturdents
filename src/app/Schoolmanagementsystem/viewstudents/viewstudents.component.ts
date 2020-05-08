import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import {
  Component,
  OnInit,
  ViewChild,
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
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StopThingRegistrationTaskRequest } from "aws-sdk/clients/iot";

@Component({
  selector: "app-viewstudents",
  templateUrl: "./viewstudents.component.html",
  styleUrls: ["./viewstudents.component.scss"]
})
export class ViewstudentsComponent implements OnInit {
  @ViewChild("keywords-input", { static: false }) keywordsInput;
  date: any;
  addstudentParents: addstudentParents;
  liststudentParents: liststudentParents;
  datas: any;
  updateustudent: any;
  listparent: any;
  message: boolean;
  message1: boolean;
  sendbutton: string;
  datass: any;

  showdisplay: boolean;
  accesslist: any;
  deletecheck: boolean;

  registerForm: FormGroup;
  registerForm1: FormGroup;
  submitted = false;
  check: number;
  dublicate: number;
  addparent: addparent;
  countrylist: any;

  // public updateustudent: updateustudent;
  addacademic_id: string;
  activeloginuser: any;
  // date:any;

  constructor(
    private cref: ChangeDetectorRef,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar,
    private formBuilder: FormBuilder
  ) {
    this.message = false;
    this.message = false;
    this.sendbutton = "false";
    this.addstudentParents = new addstudentParents();
    this.liststudentParents = new liststudentParents();
    this.updateustudent = new updateustudent();
    this.addparent = new addparent();
    this.addparent.attribute = "";
    this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
    this.route.params.subscribe(params => {
      this.addacademic_id = params["id"]; // (+) converts string 'id' to a number
    });

    this.httpService.get("./assets/data/CountryCodes.json").subscribe(
      data => {
        this.countrylist = data as string[]; // FILL THE ARRAY WITH DATA.
      },
      (err: HttpErrorResponse) => {
      }
    );
  }
  ngOnInit() {
    this.check = 0;
    this.registerForm = this.formBuilder.group({
      FullNames: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z0-9_-s]{1,150}$")]
      ],
      ShortNames: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9_-s]{1,150}$")]
      ],
      Grades: ["", Validators.required],
      Emails: ["", [Validators.required, Validators.email]],
      altEmailIds: ["", [Validators.required, Validators.email]],
      primaryMobiles: [
        "",
        [Validators.required, Validators.pattern("^[0-9_-]{1,15}$")]
      ],
      attributes: ["", Validators.required],
      altMobiles: [
        "",
        [Validators.required, Validators.pattern("^[0-9_-]{1,15}$")]
      ],
      GeoLocation2: new FormControl("", Validators.required),
      GeoLocation3: new FormControl("", Validators.required)
    });
    this.schools
      .listParentstudents<updateustudent>(this.addacademic_id)
      .subscribe(
        (data: any) => {
          this.datas = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          if (this.datas.length > 0) {
            this.sendbutton = "true";
          }
          this.saveInLocal("ParentEmailList", this.datas);
          //**Parent list*/
          let school_id = this.getFromLocal("selected_school_id");
          this.schools.listparents<addparent>(school_id).subscribe(
            (data: any) => {
              this.listparent = data;
            },
            error => () => {
              /* can provide allert for error on the api */
            },
            () => {
              this.schools
                .fetchsinglestudents<updateustudent>(this.addacademic_id)
                .subscribe(
                  (data: updateustudent) => {
                    this.updateustudent = data;
                  },
                  error => () => {
                    /* can provide allert for error on the api */
                  },
                  () => {
                    this.cref.markForCheck();
                  }
                );
            }
          );
        }
      );
  }

  ngnext() {
    this.schools
      .listParentstudents<updateustudent>(this.addacademic_id)
      .subscribe(
        (data: any) => {
          this.datas = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          if (this.datas.length > 0) {
            this.sendbutton = "true";
          }
          this.saveInLocal("ParentEmailList", this.datas);
        }
      );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.addparents();
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
  }

  checkemail(email) {
    this.deletecheck = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "MPI") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      this.check = 0;
      this.message = false;
      this.message1 = false;
      this.dublicate = 0;
      for (let i = 0; i < this.datas.length; i++) {
        if (this.datas[i].parent.email == email) {
          this.dublicate = 1;
        }
      }

      let a = email;
      for (let i = 0; i < this.listparent.length; i++) {
        if (this.listparent[i].email == email) {
          this.addparent.email = this.listparent[i].email;
          this.addparent.fullName = this.listparent[i].fullName;
          this.addparent.shortName = this.listparent[i].shortName;
          this.addparent.grade = "";
          this.addparent.altEmailId = this.listparent[i].altEmailId;
          this.addparent.altMobile = this.listparent[i].altMobile;
          this.addparent.attribute = this.listparent[i].attribute;
          this.addparent.pcountrycode = this.listparent[i].pcountrycode;
          this.addparent.altcountrycode = this.listparent[i].altcountrycode;
          this.addparent.primaryMobile = this.listparent[i].primaryMobile;
          this.check = 1;
        }

        if (this.check !== 1) {
          if (email == "") {
            this.message1 = true;
          } else {
            this.addparent.fullName = null;
            this.addparent.shortName = null;
            this.addparent.grade = null;
            this.addparent.altEmailId = null;
            this.addparent.altMobile = null;
            this.addparent.attribute = null;
            this.addparent.primaryMobile = null;
          }
        }
      }
      if (this.addparent.fullName === null) {
        this.message = true;
      }
    } else {
      alert("!You Don't Have the Access To Add Parent");
    }
  }

  send() {
    this.router.navigate(["School/sendmail"]);
  }
  addstudentParent(email) {
    if (this.dublicate == 1) {
      alert("already Exit");
    } else {
      this.addstudentParents.studentID = +this.addacademic_id;
      this.addstudentParents.parentEmail = email;
      this.addstudentParents.updateName = this.activeloginuser.first_name;
      this.addstudentParents.updateID = this.activeloginuser.id;
      this.addstudentParents.updateDate = "2019-01-18T14:05:25.284Z";
      this.schools
        .addstudentParents<addstudentParents>(this.addstudentParents)
        .subscribe(
          (data: addstudentParents) => { },
          error => () => {
            /* can provide allert for error on the api */
          },
          () => {
            alert("Added Successfully");
            window.location.reload();
          }
        );
    }
  }

  deleteacadamic($event, data) {
    this.schools
      .deletestudentParents<liststudentParents[]>(data.stu.id)
      .subscribe(
        (data: any) => { },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          alert("Deleted Successfully");
          this.ngnext();
        }
      );
  }

  Disable() {
    if (this.updateustudent.isActive == true)
      this.updateustudent.isActive = false;
    else this.updateustudent.isActive = true;
    this.schools
      .updatestudents<updateustudent>(
        this.updateustudent.id,
        this.updateustudent
      )
      .subscribe(
        () => { },
        error => () => {
          alert("Some thing went wrong, please try again");
        },
        () => {
          // this.router.navigate(['School/student'])
        }
      );
  }

  addparents() {
    if (this.check == 1) {
      this.addstudentParent(this.addparent.email);
    } else {
      let school_id = +this.getFromLocal("selected_school_id");
      this.addparent.schoolID = school_id;
      this.addparent.isActive = true;
      this.addparent.grade = "";
      this.addparent.attribute = "";
      this.addparent.updateID = this.activeloginuser.id;
      this.addparent.updateDate = "2019-01-18T14:05:25.284Z";
      this.addparent.updateName = this.activeloginuser.first_name;
      this.schools.addparents<addparent>(this.addparent).subscribe(
        (data: addparent) => {
          this.datass = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.addstudentParent(this.datass.email);
        }
      );
    }
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }
  getFromLocal(key): any {
    return this.storage.get(key);
  }
}

export class updateustudent {
  id: number;
  schoolID: number;
  schoolStudentID: string;
  fullName: string;
  shortName: string;
  address: string;
  geoLocation: string;
  gradeName: string;
  updateDate: string;
  updateID: number;
  isActive: boolean;
}

export class addstudentParents {
  studentID: number;
  parentEmail: string;
  updateName: string;
  updateDate: string;
  updateID: number;
}

export class liststudentParents {
  updateDate: string;
  parentEmail: string;
  studentID: number;
  id: number;
}

export class addparent {
  fullName: string;
  shortName: string;
  grade: string;
  email: string;
  updateID: number;
  schoolID: number;
  altMobile: string;
  altEmailId: string;
  attribute: string;
  primaryMobile: string;
  altcountrycode: string;
  pcountrycode: string;
  isActive: boolean;
  updateName: string;
  updateDate: string;
}
