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
  selector: "app-rolllist",
  templateUrl: "./rolllist.component.html",
  styleUrls: ["./rolllist.component.scss"]
})
export class RolllistComponent implements OnInit {
  isActive: boolean;
  listroll: listroll;
  addroll: addroll;
  datas: any;
  activeloginuser: any;
  showdisplay: boolean;
  showAddRoles: boolean;
  showEditRoles: boolean;
  showPermissions: boolean;
  showDeleteRoles: boolean;
  accesslist: any;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar
  ) {
    this.showdisplay = false;
    this.showAddRoles = false;
    this.showEditRoles = false;
    this.showPermissions = false;
    this.showDeleteRoles = false;

    this.addroll = new addroll();
    this.listroll = new listroll();
    this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
    this.isActive = true;
  }

  ngOnInit() {
    this.isActive = true;
    this.addroll.title = "";

    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "CSU") {
        this.showDeleteRoles = true;
        this.showPermissions = true;
        this.showEditRoles = true;
        this.showAddRoles = true;
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "CAD") {
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "CTS") {
        this.showdisplay = true;
      }else if (this.accesslist[i].code == "CA") {
        this.showdisplay = true;
      }else if (this.accesslist[i].code == "CR") {
        this.showdisplay = true;
      }
    }

    // let school_id =  this.getFromLocal('selected_school_id');
    this.schools.listrolls<listroll[]>().subscribe(
      (data: listroll[]) => {
        this.datas = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
      }
    );
  }

  addrolls(title) {
    if (title === "") {
      alert("Please Enter User Roles");
    } else {
      this.addroll.updateDate = "2019-01-19T14:39:52.882Z";
      this.addroll.title = title;
      this.addroll.updateID = this.activeloginuser.id;
      this.addroll.updateName = this.activeloginuser.first_name;
      this.schools.addrolls<addroll>(this.addroll).subscribe(
        (data: addroll) => {
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.addroll.title = "";
          this.ngOnInit();
          alert("Added Successfully");
          // this.router.navigate(['School/student'])
        }
      );
    }
  }

  delete($event, data) {
    this.schools.deleterolls<addroll[]>(data.id).subscribe(
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
    this.isActive = false;
    this.schools.fetchrolls<listroll>(data.id).subscribe(
      (data: listroll) => {
        this.addroll.title = data.title;
        this.listroll = data;
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
    this.addroll.title = "";
  }

  update1(title) {
    this.listroll.title = title;
    this.schools
      .updaterolls<listroll>(this.listroll.id, this.listroll)
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

export class addroll {
  title: string;
  updateDate: string;
  updateID: number;
  updateName: string;
}
export class listroll {
  id: number;
  title: string;
  updateDate: string;
  updateID: number;
  updateName: string;
}
