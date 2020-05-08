import { Injectable } from "@angular/core";

import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import * as data  from './params.test.json';

@Injectable({
  providedIn: "root"
})


export class SchoolsService {

  paramData: any = (data as any).default;
  ////constantstart///
  Server = this.paramData.Server;
  ApiUrl = this.paramData.ApiUrl;
  ServerWithApiUrl: string = this.Server + this.ApiUrl;
  public cognitoconfig = {
    Auth: {
      identityPoolId: this.paramData.identityPoolId, // Amazon Cognito Identity Pool ID us-east-1_XYZPQRS
      region: this.paramData.region, // Amazon Cognito Region
      userPoolId:  this.paramData.userPoolId,
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolWebClientId: this.paramData.userPoolWebClientId,
      // OPTIONAL - Amazon Cognito Web Client ID
      oauth: {
        domain: this.paramData.domain,
        // Authorized scopes
        scope: this.paramData.scope,
        // Callback URL
        redirectSignIn: this.paramData.redirectSignIn,
        // Sign out URL
        redirectSignOut: this.paramData.redirectSignOut,
        // 'code' for Authorization code grant,
        // 'token' for Implicit grant
        responseType: this.paramData.responseType,
        // optional, for Cognito hosted ui specified options
        options: {
          // Indicates if the data collection is enabled to support Cognito advanced security features.
          // By default, this flag is set to true.
          AdvancedSecurityDataCollectionFlag: true
        }
      }
    },
    Storage: {
      bucket: this.paramData.bucket,
      region: this.paramData.region,
      accessKeyId: this.paramData.accessKeyId,
      secretAccessKey: this.paramData.secretAccessKey
    }
  };

  ////constantend///

  public Server1 = this.paramData.Server1;
  public ApiUrl1 = this.paramData.ApiUrl1;
  public ServerWithApiUrl1 = this.Server1 + this.ApiUrl1;

  // public Server =
  //   "https://sjrb3ed89j.execute-api.ap-south-1.amazonaws.com/Prod/";
  // public ApiUrl = "api/";
  // public ServerWithApiUrl = this.Server + this.ApiUrl;

  private cynosureDashboard: string;
  private users: string;
  private schools: string;
  private schoolUsers: string;
  private cynosureUsers: string;
  private iscynosureuser: string;
  private schoollistforUsers: string;
  private canLogin: string;
  private checkupload: string;
  private checkupload2: string;
  private checkdupliectionrfids: string;

  private acadamisschoollist: string;
  private addAcadamicGroup: string;
  private fetchsingacadamic: string;
  private fetchday: string;
  private updateacadamic: string;
  private deleteacadamic: string;

  private addstudent: string;
  private liststudents: string;
  private allListStudents: string;

  private fetchsinglestudent: string;
  private updatestudent: string;
  private deletestudent: string;
  private deletestudentbystudentid: string;
  private assignStudentToRoute: string;

  private allListParents: string;
  private addparent: string;
  private listparent: string;
  private fetchsingleparent: string;
  private updateparent: string;
  private deleteparent: string;

  private addcalender: string;
  private listcalender: string;
  private fetchsinglecalender: string;
  private updatecalender: string;
  private deletecalender: string;

  private addstudentParent: string;
  private liststudentParent: string;
  private fetchsinglestudentParent: string;
  private updatestudentParent: string;
  private deletestudentParent: string;
  private listParentstudent: string;
  private filterstudent: string;

  private getAllRFID: string;
  private addRFID: string;
  private listRFID: string;
  private fetchsingleRFID: string;
  private updateRFID: string;
  private listRFIDaschool: string;
  private deleteRFID: string;

  private filterrfid: string;

  private addgrade: string;
  private listgrade: string;
  private deletegrade: string;
  private updategrades: string;

  private addclass: string;
  private listclass: string;
  private deleteclass: string;

  private addactive: string;
  private listactive: string;
  private listbluklog: string;
  private deleteactive: string;

  private addroll: string;
  private listroll: string;
  private deleteroll: string;
  private updateroll: string;
  private fetchroll: string;

  private addpermission: string;
  private listpermisson: string;
  private deletepermission: string;
  private fetchpermission: string;
  private updatepermission: string;

  private addrollpermision: string;
  private listrollpermission: string;
  private listrollpermission1: string;
  private listbanner: string;
  private deleterollpermission: string;
  private fetchrollpermission: string;
  private updaterollpermission: string;
  private currenttime: string;

  private sendmail: string;

  private addchart: string;
  private listchart: string;
  private deletechart: string;

