import {
  Component,
  OnInit
} from "@angular/core";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewEncapsulation, Inject } from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";

@Component({
  selector: "app-permission",
  templateUrl: "./permission.component.html",
  styleUrls: ["./permission.component.scss"]
})
export class PermissionComponent implements OnInit {
  isActive: boolean;
  addpermission: addpermission;
  listpermission: listpermission;
  datas: any;
  activeloginuser: any;
  id: number;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar
  ) {
    this.addpermission = new addpermission();
    this.listpermission = new listpermission();
    this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
    this.isActive = true;
  }

  ngOnInit() {
    this.isActive = true;
    this.addpermission.title = "";
    this.addpermission.code = "";
    // let school_id =  this.getFromLocal('selected_school_id');
    this.schools.listpermissons<listpermission[]>().subscribe(
      (data: listpermission[]) => {
        this.datas = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
      }
    );
  }

  addpermissions(title) {
    if (title === "") {
      alert("Please Enter Grade");
    } else {
      this.addpermission.title = title;
      this.schools.addpermissions<addpermission>(this.addpermission).subscribe(
        (data: addpermission) => {
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.addpermission.title = "";
          this.addpermission.code = "";
          this.ngOnInit();
          alert("Added successfully");
          // this.router.navigate(['School/student'])
        }
      );
    }
  }

  delete($event, data) {
    this.schools.deletepermissions<listpermission[]>(data.id).subscribe(
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

  permission($event, data) {

    this.saveInLocal("rolltitle", data.title);
    this.router.navigate(["main/rollpermission/" + data.id]);
  }

  update($event, data) {
    this.id = data.id;
    this.isActive = false;
    this.schools.fetchpermissions<listpermission>(data.id).subscribe(
      (data: listpermission) => {
        this.listpermission.title = data.title;
        this.listpermission.code = data.code;
        this.addpermission = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
      }
    );
  }

  reset1() {
    this.isActive = true;
    this.addpermission.title = "";
    this.addpermission.code = "";
  }

  updatepermission(title, code) {
    this.listpermission.id = this.id;
    this.listpermission.title = title;
    this.listpermission.code = code;
    this.schools
      .updatepermissions<listpermission>(this.id, this.listpermission)
      .subscribe(
        () => { },
        error => () => {
          alert("Some thing went wrong, please try again");
        },
        () => {
          alert("Updated Successfully");
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

export class addpermission {
  title: string;
  code: string;
}
export class listpermission {
  id: number;
  title: string;
  code: string;
}
