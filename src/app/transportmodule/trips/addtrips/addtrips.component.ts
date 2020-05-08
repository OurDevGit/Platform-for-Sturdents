import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { AgmCoreModule } from "@agm/core";

@Component({
  selector: 'app-addtrips',
  templateUrl: './addtrips.component.html',
  styleUrls: ['./addtrips.component.scss']
})

@NgModule({
  imports:[
    BrowserModule,
  ],
  providers: [],
  declarations: [  ],
  bootstrap: [  ]
})

export class AddtripsComponent implements OnInit {

  lat = 51.678418;
  lng = 7.809007;
  showdisplay:any;
  
  constructor() { }

  ngOnInit() {
  }  

}



