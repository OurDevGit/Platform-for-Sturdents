import { Component, HostBinding, ViewEncapsulation } from "@angular/core";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Auth } from "aws-amplify";
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component


declare let ga: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  event: MouseEvent;
  clientX = 0;
  clientY = 0;
  timeLeft: number;
  interval;

  // When this field is set true, it removes class from root component. That causes pre loader to be removed.
  @HostBinding("class.loading") loading = false;

  constructor(public router: Router, private bnIdle: BnNgIdleService ) {

    this.bnIdle.startWatching(300).subscribe((res) => {
      if(res) { 
        localStorage.clear();
        this.router.navigate(['/'])
      }
    })

  }

  onEvent(event: MouseEvent): void {
    this.event = event;
  }
  coordinates(event: MouseEvent): void {
    if (this.clientX === event.clientX && this.clientY === event.clientY) {
      this.startTimer();
      this.timeLeft = 1;
    }
    this.clientX = event.clientX;
    this.clientY = event.clientY;
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft === 1) {
        this.router.navigate(["/login"]);
        this.timeLeft = 0;
      }
    }, 1000 * 30);
  }

}


