import {
  Component,
  OnInit,
  ViewChild
} from "@angular/core";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewEncapsulation, Inject } from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";

@Component({
  selector: "app-viewparents",
  templateUrl: "./viewparents.component.html",
  styleUrls: ["./viewparents.component.scss"]
})
export class ViewparentsComponent implements OnInit {
  @ViewChild("keywords-input", { static: false }) keywordsInput;

  public updateparent: Updateparent;
  parent_id: string;
  date: any;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar
  ) {
    this.updateparent = new Updateparent();
    this.route.params.subscribe(params => {
      this.parent_id = params["id"]; // (+) converts string 'id' to a number
    });
  }

  ngOnInit() {
    this.schools.fetchsingleparents<Updateparent>(this.parent_id).subscribe(
      (data: Updateparent) => {
        this.updateparent = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {
      }
    );
  }

  Disable() {
    if (this.updateparent.isActive == true) this.updateparent.isActive = false;
    else this.updateparent.isActive = true;
    this.schools
      .updateparents<Updateparent>(this.updateparent.id, this.updateparent)
      .subscribe(
        () => { },
        error => () => {
          alert("Some thing went wrong, please try again");
        },
        () => {
          this.ngOnInit();
          // this.router.navigate(['School/student'])
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

export class Updateparent {
  id: number;
  fullName: string;
  shortName: string;
  grade: string;
  email: string;
  updateDate: string;
  updateID: number;
  isActive: boolean;
  attribute: string;
  altMobile: string;
  primaryMobile: string;
  altEmailId: string;
  pcountrycode: string;
  scountrycode: string;
  altcountrycode: string;
  updateName: string;
}
