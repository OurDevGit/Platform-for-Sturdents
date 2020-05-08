import { Component, OnInit, ViewEncapsulation, Inject } from "@angular/core";

import Amplify from "aws-amplify";
import Auth from "@aws-amplify/auth";

import { ActivatedRoute, Router } from "@angular/router";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
@Component({
  selector: "app-forgotreset",
  templateUrl: "./forgotreset.component.html",
  styleUrls: ["./forgotreset.component.scss"]
})
export class ForgotresetComponent implements OnInit {
  ccpasswordnotmatch: boolean;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ccpasswordnotmatch = false;
  }

  ngOnInit() { }

  forgotpassword(code, new_password, ccpassword) {
    if (ccpassword == new_password) {
      this.ccpasswordnotmatch = false;
      Auth.forgotPasswordSubmit(
        this.getFromLocal("forgot_pwid"),
        code,
        new_password
      )
        .then(data => {
          alert("success");
          this.saveInLocal("forgot_pwid", "");
          this.router.navigate([""]);
        })
        .catch(err => {
          if (err.code === "CodeMismatchException") {
            alert(err.message);
          } else {
            alert("Error in resetting Password! try again");
            this.router.navigate([""]);
          }
        });
    } else {
      this.ccpasswordnotmatch = true;
    }
  }
  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }
}
