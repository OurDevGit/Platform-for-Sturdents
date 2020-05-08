import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AcadamicGroupNameComponent } from "./acadamic-group-name.component";

describe("AcadamicGroupNameComponent", () => {
  let component: AcadamicGroupNameComponent;
  let fixture: ComponentFixture<AcadamicGroupNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AcadamicGroupNameComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcadamicGroupNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
