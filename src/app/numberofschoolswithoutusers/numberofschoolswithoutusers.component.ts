import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  SimpleChange
} from "@angular/core";
import { SchoolsService } from "../schools.service";
// import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { ExportExcellService } from "./../export-excell.service";

@Component({
  selector: "app-numberofschoolswithoutusers",
  templateUrl: "./numberofschoolswithoutusers.component.html",
  styleUrls: ["./numberofschoolswithoutusers.component.scss"]
})
export class NumberofschoolswithoutusersComponent implements OnInit {
  delid: SchoolList;
  newSchool: SchoolList;
  datas: SchoolList[];
  datas_t: SchoolList[];
  public model: SchoolList;
  loading: boolean;
  deleteLoading: boolean;
  advancedPage = 1;
  sizePage = 10;
  pagedata: any;
  totalcount: number;
  collsize: number;

  userlist: UsersList[];
  public userschool: Schoolusers[];
  datas_exp: any;
  constructor(
    private exportExcell: ExportExcellService,
    public schools: SchoolsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.model = new SchoolList();
    this.delid = new SchoolList();
    this.loading = false;
    this.deleteLoading = false;
  }

  exportasExcell() {
    this.exportExcell.exportAsExcelFile(this.datas_exp, "sample");
  }

  ngOnInit() {
    this.getuserschool();
    // this.syncdata();
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
        this.datas_t = data;
        this.totalcount = this.datas_t.length;
        this.collsize = this.datas_t.length;
        for (let i = 0; i < this.datas_t.length; i++) {
          this.datas_t[i].dispid = "#e" + this.datas_t[i].id;
          this.datas_t[i].dispid2 = "e" + this.datas_t[i].id;
          this.datas_t[i].delAction =
            "(click) = 'setdelete(" + this.datas_t[i].id + ")'";
          // this.datas[i].created_by = (""+this.datas[i].create_Date).toString();
        }
        this.loading = false;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.advancedPage = 1;
        this.getuserlist();
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
        this.syncdata();
      }
    );
  }

  getuserlist() {
    this.schools.getAllUsers<UsersList[]>().subscribe(
      (data: UsersList[]) => {
        this.userlist = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.datas = [];
        // this.datas_t = this.datas;
        this.datas_t.forEach(element => {
          let isavailable = false;
          // let nousr = 0;
          for (let i = 0; i < this.userschool.length; i++) {
            if (this.userschool[i].schoolID === element.id) {
              isavailable = true;
              // nousr++;
            }
          }
          // element.nousr = nousr;
          if (isavailable === false) {
            this.datas.push(element);
          }
        });
        this.datas_exp = this.datas;
        this.newsync();
      }
    );
  }

  setdelete(id: string) {
  }

  deleteschol() {
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

  public open(event, item) {
    this.delid = item;
  }

  public edit(event, item) {
    this.router.navigate(["main/updateschool/" + item.id]);
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
}
class SchoolList {
  id: number;
  dispid: string;
  dispid2: string;
  schoolID: string;
  schoolName: string;
  delAction: string;
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
  first_name: string;
  email_address: string;
}
