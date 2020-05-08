import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Inject
} from "@angular/core";
import { SchoolsService } from "../schools.service";
import { Auth } from "aws-amplify";
import Amplify from "aws-amplify";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";

@Component({
  selector: "app-adduser",
  templateUrl: "./adduser.component.html",
  styleUrls: ["./adduser.component.scss"]
})
export class AdduserComponent implements OnInit {
  datas: UsersList[];
  countrylist: string[];
  delid: UsersList;
  public model: UsersList;
  public model1: UsersList;
  public errormodel: EUsersList;
  public userschool: Schoolusers[];
  t_phone_countrycode: string;
  t_mobile_countrycode: string;
  listroll: listroll;
  rolllist: any;
  is_submitting: boolean = false;
  // rowid: number;
  // schools: any;
  @ViewChild("title1", { static: false }) title1: any;
  @ViewChild("first_name", { static: false }) first_name: any;
  @ViewChild("roleID", { static: false }) roleID: any;
  @ViewChild("middle_name", { static: false }) middle_name: any;
  @ViewChild("last_name", { static: false }) last_name: any;
  @ViewChild("phone_number", { static: false }) phone_number: any;
  @ViewChild("mobile_number", { static: false }) mobile_number: any;
  @ViewChild("email_address", { static: false }) email_address: any;
  @ViewChild("street", { static: false }) street: any;
  @ViewChild("city", { static: false }) city: any;
  @ViewChild("state", { static: false }) state: any;
  @ViewChild("country", { static: false }) country: any;
  @ViewChild("pincode", { static: false }) pincode: any;

  activeloginuser: any;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private cref: ChangeDetectorRef,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.model = new UsersList();
    this.errormodel = new EUsersList();
    this.listroll = new listroll();
    this.model.title = "";
    this.model.first_name = "";

    this.model.middle_name = "";
    this.model.last_name = "";
    // this.model.phone_number = 0;
    // this.model.mobile_number = '';
    this.model.address = "";
    this.model.email_address = "";
    this.model.street = "";
    this.model.city = "";
    this.model.pincode = "";
    this.model.state = "";
    this.model.country = "";
    this.model.created_by = "";
    this.model.updated_by = "";
    this.schools.listrolls<listroll[]>().subscribe(
      (data: listroll[]) => {
        this.rolllist = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.cref.markForCheck();
      }
    );

    Amplify.configure({
      Auth: {
        identityPoolId: "ap-south-1:93d2e200-af68-4de4-a29a-daced7c9977a", // Amazon Cognito Identity Pool ID us-east-1_XYZPQRS
        region: "AP_SOUTH_1", // Amazon Cognito Region
        userPoolId: "ap-south-1_NJso3yHdO",
        identityPoolRegion: "ap-south-1",
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: "54ng1i3fm0i0n6h1nvda2nhur3",
        mandatorySignIn: false,
        authenticationFlowType: "USER_PASSWORD_AUTH",
        // OPTIONAL - Amazon Cognito Web Client ID
        oauth: {
          domain: "cynosureadmin.auth.ap-south-1.amazoncognito.com",
          // Authorized scopes
          scope: ["email"],
          // Callback URL
          redirectSignIn: "http://localhost:4200/authenticated",
          // Sign out URL
          redirectSignOut: "http://localhost:4200/logout",
          // 'code' for Authorization code grant,
          // 'token' for Implicit grant
          responseType: "code",
          // optional, for Cognito hosted ui specified options
          options: {
            // Indicates if the data collection is enabled to support Cognito advanced security features.
            // By default, this flag is set to true.
            AdvancedSecurityDataCollectionFlag: true
          }
        }
      }
    });

