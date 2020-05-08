import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { Inject } from "@angular/core";
import { NgModule } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import { SchoolsService } from "app/schools.service";
import { ExportExcellService } from "app/export-excell.service";
import { AlertifyService } from "app/alertify-service";


@Component({
  selector: 'app-currenttrips',
  templateUrl: './currenttrips.component.html',
  styleUrls: ['./currenttrips.component.scss']
})

@NgModule({
  imports:[
    BrowserModule,
  ],
  providers: [],
  declarations: [  ],
  bootstrap: [  ]
})

export class CurrenttripsComponent implements OnInit {

  routes: any;
  routesIds = [];
  rouetId: any;
  directions: any;
  datas: any;
  routeInfo: any;
  routeDirection: string;
  driver: string;
  starTripData: any;
  currentTrips = [];
  totoalStudents: number;
  students = [];
  showdisplay: boolean;

  accesslist: any;

  public currentTrip: CurrentTrip;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private exportExcell: ExportExcellService,
    public schools: SchoolsService,
    public alertifyService: AlertifyService,

    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.currentTrip = new CurrentTrip();
    this.routeInfo = new RouteInfo();
    this.showdisplay = false;
    
  }

  ngOnInit() {

    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "TM&DRCT") {
        this.showdisplay = true;
      } 
    }

    this.schools.currentTripLists<any[]>().subscribe(
      (data: any) => {
        this.currentTrips = data;
        let students = [];
        this.currentTrips.map(item => {
          item.TripEnd = this.formatDate(item.TripEnd);
          item.TripStart = this.formatDate(item.TripStart);

          let totalLength = 0

          Object.keys(item.TripIdealStudentsList).map(cur => {
            totalLength += item.TripIdealStudentsList[cur].length
          })
          item.noStudents  = totalLength;
        })
        
        this.datas = this.currentTrips
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
        this.newsync();
      }
    );

    this.schools.routeslists<any[]>().subscribe(
      (data: any) => {
        data.map(cur => {
          if(cur.RouteId !== ''){
            this.routesIds.push({routeId: cur.RouteId, routeName: cur.RouteName})
          }
        })
        
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
        this.newsync();
      }
    );

    this.directions = ['Home to School', 'School to Home'];
    
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }
  getFromLocal(key): any {
    return this.storage.get(key);
  }

  newsync() {
  }

  goDetail(event, item) {
    this.router.navigate(["School/currenttrips/" + item.TripID]);
  }

  exportasExcell() {
    this.exportExcell.exportAsExcelFile(this.datas, "Current_trips");
  }

  selectRoute(selectedValue: string) {
    this.schools.fetchroutes<any[]>(selectedValue).subscribe(
      (data: any) => {
        this.routeInfo = data;
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
        this.newsync();
      }
    );
  }

  starTrip() {
    this.schools.startTrip<any[]>(this.routeInfo.RouteId, this.starTripData).subscribe(
      (data: any) => {
        
      },
      error => {
        if(error.status == 404) {
          this.alertifyService.success('Invalid Route or Missing Vehicle', document.title);
        }
        if(error.status == 400) {
          this.alertifyService.success('Trip is already active with this Route', document.title);

        }
        if(error.status == 500) {
          this.alertifyService.success('Trip cannot be started, Please check the Route.', document.title);

        }
      },
      () => {
        this.alertifyService.success('Trip has been started successfully', document.title);

        this.ngOnInit();
      }
    );
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        min = d.getMinutes();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-') + " " +  [hour, min].join(':');
  }

}

export class CurrentTrip {
  id: number;
  routeName: string;
  stopWaypoint: string;
  stopCompleted: string;
  startTime: string;
  stopTime: string;
  studentNo: string;
  vehicleNo: string;
  driverName: string;
  driverNo: string;
  isActive: boolean;
}

export class RouteInfo {
  AreasCovered: string;
  EndPoint: string;
  RouteId: string;
  RouteName: string;
  SchoolID: number
  StartPoint: string;
  Students: any;
  Waypoints: any;
}
