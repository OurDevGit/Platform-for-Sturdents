import { Component, OnInit, ViewEncapsulation, Inject } from "@angular/core";

import Amplify from "aws-amplify";
import Auth from "@aws-amplify/auth";

import { ActivatedRoute, Router } from "@angular/router";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
@Component({
  selector: "app-forgotpswd",
  templateUrl: "./forgotpswd.component.html",
  styleUrls: ["./forgotpswd.component.scss"]
})
export class ForgotpswdComponent implements OnInit {
  public email_address_Txt: string;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.email_address_Txt = "";
  }

  ngOnInit() {}

  forgotpassword(email) {
    if (email.toString().trim() === "") {
      alert("Please enter valid Email");
    } else {
      Auth.forgotPassword(email)
        .then(data => {
          this.saveInLocal("forgot_pwid", email);
          this.router.navigate(["forgotreset"]);
        })
        .catch(err => {
          if (err.message != null) {
            alert(err.message);
          } else {
            alert("Some thing went wrong, please check again");
          }
        });
    }
  }
  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }
}
