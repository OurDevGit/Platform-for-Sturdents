import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SchoolmanagementComponent } from "./schoolmanagement.component";

describe("SchoolmanagementComponent", () => {
  let component: SchoolmanagementComponent;
  let fixture: ComponentFixture<SchoolmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolmanagementComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
