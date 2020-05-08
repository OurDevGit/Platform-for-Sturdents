import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ViewchartsComponent } from "./viewcharts.component";

describe("ViewchartsComponent", () => {
  let component: ViewchartsComponent;
  let fixture: ComponentFixture<ViewchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewchartsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
