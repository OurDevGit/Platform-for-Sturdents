import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { SchoolsService } from "../schools.service";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";

@Component({
  selector: "app-addschool",
  templateUrl: "./addschool.component.html",
  styleUrls: ["./addschool.component.scss"]
})
export class AddschoolComponent implements OnInit {
  @ViewChild("schoolID", { static: false }) schoolID: any;
  @ViewChild("schoolName", { static: false }) schoolName: any;
  @ViewChild("schoolAddress_Lane", { static: false }) schoolAddress_Lane: any;
  @ViewChild("schoolAddress_Area", { static: false }) schoolAddress_Area: any;
  @ViewChild("schoolAddress_City", { static: false }) schoolAddress_City: any;
  @ViewChild("schoolAddress_Pincode", { static: false })
  schoolAddress_Pincode: any;
  @ViewChild("schoolAddress_State", { static: false }) schoolAddress_State: any;
  @ViewChild("schoolAddress_Country", { static: false })
  schoolAddress_Country: any;
  @ViewChild("primary_Contact_Number", { static: false })
  primary_Contact_Number: any;
  @ViewChild("alternate_Contact_Number", { static: false })
  alternate_Contact_Number: any;
  @ViewChild("primary_Email_Address", { static: false })
  primary_Email_Address: any;
  @ViewChild("alternate_Email_Address", { static: false })
  alternate_Email_Address: any;
  @ViewChild("primary_Contact_Person_Name", { static: false })
  primary_Contact_Person_Name: any;
  @ViewChild("primary_Contact_Person_contact_number", { static: false })
  primary_Contact_Person_contact_number: any;
  @ViewChild("primary_Contact_Person_mobile_number", { static: false })
  primary_Contact_Person_mobile_number: any;
  @ViewChild("primary_Contact_Person_email_address", { static: false })
  primary_Contact_Person_email_address: any;
  @ViewChild("alternate_Contact_Person_Name", { static: false })
  alternate_Contact_Person_Name: any;
  @ViewChild("alternate_Contact_Person_contact_number", { static: false })
  alternate_Contact_Person_contact_number: any;
  @ViewChild("alternate_Contact_Person_mobile_number", { static: false })
  alternate_Contact_Person_mobile_number: any;
  @ViewChild("alternate_Contact_Person_email_address", { static: false })
  alternate_Contact_Person_email_address: any;
  showdisplay: boolean;
  accesslist: any;
  notuniqueid: boolean;
  delid: SchoolList;
  schoollistdatas: SchoolList[];
  errorschool: ESchoolList;
  datas: any;
  public model: SchoolList;
  countrylist: string[];
  timezoneList: string[];
  t_primary_Contact_Number_countrycode: string;
  t_alternate_Contact_Number_countrycode: string;
  t_primary_Contact_Person_contact_number_countrycode: string;
  t_primary_Contact_Person_mobile_number_countrycode: string;
  t_alternate_Contact_Person_contact_number_countrycode: string;
  t_alternate_Contact_Person_mobile_number_countrycode: string;
  is_submitting: boolean = false;
  activeloginuser: any;
  er_countrycode1: string = "";
  er_countrycode2: string = "";
  er_countrycode3: string = "";
  er_countrycode4: string = "";
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.syncdata();
    this.notuniqueid = false;
    this.model = new SchoolList();
    this.model.schoolID = "";
    this.model.schoolName = "";
    this.model.schoolAddress_Lane = "";
    this.model.schoolAddress_Area = "";
    this.model.schoolAddress_City = "";
    this.model.schoolAddress_State = "";
    this.model.schoolAddress_Country = "";
    this.model.primary_Email_Address = "";
    this.model.alternate_Email_Address = "";
    this.model.primary_Contact_Person_Name = "";
    this.model.primary_Contact_Person_email_address = "";
    this.model.alternate_Contact_Person_Name = "";
    this.model.alternate_Contact_Person_email_address = "";
    this.model.created_by = "";
    this.model.updated_by = "";
    this.t_primary_Contact_Number_countrycode = "Select Country Code1";
    this.t_alternate_Contact_Number_countrycode = "Select Country Code2";
    this.t_primary_Contact_Person_contact_number_countrycode =
      "Select Country Code3";
    this.t_primary_Contact_Person_mobile_number_countrycode =
      "Select Country Code4";
    this.errorschool = new ESchoolList();
    this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
  }

  checkSchoolID(value: any) {
    var isexist = false;
    for (var i = 0; i < this.schoollistdatas.length; i++) {
      if (this.schoollistdatas[i].schoolID == value) isexist = true;
    }
    if (isexist == true) {
      this.notuniqueid = true;
    } else {
      this.notuniqueid = false;
    }
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
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "CAD") {
        this.showdisplay = true;
      } 
    }

    this.httpService.get("./assets/data/CountryCodes.json").subscribe(
      data => {
        this.countrylist = data as string[]; // FILL THE ARRAY WITH DATA.
      },
      (err: HttpErrorResponse) => {
      }
    );
    this.httpService.get("./assets/data/TimeZones.json").subscribe(
      data => {
        this.timezoneList = data as string[]; // FILL THE ARRAY WITH DATA.
      },
      (err: HttpErrorResponse) => {
      }
    );
    this.inivalidate();
  }

  validate() {
    this.is_submitting = true;
    let model1 = new SchoolList();
    // model1 = this.model;
    model1 = Object.assign({}, this.model);
    model1.primary_Contact_Number =
      this.t_primary_Contact_Number_countrycode +
      this.model.primary_Contact_Number;
    model1.alternate_Contact_Number =
      this.t_alternate_Contact_Number_countrycode +
      this.model.alternate_Contact_Number;
    model1.primary_Contact_Person_contact_number =
      this.t_primary_Contact_Person_contact_number_countrycode +
      this.model.primary_Contact_Person_contact_number;
    model1.primary_Contact_Person_mobile_number =
      this.t_primary_Contact_Person_mobile_number_countrycode +
      this.model.primary_Contact_Person_mobile_number;
    model1.alternate_Contact_Person_contact_number =
      this.t_alternate_Contact_Person_contact_number_countrycode +
      this.model.alternate_Contact_Person_contact_number;
    model1.alternate_Contact_Person_mobile_number =
      this.t_alternate_Contact_Person_mobile_number_countrycode +
      this.model.alternate_Contact_Person_mobile_number;

    model1.updated_by = this.activeloginuser.id;
    model1.Updated_by_name = this.activeloginuser.first_name;
    this.schools.addSchool<SchoolList>(model1).subscribe(
      (data: SchoolList) => { },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.router.navigate(["main/schoolmanagement"]);
      }
    );
  }
  inivalidate() {
    this.errorschool.schoolID = false;
    this.errorschool.schoolName = false;
    this.errorschool.schoolAddress_Lane = false;
    this.errorschool.schoolAddress_Area = false;
    this.errorschool.schoolAddress_City = false;
    this.errorschool.schoolAddress_Pincode = false;
    this.errorschool.schoolAddress_State = false;
    this.errorschool.schoolAddress_Country = false;
    this.errorschool.primary_Contact_Number = false;
    this.errorschool.alternate_Contact_Number = false;
    this.errorschool.primary_Email_Address = false;
    this.errorschool.alternate_Email_Address = false;
    this.errorschool.primary_Contact_Person_Name = false;
    this.errorschool.primary_Contact_Person_contact_number = false;
    this.errorschool.primary_Contact_Person_mobile_number = false;
    this.errorschool.primary_Contact_Person_email_address = false;
    this.errorschool.alternate_Contact_Person_Name = false;
    this.errorschool.alternate_Contact_Person_contact_number = false;
    this.errorschool.alternate_Contact_Person_mobile_number = false;
    this.errorschool.alternate_Contact_Person_email_address = false;
    this.errorschool.created_by = false;
    this.errorschool.updated_by = false;
  }
  resetselecterror(i) {
    switch (i) {
      case 1:
        this.er_countrycode1 = "";
        break;
      case 2:
        this.er_countrycode2 = "";
        break;
      case 3:
        this.er_countrycode3 = "";
        break;
      case 4:
        this.er_countrycode4 = "";
        break;
    }
  }
  check() {
    let has_error = false;
    if (this.t_primary_Contact_Number_countrycode === "Select Country Code1") {
      this.er_countrycode1 =
        "Invalid Input In Primary Contact Number Country Code";
      has_error = true;
    } else this.er_countrycode1 = "";
    if (
      this.t_alternate_Contact_Number_countrycode === "Select Country Code2"
    ) {
      this.er_countrycode2 =
        "Invalid Input In Alternate Contact Number Country Code";
      has_error = true;
    } else {
      this.er_countrycode2 = "";
    }
    if (
      this.t_primary_Contact_Person_contact_number_countrycode ===
      "Select Country Code3"
    ) {
      this.er_countrycode3 = "Invalid Input In  Contact Number Country Code";
      has_error = true;
    } else this.er_countrycode3 = "";
    if (
      this.t_primary_Contact_Person_mobile_number_countrycode ===
      "Select Country Code4"
    ) {
      this.er_countrycode4 = "Invalid Input In Mobile Number Country Code";
      has_error = true;
    } else {
      this.er_countrycode4 = "";
    }
    this.errorschool.schoolID = false;
    this.errorschool.schoolName = false;
    this.errorschool.schoolAddress_Lane = false;
    this.errorschool.schoolAddress_Area = false;
    this.errorschool.schoolAddress_City = false;
    this.errorschool.schoolAddress_Pincode = false;
    this.errorschool.schoolAddress_State = false;
    this.errorschool.schoolAddress_Country = false;
    this.errorschool.primary_Contact_Number = false;
    this.errorschool.alternate_Contact_Number = false;
    this.errorschool.primary_Email_Address = false;
    this.errorschool.alternate_Email_Address = false;
    this.errorschool.primary_Contact_Person_Name = false;
    this.errorschool.primary_Contact_Person_contact_number = false;
    this.errorschool.primary_Contact_Person_mobile_number = false;
    this.errorschool.primary_Contact_Person_email_address = false;
    this.errorschool.alternate_Contact_Person_Name = false;
    this.errorschool.alternate_Contact_Person_contact_number = false;
    this.errorschool.alternate_Contact_Person_mobile_number = false;
    this.errorschool.alternate_Contact_Person_email_address = false;
    this.errorschool.created_by = false;
    this.errorschool.updated_by = false;

    if (this.model.schoolID === "") {
      this.errorschool.schoolID = true;
      this.schoolID.control.markAsTouched();
      this.schoolID.control.markAsDirty();
      has_error = true;
    }
    if (this.model.schoolName === "") {
      this.errorschool.schoolName = true;
      this.schoolName.control.markAsTouched();
      this.schoolName.control.markAsDirty();
      has_error = true;
    }

    if (this.model.schoolAddress_Lane === "") {
      this.errorschool.schoolAddress_Lane = true;
      this.schoolAddress_Lane.control.markAsTouched();
      this.schoolAddress_Lane.control.markAsDirty();
      has_error = true;
    }

    if (this.model.schoolAddress_Area === "") {
      this.errorschool.schoolAddress_Area = true;
      this.schoolAddress_Area.control.markAsTouched();
      this.schoolAddress_Area.control.markAsDirty();
      has_error = true;
    }

    if (this.model.schoolAddress_City === "") {
      this.errorschool.schoolAddress_City = true;
      this.schoolAddress_City.control.markAsTouched();
      this.schoolAddress_City.control.markAsDirty();
      has_error = true;
    }

    if (
      "" + this.model.schoolAddress_Pincode === "" ||
      !this.model.schoolAddress_Pincode
    ) {
      this.errorschool.schoolAddress_Pincode = true;
      this.schoolAddress_Pincode.control.markAsTouched();
      this.schoolAddress_Pincode.control.markAsDirty();
      has_error = true;
    }

    if (this.model.schoolAddress_State === "") {
      this.errorschool.schoolAddress_State = true;
      this.schoolAddress_State.control.markAsTouched();
      this.schoolAddress_State.control.markAsDirty();
      has_error = true;
    }

    if (this.model.schoolAddress_Country === "") {
      this.errorschool.schoolAddress_Country = true;
      this.schoolAddress_Country.control.markAsTouched();
      this.schoolAddress_Country.control.markAsDirty();
      has_error = true;
    }

    if (
      this.model.primary_Contact_Number === "" ||
      !this.model.primary_Contact_Number
    ) {
      this.errorschool.primary_Contact_Number = true;
      this.primary_Contact_Number.control.markAsTouched();
      this.primary_Contact_Number.control.markAsDirty();
      has_error = true;
    }

    if (
      this.model.alternate_Contact_Number === "" ||
      !this.model.alternate_Contact_Number
    ) {
      this.errorschool.alternate_Contact_Number = true;
      this.alternate_Contact_Number.control.markAsTouched();
      this.alternate_Contact_Number.control.markAsDirty();
      has_error = true;
    }

    if (this.model.primary_Email_Address === "") {
      this.errorschool.primary_Email_Address = true;
      this.primary_Email_Address.control.markAsTouched();
      this.primary_Email_Address.control.markAsDirty();
      has_error = true;
    }

    if (this.model.primary_Contact_Person_Name === "") {
      this.errorschool.primary_Contact_Person_Name = true;
      this.primary_Contact_Person_Name.control.markAsTouched();
      this.primary_Contact_Person_Name.control.markAsDirty();
      has_error = true;
    }

    if (
      this.model.primary_Contact_Person_contact_number === "" ||
      !this.model.primary_Contact_Person_contact_number
    ) {
      this.errorschool.primary_Contact_Person_contact_number = true;
      this.primary_Contact_Person_contact_number.control.markAsTouched();
      this.primary_Contact_Person_contact_number.control.markAsDirty();
      has_error = true;
    }

    if (
      this.model.primary_Contact_Person_mobile_number === "" ||
      !this.model.primary_Contact_Person_mobile_number
    ) {
      this.errorschool.primary_Contact_Person_mobile_number = true;
      this.primary_Contact_Person_mobile_number.control.markAsTouched();
      this.primary_Contact_Person_mobile_number.control.markAsDirty();
      has_error = true;
    }

    if (this.model.primary_Contact_Person_email_address === "") {
      this.errorschool.primary_Contact_Person_email_address = true;
      this.primary_Contact_Person_email_address.control.markAsTouched();
      this.primary_Contact_Person_email_address.control.markAsDirty();
      has_error = true;
    }
    if (this.model.alternate_Contact_Person_Name === "") {
      this.errorschool.alternate_Contact_Person_Name = true;
      this.alternate_Contact_Person_Name.control.markAsTouched();
      this.alternate_Contact_Person_Name.control.markAsDirty();
      has_error = true;
    }

    if (has_error === true) {
      // alert('Enter Valid details');
    } else {
      this.validate();
    }
  }

  syncdata() {
    this.schools.getAllSchools<SchoolList[]>().subscribe(
      (data: SchoolList[]) => {
        this.schoollistdatas = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => { }
    );
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
  primary_Contact_Number: string;
  alternate_Contact_Number: string;
  primary_Email_Address: string;
  alternate_Email_Address: string;
  primary_Contact_Person_Name: string;
  primary_Contact_Person_contact_number: string;
  primary_Contact_Person_mobile_number: string;
  primary_Contact_Person_email_address: string;
  alternate_Contact_Person_Name: string;
  alternate_Contact_Person_contact_number: string;
  alternate_Contact_Person_mobile_number: string;
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
