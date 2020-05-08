import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { Inject } from "@angular/core";

import { NgModule } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import { ExportExcellService } from "app/export-excell.service";
import { SchoolsService } from "app/schools.service";
import * as _ from "lodash";
import { AlertifyService } from "app/alertify-service";


@Component({
  selector: 'app-historytrips',
  templateUrl: './historytrips.component.html',
  styleUrls: ['./historytrips.component.scss']
})

@NgModule({
  imports:[
    BrowserModule,
  ],
  providers: [],
  declarations: [  ],
  bootstrap: [  ]
})

export class HistorytripsComponent implements OnInit {
  filter: any;
  public triphistory: TripHistory;
  triphistories: any;
  zoom: number = 10;

  lat: number = 51.678418;
  lng: number = 7.809007;

  isFulled = true;
  screenOptions = {
    position:  2
  };
  markers: any;
  historyTrips = [];
  datas: any;
  datas_exp: any;
  showdisplay: boolean;
  accesslist: any;

  
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,

    private exportExcell: ExportExcellService,
    private route: ActivatedRoute,
    public schools: SchoolsService,
    public alertifyService: AlertifyService,

    private router: Router,
    private fb: FormBuilder
  ) { 
    this.triphistory = new TripHistory();
    this.showdisplay = false;

  }

  ngOnInit() {

    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "TM&DRHT") {
        this.showdisplay = true;
      } 
    }

    this.schools.historyTripLists<any[]>().subscribe(
      (data: any) => {
        this.datas = data;
        this.datas.map(item => {
          item.TripEnd = this.formatDate(item.TripEnd);
          item.TripStart = this.formatDate(item.TripStart);
          let totalLength = 0

          Object.keys(item.TripIdealStudentsList).map(cur => {
            totalLength += item.TripIdealStudentsList[cur].length
          })

          item.noStudents  = totalLength;

        })
        
        this.datas_exp = _.cloneDeep(this.datas);
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

  goDetailMap(event, item) {
    this.router.navigate(["School/currenttripsmap/" + item.TripID]);
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

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }
  getFromLocal(key): any {
    return this.storage.get(key);
  }


  newsync() {
  }

  clickedMarker(label: string, index: number) {
  }

  exportasExcell() {
    this.exportExcell.exportAsExcelFile(this.datas_exp, "historyTrips");
  }


  GoMap(selectedValue: string) {
    this.router.navigate(["School/currenttripsmap/" + selectedValue]);
  }
}

export class TripHistory {
  id: number;
  routeName: string;
  stopWaypoint: string;
  startTime: string;
  stopTime: string;
  studentNumber: string;
  vehicleNumber: string;
  driverName: string;
  driverNumber: string;
}

