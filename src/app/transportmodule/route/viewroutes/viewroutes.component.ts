
import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { formatDate } from "@angular/common";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { FormControl } from "@angular/forms";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewEncapsulation, Inject } from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-viewroutes',
  templateUrl: './viewroutes.component.html',
  styleUrls: ['./viewroutes.component.scss']
})

export class ViewroutesComponent implements OnInit {

  public renderOptions = {
    suppressMarkers: true,
}

public markerOptions = {
  origin: {
      infoWindow: ' ',
      icon: 'assets/images/white_mark.png',
      label: '',
      draggable: false,
  },
  destination: {
      icon: 'assets/images/white_mark.png',
      label: '',
      opacity: 0.8,
  },
  waypoints: {
      icon: 'https://i.imgur.com/7teZKif.png',
      label: 'waypoints',
      opacity: 0.8,
  },
}

  public icon = {
    url: "https://icon-library.net/images/map-icon-vector/map-icon-vector-3.jpg",
    scaledSize: {
      width: 50,
      height: 70
    }
  }


  route_id: string;

  zoom: any = 10;
  pwaypoints: any;
  waypoint_data: any;
  latitude: any;
  longitude: any;
  current_waypoint_id: any;


  pstudent: any;
  waypointlist: any;
  studentlists: any;
  showdisplay: boolean;
  accesslist: any;
  registerForm: FormGroup;
  areasCovereds = [];
  submitted = false;
  datas: any;
  check: number;
  countrylist: any;
  date: any;
  addroute: AddRoute;
  activeloginuser: any;
  canenablebutton: boolean = true;
  result: any;

  popupModel = { year: 2019, month: 1, day: 1 };
  popupModel1 = { year: 2019, month: 1, day: 1 };

  loader = false;

  markerData: any;

