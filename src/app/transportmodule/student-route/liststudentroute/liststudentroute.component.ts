import { Component, OnInit, ViewChild } from '@angular/core';
import { ExportExcellService } from "app/export-excell.service";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewEncapsulation, Inject } from "@angular/core";
import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import * as _ from "lodash";
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AlertifyService } from "app/alertify-service";


@Component({
  selector: 'app-liststudentroute',
  templateUrl: './liststudentroute.component.html',
  styleUrls: ['./liststudentroute.component.scss']
})
export class ListstudentrouteComponent implements OnInit {
  filter: any;
  disablebutton: string;
  enablebutton: string;
  deletebutton: string;
  showdisplay: boolean;
  showAssign: boolean;
  deleteAssign: boolean;
  accesslist: any;
  datas: any;
  datas_exp: any;
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  routeId: any;
  selected_routeid: any;
  student_id: any;
  routes: any;
  students: any;
  routeNames = [];
  // minialRouteData = [];
  routeName: any;
  waypointsData = [];
  selected_waypointId: any;
  student_name: any;
  areas_covered: any;
  schoolStudentIds = [];
  schoolStudentId: any;
  allRoutes: any;
  allStudents: any;
  student_address: any;
  temp_students = [];


  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  studentfocus$ = new Subject<string>();
  studentclick$ = new Subject<string>();

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    public alertifyService: AlertifyService,

