import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectorRef
} from "@angular/core";
import { SchoolsService } from "./../../schools.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  showdisplay: boolean;
  accesslist: any;
  datas: Schoolusers[];
  delid: Schoolusers;
  userlist: UsersList[];
  schoollist: SchoolList[];
  public model: Schoolusers;
  public userschool: Schoolusers[];
  numberofschools: number;
  numberofuser: number;
  numberofschools0user = 0;
  numberofuer0schools = 0;
  dashboarddaat: CynosureDashboard;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private cref: ChangeDetectorRef,
    private router: Router,
    public schools: SchoolsService,
    private route: ActivatedRoute
  ) {
    //this.getuserschool();
    this.dashboarddaat = new CynosureDashboard();
    this.dashboarddaat.school = [];
  }
  ngOnInit() {
    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "CSU") {
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "CAD") {
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "CTS") {
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "CAU") {
        this.showdisplay = true;
      }else if (this.accesslist[i].code == "CR") {
        this.showdisplay = true;
      }
      
    }

    this.schools.getCynosureDashboard<any>().subscribe(
      (data: CynosureDashboard) => {
        this.dashboarddaat = data;
        this.cref.markForCheck();
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {}
    );
  }
  ngOnDestroy() {}
  getuserschool() {
    this.schools.getAllUserSchools<Schoolusers[]>().subscribe(
      (data: Schoolusers[]) => {
        this.userschool = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.getschoollist();
      }
    );
  }
  getschoollist() {
    this.schools.getAllSchools<SchoolList[]>().subscribe(
      (data: SchoolList[]) => {
        this.schoollist = data;
        this.numberofschools = data.length;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.getuserlist();
      }
    );
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }

  getuserlist() {
    this.schools.getAllUsers<UsersList[]>().subscribe(
      (data: UsersList[]) => {
        this.userlist = data;
        this.numberofuser = data.length;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        //this.datas = [];
        this.schoollist.forEach(element => {
          let isavailable = false;
          let nousr = 0;
          for (let i = 0; i < this.userschool.length; i++) {
            if (this.userschool[i].schoolID === element.id) {
              isavailable = true;
              nousr++;
            }
          }
          element.nousr = nousr;
          if (isavailable === false) {
            this.numberofschools0user++;
            /*
              this.datas.push(this.dat[i]);
          */
          }
        });

        this.userlist.forEach(element => {
          let isavailable = false;
          for (let i = 0; i < this.userschool.length; i++) {
            if (this.userschool[i].userID === element.id) {
              isavailable = true;
              break;
            }
          }
          if (isavailable === false) {
            this.numberofuer0schools++;
          }
        });

        this.userschool.forEach(element => {
          for (let i = 0; i < this.schoollist.length; i++) {
            if (this.schoollist[i].id === element.schoolID) {
              element.school = this.schoollist[i];
              break;
            }
          }
          for (let i = 0; i < this.userlist.length; i++) {
            if (this.userlist[i].id === element.userID) {
              element.users = this.userlist[i];
              break;
            }
          }
        });
      }
    );
  }

  directpage(page) {
    this.router.navigate([page]);
  }
}

class Schoolusers {
  id: number;
  email: string;
  schoolID: number;
  userID: number;
  users: UsersList;
  school: SchoolList;
  createdby: string;
  updatedby: string;
}
class UsersList {
  id: number;
  title: string;
  dispid: string;
  dispid2: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  mobile_number: string;
  address: string;
  email_address: string;
  street: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  created_by: string;
  updated_by: string;
}
class SchoolList {
  id: number;
  nousr: number;
  dispid: string;
  dispid2: string;
  schoolID: string;
  schoolName: string;
  schoolAddress_Lane: string;
  schoolAddress_Area: string;
  schoolAddress_City: string;
  schoolAddress_Pincode: number;
  schoolAddress_State: string;
  schoolAddress_Country: string;
  primary_Contact_Number: number;
  alternate_Contact_Number: number;
  primary_Email_Address: string;
  alternate_Email_Address: string;
  primary_Contact_Person_Name: string;
  primary_Contact_Person_contact_number: number;
  primary_Contact_Person_mobile_number: number;
  primary_Contact_Person_email_address: string;
  alternate_Contact_Person_Name: string;
  alternate_Contact_Person_contact_number: number;
  alternate_Contact_Person_mobile_number: number;
  alternate_Contact_Person_email_address: string;
  created_by: string;
  updated_by: string;
}

class CynosureDashboard_School {
  id: number;
  schoolID: string;
  schoolName: string;
  alternate_Contact_Number: string;
  alternate_Contact_Person_contact_number: string;
  alternate_Contact_Person_mobile_number: string;
}

class CynosureDashboard {
  schoolCount: number;
  schooladminCount: number;
  numberofschoolwithoutuserCount: number;
  numberofuserwithoutschoolCount: number;
  school: CynosureDashboard_School[];
}
