import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder,} from "@angular/forms";
import { SchoolsService } from "app/schools.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from "app/alertify-service";



@Component({
  selector: 'app-currentdetailtrip',
  templateUrl: './currentdetailtrip.component.html',
  styleUrls: ['./currentdetailtrip.component.scss']
})

@NgModule({
  imports: [
    BrowserModule,
  ],
  providers: [],
  declarations: [],
  bootstrap: []
})

export class CurrentdetailtripComponent implements OnInit {

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
  url: "assets/images/vehicle_bus.png",
  scaledSize: {
    width: 70,
    height: 70
  }
}

public defaultPosition = {
  Devicetime: "2019-11-30T19:12:42",
  Latitude: 29.3299,
  Longitude: 48.06118333333333,
  Servertime: "2019-11-30T19:12:44",
}

  public currentTrip: CurrentTrip;
  public studentDetail: StudentDetail;
  student_details: any;
  tripDetails = [];
  studentDatas = [];
  engagedStudents = [];
  reachedData: any;
  leftData: any;
  endTripData: any;
  terminateTripData: any;
  origin: any;
  destination: any;
  waypoints = [];
  markerData: any;

  lat = 51.678418;
  lng = 7.809007;

  trip_id: any;
  closeResult: string;

  startStatus: any;

  currentPositionData: any;

  checkVehiclePosition: any;

  AreasCovered: any;
  trip_starTime: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public schools: SchoolsService,
    public alertifyService: AlertifyService,

    private modalService: NgbModal
  ) {
    this.currentTrip = new CurrentTrip();
    this.studentDetail = new StudentDetail();

    this.route.params.subscribe(params => {
      this.trip_id = "" + params["id"]; // (+) converts string 'id' to a number
    });

  }

  ngOnInit() {

    this.startStatus = true;

    this.schools.fetchTripdetails<any[]>(this.trip_id).subscribe(
      (data: any) => {
        this.currentTrip = data[0];
        this.AreasCovered = this.currentTrip.Route.AreasCovered;

        if (this.currentTrip.ToSchool === true) {
          this.currentTrip.direction = "Home to School";
        } else {
          this.currentTrip.direction = "School to Home"
        }


        this.tripDetails = this.currentTrip.TripDetails;
        var temp = {};
        for(let i = 0; i < this.tripDetails.length-1; i++) {
          for(let j = i+1; j < this.tripDetails.length; j++) {
            if(Number(this.tripDetails[i].WayPoint.WayPointSeq) > Number(this.tripDetails[j].WayPoint.WayPointSeq)) {
              temp = this.tripDetails[i];
              this.tripDetails[i] = this.tripDetails[j];
              this.tripDetails[j] = temp;
            }
          }
        } 

        this.tripDetails[0].LeftAt = this.currentTrip.TripStart


        this.tripDetails.map(item => {
          item.LeftAt = this.formatDate(item.LeftAt)
          item.ReachedAt = this.formatDate(item.ReachedAt)
        })

        this.tripDetails.map(item => {
          if(item.LeftAt === "1-01-01 0:0") {
            item.LeftAt = " ";
          }
          if(item.ReachedAt === "1-01-01 0:0") {
            item.ReachedAt = " ";
          }

        })

        var originGeoLocationTxt = this.tripDetails[0].WayPoint.GeoPointText;
        var destinationGeoLocationTxt = this.tripDetails[this.tripDetails.length - 1].WayPoint.GeoPointText;

        this.origin = { lat: parseFloat(originGeoLocationTxt.split(",")[0]), lng: parseFloat(originGeoLocationTxt.split(",")[1]) }
        this.destination = { lat: parseFloat(destinationGeoLocationTxt.split(",")[0]), lng: parseFloat(destinationGeoLocationTxt.split(",")[1]) }

        var waypointsData = this.tripDetails;

        //display marker text
        this.markerData = this.tripDetails;

        this.markerData.map(item => {
          item.latitude = parseFloat(item.WayPoint.GeoPointText.split(",")[0]);
          item.longitude = parseFloat(item.WayPoint.GeoPointText.split(",")[1]);
          item.WayPointId = item.WayPointId.toString();
          item.WayPoint.WayPointSeq = item.WayPoint.WayPointSeq.toString();
        })

        if (waypointsData.length > 2) {
          var w_lengh = waypointsData.length - 2;
          for (var i = 1; i <= w_lengh; i++) {
            const data = {
              location: { lat: parseFloat(waypointsData[i].WayPoint.GeoPointText.split(",")[0]), lng: parseFloat(waypointsData[i].WayPoint.GeoPointText.split(",")[1]) }
            }
            this.waypoints.push(data)
          }
        } else {
          this.waypoints = [];
        }

        var sudentObject = data[0].TripIdealStudentsList;
        var allStudentsData = [];
        Object.keys(sudentObject).forEach(function(key) {
          var valStudent = sudentObject[key];
          for (let i = 0; i < valStudent.length; i++ ) {
            allStudentsData.push(valStudent[i])
          }
          // valStudent.map(item => {
          //   this.studentsData.push(item)
          // })
        });

        this.studentDatas = allStudentsData;

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
          this.alertifyService.success('Bad input, please check input again', document.title);
        }
      },
      () => {
      }
    );

    this.schools.getCurrentPostionTrips<any[]>(this.trip_id).subscribe(
      (data: any) => {
        if(data == null) {
          this.checkVehiclePosition = false;
          
        } else {
          this.checkVehiclePosition = true;
          this.currentPositionData = data
        }
        
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
          this.alertifyService.success('Bad input, please check input again', document.title);
        }
      },
      () => {
      }
    );

  }


  reloadWaypoints() {
    this.schools.fetchTripdetails<any[]>(this.trip_id).subscribe(
      (data: any) => {
        this.currentTrip = data[0];
        this.AreasCovered = this.currentTrip.Route.AreasCovered;

        if (this.currentTrip.ToSchool === true) {
          this.currentTrip.direction = "Home to School";
        } else {
          this.currentTrip.direction = "School to Home"
        }

        
        this.tripDetails = this.currentTrip.TripDetails;
        var temp = {};
        for(let i = 0; i < this.tripDetails.length-1; i++) {
          for(let j = i+1; j < this.tripDetails.length; j++) {
            if(Number(this.tripDetails[i].WayPoint.WayPointSeq) > Number(this.tripDetails[j].WayPoint.WayPointSeq)) {
              temp = this.tripDetails[i];
              this.tripDetails[i] = this.tripDetails[j];
              this.tripDetails[j] = temp;
            }
          }
        } 
        
        this.tripDetails[0].LeftAt = this.currentTrip.TripStart


        this.tripDetails.map(item => {
          item.LeftAt = this.formatDate(item.LeftAt)
          item.ReachedAt = this.formatDate(item.ReachedAt)
        })

        this.tripDetails.map(item => {
          if(item.LeftAt === "1-01-01 0:0") {
            item.LeftAt = " ";
          }
          if(item.ReachedAt === "1-01-01 0:0") {
            item.ReachedAt = " ";
          }

        })

      },
      error => {
       
      },
      () => {
      }
    );
  }

  reachTrip(event, item) {
    var wpid = item.WayPoint.WayPointId;
    this.reachedData = {};
    this.schools.reachedtrips<any[]>(this.trip_id, wpid, this.reachedData).subscribe(
      (data: any) => {
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
          this.alertifyService.success('Bad input, please check input again', document.title);
        }
      },
      () => {
        this.alertifyService.success('Trip successfully reached!', document.title);
        this.reloadWaypoints();
      
      }
    );
  }


  leftTrip(event, item) {
    var wpid = item.WayPoint.WayPointId;
    this.leftData = {};
    this.schools.leftTrips<any[]>(this.trip_id, wpid, this.leftData).subscribe(
      (data: any) => {
      },
      error => {
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
        this.alertifyService.success('Trip successfully Left!', document.title);
        this.reloadWaypoints();
        // this.ngOnInit();
      }
    );
  }


  

  openStopModal(stopModal) {
    this.modalService.open(stopModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  stopTrip() {
    this.endTripData = {};
    this.schools.endTrips<any[]>(this.trip_id, this.endTripData).subscribe(
      (data: any) => {
      },
      error => {
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
        this.alertifyService.success('Current trip has been stopped successfully!', document.title);

        this.router.navigate(["School/currenttrips"]);
      }
    );
  }

  openTerminateModal(terminateModal) {
    this.modalService.open(terminateModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  terminateTrip() {
    this.terminateTripData = {};
    this.schools.terminateTrips<any[]>(this.trip_id, this.terminateTripData).subscribe(
      (data: any) => {
      },
      error =>{
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
        this.alertifyService.success('Trip successfully Terminated!', document.title);

        this.router.navigate(["School/currenttrips"]);
      }
    );
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        min = d.getMinutes();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-') + " " +  [hour, min].join(':');
  }

}

export class CurrentTrip {
  Active: boolean;
  Driver: any;
  DriverId: number;
  EngagedStudents: any;
  GPSDevice: any;
  GPSDeviceId: number;
  IdealStudentsCount: number;
  LastKnownPosition: any;
  Route: any;
  RouteId: string;
  RouteName: string;
  SchoolId: number;
  Terminated: boolean;
  ToSchool: boolean;
  TripDetails: any;
  TripEnd: string;
  TripID: string;
  TripIdealStudentsList: any;
  TripStart: string;
  Vehicle: any;
  VehicleID: number;
  WaypointCount: number;
  WaypointsReached: number;
  direction: string;
}

export class StudentDetail {
  id: number;
  studentId: number;
  studentName: string;
  studentStatus: string;
  stopName: string;
}



