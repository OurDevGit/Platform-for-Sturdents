import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RfidviewComponent } from "./rfidview.component";

describe("RfidviewComponent", () => {
  let component: RfidviewComponent;
  let fixture: ComponentFixture<RfidviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RfidviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfidviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
