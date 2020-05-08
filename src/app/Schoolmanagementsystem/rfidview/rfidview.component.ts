import {
  Component,
  OnInit,
  ViewChild
} from "@angular/core";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewEncapsulation, Inject } from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { AcadamicGroup } from "../schooldata";
import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";

@Component({
  selector: "app-rfidview",
  templateUrl: "./rfidview.component.html",
  styleUrls: ["./rfidview.component.scss"]
})
export class RfidviewComponent implements OnInit {
  @ViewChild("keywords-input", { static: false }) keywordsInput;

  public viewrfid: Viewrfid;
  parent_id: string;
  date: any;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar
  ) {
    this.viewrfid = new Viewrfid();
    this.route.params.subscribe(params => {
      this.parent_id = params["id"]; // (+) converts string 'id' to a number
    });
  }

  ngOnInit() {
    this.schools.fetchsingleRFIDs<Viewrfid>(this.parent_id).subscribe(
      (data: Viewrfid) => {
        this.viewrfid = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
      }
    );
  }
}

export class Viewrfid {
  id: number;
  schoolID: number;
  schoolStudentID: string;
  rfiddata: string;
  uniquenumber: string;
  type: string;
  freequency: string;
  capacity: string;
  status: string;
  driver_id: string;
  updateName: string;
  updateDate: string;
}
