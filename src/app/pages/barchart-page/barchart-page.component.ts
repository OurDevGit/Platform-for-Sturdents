
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ViewEncapsulation,
  Inject
} from "@angular/core";
import { Subject } from "rxjs";
import { ResizeService } from "../../resize/resize.service";
import * as echarts from "echarts";
import { takeUntil } from "rxjs/operators";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import {
  CHART_COLOR_1,
  CHART_COLOR_2_WITH_OPACITY,
  CHART_COLOR_2,
  CHART_COLOR_3,
  CHART_COLOR_1_WITH_OPACITY,
  CHART_COLOR_4,
  CHART_COLOR_5,
  CHART_COLOR_6,
  CHART_TEXT_COLOR
} from "../../utils/colors";

import { ExportExcellService } from "app/export-excell.service";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { SchoolsService } from "app/schools.service";
import { getPolarChartData } from "../dashboard-page/dashboard-charts-data";

@Component({
  selector: "app-barchart-page",
  templateUrl: "./barchart-page.component.html",
  styleUrls: ["./barchart-page.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class BarchartPageComponent implements OnInit, OnDestroy {

  // Informer to stop using observables after component is destroyed
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  value1: number;
  value2: number;
  value3: number;

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

  // Chart elements references and echarts instances

  // @ViewChild("simpleBarChart")
  // simpleBarChartElementRef: ElementRef;
  // simpleBarChart;

  @ViewChild("nestedPieChart", { static: false })
  nestedPieChartElementRef: ElementRef;
  nestedPieChart;

  @ViewChild("doughnutPieChart", { static: false })
  doughnutPieChartElementRef: ElementRef;
  doughnutPieChart;

  // @ViewChild("simpleBarChart3")
  // simpleBarChartssElementRef: ElementRef;
  // simpleBarChartss;

  // Informer to stop using observables after component is destroyed
  // private ngUnsubscribe: Subject<void> = new Subject<void>();
  Colors = ["#007bff", "#6610f2", "#17a2b8", "#6f42c1", "#e83e8c", "#dc3545", "#fd7e14", "#ffc107", "#28a745", "#20c997", "#17a2b8", "#6c757d", "#343a40", "007bff", "#6c757d", "#17a2b8", "#ffc107", "#dc3545", "#343a40", "#007bff", "#6610f2", "#17a2b8", "#6f42c1", "#e83e8c", "#dc3545", "#fd7e14", "#ffc107", "#28a745", "#20c997", "#17a2b8", "#6c757d", "#343a40", "007bff", "#6c757d", "#17a2b8", "#ffc107", "#dc3545", "#343a40"];
  // Model for nested pie chart
  nestedPieChartOption = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      x: "left",
      data: [
        "Data 1",
        "Data 2",
        "Data 3",
        "Data 4",
        "Data 5",
        "Data 6",
        "Data 7"
      ],
      textStyle: {
        color: CHART_TEXT_COLOR
      }
    },
    series: [
      {
        name: "",
        type: "pie",
        selectedMode: "single",
        radius: [0, "60%"],

        label: {
          normal: {
            position: "inner"
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 335, name: "Data 1", selected: true, color: CHART_COLOR_1 },
          { value: 679, name: "Data 2", color: CHART_COLOR_4 },
          { value: 1548, name: "Data 3", color: CHART_COLOR_3 }
        ],
        itemStyle: {
          normal: {
            color: val => val.data.color,
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };

  nestedPieChartOption1 = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      x: "left",
      data: [
        "Data 1",
        "Data 2",
        "Data 3",
        "Data 4",
        "Data 5",
        "Data 6",
        "Data 7"
      ],
      textStyle: {
        color: CHART_TEXT_COLOR
      }
    },
    series: [
      {
        name: "",
        type: "pie",
        selectedMode: "single",
        radius: [0, "60%"],

        label: {
          normal: {
            position: "inner"
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 335, name: "Data 1", selected: true, color: CHART_COLOR_1 },
          { value: 679, name: "Data 2", color: CHART_COLOR_4 },
          { value: 1548, name: "Data 3", color: CHART_COLOR_3 }
        ],
        itemStyle: {
          normal: {
            color: val => val.data.color,
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };

  // Model for doughnut chart
  doughnutPieChartOption = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      x: "left",
      data: ["First", "Second", "Third", "Fourth", "Fifth"],
      textStyle: {
        color: CHART_TEXT_COLOR
      }
    },
    series: [
      {
        name: "",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "center"
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "30",
              fontWeight: "bold"
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 335, name: "First", color: CHART_COLOR_4 },
          { value: 310, name: "Second", color: CHART_COLOR_1 },
          { value: 234, name: "Third", color: CHART_COLOR_3 },
          { value: 135, name: "Fourth", color: CHART_COLOR_2 },
          { value: 1548, name: "Fifth", color: CHART_COLOR_5 }
        ],
        itemStyle: {
          normal: {
            color: val => val.data.color,
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };

  simpleBarChartOption = {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["Bar 1"],
      bottom: 0,
      textStyle: {
        color: CHART_TEXT_COLOR
      }
    },
    toolbox: {
      show: true,
      feature: {
        magicType: {
          show: true,
          type: ["line", "bar"],
          title: {
            line: "Line",
            bar: "Bar",
            textStyle: {
              color: CHART_TEXT_COLOR
            }
          }
        }
      }
    },
    calculable: true,
    xAxis: [
      {
        type: "category",
        data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        axisLabel: {
          textStyle: {
            color: CHART_TEXT_COLOR
          }
        },
        axisTicks: {
          lineStyle: {
            color: CHART_TEXT_COLOR
          }
        },
        axisLine: {
          lineStyle: {
            color: CHART_TEXT_COLOR
          }
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          textStyle: {
            color: CHART_TEXT_COLOR
          }
        },
        axisTicks: {
          lineStyle: {
            color: CHART_TEXT_COLOR
          }
        },
        axisLine: {
          lineStyle: {
            color: CHART_TEXT_COLOR
          }
        }
      }
    ],
    series: [
      {
        name: "Bar 1",
        type: "bar",
        data: [
          2.0,
          4.9,
          7.0,
          23.2,
          25.6,
          76.7,
          135.6,
          162.2,
          32.6,
          20.0,
          6.4,
          3.3
        ],
        markPoint: {
          data: [{ type: "max", name: "Max" }, { type: "min", name: "Min" }]
        },
        markLine: {
          data: [{ type: "average", name: "Average" }]
        },
        itemStyle: {
          normal: {
            color: CHART_COLOR_1
          }
        }
      }
    ]
  };
  simpleBarChartOption2 = {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["Bar 1"],
      bottom: 0,
      textStyle: {
        color: CHART_TEXT_COLOR
      }
    },
    toolbox: {
      show: true,
      feature: {
        magicType: {
          show: true,
          type: ["line", "bar"],
          title: {
            line: "Line",
            bar: "Bar",
            textStyle: {
              color: CHART_TEXT_COLOR
            }
          }
        }
      }
    },
    calculable: true,
    xAxis: [
      {
        type: "category",
        data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        axisLabel: {
          textStyle: {
            color: CHART_TEXT_COLOR
          }
        },
        axisTicks: {
          lineStyle: {
            color: CHART_TEXT_COLOR
          }
        },
        axisLine: {
          lineStyle: {
            color: CHART_TEXT_COLOR
          }
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          textStyle: {
            color: CHART_TEXT_COLOR
          }
        },
        axisTicks: {
          lineStyle: {
            color: CHART_TEXT_COLOR
          }
        },
        axisLine: {
          lineStyle: {
            color: CHART_TEXT_COLOR
          }
        }
      }
    ],
    series: [
      {
        name: "Bar 1",
        type: "bar",
        data: [
          2.0,
          4.9,
          7.0,
          23.2,
          25.6,
          76.7,
          135.6,
          162.2,
          32.6,
          20.0,
          6.4,
          3.3
        ],
        markPoint: {
          data: [{ type: "max", name: "Max" }, { type: "min", name: "Min" }]
        },
        markLine: {
          data: [{ type: "average", name: "Average" }]
        },
        itemStyle: {
          normal: {
            color: CHART_COLOR_1
          }
        }
      }
    ]
  };
  simpleBarChartOption3 = {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["Bar 1"],
      bottom: 0,
      textStyle: {
        color: CHART_TEXT_COLOR
      }
    },
    toolbox: {
      show: true,
      feature: {
        magicType: {
          show: true,
          type: ["line", "bar"],
          title: {
            line: "Line",
            bar: "Bar",
            textStyle: {
              color: CHART_TEXT_COLOR
            }
          }
        }
      }
    },
    calculable: true,
    xAxis: [
      {
        type: "category",
        data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        axisLabel: {
          textStyle: {
            color: CHART_TEXT_COLOR
          }
        },
        axisTicks: {
          lineStyle: {
            color: CHART_TEXT_COLOR
          }
        },
        axisLine: {
          lineStyle: {
            color: CHART_TEXT_COLOR
          }
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          textStyle: {
            color: CHART_TEXT_COLOR
          }
        },
        axisTicks: {
          lineStyle: {
            color: CHART_TEXT_COLOR
          }
        },
        axisLine: {
          lineStyle: {
            color: CHART_TEXT_COLOR
          }
        }
      }
    ],
    series: [
      {
        name: "Bar 1",
        type: "bar",
        data: [
          2.0,
          4.9,
          7.0,
          23.2,
          25.6,
          76.7,
          135.6,
          162.2,
          32.6,
          20.0,
          6.4,
          3.3
        ],
        markPoint: {
          data: [{ type: "max", name: "Max" }, { type: "min", name: "Min" }]
        },
        markLine: {
          data: [{ type: "average", name: "Average" }]
        },
        itemStyle: {
          normal: {
            color: CHART_COLOR_1
          }
        }
      }
    ]
  };

  constructor(
    private cref: ChangeDetectorRef,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private exportExcell: ExportExcellService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private resizeService: ResizeService
  ) {
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
        this.doughnutPieChartOption.series[0].data = [];
        this.doughnutPieChartOption.legend.data = [];
        this.doughnutPieChartOption.legend.data = ["" + this.datas.parentstat.columns[0], "" + this.datas.parentstat.columns[1], "" + this.datas.parentstat.columns[2]];
        this.value1 = this.datas.parentstat.values.data[0];
        this.value2 = this.datas.parentstat.values.data[1];
        this.value3 = this.datas.parentstat.values.data[2];

        let c = ['#28a745', '#17a2b8', '#dc3545'];
        let d = [0.00, 0.00, 0.00];
        for (let a = 0; a < this.datas.parentstat.columns.length; a++) {
          let b = {
            value: this.datas.parentstat.values.data[a],
            color: c[a],
            name: this.datas.parentstat.columns[a]
          }
          this.doughnutPieChartOption.series[0].data.push(b);
        }

        this.simpleBarChartOption.xAxis[0].data = this.datas.parentstat.columns;
        this.simpleBarChartOption.series[0].data = this.datas.parentstat.values.data;

        this.simpleBarChartOption2.xAxis[0].data = this.datas.studentstat.columns;
        this.simpleBarChartOption2.series[0].data = this.datas.studentstat.values.data;

        let x = [];
        let y = [];
        for (
          let i = 0;
          i < this.datas.studentRegisterationStatistics.values.length;
          i++
        ) {
          // x.push(i);
          // y.push(i);
          x.push(this.datas.studentRegisterationStatistics.values[i].data[0]);
          y.push(this.datas.studentRegisterationStatistics.values[i].label);
        }
        this.simpleBarChartOption3.xAxis[0].data = y;
        this.simpleBarChartOption3.series[0].data = x;

        this.nestedPieChartOption.legend.data = [];
        this.nestedPieChartOption.series[0].data = [];
        this.nestedPieChartOption.legend.data = this.datas.acadamicstat.columns;
        for (let y = 0; y < this.datas.acadamicstat.values.data.length; y++) {
          let can = { value: this.datas.acadamicstat.values.data[y], name: this.datas.acadamicstat.columns[y], color: this.Colors[y] }
          this.nestedPieChartOption.series[0].data.push(can)
        }

        this.nestedPieChartOption1.legend.data = [];
        this.nestedPieChartOption1.series[0].data = [];
        this.nestedPieChartOption1.legend.data = this.datas.acadamicstat.columns;

        for (let y = 0; y < this.datas.acadamicstat.values.data.length; y++) {
          let can = { value: this.datas.acadamicstat.values.data[y], name: this.datas.acadamicstat.columns[y], color: this.Colors[y] }
          this.nestedPieChartOption1.series[0].data.push(can)
        }

        this.doughnutPieChart = echarts.init(
          this.doughnutPieChartElementRef.nativeElement
        );
        this.doughnutPieChart.setOption(this.doughnutPieChartOption);

        this.nestedPieChart = echarts.init(
          this.nestedPieChartElementRef.nativeElement
        );
        this.nestedPieChart.setOption(this.nestedPieChartOption);

        this.resizeService.resizeInformer$
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {

            this.nestedPieChart.resize();

            this.doughnutPieChart.resize();

          });

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
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  getAnimatedBarData() {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }
    return data;
  }
  getAnimatedBarXAxisData() {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push("Label " + i);
    }
    return data;
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