    private exportExcell: ExportExcellService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.showAssign = false;
    this.deleteAssign = false;
    this.deletebutton = "false";
    this.enablebutton = "false";
    this.disablebutton = "false";
    let school_id = this.getFromLocal("selected_school_id");

  }

  ngOnInit() {

    this.deletebutton = "false";
    this.enablebutton = "false";
    this.disablebutton = "false";
    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "TMVSRL") {
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "TMCSRL") {
        this.showAssign = true;
        this.showdisplay = true;
      } else if (this.accesslist[i].code == "TMDSRL") {
        this.showdisplay = true;
        this.deleteAssign = true;
      } 
    }

    this.schools.AllListstudents<any[]>().subscribe(
      (data: any) => {
        this.allStudents = data
        this.checklist = this.datas;
       

      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {

      }
    );

    this.schools.waypointlists<any[]>().subscribe(
      (data: any) => {
        this.waypointsData = data
      },
      error => () => {
        /* can provide allert for error on the api */
        if(error.status === 404) {
          this.alertifyService.success('No data found', document.title);

        }
        if(error.status === 500) {
          this.alertifyService.success('Unexpected error.', document.title);
        }
        if(error.status === 400) {
          this.alertifyService.success('Bad input, please check input again', document.title);
        }
      },
      () => {
      }
    );

    this.schools.minirouteslists<any[]>().subscribe(
      (data: any) => {
        this.allRoutes = data.Routes;
      },
      error => {
        /* can provide allert for error on the api */
        if(error.status === 404) {
          this.alertifyService.success('No data found', document.title);

        }
        if(error.status === 500) {
          this.alertifyService.success('Unexpected error.', document.title);
        }
        if(error.status === 400) {
          this.alertifyService.success('Bad input, please check input again', document.title);
        }

      },
      () => {
      }
    );
  }


  getWaypoints(id) {
    this.schools.fetchwaypointsByrouteid<any[]>(id).subscribe(
      (data: any) => {
        this.waypointsData = data;
       this.selected_waypointId = this.waypointsData[0].WayPointId

      },
      error => {
        /* can provide allert for error on the api */
        if(error.status === 404) {
          this.alertifyService.success('No data found', document.title);

        }
        if(error.status === 500) {
          this.alertifyService.success('Unexpected error.', document.title);
        }
        if(error.status === 400) {
          this.alertifyService.success('Bad input, please check input again', document.title);
        }

      },
      () => {
        
      }
    );

    this.schools.fetchroutes<any[]>(id).subscribe(
      (data: any) => {
       
       this.areas_covered = data.AreasCovered;
      },
      error => {
        /* can provide allert for error on the api */
        if(error.status === 404) {
          this.alertifyService.success('No data found', document.title);

        }
        if(error.status === 500) {
          this.alertifyService.success('Unexpected error.', document.title);
        }
        if(error.status === 400) {
          this.alertifyService.success('Bad input, please check input again', document.title);
        }

      },
      () => {
        
      }
    );

  }


  studentsDetails(id) {

    this.schools.fetchstudentsByrouteid<any[]>(id).subscribe(
      (data: any) => {
        
        this.datas = data;
        console.log('eee =>', this.datas)
        let result = [];
        this.temp_students = data;
        data.forEach(datas => {
          let a = {
            StudentID: datas.StudentID,
            StudentName: datas.StudentName,
            GeoPointText: datas.WayPoint.WayPointGeoPointText,
            RouteId: datas.WayPoint.RouteId,
            RouteName: datas.WayPoint.RouteName,
            WayPointId: datas.WayPoint.WayPointId,
            WayPointName: datas.WayPoint.WayPointName,
            WayPointSeq: datas.WayPoint.WayPointSeq
          };
          result.push(a);
        });

        this.datas_exp = _.cloneDeep(result);
      },
      error => {
        /* can provide allert for error on the api */
        if(error.status === 404) {
          this.alertifyService.success('No data found', document.title);

        }
        if(error.status === 500) {
          this.alertifyService.success('Unexpected error.', document.title);
        }
        if(error.status === 400) {
          this.alertifyService.success('Bad input, please check input again', document.title);
        }

      },
      () => {
        
      }
    );
  }


  setStudentDetail(value) {
   let filtered_data = [];
   filtered_data = [...this.allStudents]
   var result = filtered_data.filter(item => item.StudentId == value);
   this.student_address = result[0].Address;
  }

  deleteWaypointById(studentId, routeId, waypointId) {
   
  this.schools.deletewaypointsByStudentId<any[]>(studentId, routeId, waypointId).subscribe(
    (data: any) => {
    },
    error => {
      /* can provide allert for error on the api */
      if(error.status === 404) {
        this.alertifyService.success('No data found', document.title);

      }
      if(error.status === 500) {
        this.alertifyService.success('Unexpected error.', document.title);
      }
      if(error.status === 400) {
        this.alertifyService.success('Bad input, please check input again', document.title);
      }

    },
    () => {
      this.alertifyService.success('Successfully deleted waypoints', document.title);
      this.studentsDetails(routeId);
    }
  );

  }

  exportasExcell() {
    this.exportExcell.exportAsExcelFile(this.datas_exp, "student_route");
  }

  assignStudentRoute() {
    var studentId = this.schoolStudentId;
    var routeId = this.selected_routeid;
    var waypointid = this.selected_waypointId;


    const submitData = {studentId: studentId, routeId: routeId, waypointid: waypointid}
   
    this.schools.assignStudentToRoutes<any[]>(submitData).subscribe(
      (data: any) => {
      },
      error => {
        if(error.status === 404) {
          this.alertifyService.success('No data found', document.title);

        }
        if(error.status === 500) {
          this.alertifyService.success('On any other unexpected error.', document.title);
        }
        if(error.status === 400) {
          this.alertifyService.success('(a) Invalid student/route/waypoint id or (b) Student is already assigned to the same route.', document.title);
        }
      },
      () => {
        this.alertifyService.success('The Waypoint has been assigned to student successfully', document.title);
        // this.ngOnInit();
      }
    );
  }

  view(event, item) {
    this.router.navigate(["School/viewstudentroutes/" + item.id]);
  }

  update(event, item) {
    this.router.navigate(["School/updatestudentroutes/" + item.id]);
  }

  adddevice() {
    this.router.navigate(["School/addstudentroutes"]);
  }

  checkUncheckAll() {
    for (var i = 0; i < this.datas.length; i++) {
      this.datas[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {

    this.masterSelected = this.datas.every(function (item: any) {
      return item.isSelected == true;
    });

    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i].isSelected)
        this.checkedList.push(this.checklist[i].id);
    }
    if (this.checkedList.length === 0) {
      this.deletebutton = "false";
      this.enablebutton = "false";
      this.disablebutton = "false";
    } else {
      this.deletebutton = "true";
      this.enablebutton = "true";
      this.disablebutton = "true";
    }
  }

  //Local Storage Get and Post
  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }
  getFromLocal(key): any {
    return this.storage.get(key);
  }
}

export class Student {
  id: number;
  acadamicMonth: number;
  acadamicYear: string;
  address: string;
  fullName: string;
  geoLocation: string;
  gradeId: number;
  gradeName: string;
  isActive: string;
  pMobile: string;
  pcountrycode: string;
  rfid: number;
  rfidName: string;
  routeId: string;
  routeName: string;
  sMobile: string;
  schoolID: number;
  schoolStudentID: string;
  scountrycode: string;
  shortName: string;
  updateDate: string;
  updateID: string;
  updateName: string;
}