  ////Transport Moduel type declartion////
  private driverlists: string;
  private adddriver: string;
  private fetchsingledriver: string;
  private updatedriver: string;
  private deletedriver: string;

  private vehiclelists: string;
  private addvehicles: string;
  private fetchvehicles: string;
  private updatevehicles: string;
  private deletevehicles: string;

  private deviceslist: string;
  private adddevice: string;
  private fetchdevice: string;
  private updatedevice: string;
  private deletedevice: string;

  private routeslist: string;
  private minirouteslist: string;
  private addroute: string;
  private fetchroute: string;
  private updateroute: string;
  private deleteroute: string;
  private tripRoute: string;

  private waypointlist: string;
  private addwaypoint: string;
  private fetchwaypoint: string;
  private updatewaypoint: string;
  private deletewaypoint: string;

  private studentdetailslist: string;
  private addstudentdetail: string;
  private fetchstudentdetail: string;
  private updatestudentdetail: string;
  private deletestudentdetail: string;

  private currentTripList: string;
  private getCurrentPostionTrip: string;
  private hitoryTripList: string;
  private fetchTripdetail: string;
  private reachedtripsDetail: string;
  private leftTripsDetail: string;
  private endTripsDetail: string;
  private terminateTripsDetail: string;


  private gradeandmonth: string;

  private chartapis: string[] = [
    "" + this.ServerWithApiUrl + "Parents/parentstatistic/",
    "" + this.ServerWithApiUrl + "Students/studentstatistic/",
    "" + this.ServerWithApiUrl + "DashboardGraphs/acadamicStaticitcs/"
  ];

  private bulkupload: string;

