import { UpdateparentComponent } from "./Schoolmanagementsystem/updateparent/updateparent.component";
// import { Constant } from "./Constant";
import { ExportExcellService } from "./export-excell.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Component } from "@angular/core";
import { MomentModule } from "angular2-moment";
import { AppComponent } from "./app.component";
import { MultimenuComponent } from "./components/multimenu/multimenu.component";
import { AppRoutesModule } from "./routes/app-routes.module";
import { DashboardPageComponent } from "./pages/dashboard-page/dashboard-page.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TypographyPageComponent } from "./pages/typography-page/typography-page.component";
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule
} from "ngx-perfect-scrollbar";
import { NgbButtonsModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ResizeService } from "./resize/resize.service";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { NgxGalleryModule } from "ngx-gallery";
import { AgmCoreModule } from "@agm/core";
import { TextMaskModule } from "angular2-text-mask";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SchoolmanagementComponent } from "./schoolmanagement/schoolmanagement.component";
import { UsermanagementComponent } from "./usermanagement/usermanagement.component";
import { AddschoolComponent } from "./addschool/addschool.component";
import { AssignusertoschoolComponent } from "./assignusertoschool/assignusertoschool.component";
import { AdduserComponent } from "./adduser/adduser.component";
import { ApiIntegService } from "./api-integ.service";
import { HttpModule } from "@angular/http";
import { SchoolsService } from "./schools.service";
import { UpdateschoolComponent } from "./updateschool/updateschool.component";
import { UpdateuserComponent } from "./updateuser/updateuser.component";
import { ViewschooluserComponent } from "./viewschooluser/viewschooluser.component";
import { ForgotpswdComponent } from "./pages/forgotpswd/forgotpswd.component";
import { ChangepaswordComponent } from "./pages/changepasword/changepasword.component";
import { StorageServiceModule } from "angular-webstorage-service";
import { ForgotresetComponent } from "./pages/forgotreset/forgotreset.component";
import { AssignusertocynosureComponent } from "./assignusertocynosure/assignusertocynosure.component";
import { ViewcynosureuserComponent } from "./viewcynosureuser/viewcynosureuser.component";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { NumberofschoolswithoutusersComponent } from "./numberofschoolswithoutusers/numberofschoolswithoutusers.component";
import { NumberofuserswithoutschoolsComponent } from "./numberofuserswithoutschools/numberofuserswithoutschools.component";
import { FilterPipeModule } from "ngx-filter-pipe";
import { CalendarComponent } from "./Schoolmanagementsystem/calendar/calendar.component";
import { StudentComponent } from "./Schoolmanagementsystem/student/student.component";
import { ParentComponent } from "./Schoolmanagementsystem/parent/parent.component";
import { RFIDComponent } from "./Schoolmanagementsystem/rfid/rfid.component";
import { AcademicgroupComponent } from "./Schoolmanagementsystem/academicgroup/academicgroup.component";
import { NewacademicgroupComponent } from "./Schoolmanagementsystem/newacademicgroup/newacademicgroup.component";
import { NewcalendarComponent } from "./Schoolmanagementsystem/newcalendar/newcalendar.component";
import { NewparentComponent } from "./Schoolmanagementsystem/newparent/newparent.component";
import { NewrfidComponent } from "./Schoolmanagementsystem/newrfid/newrfid.component";
import { NewschoolComponent } from "./Schoolmanagementsystem/newschool/newschool.component";
import { NewstudentComponent } from "./Schoolmanagementsystem/newstudent/newstudent.component";
import { AcademicgroupbulkuploadComponent } from "./Schoolmanagementsystem/academicgroupbulkupload/academicgroupbulkupload.component";
import { UpdateacademicComponent } from "./Schoolmanagementsystem/updateacademic/updateacademic.component";
import { UpdatestudentComponent } from "./Schoolmanagementsystem/updatestudent/updatestudent.component";
import { UpdaterfidComponent } from "./Schoolmanagementsystem/updaterfid/updaterfid.component";
import { UpdatecalendarComponent } from "./Schoolmanagementsystem/updatecalendar/updatecalendar.component";
import { DataviewComponent } from "./Schoolmanagementsystem/dataview/dataview.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { DashboardtComponent } from "./pages/dashboardt/dashboardt.component";
import { ViewcalendarComponent } from "./Schoolmanagementsystem/viewcalendar/viewcalendar.component";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { AcademicviewComponent } from "./Schoolmanagementsystem/academicview/academicview.component";
import { StudentviewComponent } from "./Schoolmanagementsystem/studentview/studentview.component";
import { ParentviewComponent } from "./Schoolmanagementsystem/parentview/parentview.component";
import { RfidviewComponent } from "./Schoolmanagementsystem/rfidview/rfidview.component";
import { LineChartPageComponent } from "./pages/line-chart-page/line-chart-page.component";
import { HeatMapPageComponent } from "./pages/heat-map-page/heat-map-page.component";
import { PieChartPageComponent } from "./pages/pie-chart-page/pie-chart-page.component";
import { BubbleChartPageComponent } from "./pages/bubble-chart-page/bubble-chart-page.component";
import { RadarPageComponent } from "./pages/radar-page/radar-page.component";
import { BarchartPageComponent } from "./pages/barchart-page/barchart-page.component";
import { ViewacadamicdetailsComponent } from "./Schoolmanagementsystem/viewacadamicdetails/viewacadamicdetails.component";
import { ViewstudentsComponent } from "./Schoolmanagementsystem/viewstudents/viewstudents.component";
import { ViewparentsComponent } from "./Schoolmanagementsystem/viewparents/viewparents.component";
import { AddstudentparentComponent } from "./Schoolmanagementsystem/addstudentparent/addstudentparent.component";
import { ViewstudentparentComponent } from "./Schoolmanagementsystem/viewstudentparent/viewstudentparent.component";
import { EditstudentparentComponent } from "./Schoolmanagementsystem/editstudentparent/editstudentparent.component";
import { ListstudentparentComponent } from "./Schoolmanagementsystem/liststudentparent/liststudentparent.component";
import { StartClassComponent } from "./master/start-class/start-class.component";
import { GradeComponent } from "./master/grade/grade.component";
import { SendMailComponent } from "./mail/send-mail/send-mail.component";
import { ViewchartsComponent } from "./charts/viewcharts/viewcharts.component";
import { StudentbulkComponent } from "./Schoolmanagementsystem/studentbulk/studentbulk.component";
import { ParentbulkComponent } from "app/Schoolmanagementsystem/bulkupload/parentbulk/parentbulk.component";
import { RfidbulkComponent } from "app/Schoolmanagementsystem/bulkupload/rfidbulk/rfidbulk.component";
import { StudentbulksComponent } from "./Schoolmanagementsystem/bulkupload/studentbulks/studentbulks.component";

