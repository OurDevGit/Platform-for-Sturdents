import { SchoolsService } from "app/schools.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Inject } from "@angular/core";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { AlertifyService } from "app/alertify-service";


@Component({
  selector: 'app-addroutes',
  templateUrl: './addroutes.component.html',
  styleUrls: ['./addroutes.component.scss']
})
@NgModule({
  imports: [
    BrowserModule,
  ],
  providers: [],
  declarations: [],
  bootstrap: []
})
export class AddroutesComponent implements OnInit {

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

  settings = {};
  count = 6;

  pwaypoints = [];
  waypoint_seqs = [];
  zoom: any = 10;
  latitude_map: any;
  longitude_map: any;
  latitude: any;
  longitude: any;
  current_waypoint_id: any;
  showdisplay: boolean;
  accesslist: any;
  areasCovereds = [];
  registerForm: FormGroup;
  submitted = false;
  datas: any;
  check: number;
  date: any;
  addroute: AddRoute;
  routeName: any;
  activeloginuser: any;
  canenablebutton: boolean = true;
  result: any;
  waypoint_data: any;

  popupModel = { year: 2019, month: 1, day: 1 };
  popupModel1 = { year: 2019, month: 1, day: 1 };

  loader = false;
  // settings = {};
  dropdownList = [];

  j: number;

  origin: any;
  destination: any;
  addWaypoints = [];
  waypoints = [];

  markerData: any;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public schools: SchoolsService,
    public alertifyService: AlertifyService,

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
    this.showdisplay = false;
    this.schools
      .waypointlists<any[]>()
      .subscribe(
        (data: any) => {
          if (data.length == 0) {
            this.current_waypoint_id = 1
            this.saveInLocal('current_waypoint_id', this.current_waypoint_id);

          } else {
            var waypoint_id = Math.max.apply(Math, data.map(function (o) {
              return o.WayPointId;
            }))

            this.current_waypoint_id = waypoint_id + 1;
            this.saveInLocal('current_waypoint_id', this.current_waypoint_id);
          }

        },
        error => () => {
          /* can provide allert for error on the api */
        },
        () => {

        }
      );

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
  }

  ngOnInit() {

    this.accesslist = this.getFromLocal("access_list");
    for (let i = 0; i < this.accesslist.length; i++) {
      if (this.accesslist[i].code == "TMCR") {
        this.showdisplay = true;
      } 
    }

    this.pwaypoints = [];

    this.latitude = 13.067439;
    this.longitude = 80.237617;

    // this.latitude = 51.678418;
    // this.longitude = 7.809007;

    this.settings = {
      singleSelection: false,
      text: "Select Countries",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      addNewItemOnFilter: true
    };

    this.dropdownList = [{ id: 1, name: 'karthi' }, { id: 2, name: 'karthi2' }, { id: 3, name: 'karthi3' }, { id: 4, name: 'karthi4' }];
    this.settings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    var end_date = formatDate(new Date(), "yyyy-MM-dd", "en");
    var splitted1s = end_date.split("-", 3);
    let d = {
      year: +splitted1s[0],
      month: +splitted1s[1],
      day: +splitted1s[2]
    };

    this.popupModel = d;
    this.popupModel1 = d;

    this.addroute.RouteName = "";

    let school_id = this.getFromLocal("selected_school_id");

    this.registerForm = this.formBuilder.group({
      routeNames: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,30}$")]
      ],
      startPoints: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,30}$")]
      ],
      WayPointIds: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,15}$")]
      ],
      routeSeqs: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,15}$")]
      ],
      geoTexts: [
        "",
        [Validators.required]
      ],
      endPoints: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_-s]{1,30}$")]
      ],
      areasCovereds: [
        "",
        [Validators.required, Validators.pattern("^[ 0-9a-zA-Z_,-s]{1,250}$")]
      ],
      WayPointNames: [
        "",
        [Validators.required]
      ]

    });

    this.insertSeq();
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

    var currentWaypointNames = [];
    var currentWaypointsSeqs = [];

    this.pwaypoints.map(cur => {
      currentWaypointNames.push(cur.WayPointName);
      currentWaypointsSeqs.push(cur.WayPointSeq);
    })

    var seq_result = currentWaypointsSeqs.includes(pointData.WayPointSeq)
    var name_result = currentWaypointNames.includes(pointData.WayPointName)

    if (seq_result === false && name_result === false) {
      this.pwaypoints.push(pointData);
      this.j = this.pwaypoints.length - 1;
      this.saveInLocal('current_waypoint_id', this.waypoint_data.WayPointId + 1)
    } else {
      this.alertifyService.success('waypoint name and seq can not be duplicated', document.title);

    }

    this.markerData = this.pwaypoints


    this.markerData.map(item => {
      item.latitude = parseFloat(item.GeoPointText.split(",")[0]);
      item.longitude = parseFloat(item.GeoPointText.split(",")[1]);
      item.WayPointId = item.WayPointId.toString();
    })

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

  }


  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.addRoute();
    }
  }
  uploadbulk() {
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

  generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if (d > 0) {//Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {//Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }


  addRoute() {
    let school_id = this.getFromLocal("selected_school_id");
    var uuid = 'Route_' + this.generateUUID();
    this.addroute.RouteId = uuid;
    this.addroute.SchoolID = school_id;
    this.addroute.WayPoints = this.pwaypoints;

    this.schools.addroutes<AddRoute>(this.addroute).subscribe(
      (data: AddRoute) => {
        this.loader = false;
      },
      error => {
        /* can provide allert for error on the api */
        this.loader = false;

        if(error.status === 404) {
          this.alertifyService.success('No data found', document.title);

        }
        if(error.status === 500) {
          this.alertifyService.success('Unexpected error.', document.title);
        }
        if(error.status === 400) {
          this.alertifyService.success('Bad input, please check input again', document.title);
        }
      },
      () => {
        this.loader = false;
        this.alertifyService.success('Route has been created successfully', document.title);
        this.router.navigate(["School/routelist"]);
        this.canenablebutton = true;
      }
    );
  }

  deleteWaypointById($event, item) {
    var filtered_array = this.pwaypoints.filter(function (el) { return el.WayPointId != item.WayPointId; });
    this.pwaypoints = filtered_array;
    this.waypoints = [];
    if (this.pwaypoints.length >= 2) {
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
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }
  getFromLocal(key): any {
    return this.storage.get(key);
  }

  insertSeq() {
    for (var i = 1; i <= 100; i++) {
      this.waypoint_seqs.push(i)
    }
  }

  onClickDown(value) {
    if (value === this.j) {
      return false;
    } else {
      var temp_value = this.pwaypoints[value];
      this.pwaypoints[value] = this.pwaypoints[value + 1];
      this.pwaypoints[value + 1] = temp_value;
    }
  }

  onClickUp(value) {
    if (value === 0) {
      return false
    } else {
      var temp_value = this.pwaypoints[value];
      this.pwaypoints[value] = this.pwaypoints[value - 1];
      this.pwaypoints[value - 1] = temp_value;
    }
  }

}

export class AddRoute {
  RouteId: string;
  RouteName: string;
  SchoolID: string;
  StartPoint: string;
  EndPoint: string;
  WayPoints: any;
  Students: string;
  areasCovered: string;
}

export class WayPoints {
  Route: string;
  RouteId: string;
  WayPointId: string;
  GeoPointText: string;
  WayPointName: string;
  WayPointSeq: string;
}



