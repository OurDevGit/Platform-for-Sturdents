import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router,

    private http: HttpClient,
    private fb: FormBuilder) { }

  ngOnInit() {
  }

  viewTrip() {
    this.router.navigate(['School', 'driverviewtrip'])

  }

}
