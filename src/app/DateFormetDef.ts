import { Injectable } from "@angular/core";

export class DateFormetDef {
  static MY_MOMENT_FORMATS = {
    parseInput: "LL LT",
    fullPickerInput:
      "YYYY-MM-DD HH:mm" /* <---- Here i've rewrited the format */,
    datePickerInput: "LL",
    timePickerInput: "LT",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MM YYYY"
  };
}
