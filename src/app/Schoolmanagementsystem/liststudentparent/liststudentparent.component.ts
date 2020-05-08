import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { AcadamicGroup } from "../schooldata";
import { from } from "zen-observable";
import { ViewEncapsulation, Inject } from "@angular/core";
import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";

@Component({
  selector: "app-liststudentparent",
  templateUrl: "./liststudentparent.component.html",
  styleUrls: ["./liststudentparent.component.scss"]
})
export class ListstudentparentComponent implements OnInit {
  addacademic_id: string;

  liststudentParents: liststudentParents;
  datas: any;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.liststudentParents = new liststudentParents();
    this.route.params.subscribe(params => {
      this.addacademic_id = params["id"]; // (+) converts string 'id' to a number
    });
  }

  ngOnInit() {
    // let school_id =  this.getFromLocal('selected_school_id');
    this.schools.liststudentParents<liststudentParents[]>().subscribe(
      (data: liststudentParents[]) => {
        this.datas = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => { }
    );
  }

  update(event, item) {
    this.router.navigate(["School/editstudentparent/" + item.id]);
  }

  view(event, item) {
    this.router.navigate(["School/viewstudentparent/" + item.id]);
  }

  deleteacadamic(event, item) {

    this.schools.deletestudentParents<liststudentParents[]>(item.id).subscribe(
      (data: any) => { },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        alert("deleted");
        this.ngOnInit();
      }
    );
  }
}

export class liststudentParents {
  updateDate: string;
  parentEmail: string;
  studentID: number;
  id: number;
}
