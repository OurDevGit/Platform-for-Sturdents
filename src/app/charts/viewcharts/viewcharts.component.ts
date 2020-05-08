import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { ExportExcellService } from "app/export-excell.service";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewEncapsulation, Inject } from "@angular/core";
import { SchoolsService } from "app/schools.service";
@Component({
  selector: "app-viewcharts",
  templateUrl: "./viewcharts.component.html",
  styleUrls: ["./viewcharts.component.scss"]
})
export class ViewchartsComponent implements OnInit {
  datas: DashboardData;
  paremntsCount: number;
  studentCount: number;
  numberofstudentwithoutparent: number;
  numberofparentwithoutstudent: number;
  studentRegisterationStatistics: number;
  acadamicstat: any;
  parentstat: any;
  studentstat: any;
  canopenchart: boolean = false;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ["Registered", "Pending", "Disabled"];
  public barChartType = "bar";
  public barChartLegend = true;
  public barChartData = [{ data: [0, 0, 0], label: "Series A" }];

  public barChartLabels1 = ["Registered", "Pending", "Disabled"];
  public barChartType1 = "bar";
  public barChartLegend1 = true;
  public barChartData1 = [{ data: [0, 0, 0], label: "Series A" }];

  public barChartLabels2 = ["Students"];
  public barChartType2 = "bar";
  public barChartLegend2 = true;
  public barChartData2 = [
    { data: [0], label: "1" },
    { data: [0], label: "2" },
    { data: [0], label: "3" },
    { data: [0], label: "4" },
    { data: [0], label: "5" },
    { data: [0], label: "6" },
    { data: [0], label: "7" },
    { data: [0], label: "8" },
    { data: [0], label: "9" }
  ];

  public barChartLabels4 = ["Registered", "Pending", "Disabled"];
  public barChartType14 = "line";
  public barChartLegend4 = true;
  public barChartData4 = [
    { data: [0, 0, 0], label: "Series A" },
    { data: [0, 0, 0], label: "Series B" }
  ];

  public doughnutChartLabels; // = ['Sales Q111', 'Sales Q211', 'Sales Q311', 'Sales Q411'];
  public doughnutChartData; // = [120, 150, 180, 90];
  public doughnutChartType = "doughnut";

  public radarChartLabels = ["Q1", "Q2", "Q3", "Q4"];
  public radarChartData = [
    { data: [120, 130, 180, 70], label: "2017" },
    { data: [90, 150, 200, 45], label: "2018" }
  ];
  public radarChartType = "radar";

  public pieChartLabels = ["Sales Q1", "Sales Q2", "Sales Q3", "Sales Q4"];
  public pieChartData = [0, 0, 0, 0];
  public pieChartType = "pie";

accesslist: any;
showdisplay: boolean; 


  constructor(
    private cref: ChangeDetectorRef,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private exportExcell: ExportExcellService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.showdisplay = false;

    let school_id = this.getFromLocal("selected_school_id");
    this.schools.listcharts<DashboardData>(school_id).subscribe(
      (data: DashboardData) => {
        this.datas = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.paremntsCount = this.datas.paremntsCount;
        this.studentCount = this.datas.studentCount;
        this.numberofstudentwithoutparent = this.datas.numberofstudentwithoutparent;
        this.numberofparentwithoutstudent = this.datas.numberofparentwithoutstudent;
        //this.studentRegisterationStatistics = +this.datas.studentRegisterationStatistics;

        this.barChartLabels = this.datas.parentstat.columns;
        this.barChartData = [this.datas.parentstat.values];

        this.barChartLabels1 = this.datas.studentstat.columns;
        this.barChartData1 = [this.datas.studentstat.values];

        this.barChartLabels2 = this.datas.studentRegisterationStatistics.columns;
        this.barChartData2 = this.datas.studentRegisterationStatistics.values;

        this.pieChartLabels = this.datas.acadamicstat.columns;
        this.pieChartData = this.datas.acadamicstat.values.data;
        this.canopenchart = true;
        this.cref.markForCheck();
      }
    );
  }
  //Local Storage Get and Post
  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }
  getFromLocal(key): any {
    return this.storage.get(key);
  }
  ngOnInit() { 
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SAVD") {
        this.showdisplay = true;
      } 
    }
  }

  parents() {
    this.router.navigate(["School/parent"]);
  }

  student() {
    this.router.navigate(["School/student"]);
  }
  withoutuser() {
    this.router.navigate(["main/numberofschoolswithoutusers"]);
  }
  withoutschools() {
    this.router.navigate(["main/numberofuserswithoutschools"]);
  }
}

export class charts {
  id: number;
}

export class Values {
  label: string;
  data: number[];
}

export class Stat {
  columns: string[];
  values: Values;
}

export class RecentHistory {
  id: number;
  schoolID: number;
  actionTitle: string;
  actionDescription: string;
  updateName: string;
  updateDate: Date;
  updateID: number;
}

export class CallenderHistory {
  id: number;
  schoolID: number;
  applicableClassStart: string;
  title: string;
  applicableClassEnd: string;
  isActive: boolean;
  isHoliday: boolean;
  applicableStartDate: Date;
  applicableEndDate: Date;
  applicableStartTime: string;
  applicableEndTime: string;
  updateDate: Date;
  updateID: number;
  updateName: string;
}

export class DashboardData {
  paremntsCount: number;
  studentCount: number;
  numberofstudentwithoutparent: number;
  numberofparentwithoutstudent: number;
  studentstat: Stat;
  parentstat: Stat;
  acadamicstat: Stat;
  studentRegisterationStatistics: any;
  recentHistory: RecentHistory[];
  callenderHistory: CallenderHistory[];
}
