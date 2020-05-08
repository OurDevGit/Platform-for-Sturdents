import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AcademicgroupbulkuploadComponent } from "./academicgroupbulkupload.component";

describe("AcademicgroupbulkuploadComponent", () => {
  let component: AcademicgroupbulkuploadComponent;
  let fixture: ComponentFixture<AcademicgroupbulkuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AcademicgroupbulkuploadComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicgroupbulkuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
