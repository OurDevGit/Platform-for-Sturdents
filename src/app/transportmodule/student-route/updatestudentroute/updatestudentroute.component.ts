import {
  Component,
  OnInit,
  ChangeDetectorRef
} from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import {Inject } from "@angular/core";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";

import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { formatDate } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-updatestudentroute',
  templateUrl: './updatestudentroute.component.html',
  styleUrls: ['./updatestudentroute.component.scss']
})

export class UpdatestudentrouteComponent implements OnInit {

  studentrouteForm: FormGroup;
  studentRoute: StudentRoute;
  submitted: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { 

    this.studentRoute = new StudentRoute();
    
  }

  ngOnInit() {

    this.studentrouteForm = this.fb.group({
      routenames: [
        "",
        [Validators.required]
      ],
      students: [
        "",
        [Validators.required]
      ],
      startlocations: [
        "",
        [Validators.required]
      ],
      stoplocations: [
        "",
        [Validators.required]
      ],
      startTimes: [
        "",
        [Validators.required]
      ],
      endTimes: [
        "",
        [Validators.required]
      ],
      statues: [
        "",
        [Validators.required]
      ]
    });
  }

  get f() {
    return this.studentrouteForm.controls;
  }

  onSubmit() {
    this.submitted = true;
  }

}

export class StudentRoute {
  id: number;
  route_name: string;
  student: string;
  start_location: string;
  stop_location: string;
  start_time: string;
  end_time: string;
  status: string;
}

