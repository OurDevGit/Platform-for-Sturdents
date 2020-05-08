import { RfidviewComponent } from "./../Schoolmanagementsystem/rfidview/rfidview.component";
import { StudentviewComponent } from "./../Schoolmanagementsystem/studentview/studentview.component";
import { ParentviewComponent } from "./../Schoolmanagementsystem/parentview/parentview.component";
import { AcademicviewComponent } from "./../Schoolmanagementsystem/academicview/academicview.component";
import { DataviewComponent } from "./../Schoolmanagementsystem/dataview/dataview.component";
import { UpdatecalendarComponent } from "./../Schoolmanagementsystem/updatecalendar/updatecalendar.component";
import { UpdaterfidComponent } from "./../Schoolmanagementsystem/updaterfid/updaterfid.component";
import { UpdateparentComponent } from "./../Schoolmanagementsystem/updateparent/updateparent.component";
import { UpdateacademicComponent } from "./../Schoolmanagementsystem/updateacademic/updateacademic.component";
import { AcademicgroupbulkuploadComponent } from "./../Schoolmanagementsystem/academicgroupbulkupload/academicgroupbulkupload.component";
import { NewstudentComponent } from "./../Schoolmanagementsystem/newstudent/newstudent.component";
import { NewrfidComponent } from "./../Schoolmanagementsystem/newrfid/newrfid.component";
import { NewparentComponent } from "./../Schoolmanagementsystem/newparent/newparent.component";
import { PsassignComponent } from  "app/Schoolmanagementsystem/psassign/psassign.component";
import { NewcalendarComponent } from "./../Schoolmanagementsystem/newcalendar/newcalendar.component";
import { NewacademicgroupComponent } from "./../Schoolmanagementsystem/newacademicgroup/newacademicgroup.component";
import { StudentComponent } from "./../Schoolmanagementsystem/student/student.component";
import { RFIDComponent } from "./../Schoolmanagementsystem/rfid/rfid.component";
import { ParentComponent } from "./../Schoolmanagementsystem/parent/parent.component";
import { CalendarComponent } from "./../Schoolmanagementsystem/calendar/calendar.component";
import { AcademicgroupComponent } from "../Schoolmanagementsystem/academicgroup/academicgroup.component";
import { ViewschooluserComponent } from "./../viewschooluser/viewschooluser.component";
import { UpdateschoolComponent } from "./../updateschool/updateschool.component";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core"; // , Component
import { DashboardPageComponent } from "../pages/dashboard-page/dashboard-page.component";
import { TypographyPageComponent } from "../pages/typography-page/typography-page.component";
import { LoginPageComponent } from "../pages/login-page/login-page.component";
import { MainPageComponent } from "../pages/main-page/main-page.component";
import { RegisterPageComponent } from "../pages/register-page/register-page.component";
import { NotFoundPageComponent } from "../pages/not-found-page/not-found-page.component";
import { SchoolmanagementComponent } from "../schoolmanagement/schoolmanagement.component";
import { UsermanagementComponent } from "../usermanagement/usermanagement.component";
import { AddschoolComponent } from "../addschool/addschool.component";
import { AssignusertoschoolComponent } from "../assignusertoschool/assignusertoschool.component";
import { AdduserComponent } from "../adduser/adduser.component";
import { UpdateuserComponent } from "../updateuser/updateuser.component";
import { ForgotpswdComponent } from "../pages/forgotpswd/forgotpswd.component";
import { ForgotresetComponent } from "../pages/forgotreset/forgotreset.component";
import { ChangepaswordComponent } from "../pages/changepasword/changepasword.component";
import { NumberofschoolswithoutusersComponent } from "../numberofschoolswithoutusers/numberofschoolswithoutusers.component";
import { NumberofuserswithoutschoolsComponent } from "../numberofuserswithoutschools/numberofuserswithoutschools.component";
import { UpdatestudentComponent } from "../Schoolmanagementsystem/updatestudent/updatestudent.component";
// import { DashboardtComponent } from "../pages/dashboardt/dashboardt.component";
import { ViewcalendarComponent } from "../Schoolmanagementsystem/viewcalendar/viewcalendar.component";
import { AssignusertocynosureComponent } from "app/assignusertocynosure/assignusertocynosure.component";
import { ViewacadamicdetailsComponent } from "app/Schoolmanagementsystem/viewacadamicdetails/viewacadamicdetails.component";
import { ViewstudentsComponent } from "app/Schoolmanagementsystem/viewstudents/viewstudents.component";
import { ViewparentsComponent } from "app/Schoolmanagementsystem/viewparents/viewparents.component";
import { AddstudentparentComponent } from "app/Schoolmanagementsystem/addstudentparent/addstudentparent.component";
import { ViewstudentparentComponent } from "app/Schoolmanagementsystem/viewstudentparent/viewstudentparent.component";
import { ListstudentparentComponent } from "app/Schoolmanagementsystem/liststudentparent/liststudentparent.component";
import { EditstudentparentComponent } from "app/Schoolmanagementsystem/editstudentparent/editstudentparent.component";
import { AcadamicGroupNameComponent } from "../master/acadamic-group-name/acadamic-group-name.component";
import { StartClassComponent } from "../master/start-class/start-class.component";
import { GradeComponent } from "../master/grade/grade.component";
import { SendMailComponent } from "app/mail/send-mail/send-mail.component";
import { ViewchartsComponent } from "app/charts/viewcharts/viewcharts.component";
import { StudentbulkComponent } from "app/Schoolmanagementsystem/studentbulk/studentbulk.component";
import { ParentbulkComponent } from "app/Schoolmanagementsystem/bulkupload/parentbulk/parentbulk.component";
import { RfidbulkComponent } from "app/Schoolmanagementsystem/bulkupload/rfidbulk/rfidbulk.component";
import { StudentbulksComponent } from "app/Schoolmanagementsystem/bulkupload/studentbulks/studentbulks.component";
import { RolllistComponent } from "app/adminmodule/rolllist/rolllist.component";
import { RollpermissionComponent } from "app/adminmodule/rollpermission/rollpermission.component";
import { PermissionComponent } from "app/adminmodule/permission/permission.component";
import { BarchartPageComponent } from "app/pages/barchart-page/barchart-page.component";
import { ActiviesComponent } from "app/Schoolmanagementsystem/activies/activies.component";
import { CreatecynosureuseComponent } from "app/adminmodule/createcynosureuse/createcynosureuse.component";
import { CreateschooluserComponent } from "app/adminmodule/createschooluser/createschooluser.component";
import { AllinonebulkComponent } from "app/Schoolmanagementsystem/allinonebulk/allinonebulk.component";
import { NoncynosureuserComponent } from "app/noncynosureuser/noncynosureuser.component";
import { BulkUploadActivityHistoryComponent } from "app/Schoolmanagemantsystem/bulk-upload-activity-history/bulk-upload-activity-history.component";
import { ViewUsersOfSchoolComponent } from "app/view-users-of-school/view-users-of-school.component";
import { ListtripsComponent } from "app/transportmodule/trips/listtrips/listtrips.component";
import { ListdevicesComponent } from "app/transportmodule/devices/listdevices/listdevices.component";
import { ListvehiclesComponent } from "app/transportmodule/vehicle/listvehicles/listvehicles.component";
import { ListDriversComponent } from "app/transportmodule/driver/list-drivers/list-drivers.component";
import { AddtripsComponent } from "app/transportmodule/trips/addtrips/addtrips.component";
import { UpdatetripsComponent } from "app/transportmodule/trips/updatetrips/updatetrips.component";
import { ViewtripsComponent } from "app/transportmodule/trips/viewtrips/viewtrips.component";
import { AdddevicesComponent } from "app/transportmodule/devices/adddevices/adddevices.component";
import { UpdatedevicesComponent } from "app/transportmodule/devices/updatedevices/updatedevices.component";
import { ViewdevicesComponent } from "app/transportmodule/devices/viewdevices/viewdevices.component";
import { AddvehiclesComponent } from "app/transportmodule/vehicle/addvehicles/addvehicles.component";
import { UpdatevehiclesComponent } from "app/transportmodule/vehicle/updatevehicles/updatevehicles.component";
import { ViewvehiclesComponent } from "app/transportmodule/vehicle/viewvehicles/viewvehicles.component";
import { UpdatedriversComponent } from "app/transportmodule/driver/updatedrivers/updatedrivers.component";
import { ViewdriversComponent } from "app/transportmodule/driver/viewdrivers/viewdrivers.component";
import { AdddriversComponent } from "app/transportmodule/driver/adddrivers/adddrivers.component";
import { ListwaypointsComponent } from "app/transportmodule/waypoint/listwaypoints/listwaypoints.component";
import { AddwaypointsComponent } from "app/transportmodule/waypoint/addwaypoints/addwaypoints.component";
import { UpdatewaypointsComponent } from "app/transportmodule/waypoint/updatewaypoints/updatewaypoints.component";
import { ViewwaypointsComponent } from "app/transportmodule/waypoint/viewwaypoints/viewwaypoints.component";
import { ListroutesComponent } from "app/transportmodule/route/listroutes/listroutes.component";
import { UpdateroutesComponent } from "app/transportmodule/route/updateroutes/updateroutes.component";
import { AddroutesComponent } from "app/transportmodule/route/addroutes/addroutes.component";
import { ViewroutesComponent } from "app/transportmodule/route/viewroutes/viewroutes.component";
import { ListstudentrouteComponent } from 'app/transportmodule/student-route/liststudentroute/liststudentroute.component';
import { AddstudentrouteComponent } from 'app/transportmodule/student-route/addstudentroute/addstudentroute.component';
import { ViewstudentrouteComponent } from 'app/transportmodule/student-route/viewstudentroute/viewstudentroute.component';
import { UpdatestudentrouteComponent } from 'app/transportmodule/student-route/updatestudentroute/updatestudentroute.component';
import { CurrenttripsComponent } from 'app/transportmodule/trips/currenttrips/currenttrips.component';
import { HistorytripsComponent } from 'app/transportmodule/trips/historytrips/historytrips.component';
import { CurrentdetailtripComponent } from 'app/transportmodule/trips/currentdetailtrip/currentdetailtrip.component';

