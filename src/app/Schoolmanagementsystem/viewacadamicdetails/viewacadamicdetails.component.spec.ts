import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ViewacadamicdetailsComponent } from "./viewacadamicdetails.component";

describe("ViewacadamicdetailsComponent", () => {
  let component: ViewacadamicdetailsComponent;
  let fixture: ComponentFixture<ViewacadamicdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewacadamicdetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewacadamicdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
