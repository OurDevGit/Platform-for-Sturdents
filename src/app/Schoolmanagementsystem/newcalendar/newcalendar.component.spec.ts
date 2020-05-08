import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NewcalendarComponent } from "./newcalendar.component";

describe("NewcalendarComponent", () => {
  let component: NewcalendarComponent;
  let fixture: ComponentFixture<NewcalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewcalendarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
