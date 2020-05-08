import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Injectable,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectorRef
} from "@angular/core";
import {
  CHART_COLOR_1,
  CHART_COLOR_2,
  CHART_COLOR_3,
  CHART_COLOR_4,
  CHART_COLOR_5,
  CHART_TEXT_COLOR
} from "../../utils/colors";
import { ResizeService } from "../../resize/resize.service";
import { Subject } from "rxjs";
import * as echarts from "echarts";
import { takeUntil } from "rxjs/operators";

import {
  Inject
} from "@angular/core";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";

import { ExportExcellService } from "app/export-excell.service";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { SchoolsService } from "app/schools.service";

@Component({
  selector: "app-pie-chart-page",
  templateUrl: "./pie-chart-page.component.html",
  styleUrls: ["./pie-chart-page.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class PieChartPageComponent implements OnInit, OnDestroy {
  // Informer to stop using observables after component is destroyed
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  Colors = ["#007bff", "#6610f2", "#17a2b8", "#6f42c1", "#e83e8c", "#dc3545", "#fd7e14", "#ffc107", "#28a745", "#20c997", "#17a2b8", "#6c757d", "#343a40", "007bff", "#6c757d", "#17a2b8", "#ffc107", "#dc3545", "#343a40", "#007bff", "#6610f2", "#17a2b8", "#6f42c1", "#e83e8c", "#dc3545", "#fd7e14", "#ffc107", "#28a745", "#20c997", "#17a2b8", "#6c757d", "#343a40", "007bff", "#6c757d", "#17a2b8", "#ffc107", "#dc3545", "#343a40"];

  @ViewChild("nestedPieChart", { static: false })
  nestedPieChartElementRef: ElementRef;
  nestedPieChart;

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

  }

  //Local Storage Get and Post
  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }
  getFromLocal(key): any {
    return this.storage.get(key);
  }

  ngOnInit() {

    let school_id = this.getFromLocal("selected_school_id");
    this.schools.listcharts<any>(school_id).subscribe(
      (datas: any) => {
        this.nestedPieChartOption.legend.data = [];
        this.nestedPieChartOption.series[0].data = [];
        this.nestedPieChartOption.legend.data = datas.studentRegisterationStatistics.columns;
        for (let y = 0; y < datas.studentRegisterationStatistics.values.length; y++) {
          this.nestedPieChartOption.legend.data.push(datas.studentRegisterationStatistics.values[y].label);
          let can = { value: datas.studentRegisterationStatistics.values[y].data[0], name: datas.studentRegisterationStatistics.values[y].label, color: this.Colors[y] }
          this.nestedPieChartOption.series[0].data.push(can)
        }
        this.nestedPieChart = echarts.init(
          this.nestedPieChartElementRef.nativeElement
        );
        this.nestedPieChart.setOption(this.nestedPieChartOption);

        this.resizeService.resizeInformer$
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {

            this.nestedPieChart.resize();
          })
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {

      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Mock method to generate polar chart data
   * @param items
   * @returns {{series: any}}
   */
  getPolarChartData(items) {
    const series = items.map((item, i) => {
      return {
        name: i,
        type: "pie",
        clockWise: true,
        hoverAnimation: false,
        cursor: "default",
        startAngle: 270,
        radius: [70 + i * 6 + "%", 70 + i * 6 + 2.5 + "%"],
        label: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: item.value,
            name: item.value,
            itemStyle: {
              normal: {
                color: item.color
              },
              emphasis: {
                color: item.color
              }
            }
          },
          {
            value: 1 - item.value,
            itemStyle: {
              normal: {
                color: "transparent"
              }
            }
          }
        ]
      };
    });
    return {
      series: series
    };
  }
}
