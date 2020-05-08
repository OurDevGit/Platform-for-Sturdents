import { Component, OnInit, Inject } from "@angular/core";
import { SchoolsService } from "../schools.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";

@Component({
  selector: "app-updateschool",
  templateUrl: "./updateschool.component.html",
  styleUrls: ["./updateschool.component.scss"]
})
export class UpdateschoolComponent implements OnInit {
  schid: number;
  delid: SchoolList;
  newSchool: SchoolList;
  datas: any;
  public model: SchoolList;
  errorschool: ESchoolList;
  activeloginuser: any;
  timezoneList: string[];
  showdisplay: boolean;
  accesslist: any;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpClient
  ) {
    this.route.params.subscribe(params => {
      this.schid = params["id"]; // (+) converts string 'id' to a number
      this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
    });

    this.model = new SchoolList();
    this.errorschool = new ESchoolList();
    this.httpService.get("./assets/data/TimeZones.json").subscribe(
      data => {
        this.timezoneList = data as string[]; // FILL THE ARRAY WITH DATA.
      },
      (err: HttpErrorResponse) => {
      }
    );
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
      } 
    }
    this.syncdata();
  }

  syncdata() {
    this.schools.getSingleSchool<SchoolList>(this.schid).subscribe(
      (data: SchoolList) => {
        this.model = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => { }
    );
  }

  check() {
    this.model.updated_by = this.activeloginuser.id;
    this.model.Updated_by_name = this.activeloginuser.first_name;
    this.schools.updateSchool<SchoolList>(this.schid, this.model).subscribe(
      () => { },
      error => () => {
        alert("Some thing went wrong, please try again");
      },
      () => {
        alert("Updated Successfully");
        this.router.navigate(["main/schoolmanagement"]);
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
  Updated_by_name: string;
  timeZone: string;
}
class ESchoolList {
  id: number;
  dispid: string;
  dispid2: string;
  schoolID: boolean;
  schoolName: boolean;
  schoolAddress_Lane: boolean;
  schoolAddress_Area: boolean;
  schoolAddress_City: boolean;
  schoolAddress_Pincode: boolean;
  schoolAddress_State: boolean;
  schoolAddress_Country: boolean;
  primary_Contact_Number: boolean;
  alternate_Contact_Number: boolean;
  primary_Email_Address: boolean;
  alternate_Email_Address: boolean;
  primary_Contact_Person_Name: boolean;
  primary_Contact_Person_contact_number: boolean;
  primary_Contact_Person_mobile_number: boolean;
  primary_Contact_Person_email_address: boolean;
  alternate_Contact_Person_Name: boolean;
  alternate_Contact_Person_contact_number: boolean;
  alternate_Contact_Person_mobile_number: boolean;
  alternate_Contact_Person_email_address: boolean;
  created_by: boolean;
  updated_by: boolean;
  timeZone: string;
}
