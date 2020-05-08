import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Inject } from "@angular/core";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import Amplify from "aws-amplify";
import { SchoolsService } from "app/schools.service";

import { Storage } from "aws-amplify";
import { ActivatedRoute, Router } from "@angular/router";
import * as S3 from "aws-sdk/clients/s3";
import { formatDate } from "@angular/common";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";

@Component({
  selector: "app-rfidbulk",
  templateUrl: "./rfidbulk.component.html",
  styleUrls: ["./rfidbulk.component.scss"]
})
export class RfidbulkComponent {
  uploadbutton: boolean;

  image: any;
  file: File;
  params: any;
  from: any;
  schoolid: string;

  hide: boolean;

  bucket = new S3({
    accessKeyId: "AKIAJQZ3CV7LEMMPA2QA",
    secretAccessKey: "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",
    region: "ap-south-1"
  });
  title = "app";
  public csvRecords: any[] = [];
  dataArrerror = [];
  @ViewChild("fileImportInput", { static: false }) fileImportInput: any;
  @ViewChild("fileImportInput", { static: false }) myInputVariable: ElementRef;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public SchoolsService: SchoolsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    Amplify.configure(SchoolsService.cognitoconfig);
    this.from = this.getFromLocal("from");
    this.schoolid = this.getFromLocal("selected_school_id");
    this.uploadbutton = true;
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
    this.bucket.upload(this.params, function (err, data) {
      // ...
      alert("RIFD Uploaded Successfully");
      this.router.navigate(["School/rfid"]);
    });
  }

  async fileEvent(fileInput: any) { }

  fileChangeListener($event: any): void {
    var text = [];
    var files = $event.srcElement.files;

    // Key: 'system-cynosure-s3/'+date+"_"+school_id+"_"+ this.file.name,
    let school_id = this.getFromLocal("selected_school_id");
    let date = formatDate(new Date(), "ddMMyyyyhhmmssa", "en-US", "+0530");
    this.file = files[0];
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

      reader.onerror = function () {
        alert("Unable to read " + input.files[0]);
      };
    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    var dataArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let data = csvRecordsArray[i].split(",");

      // FOR EACH ROW IN CSV FILE IF THE NUMBER OF COLUMNS
      // ARE SAME AS NUMBER OF HEADER COLUMNS THEN PARSE THE DATA
      if (data.length == headerLength) {
        var csvRecord: CSVRecord = new CSVRecord();

        csvRecord.SchoolID = data[0].trim();
        if (csvRecord.SchoolID.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + "Column: SchoolID is Empty"
          );
        }

        csvRecord.SchoolStudentID = data[1].trim();
        if (csvRecord.SchoolStudentID.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: SchoolStudentID is Empty"
          );
        }
        csvRecord.rfiddata = data[2].trim();
        if (csvRecord.rfiddata.length == 0) {
          this.dataArrerror.push(
            "In Row : " + [i] + " Column: rfiddata is Empty"
          );
        }
        csvRecord.RFID = data[3].trim();

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
  public rfiddata: any;
  public RFID: any;
}
export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  });

  return stored.toLocaleString;
}