import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Inject } from "@angular/core";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import Amplify from "aws-amplify";
// import { Constant } from "app/Constant";
import { Storage } from "aws-amplify";
import { ActivatedRoute, Router } from "@angular/router";
import * as S3 from "aws-sdk/clients/s3";
import { formatDate } from "@angular/common";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import { SchoolsService } from "app/schools.service";
import { Location } from "@angular/common";

import { BulkUploadLog } from "app/Schoolmanagementsystem/schooldata";

@Component({
  selector: "app-allinonebulk",
  templateUrl: "./allinonebulk.component.html",
  styleUrls: ["./allinonebulk.component.scss"]
})
export class AllinonebulkComponent {
  @ViewChild("fileImportInput", { static: false }) myInputVariable: ElementRef;

  academic: any;
  pcode: any;
  isholi: any;
  scode: any;
  sdate: any;
  edate: any;
  grade: any;
  grade1: any;
  listgrade: listgrade;
  listgrades: any;
  startc: any;
  endc: any;
  startt: any;
  endt: any;

  uploadbutton: boolean;

  image: any;
  file: File;
  params: any;
  from: any;
  schoolid: string;
  activeloginuser: any;
  uploadtype: string = "allinone";
  hide: boolean;
  title: string;

  showdisplay: boolean;
  accesslist: any;

  bucket = new S3({
    accessKeyId: "AKIAJQZ3CV7LEMMPA2QA",
    secretAccessKey: "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",
    region: "ap-south-1"
  });

  public csvRecords: any[] = [];
  dataArrerror = [];
  @ViewChild("fileImportInput", { static: false }) fileImportInput: any;
  static location: Location;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private _location: Location,
    public schools: SchoolsService,
    public SchoolsService: SchoolsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.showdisplay = false;

    Amplify.configure(SchoolsService.cognitoconfig);
    AllinonebulkComponent.location = this._location;
    this.listgrade = new listgrade();
    this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
    this.from = this.getFromLocal("from");
    this.schoolid = this.getFromLocal("selected_school_id");
    this.uploadbutton = true;

