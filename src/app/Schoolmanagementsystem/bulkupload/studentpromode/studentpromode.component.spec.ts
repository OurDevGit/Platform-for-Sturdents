import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StudentpromodeComponent } from "./studentpromode.component";

describe("StudentpromodeComponent", () => {
  let component: StudentpromodeComponent;
  let fixture: ComponentFixture<StudentpromodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentpromodeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentpromodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