  constructor(public http: HttpClient) {

    
    this.cynosureDashboard =
    this.ServerWithApiUrl + "DashboardGraphs/getCynosureDashboard";
    this.currenttime = this.ServerWithApiUrl + "DashboardGraphs/gettime";
    this.users = this.ServerWithApiUrl + "users/";
    this.schools = this.ServerWithApiUrl + "schools/";
    this.schoolUsers = this.ServerWithApiUrl + "SchoolUsers/";
    this.cynosureUsers = this.ServerWithApiUrl + "CynosureUsers/";
    this.iscynosureuser = this.ServerWithApiUrl + "CynosureUsers/iscynosure/";
    this.schoollistforUsers = this.ServerWithApiUrl + "SchoolUsers/schools/";
    this.canLogin = this.ServerWithApiUrl + "users/canLogin/";

    this.acadamisschoollist = this.ServerWithApiUrl + "AcademicGroups/school/";

    this.addAcadamicGroup = this.ServerWithApiUrl + "AcademicGroups";
    this.fetchsingacadamic = this.ServerWithApiUrl + "AcademicGroups/";
    this.updateacadamic = this.ServerWithApiUrl + "AcademicGroups/";
    this.deleteacadamic = this.ServerWithApiUrl + "AcademicGroups/";
    this.fetchday = this.ServerWithApiUrl + "Weekdays";

    this.checkupload = this.ServerWithApiUrl + "Parents/cancreate/";
    this.checkupload2 = this.ServerWithApiUrl + "Students/cancreate/";
    this.checkdupliectionrfids = this.ServerWithApiUrl + "RFIDs/cancreate/";

    this.addstudent = this.ServerWithApiUrl + "Students";
    this.liststudents = this.ServerWithApiUrl + "Students/school/";


    this.fetchsinglestudent = this.ServerWithApiUrl + "Students/";
    this.updatestudent = this.ServerWithApiUrl + "Students/";
    this.deletestudent = this.ServerWithApiUrl + "Students/";
    this.deletestudentbystudentid = this.ServerWithApiUrl1 + "students/";

    this.filterstudent = this.ServerWithApiUrl + "Students/school/";
    //assign student to route
    this.assignStudentToRoute = this.ServerWithApiUrl1 + "students/";

    this.allListParents = this.ServerWithApiUrl + "Parents";
    this.addparent = this.ServerWithApiUrl + "Parents";
    this.listparent = this.ServerWithApiUrl + "Parents/school/";
    this.fetchsingleparent = this.ServerWithApiUrl + "Parents/";
    this.updateparent = this.ServerWithApiUrl + "Parents/";
    this.deleteparent = this.ServerWithApiUrl + "Parents/";

    this.addstudentParent = this.ServerWithApiUrl + "StudentParents";
    this.liststudentParent = this.ServerWithApiUrl + "StudentParents";
    this.fetchsinglestudentParent = this.ServerWithApiUrl + "StudentParents/";
    this.updatestudentParent = this.ServerWithApiUrl + "StudentParents/";
    this.deletestudentParent = this.ServerWithApiUrl + "StudentParents/";
    this.listParentstudent = this.ServerWithApiUrl + "StudentParents/";

    this.getAllRFID = this.ServerWithApiUrl + "RFIDs";
    this.addRFID = this.ServerWithApiUrl + "RFIDs";
    this.listRFID = this.ServerWithApiUrl + "RFIDs/";
    this.fetchsingleRFID = this.ServerWithApiUrl + "RFIDs/";
    this.updateRFID = this.ServerWithApiUrl + "RFIDs/";
    this.listRFIDaschool = this.ServerWithApiUrl + "RFIDs/school/";
    this.deleteRFID = this.ServerWithApiUrl + "RFIDs/";
    this.filterrfid = this.ServerWithApiUrl + "RFIDs/school/";

    this.addgrade = this.ServerWithApiUrl + "Master_Grade";
    this.listgrade = this.ServerWithApiUrl + "Master_Grade/";
    this.deletegrade = this.ServerWithApiUrl + "Master_Grade/";
    this.updategrades = this.ServerWithApiUrl + "Master_Grade/";

    this.addactive = this.ServerWithApiUrl + "ActivityHistories";
    this.listactive = this.ServerWithApiUrl + "ActivityHistories";
    this.deleteactive = this.ServerWithApiUrl + "ActivityHistories";

    this.listbluklog = this.ServerWithApiUrl + "BulkUploadLogs/";

    this.addroll = this.ServerWithApiUrl + "Rolls";
    this.listroll = this.ServerWithApiUrl + "Rolls";
    this.deleteroll = this.ServerWithApiUrl + "Rolls/";
    this.updateroll = this.ServerWithApiUrl + "Rolls/";
    this.fetchroll = this.ServerWithApiUrl + "Rolls/";

    this.addpermission = this.ServerWithApiUrl + "permissions";
    this.listpermisson = this.ServerWithApiUrl + "permissions";
    this.fetchpermission = this.ServerWithApiUrl + "permissions/";
    this.updatepermission = this.ServerWithApiUrl + "permissions/";
    this.deletepermission = this.ServerWithApiUrl + "permissions/";

    this.addrollpermision = this.ServerWithApiUrl + "RollPermissions";

    this.listbanner = this.ServerWithApiUrl + "listBanner";
    this.listrollpermission = this.ServerWithApiUrl + "RollPermissions/";
    this.listrollpermission1 = this.ServerWithApiUrl + "RollPermissions/names/";
    this.deleterollpermission = this.ServerWithApiUrl + "RollPermissions/";
    this.fetchrollpermission = this.ServerWithApiUrl + "RollPermissions/";
    this.updaterollpermission = this.ServerWithApiUrl + "RollPermissions/";

    this.addclass = this.ServerWithApiUrl + "Master_Class";
    this.listclass = this.ServerWithApiUrl + "Master_Class";
    this.deleteclass = this.ServerWithApiUrl + "Master_Class/";

    this.addcalender = this.ServerWithApiUrl + "Calenders";
    this.listcalender = this.ServerWithApiUrl + "Calenders/school/";
    this.fetchsinglecalender = this.ServerWithApiUrl + "Calenders/";
    this.updatecalender = this.ServerWithApiUrl + "Calenders/";
    this.deletecalender = this.ServerWithApiUrl + "Calenders/";

    this.listchart = this.ServerWithApiUrl + "Schooluserdashboards/school/";

    this.bulkupload = this.ServerWithApiUrl + "BulkUploadLogs/";

    this.sendmail = this.ServerWithApiUrl + "Email";

    ////Transport Module API calling////
    this.driverlists = this.ServerWithApiUrl1 + "drivers";
    this.adddriver = this.ServerWithApiUrl1 + "drivers";
    this.fetchsingledriver = this.ServerWithApiUrl1 + "drivers/";
    this.updatedriver = this.ServerWithApiUrl1 + "drivers/";
    this.deletedriver = this.ServerWithApiUrl1 + "drivers/";

    this.vehiclelists = this.ServerWithApiUrl1 + "vehicles";
    this.addvehicles = this.ServerWithApiUrl1 + "vehicles";
    this.fetchvehicles = this.ServerWithApiUrl1 + "vehicles/";
    this.updatevehicles = this.ServerWithApiUrl1 + "vehicles/";
    this.deletevehicles = this.ServerWithApiUrl1 + "vehicles/";

    this.deviceslist = this.ServerWithApiUrl1 + "gpsdevices";
    this.adddevice = this.ServerWithApiUrl1 + "gpsdevices";
    this.fetchdevice = this.ServerWithApiUrl1 + "gpsdevices/";
    this.updatedevice = this.ServerWithApiUrl1 + "gpsdevices/";
    this.deletedevice = this.ServerWithApiUrl1 + "gpsdevices/";

    this.routeslist = this.ServerWithApiUrl1 + "routes";
    this.minirouteslist = this.ServerWithApiUrl1 + "routes/minimal"
    this.addroute = this.ServerWithApiUrl1 + "routes";
    this.fetchroute = this.ServerWithApiUrl1 + "routes/";
    this.updateroute = this.ServerWithApiUrl1 + "routes/";
    this.deleteroute = this.ServerWithApiUrl1 + "routes/";
    this.tripRoute = this.ServerWithApiUrl1 + "routes/";

    this.waypointlist = this.ServerWithApiUrl1 + "WayPoints";
    this.addwaypoint = this.ServerWithApiUrl1 + "WayPoints";
    this.fetchwaypoint = this.ServerWithApiUrl1 + "WayPoints/";
    this.updatewaypoint = this.ServerWithApiUrl1 + "WayPoints/";
    this.deletewaypoint = this.ServerWithApiUrl1 + "WayPoints/";

    this.studentdetailslist = this.ServerWithApiUrl1 + "students";
    this.addstudentdetail = this.ServerWithApiUrl1 + "students";
    this.fetchstudentdetail = this.ServerWithApiUrl1 + "students/";
    this.updatestudentdetail = this.ServerWithApiUrl1 + "students/";
    this.deletestudentdetail = this.ServerWithApiUrl1 + "students/";

    this.getCurrentPostionTrip = this.ServerWithApiUrl1 + "Trips/"
    this.currentTripList = this.ServerWithApiUrl1 + "Trips?isactive=true";
    this.hitoryTripList = this.ServerWithApiUrl1 + "Trips?isactive=false";
    this.fetchTripdetail = this.ServerWithApiUrl1 + "Trips/?tripid=";
    this.reachedtripsDetail = this.ServerWithApiUrl1 + "Trips/";
    this.leftTripsDetail = this.ServerWithApiUrl1 + "Trips/";
    this.endTripsDetail = this.ServerWithApiUrl1 + "Trips/";
    this.terminateTripsDetail = this.ServerWithApiUrl1 + "Trips/";

    this.gradeandmonth = this.ServerWithApiUrl + "Students/gradeandmonth/"

    //all students
    this.allListStudents = this.ServerWithApiUrl1 + "students"

  }




