import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable/release";

@Component({
  selector: "app-component-table-page",
  templateUrl: "./component-table-page.component.html",
  styleUrls: ["./component-table-page.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ComponentTablePageComponent implements OnInit {
  // Table variables
  rows = [];
  filterRows = [];
  temp = [];
  selected = [];

  columns = [{ prop: "name" }, { name: "Company" }, { name: "Gender" }];
  // @ViewChild("DatatableComponent", { static: false }) table: DatatableComponent;

  constructor() {
    this.fetch(data => {
      this.temp = [...data];
      this.rows = data;
      this.filterRows = data;
    });
  }

  /**
   * Load data to show in table
   * @param cb
   */
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open("GET", `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  /**
   * Filter rows by inputed string
   * @param event
   */
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.filterRows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  /**
   * Row select handler
   * @param {any} selected
   */
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  ngOnInit() { }
}
