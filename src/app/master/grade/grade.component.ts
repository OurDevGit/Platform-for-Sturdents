import {
  Component,
  OnInit
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Inject } from "@angular/core";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";

import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { formatDate } from "@angular/common";
@Component({
  selector: "app-grade",
  templateUrl: "./grade.component.html",
  styleUrls: ["./grade.component.scss"]
})
export class GradeComponent implements OnInit {
  message: boolean;
  date: any;
  listgrades: listgrades;
  addgrades: addgrades;
  datas: any;
  checkclass: number;
  errorip: boolean = false;
  erroripm: string = "";
  updateustudent: any;
  advancedPage = 1;
  sizePage = 10;
  specialcheck: number;
  chartacterchck: number;
  deleteclassid: number;
  classname: string;
  totalcount: number;
  collsize: number;
  data1: any;
  data2: any;
  j: number;
  school_id: number;
  disablebutton: boolean;

  accesslist: any;
  showdisplay: boolean; 

  loader: boolean = false;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar
  ) {
    this.addgrades = new addgrades();
    this.listgrades = new listgrades();
    this.disablebutton = false;
    this.showdisplay = false;
  }

  ngOnInit() {
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SACEDCMT") {
        this.showdisplay = true;
      } 
    }


    this.disablebutton = false;
    this.addgrades.title = "";
    this.school_id = +this.getFromLocal("selected_school_id");
    this.schools.listgrades<listgrades[]>(this.school_id).subscribe(
      (data: listgrades[]) => {
        this.datas = data;
        this.datas = this.datas.sort();
        this.totalcount = this.datas.length;
        this.collsize = this.datas.length;
        // this.userFilter = { fullName: '' };
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.j = this.datas.length - 1;
      }
    );
  }

  onClick1(value1) {

    if (value1 == 0) {
    } else {
      this.loader = true;
      const id1 = this.datas[value1].id;
      const position1 = this.datas[value1].position;
      const title1 = this.datas[value1].title;
      const updateDate1 = this.datas[value1].updateDate;

      const id2 = this.datas[value1 - 1].id;
      const position2 = this.datas[value1 - 1].position;
      const title2 = this.datas[value1 - 1].title;
      const updateDate2 = this.datas[value1 - 1].updateDate;
      this.listgrades.id = id1;
      this.listgrades.title = title1;
      this.listgrades.position = +"";
      this.listgrades.schoolID = this.school_id;
      this.schools
        .updategrade<listgrades>(this.listgrades.id, this.listgrades)
        .subscribe(
          () => {},
          error => () => {
            alert("Some thing went wrong, please try again");
            this.loader = false;
          },
          () => {
            this.listgrades.id = id1;
            this.listgrades.title = title1;
            this.listgrades.position = position2;
            this.listgrades.schoolID = this.school_id;
            this.schools
              .updategrade<listgrades>(this.listgrades.id, this.listgrades)
              .subscribe(
                () => {},
                error => () => {
                  alert("Some thing went wrong, please try again");
                  this.loader = false;
                },
                () => {
                  this.listgrades.id = id2;
                  this.listgrades.title = title2;
                  this.listgrades.position = position1;
                  this.listgrades.schoolID = this.school_id;
                  this.schools
                    .updategrade<listgrades>(
                      this.listgrades.id,
                      this.listgrades
                    )
                    .subscribe(
                      () => {},
                      error => () => {
                        alert("Some thing went wrong, please try again");
                        this.loader = false;
                      },
                      () => {
                        this.loader = false;
                        this.ngOnInit();
                      }
                    );
                }
              );
          }
        );
    }
  }

  onClick2(value1) {

    if (value1 == this.datas.length - 1) {
    } else {
      this.loader = true;
      const id1 = this.datas[value1].id;
      const position1 = this.datas[value1].position;
      const title1 = this.datas[value1].title;
      const updateDate1 = this.datas[value1].updateDate;

      const id2 = this.datas[value1 + 1].id;
      const position2 = this.datas[value1 + 1].position;
      const title2 = this.datas[value1 + 1].title;
      const updateDate2 = this.datas[value1 + 1].updateDate;
      this.listgrades.id = id1;
      this.listgrades.title = title1;
      this.listgrades.position = +"";
      this.listgrades.schoolID = this.school_id;
      this.schools
        .updategrade<listgrades>(this.listgrades.id, this.listgrades)
        .subscribe(
          () => {},
          error => () => {
            alert("Some thing went wrong, please try again");
            this.loader = false;
          },
          () => {
            this.listgrades.id = id1;
            this.listgrades.title = title1;
            this.listgrades.position = position2;

            this.listgrades.schoolID = this.school_id;
            this.schools
              .updategrade<listgrades>(this.listgrades.id, this.listgrades)
              .subscribe(
                () => {},
                error => () => {
                  alert("Some thing went wrong, please try again");
                  this.loader = false;
                },
                () => {
                  this.listgrades.id = id2;
                  this.listgrades.title = title2;
                  this.listgrades.position = position1;
                  this.listgrades.schoolID = this.school_id;
                  this.schools
                    .updategrade<listgrades>(
                      this.listgrades.id,
                      this.listgrades
                    )
                    .subscribe(
                      () => {},
                      error => () => {
                        alert("Some thing went wrong, please try again");
                        this.loader = false;
                      },
                      () => {
                        this.loader = false;
                        this.ngOnInit();
                      }
                    );
                }
              );
          }
        );
    }
  }

  addgrade(title) {
    this.disablebutton = true;

    this.checkclass = 0;
    this.errorip = false;
    if (title === "") {
      // this.errorip = true;
      this.message = true;
      this.disablebutton = false;

      // this.erroripm = "Please Enter Class";
    } else {
      this.chartacterchck = 0;
      this.specialcheck = 0;
      let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      if (title.match(format)) {
        this.specialcheck = 1;
      } else if (title.length > 15) {
        this.chartacterchck = 1;
      }
      if (this.specialcheck == 1) {
        alert(
          "Special characters are not allowed, please between enter A-Z, 1-9"
        );
        this.disablebutton = false;
      } else if (this.chartacterchck == 1) {
        alert("Enter Max of 15-characters");
        this.disablebutton = false;
      } else {
        for (let i = 0; i < this.datas.length; i++) {
          if (this.datas[i].title == title) {
            this.checkclass = 1;
          }
        }

        if (this.checkclass == 1) {
          alert("This Class already added");
          this.disablebutton = false;
        } else {
          this.message = false;
          this.addgrades.position = +"";
          let school_id = this.getFromLocal("selected_school_id");
          this.addgrades.schoolID = school_id;
          this.addgrades.updateDate = formatDate(
            new Date(),
            "yyyy-MM-dd",
            "en"
          );
          this.addgrades.title = title;
          this.schools.addgrades<addgrades>(this.addgrades).subscribe(
            (data: addgrades) => {
            },
            error => () => {
              /* can provide allert for error on the api */
            },
            () => {
              this.addgrades.title = "";
              this.ngOnInit();
              alert("Class has been created successfully");

              // this.router.navigate(['School/student'])
            }
          );
        }
      }
    }
  }
  deleteclass() {
    this.schools.deletegrades<listgrades[]>(this.deleteclassid).subscribe(
      (data: any) => {
        if (data.id != 0) alert("Class has been deleted successfully");
        else alert(data.title);
        this.ngOnInit();
      },
      error => () => {
        alert("Some thing went wrong!");
        /* can provide allert for error on the api */
      },
      () => {}
    );
  }
  delete($event, data) {
    this.deleteclassid = data.id;
    this.classname = data.title;
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }
  getFromLocal(key): any {
    return this.storage.get(key);
  }
}

export class addgrades {
  title: string;
  updateDate: string;
  position: number;
  schoolID: number;
}
export class listgrades {
  id: number;
  title: string;
  position: number;
  updateDate: Date;
  schoolID: number;
}
