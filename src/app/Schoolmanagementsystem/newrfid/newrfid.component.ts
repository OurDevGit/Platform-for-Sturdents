import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewEncapsulation, Inject } from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-newrfid",
  templateUrl: "./newrfid.component.html",
  styleUrls: ["./newrfid.component.scss"]
})
export class NewrfidComponent implements OnInit {
  ///////////////////////////////////

  checkdata: any = [];

  cities3 = [
    {
      id: 1,
      name: "Vilnius",
      avatar:
        "//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x"
    },
    {
      id: 2,
      name: "Kaunas",
      avatar:
        "//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15"
    },
    {
      id: 3,
      name: "Pavilnys",
      avatar:
        "//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15"
    }
  ];

  selectedCity: any;
  selectedCityIds: string[];
  selectedCityName = "Vilnius";
  selectedCityId: number;
  selectedUserIds: number[];

  //////////////////////////////////////

  registerForm: FormGroup;
  submitted = false;
  showdisplay: boolean;
  accesslist: any;
  date: any;
  addrfid: addrfid;
  schoolstudentid: studentlist[];
  datas: any;

  sendmail: sendmail;

  schoolstudent_id: number;

  mail_list: any;

  activeloginuser: any;
  canenablebutton = true;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar,
    private formBuilder: FormBuilder
  ) {
    this.sendmail = new sendmail();

    this.addrfid = new addrfid();
    this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
    this.schoolstudentid = [];
    this.getsudentlist();
  }

  ngOnInit() {
    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SACR") {
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

  uploadbulk() {
    //this.router.navigate(['School/rfidbulk'])
    this.router.navigate(["School/studentbulks/RFID"]);
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
    this.checkdata = [];
    this.canenablebutton = false;
    this.addrfid.UpdateDate = formatDate(new Date(), "dd MMM yyyy", "en-US");
    this.addrfid.updateID = this.activeloginuser.id;
    this.addrfid.updateName = this.activeloginuser.first_name;
    this.addrfid.schoolID = this.getFromLocal("selected_school_id");
    this.addrfid.isActive = true;

    let a = [];
    let c = {
      schoolID: this.addrfid.schoolID,
      SchoolStudentID: this.addrfid.SchoolStudentID,
      isActive: this.addrfid.isActive,
      rfiddata: this.addrfid.rfiddata,
      updateID: this.addrfid.updateID,
      updateName: this.addrfid.updateName,
      UpdateDate: this.addrfid.UpdateDate,
      uniquenumber: this.addrfid.uniquenumber,
      type: this.addrfid.type,
      freequency: this.addrfid.freequency,
      capacity: this.addrfid.capacity,
      status: this.addrfid.status,
      driver_id: this.addrfid.driver_id
    };

    a.push(c);
    this.schools.checkdupliectionrfid<any>(a, this.addrfid.schoolID).subscribe(
      (data: any) => {
        this.checkdata = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        if (this.checkdata.duplicateRfid.length > 0) {
          alert("This RFID is already exist");
        } else if (this.checkdata.existingActiveStudents.length > 0) {
          alert("This School Student Id already assigned to another RFID");
        } else {
          this.canenablebutton = false;
          this.addrfid.UpdateDate = formatDate(
            new Date(),
            "dd MMM yyyy",
            "en-US"
          );
          this.addrfid.updateID = this.activeloginuser.id;
          this.addrfid.updateName = this.activeloginuser.first_name;
          this.addrfid.schoolID = this.getFromLocal("selected_school_id");
          this.addrfid.isActive = true;

          this.schools.addRFIDs<addrfid>(this.addrfid).subscribe(
            (data: addrfid) => {
            },
            error => () => {
              /* can provide allert for error on the api */
            },
            () => {
              this.sendmail1(this.schoolstudent_id);
              this.canenablebutton = true;
            }
          );
        }
      }
    );
  }
  getFromLocal(key): any {
    return this.storage.get(key);
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
      () => {}
    );
  }

  onchage(data) {
    for (let a = 0; a < this.schoolstudentid.length; a++) {
      if (
        this.schoolstudentid[a].schoolStudentID == this.addrfid.SchoolStudentID
      ) {
        // this.sendmail1(this.schoolstudentid[a].id)
        this.schoolstudent_id = this.schoolstudentid[a].id;
      }
    }
  }

  sendmail1(data) {
    this.mail_list = [];
    this.schools.listParentstudents<any>(data).subscribe(
      (data: any) => {
        this.datas = data;
        for (let a = 0; a < this.datas.length; a++) {
          this.mail_list.push(this.datas[a].stu.parentEmail);
        }
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        if (this.mail_list.length === 0) {
          alert("RFID has been created Successfully & Mail Send to there Parents");
          this.router.navigate(["School/rfid"]);
        } else {
          this.sendmail2(this.mail_list);
        }
      }
    );
  }

  sendmail2(datas) {
    for (let i = 0; i < datas.length; i++) {
      this.sendmail.email = "" + datas[i];
      this.sendmail.message =
        "New RFID Created For the School Student ID :" +
        this.addrfid.SchoolStudentID;
      this.sendmail.subject = "RFID has been Created Successfully";
      this.schools.sendmails<sendmail>(this.sendmail).subscribe(
        (data: sendmail) => {},
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {}
      );
    }
    alert("RFID has been created Successfully & Mail Send to there Parents");
    this.router.navigate(["School/rfid"]);
  }
}

export class addrfid {
  schoolID: number;
  SchoolStudentID: string;
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

export class sendmail {
  email: string;
  subject: string;
  message: string;
}
