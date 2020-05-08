import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Inject } from "@angular/core";
import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import * as _ from "lodash";
import { AcadamicGroup } from "app/Schoolmanagementsystem/schooldata";
import { ExportExcellService } from "../../export-excell.service";

@Component({
  selector: "app-bulk-upload-activity-history",
  templateUrl: "./bulk-upload-activity-history.component.html",
  styleUrls: ["./bulk-upload-activity-history.component.scss"]
})
export class BulkUploadActivityHistoryComponent implements OnInit {
  deletecheck: boolean;
  showdisplay: boolean;
  accesslist: any;
  filter: any;
  users: any[];
  userFilter: any;
  public UpdateAcadamicGroup: UpdateAcadamicGroup;
  listacademic: AcadamicGroup;
  datas: any;
  myForm: FormGroup;
  delete;
  isDisable = false;
  datas_exp: any;

  advancedPage = 1;
  sizePage = 10;
  pagedata: any;
  totalcount: number;
  collsize: number;
  listgrade: listgrade;
  uniqueId: string;
  //sorting
  key: string = "name";
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;
  activeloginuser: any;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private exportExcell: ExportExcellService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.listacademic = new AcadamicGroup();
    this.UpdateAcadamicGroup = new UpdateAcadamicGroup();
    this.listgrade = new listgrade();
    this.delete = [];
    this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
  }

  convertTypetoDisplay(type) {
    switch (type) {
      case "allinone":
        return "Combined bulk upload";
      default:
        return type;
    }
  }

  ngOnInit() {
    this.delete = [];
    this.myForm = this.fb.group({
      useremail: this.fb.array([])
    });
    let school_id = this.getFromLocal("selected_school_id");
    this.uniqueId = school_id;
    this.schools.listbluklogs<any[]>(this.activeloginuser.id).subscribe(
      (data: any[]) => {
        this.datas = data;
        this.totalcount = this.datas.length;
        this.collsize = this.datas.length;
        this.datas_exp = _.cloneDeep(data);
        this.userFilter = { academicGrpName: "" };
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.newsync();
      }
    );
  }
  newsync() {
    const startval = (this.advancedPage - 1) * this.sizePage;
    let endval = this.advancedPage * this.sizePage;
    if (this.datas.length > endval) {
    } else {
      endval = this.datas.length;
    }
    this.pagedata = [];
    for (let index = startval; index < endval; index++) {
      this.pagedata.push(this.datas[index]);
    }
  }

  //Checker action

  onChange(id: string, isChecked: boolean) {
    const emailFormArray = <FormArray>this.myForm.controls.useremail;
    if (isChecked) {
      emailFormArray.push(new FormControl(id));
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == id);
      emailFormArray.removeAt(index);
    }
    this.delete = emailFormArray.value;
  }

  //Local Storage Get and Post

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }
  getFromLocal(key): any {
    return this.storage.get(key);
  }

  exportasExcell() {
    this.exportExcell.exportAsExcelFile(this.datas_exp, "Bluk_upload_history");
  }
}

//Class Declarations

export class UpdateAcadamicGroup {
  id: number;
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
}

export class listgrade {
  id: number;
  title: string;
  updatedate: string;
}
