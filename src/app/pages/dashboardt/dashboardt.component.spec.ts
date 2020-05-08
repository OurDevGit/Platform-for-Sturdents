import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DashboardtComponent } from "./dashboardt.component";

describe("DashboardtComponent", () => {
  let component: DashboardtComponent;
  let fixture: ComponentFixture<DashboardtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardtComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
