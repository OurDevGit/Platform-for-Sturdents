import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AcademicviewComponent } from "./academicview.component";

describe("AcademicviewComponent", () => {
  let component: AcademicviewComponent;
  let fixture: ComponentFixture<AcademicviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AcademicviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
