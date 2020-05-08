import { ExportExcellService } from "./../export-excell.service";
import { element } from "protractor";
import { Component, OnInit, Inject } from "@angular/core";
import { SchoolsService } from "../schools.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import * as _ from "lodash";

@Component({
  selector: "app-viewschooluser",
  templateUrl: "./viewschooluser.component.html",
  styleUrls: ["./viewschooluser.component.scss"]
})
export class ViewschooluserComponent implements OnInit {
  deletecheck: any;
  datas_exp: any = [];
  // datas: Schoolusers[];
  delid: Schoolusers;
  userlist: UsersList[];
  schoollist: SchoolList[];
  public model: Schoolusers;
  public userschool: Schoolusers[];
  loading: boolean;
  deleteLoading: boolean = false;
  advancedPage = 1;
  sizePage = 10;
  pagedata: any;
  totalcount: number;
  collsize: number;
  showdisplay: boolean;
  showDelete: boolean;
  accesslist: any;

  datas: any;
  usercynosure: any;
  cynosureuser: any;
  noncynosureuser: any;
  selschoolid = 0;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private exportExcell: ExportExcellService,
    public schools: SchoolsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.model = new Schoolusers();
    this.delid = new Schoolusers();
    this.delid.school = new SchoolList();
    this.delid.users = new UsersList();
    this.delid.users.first_name = "";
    this.showDelete = false;
  }
  exportasExcell() {
    this.exportExcell.exportAsExcelFile(this.datas_exp, "Schooluserlinking");
  }
  ngOnInit() {
    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "CSU") {
        this.showDelete = true;
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "CAD") {
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "CTS") {
        this.showDelete = true;
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "CA") {
        this.showdisplay = true;
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "CR") {
        this.showdisplay = true;
      } 
    }

    this.getuserschool();
    this.getschoollist();
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }

  newsync() {
    const startval = (this.advancedPage - 1) * this.sizePage;
    let endval = this.advancedPage * this.sizePage;
    if (this.userschool.length > endval) {
    } else {
      endval = this.userschool.length;
    }
    this.pagedata = [];
    for (let index = startval; index < endval; index++) {
      this.pagedata.push(this.userschool[index]);
    }
  }

  getschoollist() {
    this.schools.getAllSchools<SchoolList[]>().subscribe(
      (data: SchoolList[]) => {
        this.schoollist = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => { }
    );
  }
  getuserschool_new(id) {
    this.selschoolid = id;
    if (id > 0) {
      this.schools.getusersofschool<UsersList[]>(id).subscribe(
        (data: UsersList[]) => {
          this.datas = data;

          this.totalcount = this.datas.length;
          this.collsize = this.datas.length;
          for (let i = 0; i < this.datas.length; i++) {
            this.datas[i].dispid = "#ee" + this.datas[i].id;
            this.datas[i].dispid2 = "ee" + this.datas[i].id;
          }
          this.datas.forEach(element => {
            element.schools = [];
          });
          this.getusercynosure();
        },
        error => () => { },
        () => { }
      );
    } else this.getuserschool();
  }
  getuserschool() {
    this.loading = true;
    this.schools.getAllUsers<UsersList[]>().subscribe(
      (data: UsersList[]) => {
        this.datas = data;

        this.totalcount = this.datas.length;
        this.collsize = this.datas.length;
        for (let i = 0; i < this.datas.length; i++) {
          this.datas[i].dispid = "#ee" + this.datas[i].id;
          this.datas[i].dispid2 = "ee" + this.datas[i].id;
        }
        this.datas.forEach(element => {
          element.schools = [];
        });
        this.getusercynosure();
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
      }
    );
  }

  getusercynosure() {
    this.loading = true;
    this.schools.getAllUserCynosure<Schoolusers[]>().subscribe(
      (data: Schoolusers[]) => {
        this.usercynosure = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.cynosureuser = [];
        this.noncynosureuser = [];
        for (let i = 0; i < this.datas.length; i++) {
          let iscynosure = false;
          for (let j = 0; j < this.usercynosure.length; j++) {
            if (this.usercynosure[j].userID === this.datas[i].id) {
              iscynosure = true;
              break;
            }
          }
          if (iscynosure) {
            this.cynosureuser.push(this.datas[i]);
          } else {
            this.noncynosureuser.push(this.datas[i]);
          }
        }

        this.datas_exp = _.cloneDeep(this.noncynosureuser);
        this.newsync();
        this.loading = false;
      }
    );
  }

  deleteschol() {
    if (this.selschoolid != 0) {
      this.deletecheck = false;
      for (let i = 0; i < this.accesslist.length; i++) {
        if (this.accesslist[i].code == "CSU") {
          this.deletecheck = true;
        } else if (this.accesslist[i].code == "CAD") {
          this.deletecheck = true;
        }
      }
      if (this.deletecheck == true) {
        this.deleteLoading = true;
        this.schools
          .deleteUserSchoolwithuserschool<Schoolusers[]>(
            this.selschoolid,
            this.delid.id
          )
          .subscribe(
            (data: any) => {
              alert("Deleted Successfully");
            },
            error => () => {
              /* can provide allert for error on the api */
            },
            () => {
              this.getuserschool_new(this.selschoolid);
              this.deleteLoading = false;
            }
          );
      } else {
        alert("You Don't Have The Access To Delete");
      }
    } else {
      alert("select a school to un link the user");
    }
  }

  public open(event, item) {
    this.delid = item;
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
