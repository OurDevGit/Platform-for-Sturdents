import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ViewcalendarComponent } from "./viewcalendar.component";

describe("ViewcalendarComponent", () => {
  let component: ViewcalendarComponent;
  let fixture: ComponentFixture<ViewcalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewcalendarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