  /*
Cynosure Dashboard
*/
  public getCynosureDashboard<T>(): Observable<T> {
    return this.http.get<T>(this.cynosureDashboard);
  }
  public getcurrenttime<T>(): Observable<T> {
    return this.http.get<T>(this.currenttime);
  }

  /*
user management
*/
  public getAllUsers<T>(): Observable<T> {
    return this.http.get<T>(this.users);
  }
  public getnonCynosureUsers<T>(): Observable<T> {
    return this.http.get<T>(this.users + "noncynosure");
  }

  public getSingleUser<T>(id: number): Observable<T> {
    return this.http.get<T>(this.users + id);
  }

  public addUser<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });

    return this.http.post<T>(this.users, itemName);
  }

  public updateUser<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.users + id, itemToUpdate);
  }

  public deleteUser<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.users + id);
  }

  /*
schools management
*/
  public getAllSchools<T>(): Observable<T> {
    return this.http.get<T>(this.schools);
  }

  public getSingleSchool<T>(id: number): Observable<T> {
    return this.http.get<T>(this.schools + id);
  }

  public addSchool<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify(itemName);

    return this.http.post<T>(this.schools, itemName);
  }

  public updateSchool<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.schools + id, itemToUpdate);
  }

  public deleteSchool<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.schools + id);
  }

  /*
Assign user to schools
*/
  public getAllUserSchools<T>(): Observable<T> {
    return this.http.get<T>(this.schoolUsers);
  }

  public getSingleUserSchool<T>(id: number): Observable<T> {
    return this.http.get<T>(this.schoolUsers + id);
  }
  public getusersofschool<T>(id: number): Observable<T> {
    return this.http.get<T>(this.schoolUsers + "userListOfSchool/" + id);
  }

  public addUserSchool<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify(itemName);

    return this.http.post<T>(this.schoolUsers, itemName);
  }

  public updateUserSchool<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.schoolUsers + id, itemToUpdate);
  }

  public deleteUserSchool<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.schoolUsers + id);
  }
  public deleteUserSchoolwithuserschool<T>(
    s_id: number,
    u_id: number
  ): Observable<T> {
    return this.http.delete<T>(this.schoolUsers + s_id + "/" + u_id);
  }

  /*
Assign user to Cynosure
*/
  public getAllUserCynosure<T>(): Observable<T> {
    return this.http.get<T>(this.cynosureUsers);
  }

  public getSingleUserCynosure<T>(id: number): Observable<T> {
    return this.http.get<T>(this.cynosureUsers + id);
  }

  public addUserCynosure<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify(itemName);

    return this.http.post<T>(this.cynosureUsers, itemName);
  }

  public updateUserCynosure<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.cynosureUsers + id, itemToUpdate);
  }

  public deleteUserCynosure<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.cynosureUsers + id);
  }

  // can login
  public canLoginauser<T>(email: string): Observable<T> {
    return this.http.get<T>(this.canLogin + email);
  }

  // is cynosureuser
  public is_cynosureuser<T>(email: string): Observable<T> {
    return this.http.get<T>(this.iscynosureuser + email);
  }

  // get user schools schoollistforUsers
  public getschoollistforUsers<T>(email: string): Observable<T> {
    return this.http.get<T>(this.schoollistforUsers + email);
  }

  /**
   * acadamic Management
   *
   */

  public acadamisschoollists<T>(id: string): Observable<T> {
    return this.http.get<T>(this.acadamisschoollist + id);
  }

  public addaddAcadamicGroup<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });

    return this.http.post<T>(this.addAcadamicGroup, itemName);
  }

  public fetchsingacadamics<T>(id: string): Observable<T> {
    return this.http.get<T>(this.fetchsingacadamic + id);
  }

  public updateacadamics<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.updateacadamic + id, itemToUpdate);
  }

  public deleteacadamics<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deleteacadamic + id);
  }

  public fetchdays<T>(): Observable<T> {
    return this.http.get<T>(this.fetchday);
  }

  /**
   * student Management
   *
   */

  public AllListstudents<T>(): Observable<T> {
    return this.http.get<T>(this.allListStudents);
  }

  public addstudents<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });
    return this.http.post<T>(this.addstudent, itemName);
  }

  public liststudent<T>(id: string): Observable<T> {
    return this.http.get<T>(this.liststudents + id);
  }

  public filterstudents<T>(id: string, sc: string, ec: string): Observable<T> {
    return this.http.get<T>(this.filterstudent + id + "/" + sc + "/" + ec);
  }

  public fetchsinglestudents<T>(id: string): Observable<T> {
    return this.http.get<T>(this.fetchsinglestudent + id);
  }

  public updatestudents<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.updatestudent + id, itemToUpdate);
  }

  public deletestudents<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deletestudent + id);
  }

  //assign student to route
  public assignStudentToRoutes<T>(submitData): Observable<T> {
    return this.http.put<T>(this.assignStudentToRoute + submitData.studentId + "/set-waypoint?routeid=" + submitData.routeId + "&waypointid=" + submitData.waypointid, {})
  }

  public deletewaypointsByStudentId<T>(id: number, routeId: string, waypointid: number): Observable<T> {
    return this.http.delete<T>(this.deletestudentbystudentid + id + "/remove-waypoint?routeid=" + routeId + "&waypointid=" + waypointid);
  }

  /**
   * Parent Management
   *
   */

  public AllListparents<T>(): Observable<T> {
    return this.http.get<T>(this.allListParents);
  }

  public addparents<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });
    return this.http.post<T>(this.addparent, itemName);
  }

  public listparents<T>(id: string): Observable<T> {
    return this.http.get<T>(this.listparent + id);
  }

  public fetchsingleparents<T>(id: string): Observable<T> {
    return this.http.get<T>(this.fetchsingleparent + id);
  }

  public updateparents<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.updateparent + id, itemToUpdate);
  }

  public deleteparents<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deleteparent + id);
  }

  /**
   * studentParent Management
   *
   */
  public addstudentParents<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });
    return this.http.post<T>(this.addstudentParent, itemName);
  }

  public liststudentParents<T>(): Observable<T> {
    return this.http.get<T>(this.liststudentParent);
  }

  public fetchsinglestudentParents<T>(id: string): Observable<T> {
    return this.http.get<T>(this.fetchsinglestudentParent + id);
  }

  public updatestudentParents<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.updatestudentParent + id, itemToUpdate);
  }

  public deletestudentParents<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deletestudentParent + id);
  }

  public listParentstudents<T>(id: string): Observable<T> {
    return this.http.get<T>(this.listParentstudent + id);
  }
  // public listParentstudents<T>(): Observable<T> {
  //   return this.http.get<T>(this.listParentstudent);
  // }

  /**
   * RFID Management
   *
   */

  public addRFIDs<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });
    return this.http.post<T>(this.addRFID, itemName);
  }

  public checkdupliectionrfid<T>(itemName: T, id: number): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });
    return this.http.post<T>(this.checkdupliectionrfids + id, itemName);
  }

  public getAllRFIDs<T>(): Observable<T> {
    return this.http.get<T>(this.getAllRFID);
  }

  public listRFIDs<T>(id: string): Observable<T> {
    return this.http.get<T>(this.listRFID + id);
  }
  public listRFIDsasschool<T>(id: string): Observable<T> {
    return this.http.get<T>(this.listRFIDaschool + id);
  }

  public filterrfids<T>(id: string, sc: string, ec: string): Observable<T> {
    return this.http.get<T>(this.filterrfid + id + "/" + sc + "/" + ec);
  }

  public fetchsingleRFIDs<T>(id: string): Observable<T> {
    return this.http.get<T>(this.fetchsingleRFID + id);
  }

  public updateRFIDs<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.updateRFID + id, itemToUpdate);
  }

  public deleteRFIDs<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deleteRFID + id);
  }

  /**
   * Grade Management
   *
   */

  public addgrades<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });
    return this.http.post<T>(this.addgrade, itemName);
  }

  public listgrades<T>(id: number): Observable<T> {
    return this.http.get<T>(this.listgrade + id);
  }

  public deletegrades<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deletegrade + id);
  }

  public updategrade<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.updategrades + id, itemToUpdate);
  }

  /**
   * Roll Management
   *
   */

  public addrolls<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });
    return this.http.post<T>(this.addroll, itemName);
  }

  public listrolls<T>(): Observable<T> {
    return this.http.get<T>(this.listroll);
  }

  public deleterolls<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deleteroll + id);
  }

  public fetchrolls<T>(id: string): Observable<T> {
    return this.http.get<T>(this.fetchroll + id);
  }

  public updaterolls<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.updateroll + id, itemToUpdate);
  }

  /**
   * Permission Management
   *
   */

  public addpermissions<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });
    return this.http.post<T>(this.addpermission, itemName);
  }

  public listpermissons<T>(): Observable<T> {
    return this.http.get<T>(this.listpermisson);
  }

  public deletepermissions<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deletepermission + id);
  }

  public fetchpermissions<T>(id: string): Observable<T> {
    return this.http.get<T>(this.fetchpermission + id);
  }

  public updatepermissions<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.updatepermission + id, itemToUpdate);
  }

  /**
   * Rollpermissions Management
   *
   */

  public addrollpermisions<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });
    return this.http.post<T>(this.addrollpermision, itemName);
  }

  public listrollpermissions<T>(id: string): Observable<T> {
    return this.http.get<T>(this.listrollpermission + id);
  }

  public listrollpermissions1<T>(id: string): Observable<T> {
    return this.http.get<T>(this.listrollpermission1 + id);
  }

  public pannerlists<T>(): Observable<T> {
    return this.http.get<T>(this.listbanner);
  }

  public deleterollpermissions<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deleterollpermission + id);
  }

  public fetchrollpermissions<T>(id: string): Observable<T> {
    return this.http.get<T>(this.fetchrollpermission + id);
  }

  public updaterollpermissions<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.updaterollpermission + id, itemToUpdate);
  }

  /**
   * Class Management
   *
   */

  public addclasss<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });
    return this.http.post<T>(this.addclass, itemName);
  }

  public listclasss<T>(): Observable<T> {
    return this.http.get<T>(this.listclass);
  }

  public deleteclasss<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deleteclass + id);
  }

  /**
   * calenders Management
   *
   */
  public addcalenders<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });
    return this.http.post<T>(this.addcalender, itemName);
  }

  public listcalenders<T>(id: string): Observable<T> {
    return this.http.get<T>(this.listcalender + id);
  }

  public fetchsinglecalenders<T>(id: string): Observable<T> {
    return this.http.get<T>(this.fetchsinglecalender + id);
  }

  public updatecalenders<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.updatecalender + id, itemToUpdate);
  }

  public deletecalenders<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deletecalender + id);
  }

  public checkuploads<T>(itemName: T, id: number): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });
    return this.http.post<T>(this.checkupload + id, itemName);
  }

  public checkuploads2<T>(itemName: T, id: number): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });
    return this.http.post<T>(this.checkupload2 + id, itemName);
  }

  /**
   * Message Management
   *
   */

  public sendmails<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });
    return this.http.post<T>(this.sendmail, itemName);
  }

  /**
   * Dashboard Management
   *
   */

  public addcharts<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });
    return this.http.post<T>(this.addchart, itemName);
  }

  public listcharts<T>(id: number): Observable<T> {
    return this.http.get<T>(this.listchart + id);
  }

  public deletecharts<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deletechart + id);
  }

  /**
   * Activie Management
   *
   */

  // public addactives<T>(itemName: T): Observable<T> {
  //   const toAdd = JSON.stringify({ ItemName: itemName });
  //   return this.http.post<T>(this.addactive, itemName);
  // }

  public listactives<T>(): Observable<T> {
    return this.http.get<T>(this.listactive);
  }

  public listbluklogs<T>(id: number): Observable<T> {
    return this.http.get<T>(this.listbluklog + id);
  }

  public deleteactives<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deleteactive + id);
  }

  ///////Transport Module API Calling Function////

  /**
 * Driver Management
 *
 */

  public driverslist<T>(): Observable<T> {
    return this.http.get<T>(this.driverlists);
  }

  public adddrivers<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });

    return this.http.post<T>(this.adddriver, itemName);
  }

  public fetchsingledrivers<T>(id: string): Observable<T> {
    return this.http.get<T>(this.fetchsingledriver + id);
  }

  public updatedrivers<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.updatedriver + id, itemToUpdate);
  }

  public deletedrivers<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deletedriver + id);
  }

  /**
   * Vehicle Management
   *
   */
  public vehiclelist<T>(): Observable<T> {
    return this.http.get<T>(this.vehiclelists);
  }
  public addvehicle<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });

    return this.http.post<T>(this.addvehicles, itemName);
  }
  public fetchvehicle<T>(id: string): Observable<T> {
    return this.http.get<T>(this.fetchvehicles + id);
  }
  public updatevehicle<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.updatevehicles + id, itemToUpdate);
  }
  public deletevehicle<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deletevehicles + id);
  }

  /**
   * devices Management
   *
   */
  public deviceslists<T>(): Observable<T> {
    return this.http.get<T>(this.deviceslist);
  }
  public adddevices<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });
    return this.http.post<T>(this.adddevice, itemName);
  }
  public fetchdevices<T>(id: string): Observable<T> {
    return this.http.get<T>(this.fetchdevice + id);
  }
  public updatedevices<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.updatedevice + id, itemToUpdate);
  }
  public deletedevices<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deletedevice + id);
  }

  /**
 * Routes Management
 *
 */
  public routeslists<T>(): Observable<T> {
    return this.http.get<T>(this.routeslist);
  }

  public minirouteslists<T>(): Observable<T> {
    return this.http.get<T>(this.minirouteslist);
  }

  public addroutes<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });

    return this.http.post<T>(this.addroute, itemName);
  }

  public fetchroutes<T>(id: string): Observable<T> {
    return this.http.get<T>(this.fetchroute + id);
  }

  public updateroutes<T>(id: string, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.updateroute + id, itemToUpdate);
  }
  public deleteroutes<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deleteroute + id);
  }

  public startTrip<T>(id: string, tripData: T): Observable<T> {
    return this.http.put<T>(this.tripRoute + id + '/start-trip', tripData);
  }

  public fetchstudentsByrouteid<T>(id: string): Observable<T> {
    return this.http.get<T>(this.fetchroute + id + "/students");
  }

  public fetchwaypointsByrouteid<T>(id: string): Observable<T> {
    return this.http.get<T>(this.fetchroute + id + "/waypoints");
  }








  /**
   * WayPoints Management
   *
   */
  public waypointlists<T>(): Observable<T> {
    return this.http.get<T>(this.waypointlist);
  }
  public addwaypoints<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });

    return this.http.post<T>(this.addwaypoint, itemName);
  }
  public fetchwaypoints<T>(id: string): Observable<T> {
    return this.http.get<T>(this.fetchwaypoint + id);
  }
  public updatewaypoints<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.updatewaypoint + id, itemToUpdate);
  }
  public deletewaypoints<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deletewaypoint + id);
  }

  /**
   * Studetndetials Management
   *
   */
  public studentdetailslists<T>(): Observable<T> {
    return this.http.get<T>(this.studentdetailslist);
  }
  public addstudentdetails<T>(itemName: T): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });

    return this.http.post<T>(this.addstudentdetail, itemName);
  }
  public fetchstudentdetails<T>(id: string): Observable<T> {
    return this.http.get<T>(this.fetchstudentdetail + id);
  }
  public updatestudentdetails<T>(id: number, itemToUpdate: T): Observable<T> {
    return this.http.put<T>(this.updatestudentdetail + id, itemToUpdate);
  }
  public deletestudentdetails<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.deletestudentdetail + id);
  }


  //trips api
  public getCurrentPostionTrips<T>(id: string): Observable<T> {
    return this.http.get<T>(this.getCurrentPostionTrip + id + '/position');
  }

  public currentTripLists<T>(): Observable<T> {
    return this.http.get<T>(this.currentTripList);
  }
  public historyTripLists<T>(): Observable<T> {
    return this.http.get<T>(this.hitoryTripList);
  }

  public fetchTripdetails<T>(id: string): Observable<T> {
    return this.http.get<T>(this.fetchTripdetail + id);
  }

  public reachedtrips<T>(trip_id: string, wpid: string, data: T): Observable<T> {
    return this.http.put<T>(this.reachedtripsDetail + trip_id + "/waypoints/" + wpid + "/reach-stop", data);
  }

  public leftTrips<T>(trip_id: string, wpid: string, data: T): Observable<T> {
    return this.http.put<T>(this.leftTripsDetail + trip_id + "/waypoints/" + wpid + "/leave-stop", data);
  }

  public endTrips<T>(trip_id: string, data: T): Observable<T> {
    return this.http.put<T>(this.endTripsDetail + trip_id + "/end-trip", data);
  }

  public terminateTrips<T>(trip_id: string, data: T): Observable<T> {
    return this.http.put<T>(this.terminateTripsDetail + trip_id + "/terminate-trip", data);
  }



  public gradeandmonths<T>(id: number): Observable<T> {
    return this.http.get<T>(this.gradeandmonth + id);
  }

  /**
   * Dashboard Charts
   */
  public getChartData<T>(sid: number, cpos: number): Observable<T> {
    if (cpos < this.chartapis.length)
      return this.http.get<T>(this.chartapis[cpos] + sid);
    else {
      return this.http.get<T>(this.chartapis[0] + sid);
    }
  }

  /**
   * bulkupload
   *
   */
  public bulkuploadlog<T>(itemName: T): Observable<T> {
    return this.http.post<T>(this.bulkupload, itemName);
  }
}
@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.headers.has("Content-Type")) {
      req = req.clone({
        headers: req.headers.set("Content-Type", "application/json")
      });
    }
    req = req.clone({ headers: req.headers.set("Accept", "application/json") });
    return next.handle(req);
  }
}