    let school_id = this.getFromLocal("selected_school_id");
    this.schools.listgrades<listgrade[]>(school_id).subscribe(
      (data: listgrade[]) => {
        this.listgrades = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
      }
    );
  }

  ngOnInit() {
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SACBU") {
        this.showdisplay = true;
      } 
    }
  }
  reset() {
    this.myInputVariable.nativeElement.value = "";
    this.csvRecords = [];
    this.uploadbutton = true;
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }

  onfileselected(event) {
  }

  upload() {
    let dataip = {
      schoolID: this.schoolid,
      type: "" + this.uploadtype,
      updateID: this.activeloginuser.id,
      updateName: this.activeloginuser.first_name,
      status: 0,
      errorMessage: ""
    };
    this.schools.bulkuploadlog<any>(dataip).subscribe(
      (datatoup: BulkUploadLog) => {
        this.params.Key =
          "system-cynosure-s3/" + datatoup.id + "/" + this.file.name;
        this.bucket.upload(this.params, function(err, data) {
          // ...
          alert("Bulk upload has been completed successfully");
        });
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
        this.reset();
        this.fileReset();
      }
    );
  }

  async fileEvent(fileInput: any) {}

  fileChangeListener($event: any): void {
    var text = [];
    var files = $event.srcElement.files;

    // Key: 'system-cynosure-s3/'+date+"_"+school_id+"_"+ this.file.name,
    //Key: 'system-cynosure-s3/'+ this.file.name,
    let school_id = this.getFromLocal("selected_school_id");
    let date = formatDate(new Date(), "ddMMyyyyhhmmssa", "en-US", "+0530");
    this.file = files[0];
    var filenamechk = this.file.name;

    var words = filenamechk.split(" ");
    if (words.length > 1) {
      this.fileReset();
      alert("Please remove the white space in the file name");
    } else {
      this.params = {
        Bucket: "system-cynosurev2",
        Key: "system-cynosure-s3/" + this.file.name,
        Body: this.file
      };

      if (this.isCSVFile(files[0])) {
        var input = $event.target;
        var reader = new FileReader();
        reader.readAsText(input.files[0]);

        reader.onload = data => {
          let csvData = "" + reader.result;
          let csvRecordsArray = csvData.split(/\r\n|\n/);
          let headersRow = this.getHeaderArray(csvRecordsArray);
          this.csvRecords = this.getDataRecordsArrayFromCSVFile(
            csvRecordsArray,
            headersRow.length
          );
          if (this.csvRecords.length > 0) this.uploadbutton = false;
        };

        reader.onerror = function() {
          alert("Unable to read " + input.files[0]);
        };
      } else {
        alert("Please import valid .csv file.");
        this.fileReset();
      }
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    var dataArr = [];
    this.dataArrerror = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      this.academic = 0;
      this.pcode = 0;
      this.scode = 0;
      this.grade = 0;
      this.academic = 0;
      this.pcode = 0;
      this.scode = 0;
      this.grade = 0;
      this.academic = 0;
      this.pcode = 0;
      this.scode = 0;
      this.grade = 0;
      this.isholi = 0;
      this.academic = 0;
      this.startc = 0;
      this.endc = 0;
      this.startt = 0;
      this.endt = 0;
      this.grade = 0;
      this.grade1 = 0;
      let data = csvRecordsArray[i].split(",");
      // FOR EACH ROW IN CSV FILE IF THE NUMBER OF COLUMNS
      // ARE SAME AS NUMBER OF HEADER COLUMNS than PARSE THE DATA
      if (data.length == headerLength) {
        let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        let format1 = /[-+]/;
        let EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        let pattern = /((0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-[12]\d{3})/;
        let time = /^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])(:[0-5][0-9])?$/;
        var csvRecord: CSVRecord = new CSVRecord();
        csvRecord.SchoolStudentID = data[0].trim();
        if (csvRecord.SchoolStudentID.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: School Student ID is Empty"
          );
        }
        if (csvRecord.SchoolStudentID.length > 15) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: School Student ID is must be minimum 1 to 15 character"
          );
        }
        if (format.test(csvRecord.SchoolStudentID)) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: School Student ID Symbols  not allowed"
          );
        }
        csvRecord.FullName = data[1].trim();
        if (csvRecord.FullName.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Full Name is Empty"
          );
        }
        if (csvRecord.FullName.length > 15) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: Full Name is must be minimum 1 to 15 character"
          );
        }
        if (format.test(csvRecord.FullName)) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Full Name Symbols  not allowed"
          );
        }
        csvRecord.ShortName = data[2].trim();
        if (csvRecord.ShortName.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Student Short Name is Empty"
          );
        }
        if (csvRecord.ShortName.length > 15) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: Student Short Name is must be minimum 1 to 15 character"
          );
        }
        if (format.test(csvRecord.ShortName)) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: Student Short Name Symbols  not allowed"
          );
        }
        csvRecord.Address = data[3].trim();
        if (csvRecord.Address.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Address is Empty"
          );
        }
        if (csvRecord.Address.length < 15 || csvRecord.Address.length > 250) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: Address is must be minimum 15 to 250 character"
          );
        }
        csvRecord.GeoLocation = data[4].trim();
        if (csvRecord.GeoLocation.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Geo Location is Empty"
          );
        }
        if (csvRecord.GeoLocation.length < 5) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: Geo Location must be minimum 5 to 250 character"
          );
        }
        csvRecord.Grade = data[5].trim();
        if (csvRecord.Grade.length == 0) {
          this.dataArrerror.push("In Row : " + [i] + " Column: Grade is Empty");
        }
        for (let j = 0; j < this.listgrades.length; j++) {
          if (csvRecord.Grade == this.listgrades[j].title) {
            this.grade = 1;
          }
        }
        if (this.grade !== 1) {
          this.dataArrerror.push(
            "In Row :  " + [i] + " Column: Grade must be in the Grade list"
          );
        }
        csvRecord.pcountrycode = data[6].trim();
        if (csvRecord.pcountrycode.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Primary  country code is Empty"
          );
        }
        if (csvRecord.pcountrycode.match(format1)) {
          this.pcode = 1;
        }
        if (this.pcode !== 1) {
          this.dataArrerror.push(
            "In Row :  " +
              [i] +
              " Column: Primary  country code must start with '+'"
          );
        }
        csvRecord.pMobile = data[7].trim();
        if (csvRecord.pMobile.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Primary Mobile is Empty"
          );
        }
        if (csvRecord.pMobile.length < 6 || csvRecord.pMobile.length > 15) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: Primary Mobile Number is must be minimum 6 to 9 character"
          );
        }
        csvRecord.scountrycode = data[8].trim();
        if (csvRecord.pcountrycode.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Secondary  country code is Empty"
          );
        }
        if (csvRecord.scountrycode.match(format1)) {
          this.scode = 1;
        }
        if (this.scode !== 1) {
          this.dataArrerror.push(
            "In Row :  " +
              [i] +
              " Column: Secondary  country code must start with '+'"
          );
        }
        csvRecord.sMobile = data[9].trim();
        if (csvRecord.sMobile.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Secondary Mobile is Empty"
          );
        }
        if (csvRecord.sMobile.length < 6 || csvRecord.sMobile.length > 15) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: Secondary Mobile Number is must be minimum 6 to 15 character"
          );
        }
        csvRecord.acadamicYear = data[10].trim();
        if (csvRecord.acadamicYear.length == 0) {
          this.dataArrerror.push(
            "In Row :  " + [i] + " Column: Acadamic Year is Empty"
          );
        }
        if (csvRecord.acadamicYear.match(format1)) {
          this.academic = 1;
        }
        if (this.academic !== 1) {
          this.dataArrerror.push(
            "In Row :  " +
              [i] +
              " Column: Acadamic Year must have 2 year with character '-' in between."
          );
        }
        csvRecord.RFID_Tag = data[11].trim();
        if (csvRecord.RFID_Tag.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: RFID Tag is Empty"
          );
        }
        if (csvRecord.RFID_Tag.length > 15) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: RFID Tag is must be minimum 1 to 15 character"
          );
        }
        if (csvRecord.RFID_Tag.length < 3) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: RFID Tag is must be Max 3 character"
          );
        }
        if (format.test(csvRecord.RFID_Tag)) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: RFID Tag Symbols  not allowed"
          );
        }
        csvRecord.unique_number = data[12].trim();
        if (csvRecord.unique_number.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: unique number Tag is Empty"
          );
        }
        if (csvRecord.unique_number.length > 15) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: unique number is must be minimum 1 to 15 character"
          );
        }
        if (csvRecord.unique_number.length < 3) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: unique_number is must be Max 3 character"
          );
        }
        if (format.test(csvRecord.unique_number)) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: unique number Symbols  not allowed"
          );
        }
        csvRecord.type = data[13].trim();
        if (csvRecord.type.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: type Tag is Empty"
          );
        }
        if (csvRecord.type.length < 3) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: type is must be Max 3 character"
          );
        }
        if (csvRecord.type.length > 15) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: type is must be minimum 1 to 15 character"
          );
        }
        // if( csvRecord.type.match(format)){
        if (format.test(csvRecord.type)) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: type Symbols  not allowed"
          );
        }
        csvRecord.freequency = data[14].trim();
        if (csvRecord.freequency.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: frequency Tag is Empty"
          );
        }
        if (csvRecord.freequency.length < 3) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: frequency is must be Max 3 character"
          );
        }
        if (csvRecord.freequency.length > 15) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: frequency is must be minimum 1 to 15 character"
          );
        }
        if (format.test(csvRecord.freequency)) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: frequency Symbols  not allowed"
          );
        }
        csvRecord.capacity = data[15].trim();
        if (csvRecord.capacity.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: capacity Tag is Empty"
          );
        }
        if (csvRecord.capacity.length > 15) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: capacity is must be minimum 1 to 15 character"
          );
        }
        if (csvRecord.capacity.length < 3) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: capacity is must be Max 3 character"
          );
        }
        if (format.test(csvRecord.capacity)) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: capacity Symbols  not allowed"
          );
        }
        csvRecord.status = data[16].trim();
        if (csvRecord.status.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: status Tag is Empty"
          );
        }
        if (csvRecord.status.length > 15) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: status is must be minimum 1 to 15 character"
          );
        }
        if (csvRecord.status.length < 3) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: status is must be Max 3 character"
          );
        }
        if (format.test(csvRecord.status)) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: status Symbols  not allowed"
          );
        }
        csvRecord.FullName = data[17].trim();
        if (csvRecord.FullName.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Full Name is Empty"
          );
        }
        if (csvRecord.FullName.length > 15) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: Full Name is must be minimum 1 to 15 character"
          );
        }
        if (format.test(csvRecord.FullName)) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Full Name Symbols  not allowed"
          );
        }
        csvRecord.ShortName = data[18].trim();
        if (csvRecord.ShortName.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Parent 1 Short Name is Empty"
          );
        }
        if (csvRecord.ShortName.length > 15) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: Parent 1 Short Name is must be minimum 1 to 15 character"
          );
        }
        if (format.test(csvRecord.ShortName)) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column:  Parent 1 Short Name Symbols  not allowed"
          );
        }
        csvRecord.Email = data[19].trim();
        if (csvRecord.Email.length == 0) {
          this.dataArrerror.push(
            "In Row :  " + [i] + " Column:   Parent 1 Email is Empty"
          );
        }
        if (!EMAIL_REGEXP.test(csvRecord.Email)) {
          this.dataArrerror.push(
            "In Row :  " +
              [i] +
              " Column:   Parent 1 Enter Valid Email id in Email"
          );
        }
        csvRecord.AltEmailId = data[20].trim();
        if (csvRecord.AltEmailId.length == 0) {
          this.dataArrerror.push(
            "In Row :  " +
              [i] +
              " Column:  Parent 1 Alternate Email id is Empty"
          );
        }
        if (!EMAIL_REGEXP.test(csvRecord.AltEmailId)) {
          this.dataArrerror.push(
            "In Row :  " +
              [i] +
              " Column:  Parent 1 Enter Valid Email id in Alternate Email id"
          );
        }
        csvRecord.pcountrycode = data[21].trim();
        if (csvRecord.pcountrycode.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Primary  country code is Empty"
          );
        }
        if (csvRecord.pcountrycode.match(format1)) {
          this.pcode = 1;
        }
        if (this.pcode !== 1) {
          this.dataArrerror.push(
            "In Row :  " +
              [i] +
              " Column: Primary  country code must start with '+'"
          );
        }
        csvRecord.PrimaryMobile = data[22].trim();
        if (csvRecord.PrimaryMobile.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Primary Mobile is Empty"
          );
        }
        if (
          csvRecord.PrimaryMobile.length < 6 ||
          csvRecord.PrimaryMobile.length > 15
        ) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: Primary Mobile Number is must be minimum 6 to 9 character"
          );
        }
        csvRecord.altcountrycode = data[23].trim();
        if (csvRecord.altcountrycode.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Secondary  country code is Empty"
          );
        }
        if (csvRecord.altcountrycode.match(format1)) {
          this.scode = 1;
        }
        if (this.scode !== 1) {
          this.dataArrerror.push(
            "In Row :  " +
              [i] +
              " Column: Secondary country code must start with '+'"
          );
        }
        csvRecord.AltMobile = data[24].trim();
        if (csvRecord.AltMobile.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Secondary Mobile is Empty"
          );
        }
        if (csvRecord.AltMobile.length < 6 || csvRecord.AltMobile.length > 15) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: Secondary Mobile Number is must be minimum 6 to 15 character"
          );
        }
        csvRecord.FullName = data[25].trim();
        if (csvRecord.FullName.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Full Name is Empty"
          );
        }
        if (csvRecord.FullName.length > 15) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: Full Name is must be minimum 1 to 15 character"
          );
        }
        if (format.test(csvRecord.FullName)) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Full Name Symbols  not allowed"
          );
        }
        csvRecord.ShortName = data[26].trim();
        if (csvRecord.ShortName.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Parent 2 Short Name is Empty"
          );
        }
        if (csvRecord.ShortName.length > 15) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: Parent 2 Short Name is must be minimum 1 to 15 character"
          );
        }
        if (format.test(csvRecord.ShortName)) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: Parent 2 Short Name Symbols  not allowed"
          );
        }
        csvRecord.Email = data[27].trim();
        if (csvRecord.Email.length == 0) {
          this.dataArrerror.push(
            "In Row :  " + [i] + " Column:  Parent 2 Email is Empty"
          );
        }
        if (!EMAIL_REGEXP.test(csvRecord.Email)) {
          this.dataArrerror.push(
            "In Row :  " +
              [i] +
              " Column:  Parent 2 Enter Valid Email id in Email"
          );
        }
        csvRecord.AltEmailId = data[28].trim();
        if (csvRecord.AltEmailId.length == 0) {
          this.dataArrerror.push(
            "In Row :  " +
              [i] +
              " Column:  Parent 2 Alternate Email id is Empty"
          );
        }
        if (!EMAIL_REGEXP.test(csvRecord.AltEmailId)) {
          this.dataArrerror.push(
            "In Row :  " +
              [i] +
              " Column:   Parent 2 Enter Valid Email id in Alternate Email id"
          );
        }
        csvRecord.pcountrycode = data[29].trim();
        if (csvRecord.pcountrycode.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Primary  country code is Empty"
          );
        }
        if (csvRecord.pcountrycode.match(format1)) {
          this.pcode = 1;
        }
        if (this.pcode !== 1) {
          this.dataArrerror.push(
            "In Row :  " +
              [i] +
              " Column: Primary  country code must start with '+'"
          );
        }
        csvRecord.PrimaryMobile = data[30].trim();
        if (csvRecord.PrimaryMobile.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Primary Mobile is Empty"
          );
        }
        if (
          csvRecord.PrimaryMobile.length < 6 ||
          csvRecord.PrimaryMobile.length > 15
        ) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: Primary Mobile Number is must be minimum 6 to 9 character"
          );
        }
        csvRecord.altcountrycode = data[31].trim();
        if (csvRecord.altcountrycode.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Secondary  country code is Empty"
          );
        }
        if (csvRecord.altcountrycode.match(format1)) {
          this.scode = 1;
        }
        if (this.scode !== 1) {
          this.dataArrerror.push(
            "In Row :  " +
              [i] +
              " Column: Secondary country code must start with '+'"
          );
        }
        csvRecord.AltMobile = data[32].trim();
        if (csvRecord.AltMobile.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: Secondary Mobile is Empty"
          );
        }
        if (csvRecord.AltMobile.length < 6 || csvRecord.AltMobile.length > 15) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: Secondary Mobile Number is must be minimum 6 to 15 character"
          );
        }
        csvRecord.driver_id = data[33].trim();
        if (csvRecord.driver_id.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: status Tag is Empty"
          );
        }
        if (csvRecord.driver_id.length > 15) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: status is must be minimum 1 to 15 character"
          );
        }
        if (csvRecord.driver_id.length < 3) {
          this.dataArrerror.push(
            "In Row : " +
              [i] +
              " Column: Driver id is must be Max 3 character"
          );
        }
        if (format.test(csvRecord.driver_id)) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: status Symbols  not allowed"
          );
        }
        dataArr.push(csvRecord);
      }
    }
    return this.dataArrerror;
  }

  // CHECK IF FILE IS A VALID CSV FILE
  isCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  // GET CSV FILE HEADER COLUMNS
  getHeaderArray(csvRecordsArr: any) {
    let headers = csvRecordsArr[0].split(",");
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = "";
    this.csvRecords = [];
  }
}

export class CSVRecord {
  public SchoolID: any;
  public SchoolStudentID: any;
  public FullName: any;
  public ShortName: any;
  public Address: any;
  public GeoLocation: any;
  public Grade: any;
  public pMobile: any;
  public sMobile: any;
  public acadamicYear: any;
  public Student: any;
  public pcountrycode: any;
  public scountrycode: any;
  public Email: any;
  public AltEmailId: any;
  public PrimaryMobile: any;
  public AltMobile: any;
  public altcountrycode: any;
  public status: any;
  public driver_id: any;
  public capacity: any;
  public freequency: any;
  public type: any;
  public unique_number: any;
  public RFID_Tag: any;
  public title: any;
  public ApplicableClassStart: any;
  public ApplicableClassEnd: any;
  public ApplicableStartDate: any;
  public ApplicableEndDate: any;
  public ApplicableStartTime: any;
  public ApplicableEndTime: any;
  public isHoliday: any;
}
export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  });

  return stored.toLocaleString;
}

export class listgrade {
  id: number;
  title: string;
  updatedate: string;
}
