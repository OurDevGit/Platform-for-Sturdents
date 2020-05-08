import { ExportExcellService } from "./../export-excell.service";
import { Component, OnInit, Inject } from "@angular/core";
import { SchoolsService } from "../schools.service";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "lodash";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";

@Component({
  selector: "app-assignusertocynosure",
  templateUrl: "./assignusertocynosure.component.html",
  styleUrls: ["./assignusertocynosure.component.scss"]
})
export class AssignusertocynosureComponent implements OnInit {
  filter: any;
  deletecheck: boolean;
  showdisplay: boolean;
  delete_display: boolean;
  edit_display: boolean;
  accesslist: any;
  datas: UsersList[];
  cynosureuser: UsersList[] = [];
  noncynosureuser: UsersList[] = [];
  datas_exp: any;
  delid: Schoolusers;
  public userschool: Schoolusers[] = [];
  public usercynosure: Schoolusers[] = [];
  schoollist: SchoolList[];
  loading: boolean;
  deleteLoading: boolean;
  advancedPage = 1;
  sizePage = 10;
  pagedata: any;
  totalcount: number;
  collsize: number;

  public model: Schoolusers;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private exportExcell: ExportExcellService,
    public schools: SchoolsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.delete_display = false;
    this.edit_display = false;
    this.model = new Schoolusers();
    this.delid = new Schoolusers();

    this.deleteLoading = false;
  }
  exportasExcell() {
    this.exportExcell.exportAsExcelFile(this.datas_exp, "cynosureusers");
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }

  ngOnInit() {
    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "CSU") {
        this.delete_display = true;
        this.edit_display = true;
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "CAD") {
        this.edit_display = true;
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "CTS") {
        this.edit_display = true;
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "CAU") {
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "CR") {
        this.showdisplay = true;
      } 
    }

    this.syncdata();
  }

  newsync() {
    const startval = (this.advancedPage - 1) * this.sizePage;
    let endval = this.advancedPage * this.sizePage;
    if (this.cynosureuser.length > endval) {
    } else {
      endval = this.cynosureuser.length;
    }
    this.pagedata = [];
    for (let index = startval; index < endval; index++) {
      this.pagedata.push(this.cynosureuser[index]);
    }
  }

  deleteuser() {
    this.deletecheck = false;
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "CAD") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      this.deleteLoading = true;

      this.schools.deleteUserCynosure<UsersList[]>(this.delid.id).subscribe(
        (data: any) => { },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.syncdata();
          alert("Deleted Successfully");
          this.deleteLoading = false;
        }
      );
    } else {
      alert("!You Don't Have the Access To Delete");
    }
  }

  public open(event, item) {
    this.delid = item;
  }

  public edit(event, item) {
    this.router.navigate(["main/updateuser/" + item.id]);
  }
  syncdata() {
    this.loading = true;
    this.schools.getAllUsers<UsersList[]>().subscribe(
      (data: UsersList[]) => {
        this.datas = data;
        this.datas_exp = _.cloneDeep(data);
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
        this.newsync();
        this.loading = false;
      }
    );
  }

  check() {
    this.deletecheck = false;
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "CSU") {
        this.deletecheck = true;
      } else if (this.accesslist[i].code == "CAD") {
        this.deletecheck = true;
      } else if (this.accesslist[i].code == "CTS") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      this.schools.addUserCynosure<Schoolusers>(this.model).subscribe(
        (data: Schoolusers) => {
          alert("added");
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          this.model = new Schoolusers();
          this.syncdata();
        }
      );
    } else {
      alert("!You Don't Have the Access To Add");
    }
  }
}
class Schoolusers {
  id: number;
  email: string;
  schoolID: number;
  userID: number;
  createdby: string;
  updatedby: string;
  first_name: string;
  email_address: string;
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