import { PieChartPageComponent } from "app/pages/pie-chart-page/pie-chart-page.component";
// import { LineChartPageComponent } from "app/pages/line-chart-page/line-chart-page.component";
import { LoginComponent } from "app/driver-trips/login/login.component";
import { DashboardComponent } from "app/driver-trips/dashboard/dashboard.component";
import { MarkLocationComponent } from "app/driver-trips/mark-location/mark-location.component";
import { ViewTripComponent } from "app/driver-trips/view-trip/view-trip.component";

// Routes model for application. Some of the pages are loaded lazily to increase startup time.
const APP_ROUTES: Routes = [

  {
    path: "School",
    component: MainPageComponent,
    children: [
      { path: "viewcalendar", component: ViewcalendarComponent },
      { path: "academicview", component: AcademicviewComponent },
      { path: "parentview", component: ParentviewComponent },
      { path: "studentview", component: StudentviewComponent },
      { path: "rfidview/:id", component: RfidviewComponent },
      { path: "dashboard", component: ViewchartsComponent },
      { path: "studentbulk", component: StudentbulkComponent },
      { path: "piecharts", component: PieChartPageComponent },
      /**Schoolmanagementsystem Module */
      { path: "academicgroup", component: AcademicgroupComponent },
      { path: "calendar", component: CalendarComponent },
      { path: "parent", component: ParentComponent },
      { path: "rfid", component: RFIDComponent },
      { path: "student", component: StudentComponent },
      { path: "newacademicgroup", component: NewacademicgroupComponent },
      { path: "newcalendar", component: NewcalendarComponent },
      { path: "newparent", component: NewparentComponent },
      { path: "psassign", component:  PsassignComponent},
      { path: "newrfid", component: NewrfidComponent },
      { path: "newstudent", component: NewstudentComponent },
      {
        path: "academicgroupbulkupload",
        component: AcademicgroupbulkuploadComponent
      },
      { path: "updateacademic/:id", component: UpdateacademicComponent },
      { path: "updateparent/:id", component: UpdateparentComponent },
      { path: "updaterfid/:id", component: UpdaterfidComponent },
      { path: "updatestudent/:id", component: UpdatestudentComponent },
      { path: "viewstudent/:id", component: ViewstudentsComponent },
      { path: "activities", component: ActiviesComponent },
      { path: "barchart", component: BarchartPageComponent },
      { path: "updatecalendar/:id", component: UpdatecalendarComponent },
      { path: "dataview", component: DataviewComponent },
      {
        path: "viewacadamicdetails/:id",
        component: ViewacadamicdetailsComponent
      },
      { path: "viewparent/:id", component: ViewparentsComponent },
      { path: "addstudentparent/:id", component: AddstudentparentComponent },
      { path: "studentparentlist", component: ListstudentparentComponent },
      { path: "viewstudentparent/:id", component: ViewstudentparentComponent },
      { path: "editstudentparent/:id", component: EditstudentparentComponent },
      { path: "academic_Name", component: AcadamicGroupNameComponent },
      { path: "sendmail", component: SendMailComponent },
      { path: "class", component: StartClassComponent },
      { path: "grade", component: GradeComponent },
      { path: "studentbulks/:id", component: StudentbulksComponent },
      { path: "allinone", component: AllinonebulkComponent },
      { path: "parentbulk", component: ParentbulkComponent },
      { path: "rfidbulk", component: RfidbulkComponent },
      { path: "bulkhistory", component: BulkUploadActivityHistoryComponent },
      // Trasport Module Routing
      { path: "listtrips", component: ListtripsComponent },
      { path: "addtrips", component: AddtripsComponent },
      { path: "updatetrips/:id", component: UpdatetripsComponent },
      { path: "viewtrips/:id", component: ViewtripsComponent },
      { path: "listdevices", component: ListdevicesComponent },
      { path: "adddevices", component: AdddevicesComponent },
      { path: "updatedevices/:id", component: UpdatedevicesComponent },
      { path: "viewdevices/:id", component: ViewdevicesComponent },
      { path: "listvehicles", component: ListvehiclesComponent },
      { path: "addvehicles", component: AddvehiclesComponent },
      { path: "updatevehicles/:id", component: UpdatevehiclesComponent },
      { path: "viewvehicles/:id", component: ViewvehiclesComponent },
      { path: "listdrives", component: ListDriversComponent },
      { path: "adddrives", component: AdddriversComponent },
      { path: "updatedrives/:id", component: UpdatedriversComponent },
      { path: "viewdrives/:id", component: ViewdriversComponent },
      { path: "waypointslist", component: ListwaypointsComponent },
      { path: "addwaypoints", component: AddwaypointsComponent },
      { path: "updatewaypoints/:id", component: UpdatewaypointsComponent },
      { path: "viewwaypoints/:id", component: ViewwaypointsComponent },
      { path: "routelist", component: ListroutesComponent },
      { path: "addroutues", component: AddroutesComponent },
      { path: "updateroutes/:id", component: UpdateroutesComponent },
      { path: "viewroutes/:id", component: ViewroutesComponent },
      { path: "studentroutes", component: ListstudentrouteComponent },
      { path: "addstudentroutes", component: AddstudentrouteComponent},
      { path: 'viewstudentroutes/:id', component: ViewstudentrouteComponent},
      { path: 'updatestudentroutes/:id', component: UpdatestudentrouteComponent},
      { path: 'currenttrips', component: CurrenttripsComponent},
      { path: 'currenttrips/:id', component: CurrentdetailtripComponent},
      { path: 'currenttripsmap/:id', component: ViewtripsComponent},
      { path: 'historytrips', component: HistorytripsComponent},

      //Driver App Routing
      { path: "driverapplogin", component: LoginComponent },
      { path: "driverdashboard", component: DashboardComponent },
      { path: "driverviewtrip", component: ViewTripComponent },
      { path: "drivermarklocation", component: MarkLocationComponent },
    ]
  },
  {
    path: "main",
    component: MainPageComponent,
    children: [
      /**Admin Module */
      { path: "rolllist", component: RolllistComponent },
      { path: "rollpermission/:id", component: RollpermissionComponent },
      {
        path: "ViewUsersOfSchoolComponent",
        component: ViewUsersOfSchoolComponent
      },
      { path: "permission/:id", component: PermissionComponent },
      { path: "dashboard", component: DashboardPageComponent },
      { path: "schoolmanagement", component: SchoolmanagementComponent },
      { path: "usermanagements", component: UsermanagementComponent },
      { path: "noncynosureuser", component: NoncynosureuserComponent },
      { path: "assignusertoschool", component: AssignusertoschoolComponent },
      { path: "viewuserschool", component: ViewschooluserComponent },
      {
        path: "assignusertocynosure",
        component: AssignusertocynosureComponent
      },
      {
        path: "numberofschoolswithoutusers",
        component: NumberofschoolswithoutusersComponent
      },
      {
        path: "numberofuserswithoutschools",
        component: NumberofuserswithoutschoolsComponent
      },
      { path: "addschool", component: AddschoolComponent },
      { path: "createcynosureuser", component: CreatecynosureuseComponent },
      { path: "createschooluser", component: CreateschooluserComponent },
      { path: "adduser", component: AdduserComponent },
      { path: "schoolmanagement", component: TypographyPageComponent },
      { path: "", component: LoginPageComponent },
      { path: "updateschool/:id", component: UpdateschoolComponent },
      { path: "updateuser/:id", component: UpdateuserComponent },
      { path: "**", redirectTo: "/dashboard" }
    ]
  },
  { path: "mainpage", redirectTo: "/main/dashboard", pathMatch: "full" },
  { path: "School", redirectTo: "/School/dashboard", pathMatch: "full" },
  { path: "usermanage", component: UsermanagementComponent },
  { path: "", component: LoginPageComponent },
  { path: "register", component: RegisterPageComponent },
  { path: "forgotpassword", component: ForgotpswdComponent },
  { path: "forgotreset", component: ForgotresetComponent },
  { path: "changepassword", component: ChangepaswordComponent },
  { path: "404", component: NotFoundPageComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: PreloadAllModules })
  ]
})
export class AppRoutesModule { }