import { Ng2SearchPipeModule } from "ng2-search-filter"; //importing the module
import { Ng2OrderModule } from "ng2-order-pipe"; //importing the module
import { NgxPaginationModule } from "ngx-pagination";
import { RolllistComponent } from "./adminmodule/rolllist/rolllist.component";
import { RollpermissionComponent } from "./adminmodule/rollpermission/rollpermission.component";
import { PermissionComponent } from "./adminmodule/permission/permission.component"; // <-- import the module
import { DataTableModule } from "angular-6-datatable";
import { EcochartsComponent } from "./ecocharts/ecocharts.component";
import { ActiviesComponent } from "./Schoolmanagementsystem/activies/activies.component";
import { CreatecynosureuseComponent } from "./adminmodule/createcynosureuse/createcynosureuse.component";
import { CreateschooluserComponent } from "./adminmodule/createschooluser/createschooluser.component";
import { AllinonebulkComponent } from "./Schoolmanagementsystem/allinonebulk/allinonebulk.component";
import { NoncynosureuserComponent } from "./noncynosureuser/noncynosureuser.component";

import { ChartsModule } from "ng2-charts";
import { BlukuploadlogComponent } from "./Schoolmanagementsystem/blukuploadlog/blukuploadlog.component";
import { BulkUploadActivityHistoryComponent } from "./Schoolmanagemantsystem/bulk-upload-activity-history/bulk-upload-activity-history.component";
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from "@angular/common";
import { ChartsModule as Ng2Charts } from "ng2-charts";
import { NgSelectModule, NgOption } from "@ng-select/ng-select";
import { StudentpromodeComponent } from "./Schoolmanagementsystem/bulkupload/studentpromode/studentpromode.component";