export class Constant {
  Server = "https://sjrb3ed89j.execute-api.ap-south-1.amazonaws.com/Prod/";
  ApiUrl = "api/";
  ServerWithApiUrl: string = this.Server + this.ApiUrl;
  public cognitoconfig = {
    Auth: {
      identityPoolId: "ap-south-1:93d2e200-af68-4de4-a29a-daced7c9977a", // Amazon Cognito Identity Pool ID us-east-1_XYZPQRS
      region: "AP_SOUTH_1", // Amazon Cognito Region
      userPoolId: "ap-south-1_NJso3yHdO",
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolWebClientId: "54ng1i3fm0i0n6h1nvda2nhur3",
      // OPTIONAL - Amazon Cognito Web Client ID
      oauth: {
        domain: "cynosureadmin.auth.ap-south-1.amazoncognito.com",
        // Authorized scopes
        scope: ["email", "openid"],
        // Callback URL
        redirectSignIn: "https://cynosure.protrology.com/",
        // Sign out URL
        redirectSignOut: "https://cynosure.protrology.com/",
        // 'code' for Authorization code grant,
        // 'token' for Implicit grant
        responseType: "code",
        // optional, for Cognito hosted ui specified options
        options: {
          // Indicates if the data collection is enabled to support Cognito advanced security features.
          // By default, this flag is set to true.
          AdvancedSecurityDataCollectionFlag: true
        }
      }
    },
    Storage: {
      bucket: "cynosurebulkupload",
      region: "AP_SOUTH_1",
      accessKeyId: "AKIAJFHAJSQJIC2BLY2Q",
      secretAccessKey: "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"
    }
  };
}
