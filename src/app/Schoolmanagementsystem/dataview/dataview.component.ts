import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-dataview",
  templateUrl: "./dataview.component.html",
  styleUrls: ["./dataview.component.scss"]
})
export class DataviewComponent implements OnInit {
  constructor(
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}
  dataview() {
    this.router.navigate(["School/dataview"]);
  }
}
