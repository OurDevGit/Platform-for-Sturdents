import { SchoolsService } from "./../../schools.service";
import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
  Inject,
  Injectable
} from "@angular/core";
import { ResizeService } from "../../resize/resize.service";
import { TranslateService } from "@ngx-translate/core";
import { routerTransition } from "../../utils/page.animation";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Auth } from "aws-amplify";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import Amplify from "aws-amplify";
// import { Constant } from "./../../Constant";
// import { setInterval } from 'timers';

/**
 * This page wraps all other pages in application, it contains header, side menu and router outlet for child pages
 */
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
  animations: [routerTransition],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements OnInit {
  // Model for side menu
  school_name: string;

  user_names: string;

  user_details: any;
  title_prod = "School Management";
  title_mnu = "School";
  user_name: string;
  schoollist_t: any;
  accesslist: any;

  event: MouseEvent;
  clientX = 0;
  clientY = 0;
  timeLeft: number;
  interval;

  menuModel = [
    {
      title: "School Dashboard",
      routerUrl: "/School/dashboard",
      iconClass: "material-icons",
      iconCode: "dashboard"
    },

    {
      title: "Academic Group",
      iconClass: "material-icons",
      iconCode: "business",
      children: [
        {
          title: "Manage  Group",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/academicgroup"
        },
        {
          title: "Create  Group",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/newacademicgroup"
        }
      ]
    },
    {
      title: "Calendar",
      iconClass: "material-icons",
      iconCode: "event_availab",
      children: [
        {
          title: "Manage Calendar",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/calendar"
        },
        {
          title: "Create Calendar",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/newcalendar"
        }
      ]
    },
    {
      title: "Student ",
      iconClass: "material-icons",
      iconCode: "school",
      children: [
        {
          title: "Manage Student",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/student"
        },
        {
          title: "Create Student",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/newstudent"
        }
      ]
    },
    {
      title: "Parent",
      iconClass: "material-icons",
      iconCode: "people",
      children: [
        {
          title: "Manage Parent",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/parent"
        },
        {
          title: "Create Parent",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/newparent"
        }
      ]
    },
    {
      title: "STUDENT & PARENT ASSIGNMENT",
      iconClass: "material-icons",
      iconCode: "people",
      children: [
        {
          title: "Manage ASSIGNMENT",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/psassign"
        }
       
      ]
    },
    {
      title: "RFID",
      iconClass: "material-icons",
      iconCode: "business",
      children: [
        {
          title: "Manage RFID",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/rfid"
        },
        {
          title: "Create RFID",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/newrfid"
        }
      ]
    },

    {
      title: "Master Table",
      iconClass: "material-icons",
      iconCode: "content_paste",
      children: [
        {
          title: "Class",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/grade"
        }
      ]
    },
    {
      title: "Bulk Upload",
      iconClass: "material-icons",
      iconCode: "backup",
      children: [
        {
          title: "Combined bulk upload",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/allinone"
        }
      ]
    },
    {
      title: "Activities",
      iconClass: "material-icons",
      iconCode: "accessibility",
      children: [
        {
          title: "Activities List",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/activities"
        },
        {
          title: "Bulk Upload History",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/bulkhistory"
        }
      ]
    },
    {
      title: "Transport Module",
      iconClass: "material-icons",
      iconCode: "directions_bus",
      children: [
        {
          title: "Devices",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/listdevices"
        },
        {
          title: "Drivers",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/listdrives"
        },
        {
          title: "Vehicles",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/listvehicles"
        },
        {
          title: "Routes",
          iconClass: "material-icons",
          // iconCode: 'work',
          routerUrl: "/School/routelist"
        },
        {
          title: "Student & Route",
          iconClass: "material-icons",
          // iconCode: 'directions_bus',
          routerUrl: "/School/studentroutes"
        },    
        {
          title: "Trips",
          iconClass: "material-icons",
          iconCode: 'directions_bus',          
          // routerUrl: "/School/listtrips"
          children: [
            {
              title: 'Current Trips',
              iconClass: 'material-icons',
              // iconCode: '',
              routerUrl: '/School/currenttrips'
            },
            {
              title: 'Historial trips',
              iconClass: 'material-icons',
              // iconCode: '',
              routerUrl: '/School/historytrips'
            }
          ]
        },
        // {
        //   title: "WayPoints",
        //   iconClass: "material-icons",
        //   // iconCode: 'work',
        //   routerUrl: "/School/waypointslist"
        // },
      ]
    },
    {
    
    title: "Driver App",
    iconClass: "material-icons",
    iconCode: "directions_bus",
    children: [
      // {
      //   title: "Login",
      //   iconClass: "material-icons",
      //   // iconCode: 'work',
      //   routerUrl: "/School/driverlogin"
      // },
      {
        title: "Dashboard",
        iconClass: "material-icons",
        // iconCode: 'work',
        routerUrl: "/School/driverdashboard"
      },
      {
        title: "Mark Location",
        iconClass: "material-icons",
        // iconCode: 'work',
        routerUrl: "/School/drivermarklocation"
      }
    
    ]
  }
  ];
  // Side menu options
  isSmallMenuMode = false;
  isMenuCollapsed = false;
  selectedschoolid: number;
  isMenuClosed = this.isSmallWidth();
  isOverlayMenuMode = this.isSmallWidth();
  // Side menu animation value. Is used for delay to render content after side panel changes
  sideNavTransitionDuration = 300;
  // Open/close options window
  isOptionsClosed = true;
  // Box layout option
  isBoxedLayout = false;
  // Fixed header option
  isFixedHeader = true;
  is_cynosure: boolean;
  numberofschools: number;
  numberofuser: number;
  numberofschools0user = 0;
  numberofuer0schools = 0;
  can_showschooldrop: boolean;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public SchoolsService: SchoolsService,
    private resizeService: ResizeService,
    translateService: TranslateService,
    private router: Router,
    public schools: SchoolsService,
    private route: ActivatedRoute
  ) {
    let u_type = this.getFromLocal("user_type");
    this.selectedschoolid = 0;
    this.can_showschooldrop = true;
    Amplify.configure(SchoolsService.cognitoconfig);

    Auth.currentAuthenticatedUser()
      .then(user => {

        this.saveInLocal("user_name", user.attributes.name);
        this.user_details = this.getFromLocal("User_detailss");
        if (u_type == 1) {
          this.user_name = this.getFromLocal("UserName");
          this.user_names = this.user_details.first_name;
        } else {
          this.user_name = this.user_details.first_name;
          this.user_names = this.user_details.first_name;
        }
      })
      .catch(err => {
        if (err === "not authenticated") {
          this.router.navigate([""]);
        }
      });

    if (u_type === 2) {
      this.can_showschooldrop = false;
      this.title_prod = "Cynosure Administration Module";
      this.title_mnu = "Cynosure";
      this.menuModel = [
        {
          title: "Cynosure Dashboard",
          routerUrl: "/main/dashboard",
          iconClass: "material-icons",
          iconCode: "dashboard"
        },
        {
          title: "School Management",
          iconClass: "material-icons",
          iconCode: "business",
          children: [
            {
              title: "Manage School",
              iconClass: "material-icons",
              // iconCode: 'work',
              routerUrl: "/main/schoolmanagement"
            },
            {
              title: "Create School",
              iconClass: "material-icons",
              // iconCode: 'work',
              routerUrl: "/main/addschool"
            }
          ]
        },
        {
          title: "User Management",
          iconClass: "material-icons",
          iconCode: "group",
          children: [
            {
              title: "All Users",
              iconClass: "material-icons",
              // iconCode: 'work',
              routerUrl: "/main/usermanagements"
            },
            {
              title: "Cynosure Users",
              iconClass: "material-icons",
              // iconCode: 'work',
              routerUrl: "/main/assignusertocynosure"
            },
            {
              title: "School Admin users",
              iconClass: "material-icons",
              // iconCode: 'work',
              routerUrl: "/main/noncynosureuser"
            },
            {
              title: "Create Cynosure user",
              iconClass: "material-icons",
              // iconCode: 'work',
              routerUrl: "/main/createcynosureuser"
            },
            {
              title: "User Roles",
              iconClass: "material-icons",
              // iconCode: 'work',
              routerUrl: "/main/rolllist"
            }
          ]
        },
        {
          title: "School Users",
          iconClass: "material-icons",
          iconCode: "school",
          children: [
            {
              title: "School & Admin Link",
              iconClass: "material-icons",
              // iconCode: 'work',
              routerUrl: "/main/viewuserschool"
            },
            {
              title: "Create School User",
              iconClass: "material-icons",
              // iconCode: 'work',
              routerUrl: "/main/createschooluser"
            },
            {
              title: "Create User to school",
              iconClass: "material-icons",
              // iconCode: 'work',
              routerUrl: "/main/assignusertoschool"
            }
          ]
        }
      ];
    } else {
      this.getuserschoollist(this.getFromLocal("userid"));
    }

    this.onResize();
    // this language will be used as a fallback when a translation isn't found in the current language
    translateService.setDefaultLang("en");

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translateService.use("en");
  }

  onEvent(event: MouseEvent): void {
    this.event = event;
  }

  // coordinates(event: MouseEvent): void {
  //   clearInterval(this.interval);
  //   this.startTimer();
  //   this.timeLeft = 1;
  //   this.clientX = event.clientX;
  //   this.clientY = event.clientY;
  // }
  // startTimer() {
  //   this.interval = setInterval(() => {
  //     if (this.timeLeft === 1) {
  //       alert("Timeout");
  //       this.router.navigate([""]);
  //       this.timeLeft = 0;
  //     }
  //   }, 1000 * 300);
  // }

  public onChangeschoolselected(event): void {
    // event will give you full breif of action
    const newVal = event.target.value;
    this.saveInLocal("selected_school_id", newVal);
    for (var i = 0; i < this.schoollist_t.length; i++) {
      if (this.schoollist_t[i].id === newVal) {
        this.saveInLocal(
          "selected_school_timezone",
          this.schoollist_t[i].timeZone
        );
        break;
      }
    }
    this.selectedschoolid = newVal;
    window.location.reload();
    for (let a = 0; a < this.schoollist_t.length; a++) {
      if (this.schoollist_t[a].id == newVal) {
        this.saveInLocal("UserName", this.schoollist_t[a].schoolName);
        this.user_name = this.getFromLocal("UserName");
      }
    }
  }

  getuserschoollist(userid: string) {
    this.schools.getschoollistforUsers<any>(userid).subscribe(
      (data: any) => {
        if (data != null) {
          if (data.length != 0) {
            this.schoollist_t = data;
            let sel = this.getFromLocal("selected_school_id");
            if (sel == -1) {
              this.saveInLocal("selected_school_id", this.schoollist_t[0].id);
              this.saveInLocal(
                "selected_school_timezone",
                this.schoollist_t[0].timeZone
              );

              this.selectedschoolid = this.schoollist_t[0].id;
              this.saveInLocal("UserName", this.schoollist_t[0].schoolName);
              this.user_name = this.getFromLocal("UserName");
            } else {
              this.selectedschoolid = sel;
            }
          } else {
            this.router.navigate(["404"]);
          }
        } else {
          this.router.navigate(["404"]);
        }
      },
      error => {
        /* can provide allert for error on the api */
        this.router.navigate(["404"]);
      },
      () => {}
    );
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }

  logoutuser() {
    Auth.signOut()
      .then(data => {
      })
      .catch(err => console.log(err));
      this.router.navigate([""]);
  }
  /**
   * Window resize listener
   */
  @HostListener("window:resize", ["$event"])
  onResize() {
    this.resizeService.resizeInformer$.next();
    if (this.isSmallWidth()) {
      this.isOverlayMenuMode = true;
      this.isMenuClosed = true;
      setTimeout(
        () => this.resizeService.resizeInformer$.next(),
        this.sideNavTransitionDuration + 700
      );
    }
  }

  /**
   * Call resize service after side panel mode changes
   */
  onSideNavModeChange() {
    setTimeout(() => {
      this.resizeService.resizeInformer$.next();
    }, this.sideNavTransitionDuration);
  }

  ngOnInit(): void {}

  /**
   * Call resize service after box mode changes
   */
  toggleBoxed() {
    this.isBoxedLayout = !this.isBoxedLayout;
    setTimeout(() => {
      this.resizeService.resizeInformer$.next();
    }, 0);
  }

  toggleCompactMenu() {
    this.isSmallMenuMode = !this.isSmallMenuMode;
    setTimeout(() => {
      this.resizeService.resizeInformer$.next();
    }, this.sideNavTransitionDuration);
  }

  /**
   * Call resize service after side panel mode changes
   */
  toggleOverlayMode() {
    this.isOverlayMenuMode = !this.isOverlayMenuMode;
    setTimeout(() => {
      this.resizeService.resizeInformer$.next();
    }, this.sideNavTransitionDuration);
  }

  /**
   * Changes header mode
   */
  toggleFixedHeader() {
    this.isFixedHeader = !this.isFixedHeader;
  }

  /**
   * Return url as state, that will trigger animation when url changes
   * @param outlet
   * @returns {string}
   */
  getState(outlet) {
    return this.router.url;
  }

  private isSmallWidth() {
    return window.innerWidth < 700;
  }
}
