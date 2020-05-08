import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import { SchoolsService } from "app/schools.service";

@Component({
  selector: 'app-viewtrips',
  templateUrl: './viewtrips.component.html',
  styleUrls: ['./viewtrips.component.scss']
})


export class ViewtripsComponent implements OnInit {

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

  public currentTrip: CurrentTrip;
  public studentDetail: StudentDetail;
  student_details: any;
  lat = 51.678418;
  lng = 7.809007;
  tripDetails = [];
  studentsData = [];
  engagedStudents = [];
  reachedData: any;
  leftData: any;
  endTripData: any;
  terminateTripData: any;
  origin: any;
  destination: any;
  waypoints = [];
  markerData: any;
  trip_id: any;

  AreasCovered: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public schools: SchoolsService,
  ) { 
    this.currentTrip = new CurrentTrip();
    this.studentDetail = new StudentDetail();

    this.route.params.subscribe(params => {
      this.trip_id = "" + params["id"]; // (+) converts string 'id' to a number
    });

  
  }

  ngOnInit() {

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

        this.engagedStudents = data[0].EngagedStudents;
        this.engagedStudents.map(item => {
          if (item.IsOnboard === true) {
            item.Status = "Onboard"
          } else {
            item.Status = "Offboard"
          }
          return true;
        })

      },
      error => {
        /* can provide allert for error on the api */
        if(error.status === 404) {
          alert("No data found")
        }
        if(error.status === 500) {
          alert('Unexpected error.')
        }
        if(error.status === 400) {
          alert('Bad input, please check input again')
        }
      },
      () => {
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


