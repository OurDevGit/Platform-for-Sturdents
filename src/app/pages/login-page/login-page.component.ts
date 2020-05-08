// import { Constant } from "./../../Constant";

import { Component, OnInit, ViewEncapsulation, Inject } from "@angular/core";

import Amplify from "aws-amplify";
import Auth from "@aws-amplify/auth";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { ActivatedRoute, Router } from "@angular/router";
import { SchoolsService } from "app/schools.service";
@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit {
  show_loading: boolean = false;
  datas: any;
  erroremial: string;
  errormessagepass: string;
  bannaerlists: any;
  bannaerlist: bannaerlist;
  sipassword: string = "";
  sipassword2: string = "";
  siuser: string = "";
  username: string = "";
  otpcode: string = "";
  datass: any;
  userNote: string;
  deleteLoading: boolean;
  loadingmsg: string;
  show_failed: boolean;
  show_success: boolean;
  errorlogin: boolean;
  errormessage: string;
  errormessage1: string;
  activeloginuser: string = "";
  Login: boolean = true;
  time1: boolean = true;
  newuser: boolean = false;
  otpverift: boolean = false;
  existinguser: boolean = false;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public SchoolsService: SchoolsService,
    private route: ActivatedRoute,
    private router: Router,
    public schools: SchoolsService
  ) {
    this.bannaerlist = new bannaerlist();
    this.show_success = false;
    this.show_failed = false;
    this.errorlogin = false;
    this.deleteLoading = false;
    this.loadingmsg = "login successfully";


    Amplify.configure(SchoolsService.cognitoconfig);
    

    Auth.currentAuthenticatedUser()
      .then(user => {
        Auth.signOut()
          .then(data => {
          })
          .catch(err => console.log(err));
      })
      .catch(err => { });
  }

  hidefailiure() {
    this.show_failed = false;
  }
  showfailiure() {
    this.show_failed = true;
  }
  hidesuccess() {
    this.show_success = false;
  }
  showsuccess() {
    this.show_success = true;
  }
  ngOnInit() {
    this.erroremial = "";
  }

  checkUser() {
    if (this.siuser.length == 0) {
      this.erroremial = "Email-id cannot be blank, please enter the Email-id";
    } else {
      let userid = this.siuser;
      let password = "xxx";

      // this.showTost("Please wait");
      this.show_loading = true;
      this.schools.canLoginauser<Schoolusers>(userid).subscribe(
        (data: any) => {
          this.datass = data;
          this.username = data.first_name;
          if (data != null || this.siuser == "acynousre7@gmail.com") {
            if (
              data.isActive == true ||
              this.siuser == "acynousre7@gmail.com"
            ) {
              this.activeloginuser = JSON.stringify(data);
              if (userid !== "" || password !== "") {
                Auth.signIn(userid, password)
                  .then(user => {
                   })
                  .catch(err => {
                    if (err.code === "NotAuthorizedException") {
                      this.time1 = false;
                      this.newuser = false;
                      this.otpverift = false;
                      this.existinguser = true;
                      this.show_loading = false;
                    } else if (err.code === "UserNotConfirmedException") {
                      Auth.resendSignUp(this.siuser)
                        .then(() => {
                          this.time1 = false;
                          this.newuser = false;
                          this.otpverift = true;
                          this.existinguser = false;
                          this.show_loading = false;
                        })
                        .catch(e => {
                          
                        });
                    } else {
                      this.time1 = false;
                      this.newuser = true;
                      this.otpverift = false;
                      this.existinguser = false;
                      this.show_loading = false;
                    }
                  });
              } else {
                alert("please enter your Email ID");
              }
            } else {
              this.errormessage = "User is Disabled";
              this.errorlogin = true;
              this.showfailiure();
              this.showTost(this.errormessage);
            }
          } else {
            this.errormessage = "User Not Found";
            this.show_loading = false;
            this.errorlogin = true;
            this.showfailiure();
            this.showTost(this.errormessage);
          }

        },
        error => {
          /* can provide allert for error on the api */
          this.errormessage = "User Not Found";
          this.show_loading = false;
          this.errorlogin = true;
          this.showfailiure();
          this.showTost(this.errormessage);
        },

        () => {
        }
      );
    }
  }

  checkPassword() {
    this.show_loading = true;
    if (this.sipassword.length == 0) {
      this.errorlogin = true;
      this.errormessagepass =
        "Password cannot be blank, please enter the password";
        this.show_loading = false;
    } else {
      this.errorlogin = false;
      this.trylogin2(this.siuser, this.sipassword);
    }
  }

  setPassword() {
    this.errorlogin = false;
    if (this.sipassword.length == 0) {
      this.errorlogin = true;
      this.errormessage = "Enter Password"
    } else if (this.sipassword !== this.sipassword2) {
      this.errorlogin = true;
      this.errormessage = ""
      this.errormessage1 = "Password and Confirm Password Must be Same"
    }
    else {
      Auth.signUp({
        username: this.siuser,
        password: this.sipassword,
        attributes: {
          name: "" + this.username
        },
        validationData: [] // optional
      })
        .then(data => {
          this.time1 = false;
          this.newuser = false;
          this.otpverift = true;
          this.existinguser = false;
          this.show_loading = false;
        })
        .catch(err => {
          if (err === "Username cannot be empty") {
            alert("username cannot be empty");
          } else if (err.code === "UsernameExistsException") {
            alert("User Exist error, Something Went Wrong, please try again");
          } else {
            alert("Something Went Wrong, please try again");
          }
        });
    }
  }

  verifyOtp() {
    Auth.confirmSignUp(this.siuser, this.otpcode, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true
    })
      .then(data => {
        this.checkPassword();
      })
      .catch(err => {
        alert(err.message);
      });
  }

  iscynosureuser(userid: string) {
    this.schools
      .is_cynosureuser<Schoolusers>(userid)

      .subscribe(
        (data: Schoolusers) => {
          if (data != null) {
            this.router.navigate(["mainpage"]);
          } else {
            this.saveInLocal("user_type", 1);
            this.router.navigate(["/School/dashboard"]);
          }
        },
        error => {
          /* can provide allert for error on the api */
          this.saveInLocal("user_type", 1);
          this.router.navigate(["/School/dashboard"]);
        },

        () => {
        }
      );
  }

  showTost(message) {
    this.loadingmsg = message;
    this.deleteLoading = true;
    setTimeout(() => {
      this.deleteLoading = false;
    }, 1000);
  }

  trylogin1(userid, password) {

    // this.showTost("Please wait");
    this.schools.canLoginauser<Schoolusers>(userid).subscribe(
      (data: any) => {
        this.datass = data;
        if (data != null) {
          if (data.isActive == true) {
            this.activeloginuser = JSON.stringify(data);
            this.trylogin2(userid, password);
          } else {
            this.errormessage = "User is Disabled";
            this.errorlogin = true;
            this.showfailiure();
            this.showTost(this.errormessage);
          }
        } else {
          this.errormessage = "User Not Found";
          this.errorlogin = true;
          this.showfailiure();
          this.showTost(this.errormessage);
        }
      },
      error => {
        /* can provide allert for error on the api */
        this.errormessage = "User Not Found";
        this.errorlogin = true;
        this.showfailiure();
        this.showTost(this.errormessage);
      },

      () => {
        this.saveInLocal("User_detailss", this.datass);
        this.schools
          .listrollpermissions1<listrollpermissions[]>("" + this.datass.roleID)
          .subscribe(
            (data: listrollpermissions[]) => {
              this.datas = data;
            },
            error => () => {
              /* can provide allert for error on the api */
            },
            () => {
              this.saveInLocal("access_list", this.datas);
            }
          );
      }
    );
  }

  trylogin2(userid, password) {
    this.saveInLocal("User_detailss", this.datass);
    if (userid !== "" || password !== "") {
      Auth.signIn(userid, password)
        .then(user => {
          // this.userNote = user.challengeParam.userAttributes.email;
          this.show_loading = false;
          this.loadingmsg = "Log in Successfull";
          
          this.deleteLoading = true;
          this.schools
            .listrollpermissions1<listrollpermissions[]>(
              "" + this.datass.roleID
            )
            .subscribe(
              (data: listrollpermissions[]) => {
                this.datas = data;
              },
              error => () => {

                /* can provide allert for error on the api */
              },
              () => {

                this.deleteLoading = false;
                this.saveInLocal("activeloginuser", this.activeloginuser);
                this.saveInLocal("userid", userid);
                this.saveInLocal("selected_school_id", -1);
                if (userid === "schooladmi68@gmail.com") {
                  this.saveInLocal("user_type", 2);
                  this.errorlogin = false;
                  this.iscynosureuser(userid);
                } else {
                  this.saveInLocal("user_type", 2);
                  this.errorlogin = false;
                  this.iscynosureuser(userid);
                }
                this.saveInLocal("access_list", this.datas);
              }
            );
          setTimeout(() => { }, 1000);
        })
        .catch(err => {
          if (err.code === "NotAuthorizedException") {
            this.show_loading = false;
            this.errormessagepass = err.message;
            this.errormessage = err.message;
            this.errorlogin = true;
          } else {
            this.show_loading = false;
            this.errormessage = err.message;
            this.errorlogin = true;
          }
          this.showfailiure();
        });
    } else {
      alert("Please Type username and password");
      this.errormessage = "Please Type username and password";
      this.errorlogin = true;
      this.show_loading = false;
    }
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }
}

export class listrollpermissions {
  id: number;
  title: string;
  code: string;
}
export class bannaerlist { }
