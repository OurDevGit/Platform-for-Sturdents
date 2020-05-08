import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-viewcalendar",
  templateUrl: "./viewcalendar.component.html",
  styleUrls: ["./viewcalendar.component.scss"]
})
export class ViewcalendarComponent implements OnInit {
  constructor(
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}
  viewcalent() {
    this.router.navigate(["School/dataview"]);
  }
}
