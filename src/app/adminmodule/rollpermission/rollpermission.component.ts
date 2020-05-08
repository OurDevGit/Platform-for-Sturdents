import {
  Component,
  OnInit,
  ChangeDetectorRef
} from "@angular/core";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewEncapsulation, Inject } from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";

@Component({
  selector: "app-rollpermission",
  templateUrl: "./rollpermission.component.html",
  styleUrls: ["./rollpermission.component.scss"]
})
export class RollpermissionComponent implements OnInit {
  i: any;
  j: any;

  permission: any;
  roll: any;
  id: number;
  addrollpermission: addrollpermission;
  listrollpermissions: listrollpermissions;
  listpermission: listpermission;
  isActive: boolean;
  date: any;
  datas: any;
  rolls: any;
  activeloginuser: any;
  title_card: string;
  listarray: any[] = [];
  constructor(
    private cref: ChangeDetectorRef,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar
  ) {
    this.listrollpermissions = new listrollpermissions();
    this.listpermission = new listpermission();
    this.addrollpermission = new addrollpermission();
    this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
    this.title_card = "" + this.getFromLocal("rolltitle");
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"]; // (+) converts string 'id' to a number
    });
    this.isActive = true;
    this.schools.listpermissons<listpermission[]>().subscribe(
      (data: listpermission[]) => {
        this.rolls = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.listarray = [];
        this.listpermission.title = "Select a permission";
        this.schools
          .listrollpermissions<listrollpermissions[]>("" + this.id)
          .subscribe(
            (data: listrollpermissions[]) => {
              this.datas = data;
              this.listarray = [];
              for (
                this.permission = 1;
                this.permission < this.datas.length;
                this.permission++
              ) {
                for (
                  this.roll = 0;
                  this.roll < this.rolls.length;
                  this.roll++
                ) {
                  if (
                    this.datas[this.permission].permissionid ==
                    this.rolls[this.roll].id
                  ) {
                    let list = {
                      id: this.datas[this.permission].id,
                      title: this.rolls[this.roll].title
                    };
                    this.listarray.push(list);
                  }
                }
              }
              this.cref.markForCheck();
            },
            error => () => {
              /* can provide allert for error on the api */
            },
            () => {
              for (this.i = 0; this.i < this.listarray.length; this.i++) {
                for (this.j = 0; this.j < this.rolls.length; this.j++) {
                  if (
                    this.listarray[this.i].title == this.rolls[this.j].title
                  ) {
                    this.rolls.splice(this.j, 1);
                  }
                }
              }
            }
          );
      }
    );
  }

  addrollpermissions() {
    if (this.listpermission.title == "0") {
      alert("please select the roll");
    } else {
      this.addrollpermission.updateDate = "2019-01-19T14:39:52.882Z";
      this.addrollpermission.rollid = +this.id;
      this.addrollpermission.permissionid = +this.listpermission.title;
      this.addrollpermission.updateID = this.activeloginuser.id;
      this.addrollpermission.updateName = this.activeloginuser.first_name;
      this.schools
        .addrollpermisions<addrollpermission>(this.addrollpermission)
        .subscribe(
          (data: addrollpermission) => {
          },
          error => () => {
            /* can provide allert for error on the api */
          },
          () => {
            this.ngOnInit();
            alert("Added successfully");
            // this.router.navigate(['School/student'])
          }
        );
    }
  }

  delete($event, data) {
    this.schools
      .deleterollpermissions<listrollpermissions[]>(data.id)
      .subscribe(
        (data: any) => { },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          alert("deleted");
          this.ngOnInit();
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

export class addrollpermission {
  rollid: number;
  permissionid: number;
  updateDate: string;
  updateID: number;
  updateName: string;
}
export class listpermission {
  id: number;
  title: string;
  code: string;
}

export class listrollpermissions {
  id: number;
  title: string;
  code: string;
}
