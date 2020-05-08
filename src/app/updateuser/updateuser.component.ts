import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Inject
} from "@angular/core";
import { SchoolsService } from "../schools.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";

@Component({
  selector: "app-updateuser",
  templateUrl: "./updateuser.component.html",
  styleUrls: ["./updateuser.component.scss"]
})
export class UpdateuserComponent implements OnInit {
  schid: number;
  datas: UsersList;
  delid: UsersList;
  rolllist: any;
  public model: UsersList;
  public userschool: Schoolusers[];
  public errormodel: EUsersList;
  showdisplay: boolean;
  accesslist: any;


  @ViewChild("title1", { static: false }) title1: any;
  @ViewChild("first_name", { static: false }) first_name: any;
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
  // rowid: number;
  // schools: any;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private cref: ChangeDetectorRef,
    public schools: SchoolsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.showdisplay = false;
    this.model = new UsersList();
    this.errormodel = new EUsersList();
    this.route.params.subscribe(params => {
      this.schid = params["id"]; // (+) converts string 'id' to a number
    });

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
    this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
  }
  ngOnInit() {
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
    this.schools.getSingleUser<UsersList>(this.schid).subscribe(
      (data: UsersList) => {
        this.model = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
      }
    );
  }

  check() {
    let has_error = false;
    this.errormodel.id = false;
    this.errormodel.title = false;
    this.errormodel.first_name = false;
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

    if (this.model.middle_name === "") {
      this.errormodel.middle_name = true;
      this.middle_name.control.markAsTouched();
      this.middle_name.control.markAsDirty();
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
    } else {
      this.validate();
    }
  }

  validate() {
    this.model.roleID = +this.model.roleID;
    this.model.updated_by = this.activeloginuser.id;
    this.model.updated_by_name = this.activeloginuser.first_name;
    this.schools.updateUser<UsersList>(this.schid, this.model).subscribe(
      () => { },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        alert("Updated Successfully");
        this.router.navigate(["main/usermanagements"]);
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
  roleID: number;
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
  updated_by_name: string;
}

class EUsersList {
  id: boolean;
  title: boolean;
  first_name: boolean;
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
