import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation
} from "@angular/core";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";

@Component({
  selector: "app-dashboardt",
  templateUrl: "./dashboardt.component.html",
  styleUrls: ["./dashboardt.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class DashboardtComponent implements OnInit {
  showdisplay: boolean;
  accesslist: any;

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }
  ngOnInit() {

  }

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  explodePie(e) {
    if (
      typeof e.dataSeries.dataPoints[e.dataPointIndex].exploded ===
      "undefined" ||
      !e.dataSeries.dataPoints[e.dataPointIndex].exploded
    ) {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
    e.chart15.render();
  }
}
