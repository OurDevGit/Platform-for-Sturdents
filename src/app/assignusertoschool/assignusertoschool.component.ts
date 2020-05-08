import { Component, OnInit, Inject } from "@angular/core";
import { SchoolsService } from "../schools.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
@Component({
  selector: "app-assignusertoschool",
  templateUrl: "./assignusertoschool.component.html",
  styleUrls: ["./assignusertoschool.component.scss"]
})
export class AssignusertoschoolComponent implements OnInit {
  datas: Schoolusers[];
  delid: Schoolusers;
  public userschool: Schoolusers[];
  userlistOrig: UsersList[];
  userlist: UsersList[];
  schoollist: SchoolList[];
  thisschooluser: number[];
  public model: Schoolusers;
  loading: boolean;
  userdropdowntext: string;
  issyncstarted: boolean;
  showdisplay: boolean;
  accesslist: any;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.model = new Schoolusers();
    this.loading = true;
    this.userdropdowntext = "Select School to get the user list";
    this.issyncstarted = false;
  }

  ngOnInit() {
    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "CSU") {
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "CTS") {
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "CA") {
        this.showdisplay = true;
      } 
    }

    this.getuserschool();
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }

  getuserschool() {
    this.loading = true;
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
        this.getuserlist();
      }
    );
  }
  getuserlist() {
    this.schools.getnonCynosureUsers<UsersList[]>().subscribe(
      (data: UsersList[]) => {
        this.userlistOrig = data;

        // this.userlist = data;

      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.loading = false;
      }
    );
  }

  refreshUserList(schiilId) {
    this.userdropdowntext = "Select User";
    this.thisschooluser = [];
    this.userschool.forEach(element => {
      if ("" + element.schoolID === "" + this.model.schoolID) {
        this.thisschooluser.push(element.userID);
      }
    });
    this.userlist = [];
    this.userlistOrig.forEach(element => {
      let canins = 0;
      for (let index = 0; index < this.thisschooluser.length; index++) {
        if (this.thisschooluser[index] === element.id) {
          canins = 1;
          break;
        }
      }

      if (canins === 0) {
        this.userlist.push(element);
      }
    });
  }

  check() {

    if (this.model.schoolID != null && this.model.userID != null) {
      this.issyncstarted = true;
      this.schools.addUserSchool<Schoolusers>(this.model).subscribe(
        (data: Schoolusers) => {},
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {
          alert("User has been assigned to the school successfully");
          this.router.navigate(["main/viewuserschool"]);
        }
      );
    } else {
      if (this.model.schoolID == null && this.model.userID == null) {
        alert("Select a school and user");
      } else if (this.model.schoolID == null && this.model.userID != null) {
        alert("Select a  school");
      } else if (this.model.schoolID != null && this.model.userID == null) {
        alert("Select a  user");
      }
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
