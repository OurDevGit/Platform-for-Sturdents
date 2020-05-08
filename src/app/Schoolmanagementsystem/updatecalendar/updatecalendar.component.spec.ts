import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UpdatecalendarComponent } from "./updatecalendar.component";

describe("UpdatecalendarComponent", () => {
  let component: UpdatecalendarComponent;
  let fixture: ComponentFixture<UpdatecalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatecalendarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
