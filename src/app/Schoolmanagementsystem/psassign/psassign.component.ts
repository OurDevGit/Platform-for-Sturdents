import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation, Inject } from "@angular/core";
import { SchoolsService } from "app/schools.service";
import { ExportExcellService } from "app/export-excell.service";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { AlertifyService } from "app/alertify-service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-psassign',
  templateUrl: './psassign.component.html',
  styleUrls: ['./psassign.component.scss']
})
export class PsassignComponent implements OnInit {
  filter: any;

  studentID: any;
  parentId: any;
  allStudents: any;
  selectedStudent: any;
  allParents: any;
  selectedParent: any;
  assignData: any;
  datas_exp: any;
  assignedStudentParent: any;
  datas: any;
  addStudentParent: addStudentParent;
  showdisplay: boolean;
  showdisplayDelete: boolean;
  showdisplayAssign: boolean;
  accesslist: any;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private modalService: NgbModal,
    public alertifyService: AlertifyService,
    private exportExcell: ExportExcellService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,

  ) {
    this.selectedStudent = new StudentInFo();
    this.selectedParent = new ParentInFo();
    this.addStudentParent = new addStudentParent();
    this.showdisplayAssign = false;
    this.showdisplayDelete = false;


    this.schools.AllListstudents<any[]>().subscribe(
      (data: any) => {
        this.allStudents = data

      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {

      }
    );

    this.schools.AllListparents<any[]>().subscribe(
      (data: any) => {
        this.allParents = data
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {

      }
    );

  }

  ngOnInit() {

    this.showdisplay = false;
    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "SAVPSL") {
        this.showdisplay = true;
      } 
      if(this.accesslist[i].code == "SACPSL") {
        this.showdisplayAssign  = true;
      }

      if(this.accesslist[i].code == "SADPSL") {
        this.showdisplayDelete  = true;
      }

      
      
    }

    this.schools.liststudentParents<any[]>().subscribe(
      (data: any) => {
        this.datas_exp = data;
        this.datas = data;
        console.log('linked data =>', this.datas)

      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
      }
    );


  }

  getStudentDetail(selectedValue: string) {
    this.schools.fetchsinglestudents<any[]>(selectedValue).subscribe(
      (data: any) => {
        this.selectedStudent = data;
      },
      error => {
        /* can provide allert for error on the api */
        if (error.status === 404) {
          this.alertifyService.success('No data found', document.title);

        }
        if (error.status === 500) {
          this.alertifyService.success('Unexpected error.', document.title);
        }
        if (error.status === 400) {
          this.alertifyService.success('Bad input, please check input again', document.title);
        }
      },
      () => {
      }
    );
  }

  getParentDetails(selectedValue: string) {
    this.schools.fetchsingleparents<any[]>(selectedValue).subscribe(
      (data: any) => {
        this.selectedParent = data;
      }
    )
  }


  assignStudentParent() {
    var logged_username = JSON.parse(localStorage.getItem("user_name"));
    this.addStudentParent.id = 0;
    this.addStudentParent.studentID = this.selectedStudent.studentId;
    this.addStudentParent.parentEmail = this.selectedParent.email;
    this.addStudentParent.updateDate = new Date().toISOString().slice(0, 10);
    this.addStudentParent.updateName = logged_username;
    this.addStudentParent.updateID = 0;

    this.schools.addstudentParents<addStudentParent>(this.addStudentParent).subscribe(
      (data: addStudentParent) => {
        console.log('response data =>', data)

      },
      error => {
        /* can provide allert for error on the api */
        if(error.status === 404) {
          this.alertifyService.success('No data found', document.title);

        }
        if(error.status === 500) {
          this.alertifyService.success('Unexpected error.', document.title);
        }
        if(error.status === 400) {
          this.alertifyService.success('The student is already assigned to this parent', document.title);
        }
      },
      () => {
        this.alertifyService.success('Student has been assigned to Parent successfully', document.title);
        this.ngOnInit();
      }
    );

  }

  exportasExcell() {
    this.exportExcell.exportAsExcelFile(this.datas_exp, "student_parent_assignlist");
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  confirmDelete(id) {
    this.modalService.dismissAll();
    this.schools.deletestudentParents<any[]>(id).subscribe(
      (data: any) => {
      },
      error => {
        /* can provide allert for error on the api */
        if (error.status === 404) {
          this.alertifyService.success('No data found', document.title);

        }
        if (error.status === 500) {
          this.alertifyService.success('Unexpected error.', document.title);
        }
        if (error.status === 400) {
          this.alertifyService.success('Bad input, please check input again', document.title);
        }

      },
      () => {
        this.alertifyService.success('Successfully deleted studentparent', document.title);
        this.ngOnInit();
      }
    );
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }

}

export class StudentInFo {
  id: number;
  acadamicMonth: number;
  acadamicYear: string;
  address: string;
  fullName: string;
  geoLocation: string;
  gradeId: number;
  gradeName: string;
  isActive: string;
  pMobile: string;
  pcountrycode: string;
  rfid: number;
  rfidName: string;
  routeId: string;
  routeName: string;
  sMobile: string;
  schoolID: number;
  schoolStudentID: string;
  scountrycode: string;
  shortName: string;
  updateDate: string;
  updateID: string;
  updateName: string;
}

export class ParentInFo {
  id: number;
  schoolID: number;
  fullName: string;
  shortName: string;
  grade: string;
  email: string;
  updateDate: string;
  isActive: Boolean;
  updateID: number;
  updateName: string;
  altEmailId: string;
  primaryMobile: string;
  pcountrycode: string;
  attribute: string;
  altMobile: string;
  altcountrycode: string;
  deviceId: string;
}

export class addStudentParent {
  id: number;
  studentID: number;
  parentEmail: string;
  updateDate: string;
  updateID: number;
  updateName: string;
}








