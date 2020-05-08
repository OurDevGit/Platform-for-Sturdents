import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ResizeService } from "../../resize/resize.service";
import * as echarts from "echarts";
import {
  CHART_COLOR_2,
  CHART_COLOR_2_WITH_OPACITY,
  CHART_TEXT_COLOR
} from "../../utils/colors";

import {
  ChangeDetectorRef,
  Inject
} from "@angular/core";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { ExportExcellService } from "app/export-excell.service";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { SchoolsService } from "app/schools.service";

@Component({
  selector: "app-bubble-chart-page",
  templateUrl: "./bubble-chart-page.component.html",
  styleUrls: ["./bubble-chart-page.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class BubbleChartPageComponent implements OnInit, OnDestroy {
  Colors: any = ["#007bff", "#6610f2", "#17a2b8", "#6f42c1", "#e83e8c", "#dc3545", "#fd7e14", "#ffc107", "#28a745", "#20c997", "#17a2b8", "#6c757d", "#343a40", "007bff", "#6c757d", "#17a2b8", "#ffc107", "#dc3545", "#343a40", "#007bff", "#6610f2", "#17a2b8", "#6f42c1", "#e83e8c", "#dc3545", "#fd7e14", "#ffc107", "#28a745", "#20c997", "#17a2b8", "#6c757d", "#343a40", "007bff", "#6c757d", "#17a2b8", "#ffc107", "#dc3545", "#343a40"];

  // Chart elements references and echarts instances
  @ViewChild("simpleBubbleChart", { static: false })
  simpleBubbleChartElementRef: ElementRef;
  simpleBubbleChart;

  // Data for chart model
  simpleBubbleChartData = [
    [
      [10, 1, 17096869, "Australia", 1990],
      [20, 2, 27662440, "Canada", 1990],
      [30, 3, 1154605773, "China", 1990],
      [30, 4, 10582082, "Cuba", 1990],
      [50, 5, 4986705, "Finland", 1990],
      [60, 6, 56943299, "France", 1990],
      [70, 7, 78958237, "Germany", 1990],
      [80, 8, 254830, "Iceland", 1990],
      [90, 9, 870601776, "India", 1990],
      [100, 10, 122249285, "Japan", 1990],
    ],
    [
      [10, 1, 17096869, "Australia", 1990],
      [20, 2, 27662440, "Canada", 1990],
      [30, 3, 1154605773, "China", 1990],
      [30, 4, 10582082, "Cuba", 1990],
      [50, 5, 4986705, "Finland", 1990],
      [60, 6, 56943299, "France", 1990],
      [70, 7, 78958237, "Germany", 1990],
      [80, 8, 254830, "Iceland", 1990],
      [90, 9, 870601776, "India", 1990],
      [100, 10, 122249285, "Japan", 1990],
    ]
  ];

  // Simple bubble chart model
  simpleBubbleChartOption = {
    legend: {
      right: 10,
      data: ["DIWALI", "FEST"],
      textStyle: {
        color: CHART_TEXT_COLOR
      }
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      },
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
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      },
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
      },
      scale: true
    },
    series: [
      {
        name: "DIWALI",
        data: [],
        type: "scatter",
        symbolSize: function (data) {
          return Math.sqrt(data[2]) / 5e2;
        },
        label: {
          emphasis: {
            show: true,
            formatter: function (param) {
              return param.data[3];
            },
            position: "top"
          }
        },
        itemStyle: {
          normal: {
            shadowBlur: 10,
            shadowColor: CHART_COLOR_2_WITH_OPACITY,
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
              {
                offset: 0,
                color: CHART_COLOR_2
              },
              {
                offset: 1,
                color: CHART_COLOR_2
              }
            ])
          }
        }
      }
    ]
  };

  // Informer to stop using observables after component is destroyed
  private ngUnsubscribe: Subject<void> = new Subject<void>();

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
      (data: any) => {
        this.simpleBubbleChartOption.legend.data = [];
        this.simpleBubbleChartOption.series = [];
        this.simpleBubbleChartData = [];
        let titles = [];
        for (let a = 0; a < data.lstcalcount.length; a++) {
          let datas = data.lstcalcount[a].lststdcount
          titles.push(data.lstcalcount[a].title);
          let set = [];
          let cam = [];
          for (let b = 0; b < datas.length; b++) {
            let set1 = [datas[b].count, +datas[b].gradeTitle, 100000000 * +[datas[b].count], datas[b].gradeTitle, 1990];
            set.push(set1);
          }
          this.simpleBubbleChartData.push(set);
        }

        for (let c = 0; c < this.simpleBubbleChartData.length; c++) {
          let dc = {
            name: titles[c],
            data: this.simpleBubbleChartData[c],
            type: "scatter",
            symbolSize: function (data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            label: {
              emphasis: {
                show: true,
                formatter: function (param) {
                  return param.data[3];
                },
                position: "top"
              }
            },
            itemStyle: {
              normal: {
                shadowBlur: 10,
                shadowColor: CHART_COLOR_2_WITH_OPACITY,
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: "" + this.Colors[c]
                  },
                  {
                    offset: 1,
                    color: "" + this.Colors[c]
                  }
                ])
              }
            }
          }
          this.simpleBubbleChartOption.series.push(dc)
        }
        this.simpleBubbleChartOption.legend.data = titles;
        this.simpleBubbleChart = echarts.init(
          this.simpleBubbleChartElementRef.nativeElement
        );
        this.simpleBubbleChart.setOption(this.simpleBubbleChartOption);
        this.resizeService.resizeInformer$
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.simpleBubbleChart.resize();
          });
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
}
