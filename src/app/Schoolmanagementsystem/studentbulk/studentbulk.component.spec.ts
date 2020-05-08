import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StudentbulkComponent } from "./studentbulk.component";

describe("StudentbulkComponent", () => {
  let component: StudentbulkComponent;
  let fixture: ComponentFixture<StudentbulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentbulkComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentbulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