  origin: any;
  destination: any;
  addWaypoints = [];
  waypoints = [];

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    private httpService: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    calendar: NgbCalendar,
    private formBuilder: FormBuilder
  ) {
    this.activeloginuser = JSON.parse(this.getFromLocal("activeloginuser"));
    this.addroute = new AddRoute();
    this.waypoint_data = new WayPoints();
    this.canenablebutton = true;
    this.route.params.subscribe(params => {
      this.route_id = params["id"]; // (+) converts string 'id' to a number
    });

    this.schools
      .waypointlists<any[]>()
      .subscribe(
        (data: any) => {
          this.waypointlist = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {

        }
      );

    this.schools.studentdetailslists<any[]>()
      .subscribe(
        (data: any) => {
          this.studentlists = data;
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {

        }
      );

    this.schools.fetchroutes<any[]>(this.route_id)
      .subscribe(
        (data: any) => {
          this.addroute.routId = this.route_id;
          this.addroute.routeName = data.RouteName;
          this.addroute.startPoint = data.StartPoint;
          this.addroute.schoolID = data.SchoolID;
          this.addroute.areasCovered = data.AreasCovered;
          this.addroute.endPoint = data.EndPoint;

          this.pwaypoints = data.WayPoints;

          this.markerData = this.pwaypoints

          this.markerData.map(item => {
            item.latitude = parseFloat(item.GeoPointText.split(",")[0]);
            item.longitude = parseFloat(item.GeoPointText.split(",")[1]);
            item.WayPointId = item.WayPointId.toString();
            item.WayPointSeq = item.WayPointSeq.toString();
          })

          var originGeoLocationTxt = this.pwaypoints[0].GeoPointText;
          if(originGeoLocationTxt !== '' && originGeoLocationTxt !==null && originGeoLocationTxt !== undefined) {
            this.latitude = parseFloat(originGeoLocationTxt.split(",")[0]);
            this.longitude = parseFloat(originGeoLocationTxt.split(",")[1]);

            if (this.pwaypoints.length >= 2) {
              this.origin = { lat: parseFloat(this.pwaypoints[0].GeoPointText.split(",")[0]), lng: parseFloat(this.pwaypoints[0].GeoPointText.split(",")[1]) }
              this.destination = { lat: parseFloat(this.pwaypoints[this.pwaypoints.length - 1].GeoPointText.split(",")[0]), lng: parseFloat(this.pwaypoints[this.pwaypoints.length - 1].GeoPointText.split(",")[1]) }
              var w_lengh = this.pwaypoints.length - 2;
              for (var i = 1; i <= w_lengh; i++) {
                const data = {
                  location: { lat: parseFloat(this.pwaypoints[i].GeoPointText.split(",")[0]), lng: parseFloat(this.pwaypoints[i].GeoPointText.split(",")[1]) }
                }
                this.waypoints.push(data)
              }
            } else {
              this.waypoints = [];
            }

          } else {
            this.latitude = 13.067439;
            this.longitude = 80.237617;
          }
        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {

        }
      );
  }

  ngOnInit() {
    this.schools
      .vehiclelist<any>()
      .subscribe(
        (data: any) => {
          var vehicle_datas = data;
          vehicle_datas.map(cur => {
            this.areasCovereds.push(cur.RegistrationNumber)
          })
        },
        error => () => {

        },
        () => {

        }
      );

    var end_date = formatDate(new Date(), "yyyy-MM-dd", "en");
    var splitted1s = end_date.split("-", 3);
    let d = {
      year: +splitted1s[0],
      month: +splitted1s[1],
      day: +splitted1s[2]
    };

    this.popupModel = d;
    this.popupModel1 = d;

    let school_id = this.getFromLocal("selected_school_id");

    this.registerForm = this.formBuilder.group({
      routeNames: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_\.\-\/-s]{1,15}$")]
      ],
      startPoints: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,15}$")]
      ],
      WayPointIds: [
        "",
        []
      ],
      routeSeqs: [
        "",
        []
      ],
      geoTexts: [
        "",
        []
      ],
      endPoints: [
        "",
        [Validators.required, Validators.pattern("^[ a-zA-Z_-s]{1,30}$")]
      ],
      areasCovereds: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_,-s]{1,250}$")]
      ],
      WayPointNames: [
        "",
        []
      ]
    });

    // this.students(school_id);
  }
  get f() {
    return this.registerForm.controls;
  }

  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.waypoint_data.WayPointId = this.getFromLocal('current_waypoint_id');
    this.waypoint_data.GeoPointText = this.latitude + "," + this.longitude
  }

  addWayPoints() {
    const pointData = {
      WayPointId: this.waypoint_data.WayPointId,
      GeoPointText: this.waypoint_data.GeoPointText,
      WayPointName: this.waypoint_data.WayPointName,
      WayPointSeq: this.waypoint_data.WayPointSeq
    }

    this.pwaypoints.push(pointData);
    this.saveInLocal('current_waypoint_id', this.waypoint_data.WayPointId + 1)
  }

  deleteWaypointById($event, item) {
    var filtered_array = this.pwaypoints.filter(function (el) { return el.WayPointId != item.WayPointId; });
    this.pwaypoints = filtered_array;
  }

  students(id) {
    this.pstudent = [];
    this.schools.fetchstudentdetails<any>(id).subscribe(
      (data: any) => {
        this.pstudent = data;
      },
      error => () => {
        /* can provide allert for error on the api */
      },
      () => {

      }
    );

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      this.updateRoute();
    }
  }
  uploadbulk() {
    //this.router.navigate(['School/parentbulk'])
    this.router.navigate(["School/studentbulks/Parent"]);
  }

  onChange(email) {
    this.check = 0;
    for (let i = 0; i < this.datas.length; i++) {
      if (this.datas[i].email == email) {
        this.datas[i].email;
        this.check = 1;
      }
    }
  }

  updateRoute() {
    this.addroute.wayPoints = this.pwaypoints;
    this.schools.updateroutes<any>(this.route_id, this.addroute).subscribe(
      (data: any) => {
        this.loader = false;
      },
      error => () => {
        /* can provide allert for error on the api */
        this.loader = false;
      },
      () => {
        this.loader = false;
        alert("Routes has been updated successfully");
        this.router.navigate(["School/routelist"]);
        this.canenablebutton = true;
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

export class AddRoute {
  routId: string;
  routeName: string;
  schoolID: string;
  areasCovered: string;
  startPoint: string;
  endPoint: string;
  wayPoints: any;
  AreasCovered: string;
}

export class WayPoints {
  Route: string;
  RouteId: string;
  WayPointId: string;
  GeoPointText: string;
  WayPointName: string;
  WayPointSeq: string;
}