    this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
  }
  ngOnInit() {
    this.httpService.get("./assets/data/CountryCodes.json").subscribe(
      data => {
        this.countrylist = data as string[]; // FILL THE ARRAY WITH DATA.
      },
      (err: HttpErrorResponse) => {
      }
    );
  }

  validate() {
    // this.model1 = this.model;
    this.model1 = Object.assign({}, this.model);
    this.model.roleID = +this.model.roleID;
    this.model1.mobile_number =
      this.t_mobile_countrycode + this.model.mobile_number;
    this.model1.phone_number =
      this.t_phone_countrycode + this.model.phone_number;

    this.model1.updated_by = this.activeloginuser.id;
    this.model1.updated_by_name = this.activeloginuser.first_name;

    this.schools.addUser<UsersList>(this.model1).subscribe(
      (data: UsersList) => {
        this.is_submitting = false;
        this.router.navigate(["main/usermanagements"]);
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => { }
    );
  }

  check() {
    this.is_submitting = true;
    this.model.roleID = +this.model.roleID;
    let can_reg = true;
    this.schools.getAllUsers<UsersList[]>().subscribe(
      (data: UsersList[]) => {
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].email_address.toLowerCase() ===
            this.model.email_address.toLowerCase()
          ) {
            can_reg = false;
            break;
          }
        }
        if (can_reg === true) {
          this.check_data(1);
        } else {
          alert("User Already Exist");
          this.is_submitting = false;
        }
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => { }
    );
  }

  check_verify(code) {
    // After retrieveing the confirmation code from the user
    Auth.confirmSignUp("username", code, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true
    })
      .then(data => {
        alert("verified");
      })
      .catch(err => {
        alert(err);
      });
  }

  check_data(canproceed: number) {
    let has_error = false;
    this.errormodel.id = false;
    this.errormodel.title = false;
    this.errormodel.first_name = false;
    this.errormodel.roleID = false;
    this.errormodel.middle_name = false;
    this.errormodel.last_name = false;
    this.errormodel.phone_number = false;
    this.errormodel.mobile_number = false;
    this.errormodel.address = false;
    this.errormodel.email_address = false;
    this.errormodel.street = false;
    this.errormodel.city = false;
    this.errormodel.pincode = false;
    this.errormodel.state = false;
    this.errormodel.country = false;
    this.errormodel.created_by = false;
    this.errormodel.updated_by = false;

    if (this.model.title === "") {
      this.errormodel.title = true;
      this.title1.control.markAsTouched();
      this.title1.control.markAsDirty();
      has_error = true;
    }

    if (this.model.first_name === "") {
      this.errormodel.first_name = true;

      this.first_name.control.markAsTouched();
      this.first_name.control.markAsDirty();

      has_error = true;
    }

    if (this.model.last_name === "") {
      this.errormodel.last_name = true;
      this.last_name.control.markAsTouched();
      this.last_name.control.markAsDirty();
      has_error = true;
    }

    if (this.model.phone_number === "") {
      this.errormodel.phone_number = true;
      this.phone_number.control.markAsTouched();
      this.phone_number.control.markAsDirty();
      has_error = true;
    } else {
      this.phone_number.control.markAsTouched();
    }

    if (this.model.mobile_number === "") {
      this.errormodel.mobile_number = true;
      this.mobile_number.control.markAsTouched();
      this.mobile_number.control.markAsDirty();
      has_error = true;
    } else {
      this.mobile_number.control.markAsTouched();
    }

    if (this.model.email_address === "") {
      this.errormodel.email_address = true;
      this.email_address.control.markAsTouched();
      this.email_address.control.markAsDirty();
      has_error = true;
    }

    if (this.model.street === "") {
      this.errormodel.street = true;
      this.street.control.markAsTouched();
      this.street.control.markAsDirty();
      has_error = true;
    }

    if (this.model.city === "") {
      this.errormodel.city = true;
      this.city.control.markAsTouched();
      this.city.control.markAsDirty();
      has_error = true;
    }

    if (this.model.pincode === "") {
      this.errormodel.pincode = true;
      this.pincode.control.markAsTouched();
      this.pincode.control.markAsDirty();
      has_error = true;
    }

    if (this.model.state === "") {
      this.errormodel.state = true;
      this.state.control.markAsTouched();
      this.state.control.markAsDirty();
      has_error = true;
    }

    if (this.model.country === "") {
      this.errormodel.country = true;
      this.country.control.markAsTouched();
      this.country.control.markAsDirty();
      has_error = true;
    }

    if (has_error === true) {
      // alert('Enter Valid details');

      this.is_submitting = false;
    } else {
      if (canproceed === 1) {
        this.validate();
      }
    }
  }
  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
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

class UsersList {
  id: number;
  title: string;

  schools: string[];
  dispid: string;
  dispid2: string;
  first_name: string;
  roleID: number;
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
  updated_by_name: string;
}

class EUsersList {
  id: boolean;
  title: boolean;
  first_name: boolean;
  roleID: boolean;
  middle_name: boolean;
  last_name: boolean;
  phone_number: boolean;
  mobile_number: boolean;
  address: boolean;
  email_address: boolean;
  street: boolean;
  city: boolean;
  pincode: boolean;
  state: boolean;
  country: boolean;
  created_by: boolean;
  updated_by: boolean;
}

export class listroll {
  id: number;
  title: string;
  updateDate: string;
  updateID: number;
  updateName: string;
}
