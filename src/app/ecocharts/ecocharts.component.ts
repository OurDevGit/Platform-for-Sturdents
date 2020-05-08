import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import * as echarts from "echarts";
@Component({
  selector: "app-ecocharts",
  templateUrl: "./ecocharts.component.html",
  styleUrls: ["./ecocharts.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcochartsComponent implements OnInit {
  @Input()
  option;
  chart;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.chart = echarts.init(this.elementRef.nativeElement);
    this.chart.setOption(this.option);
  }
}
