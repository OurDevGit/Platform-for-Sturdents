import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AcademicgroupComponent } from "./academicgroup.component";

describe("AcademicgroupComponent", () => {
  let component: AcademicgroupComponent;
  let fixture: ComponentFixture<AcademicgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AcademicgroupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
