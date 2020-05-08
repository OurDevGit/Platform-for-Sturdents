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

@Component({
  selector: "app-addstudentparent",
  templateUrl: "./addstudentparent.component.html",
  styleUrls: ["./addstudentparent.component.scss"]
})
export class AddstudentparentComponent implements OnInit {
  date: any;
  addstudentParents: addstudentParents;
  liststudentParents: liststudentParents;
  datas: any;
  updateustudent: any;

  addacademic_id: string;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar
  ) {
    this.addstudentParents = new addstudentParents();
    this.liststudentParents = new liststudentParents();
    this.updateustudent = new updateustudent();
    this.route.params.subscribe(params => {
      this.addacademic_id = params["id"]; // (+) converts string 'id' to a number
    });
  }

  ngOnInit() {
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
        }
      );

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
        }
      );
  }

  addstudent() {
    this.addstudentParents.studentID = +this.addacademic_id;
    this.schools
      .addstudentParents<addstudentParents>(this.addstudentParents)
      .subscribe(
        (data: addstudentParents) => {
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.ngOnInit();
          // this.router.navigate(['School/student'])
        }
      );
  }
  deleteacadamic($event, data) {

    this.schools
      .deletestudentParents<liststudentParents[]>(data.stu.id)
      .subscribe(
        (data: any) => {},
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          alert("deleted");
          this.ngOnInit();
        }
      );
  }
}

export class addstudentParents {
  studentID: number;
  parentEmail: string;
}

export class liststudentParents {
  updateDate: string;
  parentEmail: string;
  studentID: number;
  id: number;
}

export class updateustudent {
  id: number;
  schoolID: number;
  fullName: string;
  shortName: string;
  address: string;
  geoLocation: string;
  grade: string;
  updateDate: Date;
  updateID: number;
}
