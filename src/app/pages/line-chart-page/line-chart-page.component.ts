import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ViewEncapsulation,
  Inject
} from "@angular/core"; import { Subject } from 'rxjs';
import { ResizeService } from '../../resize/resize.service';
import * as echarts from 'echarts';
import { CHART_COLOR_1, CHART_COLOR_2, CHART_COLOR_4, CHART_COLOR_5, CHART_TEXT_COLOR } from '../../utils/colors';
import { takeUntil } from "rxjs/operators";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";

import { ExportExcellService } from "app/export-excell.service";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { SchoolsService } from "app/schools.service";

@Component({
  selector: 'app-line-chart-page',
  templateUrl: './line-chart-page.component.html',
  styleUrls: ['./line-chart-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartPageComponent implements OnInit, OnDestroy {
  // Chart elements references and echarts instances

  Colors: any = ["#007bff", "#6610f2", "#17a2b8", "#6f42c1", "#e83e8c", "#dc3545", "#fd7e14", "#ffc107", "#28a745", "#20c997", "#17a2b8", "#6c757d", "#343a40", "007bff", "#6c757d", "#17a2b8", "#ffc107", "#dc3545", "#343a40", "#007bff", "#6610f2", "#17a2b8", "#6f42c1", "#e83e8c", "#dc3545", "#fd7e14", "#ffc107", "#28a745", "#20c997", "#17a2b8", "#6c757d", "#343a40", "007bff", "#6c757d", "#17a2b8", "#ffc107", "#dc3545", "#343a40"];

  datas: any;

  @ViewChild('pointsLineChart', { static: false })
  pointsLineChartElementRef: ElementRef;
  pointsLineChart;

  // Informer to stop using observables after component is destroyed
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  // Model for line chart with points
  pointsLineChartOption = {
    grid: {
      left: 50,
      bottom: 30
    },
    legend: {
      left: -5,
      itemGap: 40,
      itemWidth: 8,
      itemHeight: 8,
      icon: 'circle',
      data: ['2017 year', '2018 year'],
      textStyle: {
        fontFamily: 'OpenSans',
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.59)'
      },
    },
    xAxis: {
      type: 'category',
      offset: 5,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        fontFamily: 'OpenSans',
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.59)'
      },
    },
    yAxis: {
      type: 'value',
      offset: 30,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontFamily: 'OpenSans',
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.59)',
        align: 'left'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.11)'
        }
      }
    },
    series: [
      {
        name: '2018 year',
        type: 'line',
        lineStyle: {
          normal: {
            width: 3,
            color: CHART_COLOR_4,
            shadowColor: 'rgba(0, 0, 0, 0.36)',
            shadowOffsetY: 9,
            shadowBlur: 13
          }
        },
        itemStyle: {
          normal: {
            color: CHART_COLOR_4,
            borderWidth: 3,
            borderColor: CHART_COLOR_4
          }
        },
        symbolSize: 12,
        data: [130, 175, 150, 225, 125, 165]
      },
      {
        name: '2017 year',
        type: 'line',
        lineStyle: {
          normal: {
            width: 3,
            color: CHART_COLOR_1,
            shadowColor: 'rgba(0, 0, 0, 0.36)',
            shadowOffsetY: 9,
            shadowBlur: 13
          }
        },
        itemStyle: {
          normal: {
            color: CHART_COLOR_1,
            borderWidth: 3,
            borderColor: CHART_COLOR_1
          }
        },
        symbolSize: 12,
        data: [150, 100, 175, 140, 170, 90]
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
      (data: any) => {
        this.datas = data;
        this.pointsLineChartOption.legend.data = [];
        this.pointsLineChartOption.series = [];
        for (let c = 0; c < this.datas.lststdcount.length; c++) {
          this.pointsLineChartOption.legend.data.push(this.datas.lststdcount[c].year);
          let dataf = {
            name: this.datas.lststdcount[c].year,
            type: 'line',
            lineStyle: {
              normal: {
                width: 3,
                color: this.Colors[c],
                shadowColor: 'rgba(0, 0, 0, 0.36)',
                shadowOffsetY: 9,
                shadowBlur: 13
              }
            },
            itemStyle: {
              normal: {
                color: this.Colors[c],
                borderWidth: 3,
                borderColor: this.Colors[c]
              }
            },
            symbolSize: 12,
            data: [this.datas.lststdcount[c].jan, this.datas.lststdcount[c].feb, this.datas.lststdcount[c].mar, this.datas.lststdcount[c].apr, this.datas.lststdcount[c].may, this.datas.lststdcount[c].jun, this.datas.lststdcount[c].jul, this.datas.lststdcount[c].aug, this.datas.lststdcount[c].sep, this.datas.lststdcount[c].oct, this.datas.lststdcount[c].nov, this.datas.lststdcount[c].dec]
          }
          this.pointsLineChartOption.series.push(dataf)
        }
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.pointsLineChart = echarts.init(this.pointsLineChartElementRef.nativeElement);
        this.pointsLineChart.setOption(this.pointsLineChartOption);
        this.resizeService.resizeInformer$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
          this.pointsLineChart.resize();
        })
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Mock method for chart data generation
   * @returns {number[]}
   */
  generateAreaData() {
    const data = [Math.random() * 300];
    for (let i = 1; i < 20000; i++) {
      data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }
    return data;
  }

  /**
   * Mock method for chart data generation
   * @returns {Array}
   */
  generateAreaDate() {
    let base = +new Date(1968, 9, 3);
    const oneDay = 24 * 3600 * 1000;
    const date = [];
    for (let i = 1; i < 20000; i++) {
      const now = new Date(base += oneDay);
      date.push([now.getDate(), now.getMonth() + 1, now.getFullYear()].join('/'));
    }
    return date;
  }

}
