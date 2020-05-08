import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Inject } from "@angular/core";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";

@Component({
  selector: "app-send-mail",
  templateUrl: "./send-mail.component.html",
  styleUrls: ["./send-mail.component.scss"]
})
export class SendMailComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  emaillist = [];

  date: any;
  sendmail: sendmail;
  datas: any;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private _location: Location,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar,
    private formBuilder: FormBuilder
  ) {
    this.sendmail = new sendmail();
    this.sendmail.subject = "";
    this.sendmail.message = "";
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      FullNames: ["", Validators.required],
      ShortNames: ["", Validators.required],
      Grades: ["", Validators.required],
      Emails: ["", [Validators.required, Validators.email]],
      altEmailIds: ["", Validators.required],
      primaryMobiles: ["", Validators.required],
      attributes: ["", Validators.required],
      altMobiles: ["", Validators.required]
    });

    this.datas = this.getFromLocal("ParentEmailList");
    for (let i = 0; i < this.datas.length; i++) {
      this.emaillist.push(this.datas[i].parent.email);
    }

  }

  get f() {
    return this.registerForm.controls;
  }

  send() {
    if (this.sendmail.subject === "" || this.sendmail.message === "") {
      alert(" Field Should Not be Empty ");
    } else {
      this.sendmail.message = this.sendmail.message;
      this.sendmail.subject = this.sendmail.subject;
      for (let i = 0; i < this.emaillist.length; i++) {
        this.sendmail.email = this.emaillist[i];
        this.sendmail.message = this.sendmail.message;
        this.sendmail.subject = this.sendmail.subject;
        this.schools.sendmails<sendmail>(this.sendmail).subscribe(
          (data: sendmail) => { },
          error => () => {
            /* can provide allert for error on the api */
          },
          () => {
            alert("Mail Sent Successfully");
            this._location.back();
          }
        );
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

export class sendmail {
  email: string;
  subject: string;
  message: string;
}
