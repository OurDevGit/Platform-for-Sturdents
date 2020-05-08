import { Component, OnInit } from "@angular/core";
import { SchoolsService } from "../schools.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-view-users-of-school",
  templateUrl: "./view-users-of-school.component.html",
  styleUrls: ["./view-users-of-school.component.scss"]
})
export class ViewUsersOfSchoolComponent implements OnInit {
  constructor(
    public schools: SchoolsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getuserschool();
  }
  getuserschool() {
    this.schools.getusersofschool<UsersList[]>(10).subscribe(
      (data: UsersList[]) => {
      },
      error => () => {},
      () => {}
    );
  }
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
