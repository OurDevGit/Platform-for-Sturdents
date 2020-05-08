import { ExportExcellService } from "./../export-excell.service";
import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SchoolsService } from "../schools.service";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "lodash";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import * as moment from "moment-timezone";
var jstz = require("jstz");
var timezone = jstz.determine();

@Component({
  selector: "app-usermanagement",
  templateUrl: "./usermanagement.component.html",
  styleUrls: ["./usermanagement.component.scss"]
})
export class UsermanagementComponent implements OnInit {
  showdisplay: boolean;
  datas: UsersList[];
  datas_exp: any;
  deletecheck: boolean;
  accesslist: any;
  delid: UsersList;
  public model: UsersList;
  public userschool: Schoolusers[];
  schoollist: SchoolList[];
  loading: boolean;
  deleteLoading: boolean;
  advancedPage = 1;
  sizePage = 10;
  pagedata: any;
  totalcount: number;
  collsize: number;
  currenttimeinserver: Date;
  // rowid: number;
  // schools: any;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private exportExcell: ExportExcellService,
    public schools: SchoolsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.model = new UsersList();
    this.delid = new UsersList();
    this.deleteLoading = false;
  }

  exportasExcell() {
    this.exportExcell.exportAsExcelFile(this.datas_exp, "user");
  }

  ngOnInit() {
    this.accesslist = this.getFromLocal("access_list");
    this.syncdata();
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
      } else if (this.accesslist[i].code == "CR") {
        this.showdisplay = true;
      }
    }
  }

  newsync() {
    const startval = (this.advancedPage - 1) * this.sizePage;
    let endval = this.advancedPage * this.sizePage;
    if (this.datas.length > endval) {
    } else {
      endval = this.datas.length;
    }
    this.pagedata = [];
    for (let index = startval; index < endval; index++) {
      this.pagedata.push(this.datas[index]);
    }
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }

  deleteuser() {
    this.deletecheck = false;
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "CSU") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      this.deleteLoading = true;
      this.deleteLoading = true;
      this.schools.deleteUser<UsersList[]>(this.delid.id).subscribe(
        (data: any) => {},
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.syncdata();
          this.deleteLoading = false;
        }
      );
    }
  }

  public open(event, item) {
    this.delid = item;
  }

  public edit(event, item) {
    this.deletecheck = false;
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "CSU") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      this.router.navigate(["main/updateuser/" + item.id]);
    }
  }

  syncdata() {
    this.loading = true;
    this.schools.getcurrenttime<any>().subscribe(
      (curtime: any) => {
        this.currenttimeinserver = new Date(curtime.status);
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {}
    );
    this.schools.getAllUsers<UsersList[]>().subscribe(
      (data: UsersList[]) => {
        this.datas = data;
        this.datas_exp = _.cloneDeep(data);
        this.totalcount = this.datas.length;
        this.collsize = this.datas.length;
        for (let i = 0; i < this.datas.length; i++) {
          this.datas[i].dispid = "#ee" + this.datas[i].id;
          this.datas[i].dispid2 = "ee" + this.datas[i].id;
          this.datas[i].schools = [];
        }
        this.datas.forEach(element => {
          element.schools = [];
        });
        this.getuserschool();
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.newsync();
      }
    );
  }
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
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        for (let j = 0; j < this.userschool.length; j++) {
          for (let i = 0; i < this.datas.length; i++) {
            if (this.userschool[j].userID === this.datas[i].id) {
              this.schoollist.forEach(element => {
                if ("" + element.id === "" + this.userschool[j].schoolID) {
                  this.datas[i].schools.push(element);
                }
              });
            }
          }
        }
        this.loading = false;
      }
    );
  }

  check(item) {
    if (item.isActive == true) item.isActive = false;
    else item.isActive = true;

    this.schools.updateUser<UsersList>(item.id, item).subscribe(
      (data: UsersList) => {
        this.syncdata();
        //alert("Updated");
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        if (item.isActive == false) {
          alert("Disabled Succesfully");
        } else {
          alert("Enabled  Succesfully");
        }
        this.syncdata();
      }
    );
  }
}
class Schoolusers {
  id: number;
  email: string;
  schoolID: number;
  userID: number;
  createdby: string;
  updatedby: string;
}

class SchoolList {
  id: number;
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

class UsersList {
  id: number;
  title: string;
  isActive: Boolean;
  schools: SchoolList[];
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
