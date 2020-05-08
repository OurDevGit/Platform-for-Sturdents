export class addacademic {
  id: number;
  schoolID: number;
  academicGrpName: string;
  startClass: string;
  endClass: string;
  startTiming: string;
  endTiming: string;
  academicStartDate: Date;
  academicEndDate: Date;
  weekdayStart: number;
  numberofWeekDays: number;
  updateDate: Date;
  updateID: number;
  isActive: boolean;
}

export class listacademic {
  id: number;
  schoolID: number;
  academicGrpName: string;
  startClass: string;
  endClass: string;
  startTiming: string;
  endTiming: string;
  academicStartDate: Date;
  academicEndDate: Date;
  weekdayStart: number;
  numberofWeekDays: number;
  updateDate: Date;
  updateID: number;
}

/**
 * Data: Acadamic Group
 * Lisket to following listed pfges
 *
 */

export class AcadamicGroup {
  schoolID: number;
  academicGrpName: string;
  startClass: string;
  endClass: string;
  startTiming: string;
  endTiming: string;
  academicStartDate: string;
  academicEndDate: string;
  weekdayStart: number;
  numberofWeekDays: number;
  updateDate: string;
  updateID: number;
  isActive: boolean;
  updateName: string;
}

export class AcadamicGroups {
  schoolID: number;
  academicGrpName: string;
  startClass: string;
  endClass: string;
  startTiming: string;
  endTiming: string;
  academicStartDate: string;
  academicEndDate: string;
  weekdayStart: number;
  numberofWeekDays: number;
  updateDate: string;
  updateID: number;
  isActive: boolean;
  updateName: string;
  id: number;
}

/**
 * Data: Bulk Upload Log
 * Managing the BUlk Upload
 *
 */

export class BulkUploadLog {
  id: number;
  schoolID: number;
  type: string;
  updateID: number;
  updateName: string;
  updatedAt: string;
  status: number;
  errorMessage: string;
}
