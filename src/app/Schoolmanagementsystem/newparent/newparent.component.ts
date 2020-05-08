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
  selector: "app-newparent",
  templateUrl: "./newparent.component.html",
  styleUrls: ["./newparent.component.scss"]
})
export class NewparentComponent implements OnInit {
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
  addparent: addparent;
  activeloginuser: any;
  canenablebutton: boolean = true;
  result: any;

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
    this.addparent = new addparent();
    this.listparents = new listparents();
    this.parentdublicate = new parentdublicates();

    this.canenablebutton = true;

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
    
  }

  ngOnInit() {
    this.addparent.pcountrycode = "";
    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SACP") {
        this.showdisplay = true;
      }
    }

    let school_id = this.getFromLocal("selected_school_id");
    this.schools.listparents<listparents[]>(school_id).subscribe(
      (data: listparents[]) => {
        this.datas = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {}
    );
    this.registerForm = this.formBuilder.group({
      FullNames: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,50}$")]
      ],
      ShortNames: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,30}$")]
      ],
      Emails: ["", [Validators.required, Validators.email]],
      altEmailIds: [],
      primaryMobiles: [
        "",
        [Validators.required, Validators.pattern("^[0-9+-]{6,15}$")]
      ],
      altMobiles: [],
      GeoLocation2: ["", Validators.required],
      GeoLocation11: []
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
    //this.router.navigate(['School/parentbulk'])
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
    //this.onSubmit()
    if (this.check == 1) {
      alert("This Email already Exits");
    } else {
      this.parentdublicate = [];
      let a = {
        email: this.addparent.email
      };
      this.parentdublicate.push(a);

      let school_id = +this.getFromLocal("selected_school_id");
      this.schools
        .checkuploads<parentdublicates[]>(this.parentdublicate, +school_id)
        .subscribe(
          (data: parentdublicates[]) => {
            this.result = data;
          },
          error => () => {
            alert("Some thing went wrong, please try again");
          },
          () => {
            if (this.result.length == 0) {
              this.loader = true;
              if (this.addparent.shortName == undefined) {
                this.addparent.shortName = "";
              }
              if (this.addparent.altEmailId == undefined) {
                this.addparent.altEmailId = "";
              }
              if (this.addparent.altMobile == undefined) {
                this.addparent.altMobile = "";
              }
              if (this.addparent.altcountrycode == undefined) {
                this.addparent.altcountrycode = "";
              }
              this.canenablebutton = false;

              this.addparent.attribute = "";
              this.addparent.isActive = true;
              this.addparent.updateDate = formatDate(
                new Date(),
                "MMM yyyy",
                "en-US"
              );
              this.addparent.schoolID = school_id;
              this.addparent.updateID = this.activeloginuser.id;
              this.addparent.updateName = this.activeloginuser.first_name;
              this.addparent.grade = "A";
              this.schools.addparents<addparent>(this.addparent).subscribe(
                (data: addparent) => {
                  this.loader = false;
                },
                error => () => {
                  /* can provide allert for error on the api */
                  this.loader = false;
                },
                () => {
                  this.loader = false;
                  alert("Parent has been created successfully");
                  this.router.navigate(["School/parent"]);
                  this.canenablebutton = true;
                }
              );
            } else {
              alert("This email-id already exists");
            }
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

export class addparent {
  fullName: string;
  shortName: string;
  grade: string;
  email: string;
  updateID: number;
  schoolID: number;
  updateDate: string;
  isActive: boolean;
  altEmailId: string;
  primaryMobile: string;
  attribute: string;
  altMobile: string;
  updateName: string;
  pcountrycode: string;
  altcountrycode: string;
}

export class listparents {
  fullName: string;
  shortName: string;
  grade: string;
  email: string;
  UpdateDate: string;
  UpdateID: number;
  id: number;
  isActive: boolean;
}

export class parentdublicates {
  email: string;
}
