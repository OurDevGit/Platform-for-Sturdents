import { ExportExcellService } from "./../export-excell.service";
import {
  Component,
  OnInit,
  Inject,
  Injectable,
  Input,
  OnChanges,
  SimpleChanges,
  SimpleChange
} from "@angular/core";
import { SchoolsService } from "../schools.service";
// import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";

import * as _ from "lodash";

@Component({
  selector: "app-schoolmanagement",
  templateUrl: "./schoolmanagement.component.html",
  styleUrls: ["./schoolmanagement.component.scss"]
})
@Injectable()
export class SchoolmanagementComponent implements OnInit {
  deletecheck: boolean;
  delid: SchoolList;
  newSchool: SchoolList;
  datas: any;
  datas_exp: any;
  public model: SchoolList;
  loading: boolean;
  deleteLoading: boolean;
  advancedPage = 1;
  sizePage = 10;
  pagedata: any;
  totalcount: number;
  collsize: number;
  showdisplay: boolean;
  showdisplayDeleteBtn: boolean;
  showgenerate_report: boolean;
  accesslist: any;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private exportExcell: ExportExcellService,
    public schools: SchoolsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.showdisplayDeleteBtn = false;

    this.model = new SchoolList();
    this.delid = new SchoolList();
    this.loading = false;
    this.deleteLoading = false;
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
        this.showdisplayDeleteBtn = true;
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
    this.syncdata();
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
  syncdata() {
    this.loading = true;
    this.schools.getAllSchools<SchoolList[]>().subscribe(
      (data: SchoolList[]) => {
        this.datas = data;
        this.datas_exp = _.cloneDeep(data);
        this.totalcount = this.datas.length;
        this.collsize = this.datas.length;
        for (let i = 0; i < this.datas.length; i++) {
          this.datas[i].dispid = "#e" + this.datas[i].id;
          this.datas[i].dispid2 = "e" + this.datas[i].id;
          this.datas[i].delAction =
            "(click) = 'setdelete(" + this.datas[i].id + ")'";
          // this.datas[i].created_by = (""+this.datas[i].create_Date).toString();
        }
        this.loading = false;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.advancedPage = 1;
        this.newsync();
      }
    );
  }
  setdelete(id: string) {
  }

  deleteschol() {
    this.deletecheck = false;
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "CSU") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      this.deleteLoading = true;
      this.schools.getusersofschool<UsersList[]>(this.delid.id).subscribe(
        (data: UsersList[]) => {
          if (data.length > 0) {
            this.deleteLoading = false;
            alert("remove linked user before to delete the school");
          } else {
            this.deleteLoading = true;
            this.schools.deleteSchool<SchoolList[]>(this.delid.id).subscribe(
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
        },
        error => () => {},
        () => {}
      );
    } else {
      alert("! You Don't HAve the Access To Delete");
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
      } else if (this.accesslist[i].code == "CAD") {
        this.deletecheck = true;
      } else if (this.accesslist[i].code == "CTS") {
        this.deletecheck = true;
      }
    }
    if (this.deletecheck == true) {
      this.router.navigate(["main/updateschool/" + item.id]);
    } else {
      alert("You Don't Have The Access to Edit");
    }
  }
  check() {

    this.schools.addSchool<SchoolList>(this.model).subscribe(
      (data: SchoolList) => {
        alert("added");
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.syncdata();
      }
    );
  }

  exportasExcell() {
    this.exportExcell.exportAsExcelFile(this.datas_exp, "school");
  }
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
  create_Date: string;
  updated_by: string;
  updated_Date: string;
}