import { ViewUsersOfSchoolComponent } from "./view-users-of-school/view-users-of-school.component";
import { CynosureDateTimeZonePipe } from './pipes/cynosure-date-time-zone.pipe';
import { AdddriversComponent } from './transportmodule/driver/adddrivers/adddrivers.component';
import { ViewdriversComponent } from './transportmodule/driver/viewdrivers/viewdrivers.component';
import { UpdatedriversComponent } from './transportmodule/driver/updatedrivers/updatedrivers.component';
import { ListDriversComponent } from './transportmodule/driver/list-drivers/list-drivers.component';
import { AddvehiclesComponent } from './transportmodule/vehicle/addvehicles/addvehicles.component';
import { ViewvehiclesComponent } from './transportmodule/vehicle/viewvehicles/viewvehicles.component';
import { UpdatevehiclesComponent } from './transportmodule/vehicle/updatevehicles/updatevehicles.component';
import { ListvehiclesComponent } from './transportmodule/vehicle/listvehicles/listvehicles.component';
import { AdddevicesComponent } from './transportmodule/devices/adddevices/adddevices.component';
import { ViewdevicesComponent } from './transportmodule/devices/viewdevices/viewdevices.component';
import { UpdatedevicesComponent } from './transportmodule/devices/updatedevices/updatedevices.component';
import { ListdevicesComponent } from './transportmodule/devices/listdevices/listdevices.component';
import { AddtripsComponent } from './transportmodule/trips/addtrips/addtrips.component';
import { ViewtripsComponent } from './transportmodule/trips/viewtrips/viewtrips.component';
import { UpdatetripsComponent } from './transportmodule/trips/updatetrips/updatetrips.component';
import { ListtripsComponent } from './transportmodule/trips/listtrips/listtrips.component';
import { AddwaypointsComponent } from './transportmodule/waypoint/addwaypoints/addwaypoints.component';
import { ViewwaypointsComponent } from './transportmodule/waypoint/viewwaypoints/viewwaypoints.component';
import { UpdatewaypointsComponent } from './transportmodule/waypoint/updatewaypoints/updatewaypoints.component';
import { ListwaypointsComponent } from './transportmodule/waypoint/listwaypoints/listwaypoints.component';
import { ListroutesComponent } from './transportmodule/route/listroutes/listroutes.component';
import { ViewroutesComponent } from './transportmodule/route/viewroutes/viewroutes.component';
import { UpdateroutesComponent } from './transportmodule/route/updateroutes/updateroutes.component';
import { AddroutesComponent } from './transportmodule/route/addroutes/addroutes.component';
import { AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import { AcadamicGroupNameComponentComponent } from './acadamic-group-name-component/acadamic-group-name-component.component';
import { AcadamicGroupNameComponent } from "./master/acadamic-group-name/acadamic-group-name.component";
import { LoginComponent } from './driver-trips/login/login.component';
import { DashboardComponent } from './driver-trips/dashboard/dashboard.component';
import { MarkLocationComponent } from './driver-trips/mark-location/mark-location.component';
import { ViewTripComponent } from './driver-trips/view-trip/view-trip.component';
import { ListstudentrouteComponent } from './transportmodule/student-route/liststudentroute/liststudentroute.component';
import { ViewstudentrouteComponent } from './transportmodule/student-route/viewstudentroute/viewstudentroute.component';
import { UpdatestudentrouteComponent } from './transportmodule/student-route/updatestudentroute/updatestudentroute.component';
import { AddstudentrouteComponent } from './transportmodule/student-route/addstudentroute/addstudentroute.component';
import { CurrenttripsComponent } from './transportmodule/trips/currenttrips/currenttrips.component';
import { HistorytripsComponent } from './transportmodule/trips/historytrips/historytrips.component';
import { CurrentdetailtripComponent } from './transportmodule/trips/currentdetailtrip/currentdetailtrip.component';

import { AgmDirectionModule } from 'agm-direction';
import { PsassignComponent } from './Schoolmanagementsystem/psassign/psassign.component';

import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// AoT requires an exported function for factories for translate module
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    MultimenuComponent,
    DashboardPageComponent,
    TypographyPageComponent,
    LoginPageComponent,
    MainPageComponent,
    RegisterPageComponent,
    NotFoundPageComponent,
    SchoolmanagementComponent,
    UsermanagementComponent,
    AddschoolComponent,
    AssignusertoschoolComponent,
    AdduserComponent,
    UpdateschoolComponent,
    UpdateuserComponent,
    ViewschooluserComponent,
    ForgotpswdComponent,
    ChangepaswordComponent,
    ForgotresetComponent,
    AcadamicGroupNameComponent,
    AssignusertocynosureComponent,
    ViewcynosureuserComponent,
    NumberofschoolswithoutusersComponent,
    NumberofuserswithoutschoolsComponent,
    CalendarComponent,
    StudentComponent,
    ParentComponent,
    RFIDComponent,
    AcademicgroupComponent,
    NewacademicgroupComponent,
    NewcalendarComponent,
    NewparentComponent,
    NewrfidComponent,
    NewschoolComponent,
    NewstudentComponent,
    AcademicgroupbulkuploadComponent,
    UpdateacademicComponent,
    UpdateparentComponent,
    UpdatestudentComponent,
    UpdaterfidComponent,
    UpdatecalendarComponent,
    DataviewComponent,
    DashboardtComponent,
    ViewcalendarComponent,
    AcademicviewComponent,
    StudentviewComponent,
    ParentviewComponent,
    RfidviewComponent,
    HeatMapPageComponent,
    LineChartPageComponent,
    PieChartPageComponent,
    BubbleChartPageComponent,
    RadarPageComponent,
    BarchartPageComponent,
    ViewacadamicdetailsComponent,
    ViewstudentsComponent,
    ViewparentsComponent,
    ParentbulkComponent,
    RfidbulkComponent,
    AddstudentparentComponent,
    ViewstudentparentComponent,
    EditstudentparentComponent,
    ListstudentparentComponent,
    StartClassComponent,
    GradeComponent,
    SendMailComponent,
    ViewchartsComponent,
    StudentbulkComponent,
    StudentbulksComponent,

    RolllistComponent,
    RollpermissionComponent,
    PermissionComponent,
    EcochartsComponent,
    ActiviesComponent,
    CreatecynosureuseComponent,
    CreateschooluserComponent,
    AllinonebulkComponent,
    NoncynosureuserComponent,

    BlukuploadlogComponent,
    BulkUploadActivityHistoryComponent,
    StudentpromodeComponent,

    ViewUsersOfSchoolComponent,
    CynosureDateTimeZonePipe,
    AdddriversComponent,
    ViewdriversComponent,
    UpdatedriversComponent,
    ListDriversComponent,
    AddvehiclesComponent,
    ViewvehiclesComponent,
    UpdatevehiclesComponent,
    ListvehiclesComponent,
    AdddevicesComponent,
    ViewdevicesComponent,
    UpdatedevicesComponent,
    ListdevicesComponent,
    AddtripsComponent,
    ViewtripsComponent,
    UpdatetripsComponent,
    ListtripsComponent,
    AddwaypointsComponent,
    ViewwaypointsComponent,
    UpdatewaypointsComponent,
    ListwaypointsComponent,
    ListroutesComponent,
    ViewroutesComponent,
    UpdateroutesComponent,
    AddroutesComponent,
    AcadamicGroupNameComponentComponent,
    LoginComponent,
    DashboardComponent,
    MarkLocationComponent,
    ViewTripComponent,
    ListstudentrouteComponent,
    ViewstudentrouteComponent,
    UpdatestudentrouteComponent,
    AddstudentrouteComponent,
    CurrenttripsComponent,
    HistorytripsComponent,
    CurrentdetailtripComponent,
    PsassignComponent
  ],
  imports: [
    BrowserModule,
    AngularMultiSelectModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    BrowserModule,

    ChartsModule, //charts
    Ng2SearchPipeModule, //including into imports
    Ng2OrderModule, // importing the sorting package here
    NgxPaginationModule,
    DataTableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    RouterModule,
    AppRoutesModule,
    NgbModule.forRoot(),
    NgbButtonsModule,
    NgxGalleryModule,
    TextMaskModule,
    BrowserAnimationsModule,
    HttpModule,
    MomentModule,
    FilterPipeModule,
    StorageServiceModule,
    MatSelectModule,
    CommonModule,
    Ng2Charts,
    // Insert your google maps api key, if you do not need google map in your project, you can remove this import
    AgmCoreModule.forRoot({
      // apiKey: "AIzaSyDDpfta4q_q8iawodQeNxHiqZNYibMfFeI"
      apiKey: "AIzaSyBhize4VO6Ul3vg63vlCeb94EYeK_Khtbc"
      // apiKey: "AIzaSyAwPiHMOz5Nrx-1rl9umStFDdIZQUfHfrc"
    }),
    AgmDirectionModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    BnNgIdleService,
    SchoolsService,
    ApiIntegService,
    ExportExcellService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ResizeService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
