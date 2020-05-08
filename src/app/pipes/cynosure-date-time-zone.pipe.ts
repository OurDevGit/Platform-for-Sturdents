import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment-timezone";
var jstz = require("jstz");
var timezone = jstz.determine();

@Pipe({
  name: "cynosureDateTimeZone"
})
export class CynosureDateTimeZonePipe implements PipeTransform {
  transform(value: string, formet: string): any {
    var a = moment.utc(value).toDate();
    //cynosureDateTimeZone:"YYYY-MM-DD HH:mm:ss"
    return moment(a)
      .local()
      .format(formet);
  }
}
